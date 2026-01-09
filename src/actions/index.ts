import { defineAction } from 'astro:actions';
import { s3Service } from '$lib/s3.service';

export const server = {
  getInspirationVideoLink: defineAction({
    handler: async () =>
      await s3Service
        .getPresignedUrl('assets/liveDemo.mp4', 300) // 5 min expiry
        .then((preSignedUrl) => {
          return { preSignedUrl };
        })
        .catch((error) => {
          console.error('Error generating S3 presigned URL:', error);
          throw error;
        })
  })
};
