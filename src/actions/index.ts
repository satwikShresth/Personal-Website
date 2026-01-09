import { defineAction } from 'astro:actions';
import { s3Service } from '$lib/s3.service';

export const server = {
  getInspirationVideoLink: defineAction({
    handler: () => 
       s3Service
        .getPresignedUrl('assets/liveDemo.mp4', 3600) // 1 hour expiry
        .then((preSignedUrl) => {
          return { preSignedUrl };
        })
        .catch((error) => {
          console.error('Error generating S3 presigned URL:', error);
          throw error;
        })
    
  })
};
