import { env } from '@/env'
import { redis } from './redis'
import { StravaOAuth, type OAuthTokenResponse } from '@/strava-client/oauth'
import { sendDiscordNotification } from './discord'

const redirectUri = `${env.STRAVA_REDIRECT_URI}/${env.STRAVA_CALLBACK_KEY}`;
export const stravaOAuth = new StravaOAuth({
  clientId: env.STRAVA_CLIENT_ID,
  clientSecret: env.STRAVA_CLIENT_SECRET,
  redirectUri,
  scopes: ["activity:read_all"],
})

// In-memory cooldown tracking for Discord notifications
let lastNotificationTime = 0
const NOTIFICATION_COOLDOWN_MS = 15 * 60 * 1000 // 15 minutes

/**
 * Send Discord notification with cooldown
 * Only sends if cooldown period has passed
 */
async function sendNotificationWithCooldown(message: string, username?: string): Promise<void> {
  const now = Date.now()
  
  if (now - lastNotificationTime >= NOTIFICATION_COOLDOWN_MS) {
    lastNotificationTime = now
    await sendDiscordNotification(message, username)
  }
}

interface StoredOAuthToken {
  accessToken: string
  refreshToken: string
  expiresAt: number
  athleteId: number
  scopes?: string[]
}

/**
 * Store OAuth token in Redis
 */
export async function storeOAuthToken(tokenResponse: OAuthTokenResponse): Promise<void> {
  const storedToken: StoredOAuthToken = {
    accessToken: tokenResponse.access_token,
    refreshToken: tokenResponse.refresh_token,
    expiresAt: tokenResponse.expires_at,
    athleteId: tokenResponse.athlete?.id ?? 0,
    scopes: [],
  }

  return await redis.set(
    env.REDIS_STRAVA_OAUTH_TOKEN_KEY,
    JSON.stringify(storedToken)
  ).then(() => {})
}

/**
 * Get OAuth token from Redis
 */
export async function getStoredToken(): Promise<StoredOAuthToken | null> {
  return await redis.get(env.REDIS_STRAVA_OAUTH_TOKEN_KEY)
    .then((data: string | null) => {
      if (!data) return null
      return JSON.parse(data) as StoredOAuthToken
    })
}

/**
 * Validate and refresh OAuth token if needed
 * Returns valid access token or null if authentication required
 */
export async function ensureValidToken(): Promise<string | null> {
  const storedToken = await getStoredToken()

  // Token not present in Redis
  if (!storedToken) {
    await sendNotificationWithCooldown(
      '🏃 **Strava Authentication Alert**\n\n' +
      '❌ **OAuth token not found!**\n\n' +
      'The Strava OAuth token is missing from Redis. Please re-authenticate.\n\n' +
      `Authorization URL: ${stravaOAuth.getAuthUrl()}`,
      'Strava Auth Bot'
    )
    return null
  }

  // Check if token is expired
  const now = Math.floor(Date.now() / 1000) // Current time in seconds
  const isExpired = storedToken.expiresAt <= now

  if (!isExpired) {
    // Token is still valid
    return storedToken.accessToken
  }

  return await stravaOAuth.exchangeCode(storedToken.refreshToken)
    .then((refreshedToken) => {
      console.log('✅ Successfully refreshed Strava OAuth token')
      return refreshedToken.access_token
    })
    .catch(async (error) => {
      await sendNotificationWithCooldown(
        '🏃 **Strava Authentication Alert**\n\n' +
        '❌ **Token refresh failed!**\n\n' +
        'Failed to refresh the Strava OAuth token. Please re-authenticate.\n\n' +
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n\n` +
        `Authorization URL: ${stravaOAuth.getAuthUrl()}`,
        'Strava Auth Bot'
      )
      return null
    })
}

