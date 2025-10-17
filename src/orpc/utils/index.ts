import { S3Client } from 'bun';
import { env } from '@/env';

export const s3 = new S3Client({
   accessKeyId: env.S3_ACCESSKEYID,
   secretAccessKey: env.S3_SECRETKEY,
   bucket: env.S3_BUCKET,
   endpoint: env.S3_ENDPOINT
   // sessionToken: "..."
   // acl: "public-read",
   // endpoint: "https://s3.us-east-1.amazonaws.com",
   // endpoint: "https://<account-id>.r2.cloudflarestorage.com", // Cloudflare R2
   // endpoint: "https://<region>.digitaloceanspaces.com", // DigitalOcean Spaces
});

export * from './strava-auth';
export * from './discord';
export * from './redis';
