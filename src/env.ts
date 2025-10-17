import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
   server: {
      S3_ENDPOINT: z.url(),
      S3_BUCKET: z.string(),
      S3_ACCESSKEYID: z.string(),
      S3_SECRETKEY: z.string(),
      REDIS_URL: z.url({ protocol: /redis/ }),
      DEFAULT_TTL: z.coerce.number().catch(900000),
      STRAVA_CLIENT_ID: z.string(),
      STRAVA_CLIENT_SECRET: z.string(),
      STRAVA_REDIRECT_URI: z.url(),
      STRAVA_CALLBACK_KEY: z.string(),
      DISCORD_WEBHOOK_URL: z.url(),
      TURSO_DATABASE_URL: z.url(),
      TURSO_AUTH_TOKEN: z.string(),
      REDIS_STRAVA_OAUTH_TOKEN_KEY: z.string()
   },
   clientPrefix: 'VITE_',
   client: {},
   runtimeEnv: process.env,
   emptyStringAsUndefined: true,
   skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
   onValidationError: issues => {
      const errorDetails = issues
         .map(issue => `  • ${issue?.path!.join('.')}: ${issue.message}`)
         .join('\n');

      throw new Error(`Invalid environment variables:\n${errorDetails}`);
   },
   onInvalidAccess: _ => {
      throw new Error(
         '❌ Attempted to access a server-side environment variable on the client'
      );
   }
});
