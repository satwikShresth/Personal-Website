import { redis } from './redis'
import { env } from '@/env'
import { StravaOAuth, type OAuthTokenResponse } from '@/strava-client/oauth'
import { sendDiscordNotification } from './discord'

export const stravaOAuth = new StravaOAuth({
  clientId: env.STRAVA_CLIENT_ID,
  clientSecret: env.STRAVA_CLIENT_SECRET,
  redirectUri: env.STRAVA_REDIRECT_URI,
  scopes: ["activity:read_all"],
})

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
async function getStoredToken(): Promise<StoredOAuthToken | null> {
  return await redis.get(env.REDIS_STRAVA_OAUTH_TOKEN_KEY)
    .then((data: string | null) => {
      if (!data) return null
      return JSON.parse(data) as StoredOAuthToken
    })
}

/**
 * Validate and refresh OAuth token if needed
 * Returns valid access token or throws error
 */
export async function ensureValidToken(): Promise<string> {
  const storedToken = await getStoredToken()

  // Token not present in Redis
  if (!storedToken) {
    await sendDiscordNotification(
      '🏃 **Strava Authentication Alert**\n\n' +
      '❌ **OAuth token not found!**\n\n' +
      'The Strava OAuth token is missing from Redis. Please re-authenticate.\n\n' +
      `Authorization URL: ${stravaOAuth.getAuthUrl()}`,
      'Strava Auth Bot'
    )
    throw new Error('OAuth token not found. Authentication required.')
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
      return await sendDiscordNotification(
        '🏃 **Strava Authentication Alert**\n\n' +
        '❌ **Token refresh failed!**\n\n' +
        'Failed to refresh the Strava OAuth token. Please re-authenticate.\n\n' +
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n\n` +
        `Authorization URL: ${stravaOAuth.getAuthUrl()}`,
        'Strava Auth Bot'
      ).then(() => {
        throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      })
    })
}

