import { defineAction } from 'astro:actions';
import { S3Client } from 'bun';

export const server = {
  getInspirationVideoLink: defineAction({
    handler: async () => {
      try {
        const preSignedUrl = S3Client.presign('assets/liveDemo.mp4',{
          accessKeyId: import.meta.env.S3_ACCESSKEYID,
          secretAccessKey: import.meta.env.S3_SECRETKEY,
          bucket: import.meta.env.S3_BUCKET,
          endpoint: import.meta.env.S3_ENDPOINT,
          expiresIn: 3600,
        })
        return { preSignedUrl };
      } catch (error) {
        console.error('Error generating S3 presigned URL:', error);
        throw error;
      }
    }
  })
};