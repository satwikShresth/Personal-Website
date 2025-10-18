import { env } from '@/env';
import { RedisClient } from 'bun';
import { sendDiscordNotification } from './discord';
import { StravaOAuth, type OAuthTokenResponse } from '@pkg/strava-client/oauth';

export const redis = new RedisClient(env.REDIS_URL);
const redirectUri = `${env.STRAVA_REDIRECT_URI}/${env.STRAVA_CALLBACK_KEY}`;
export const stravaOAuth = new StravaOAuth({
   clientId: env.STRAVA_CLIENT_ID,
   clientSecret: env.STRAVA_CLIENT_SECRET,
   redirectUri,
   scopes: ['activity:read_all']
});

// In-memory cooldown tracking for Discord notifications
let lastNotificationTime = 0;
const NOTIFICATION_COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Send Discord notification with cooldown
 * Only sends if cooldown period has passed
 */
async function sendNotificationWithCooldown(
   message: string,
   username?: string
): Promise<void> {
   const now = Date.now();

   if (now - lastNotificationTime >= NOTIFICATION_COOLDOWN_MS) {
      lastNotificationTime = now;
      await sendDiscordNotification(message, username);
   }
}

interface StoredOAuthToken {
   accessToken: string;
   refreshToken: string;
   expiresAt: number;
   athleteId: number;
   scopes?: string[];
}

/**
 * Store OAuth token in Redis
 * Handles both initial auth (with athlete) and refresh (without athlete)
 */
export async function storeOAuthToken(
   tokenResponse: OAuthTokenResponse,
   existingAthleteId?: number
): Promise<void> {
   const storedToken: StoredOAuthToken = {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiresAt: tokenResponse.expires_at,
      athleteId: tokenResponse.athlete?.id ?? existingAthleteId ?? 0,
      scopes: []
   };

   return await redis
      .set(env.REDIS_STRAVA_OAUTH_TOKEN_KEY, JSON.stringify(storedToken))
      .then(() => {});
}

/**
 * Get OAuth token from Redis
 */
export async function getStoredToken(): Promise<StoredOAuthToken | null> {
   return await redis
      .get(env.REDIS_STRAVA_OAUTH_TOKEN_KEY)
      .then((data: string | null) => {
         if (!data) return null;
         return JSON.parse(data) as StoredOAuthToken;
      });
}

/**
 * Validate and refresh OAuth token if needed
 * Returns valid access token or null if authentication required
 */
export async function ensureValidToken(): Promise<string | null> {
   const storedToken = await getStoredToken();

   // Token not present in Redis
   if (!storedToken) {
      await sendNotificationWithCooldown(
         `Strava Authentication Alert\n\nOAuth token not found in Redis. Please re-authenticate.\n\nAuthorization URL: ${stravaOAuth.getAuthUrl()}`,
         'Strava Auth'
      );
      return null;
   }

   // Check if token is expired or will expire soon
   const now = Math.floor(Date.now() / 1000); // Current time in seconds
   const bufferTime = 300; // 5 minutes buffer before expiration
   const needsRefresh = storedToken.expiresAt <= now + bufferTime;

   if (!needsRefresh) {
      // Token is still valid
      return storedToken.accessToken;
   }

   // Refresh the token
   try {
      const refreshedToken = await stravaOAuth.exchangeCode(storedToken.refreshToken, true);
      
      // Store the new token (CRITICAL: Strava returns a new refresh token)
      // Pass existing athleteId since refresh response doesn't include athlete data
      await storeOAuthToken(refreshedToken, storedToken.athleteId);
      
      console.log('Successfully refreshed Strava OAuth token');
      return refreshedToken.access_token;
   } catch (error) {
      await sendNotificationWithCooldown(
         `Strava Authentication Alert\n\nToken refresh failed. Please re-authenticate.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}\n\nAuthorization URL: ${stravaOAuth.getAuthUrl()}`,
         'Strava Auth'
      );
      return null;
   }
}
