import { z } from 'zod'
import { os } from '@orpc/server'
import { storeOAuthToken, stravaOAuth } from '@/orpc/utils/strava-auth'

export const handleCallback = os
  .route({
    path: '/strava/callback',
    method: 'GET',
    successStatus: 200,
    inputStructure: 'detailed'
  })
  .input(
    z.object({
      query: z.object({
        code: z.string(),
        scope: z.string().optional(),
        state: z.string().optional(),
        error: z.string().optional(),
      })
    })
  )
  .handler(async ({ input }) => {
    const { code, error, scope, state } = input.query
    
    if (error === 'access_denied') {
      throw new Error('User denied access to Strava')
    }

    if (!code) {
      throw new Error('Authorization code is required')
    }

    return await stravaOAuth
      .exchangeCode(code)
      .then(async (tokenResponse) => {
        await storeOAuthToken(tokenResponse)
        
        return {
          success: true,
          athleteId: tokenResponse.athlete?.id,
          athlete: tokenResponse.athlete,
          expiresAt: tokenResponse.expires_at,
          scopes: scope?.split(','),
          state: state,
        }
      })
      .catch((error) => {
        throw new Error(
          `Failed to exchange authorization code: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      })
  })
