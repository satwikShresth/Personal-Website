/**
 * OAuth authentication module
 *
 * Handles Strava OAuth flow including authorization URL generation
 * and token exchange.
 */

import type { SummaryAthlete } from './sdk/client';

export interface OAuthTokenResponse {
   readonly token_type: 'Bearer';
   readonly expires_at: number;
   readonly expires_in: number;
   readonly refresh_token: string;
   readonly access_token: string;
   readonly athlete: SummaryAthlete;
}

/**
 * Token refresh response
 */
export interface TokenRefreshResponse {
   readonly token_type: 'Bearer';
   readonly access_token: string;
   readonly expires_at: number;
   readonly expires_in: number;
   readonly refresh_token: string;
}

/**
 * Stored token data
 */
export interface StoredTokens {
   readonly athleteId: string;
   readonly accessToken: string;
   readonly refreshToken: string;
   readonly expiresAt: Date;
   readonly scopes?: readonly string[];
   [key: string]: any;
}

/**
 * Token data with refresh status
 */
export interface TokenData {
   readonly accessToken: string;
   readonly refreshToken: string;
   readonly expiresAt: Date;
   readonly wasRefreshed: boolean;
}

/**
 * OAuth configuration
 */
export interface OAuthConfig {
   readonly clientId: string;
   readonly clientSecret: string;
   readonly redirectUri: string;
   readonly scopes?: readonly string[];
}

/**
 * OAuth authorization options
 */
export interface AuthorizationOptions {
   readonly state?: string;
   readonly scopes?: readonly string[];
   readonly approvalPrompt?: 'auto' | 'force';
}

const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';

export class StravaOAuth {
   private readonly config: OAuthConfig;

   constructor(config: OAuthConfig) {
      const errors = validateOAuthConfig(config);
      if (errors.length > 0) {
         throw new Error(`OAuth configuration errors: ${errors.join(', ')}`);
      }
      this.config = config;
   }

   /**
    * Generate authorization URL for OAuth flow
    *
    * @param options - Authorization options
    * @returns Authorization URL to redirect user to
    */
   getAuthUrl(options: AuthorizationOptions = {}): string {
      const scopes = options.scopes ??
         this.config.scopes ?? ['activity:read_all'];
      const approvalPrompt = options.approvalPrompt ?? 'auto';

      const params = new URLSearchParams({
         client_id: this.config.clientId,
         redirect_uri: this.config.redirectUri,
         response_type: 'code',
         approval_prompt: approvalPrompt,
         scope: scopes.join(',')
      });

      if (options.state) {
         params.set('state', options.state);
      }

      return `${STRAVA_AUTH_URL}?${params.toString()}`;
   }

   /**
    * Exchange authorization code for access tokens or refresh an existing token
    *
    * @param code - Authorization code from OAuth callback OR refresh token for token refresh
    * @param isRefresh - Whether this is a token refresh (true) or initial authorization (false)
    * @returns OAuth token response including athlete data
    * @throws Error if token exchange fails
    */
   async exchangeCode(
      code: string,
      isRefresh = false
   ): Promise<OAuthTokenResponse> {
      const body = {
         client_id: this.config.clientId,
         client_secret: this.config.clientSecret,
         grant_type: isRefresh ? 'refresh_token' : 'authorization_code'
      };

      // Use correct parameter name based on grant type
      if (isRefresh) {
         body.refresh_token = code; // For refresh, use refresh_token parameter
      } else {
         body.code = code; // For initial auth, use code parameter
      }

      const response = await fetch(STRAVA_TOKEN_URL, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
      });

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(
            `Token exchange failed (${response.status}): ${errorText}`
         );
      }

      const tokenData = (await response.json()) as OAuthTokenResponse;

      // For refresh tokens, athlete data might not be included
      if (!isRefresh && !tokenData.athlete) {
         throw new Error('Token response missing athlete data');
      }

      return tokenData;
   }

   /**
    * Revoke access token
    *
    * @param accessToken - Access token to revoke
    */
   async revokeToken(accessToken: string): Promise<void> {
      const response = await fetch('https://www.strava.com/oauth/deauthorize', {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
         }
      });

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(
            `Token revocation failed (${response.status}): ${errorText}`
         );
      }
   }
}

function validateOAuthConfig(config: {
   clientId?: string;
   clientSecret?: string;
   redirectUri?: string;
}): string[] {
   const errors: string[] = [];

   if (!config.clientId) {
      errors.push('clientId is required');
   }
   if (!config.clientSecret) {
      errors.push('clientSecret is required');
   }
   if (!config.redirectUri) {
      errors.push('redirectUri is required');
   }

   return errors;
}
