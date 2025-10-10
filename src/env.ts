import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    S3_ENDPOINT: z.url(),
    S3_BUCKET: z.string(),
    S3_ACCESSKEYID: z.string(),
    S3_SECRETKEY: z.string()
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
