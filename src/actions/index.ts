import { defineAction } from 'astro:actions';
import * as MinIO from 'minio';

export const server = {
  getInspirationVideoLink: defineAction({
    handler: async () => {
      try {
        const endpointUrl = new URL(import.meta.env.S3_ENDPOINT);
        const minioClient = new MinIO.Client({
          endPoint: endpointUrl.hostname,
          port: endpointUrl.port ? parseInt(endpointUrl.port) : (endpointUrl.protocol === 'https:' ? 443 : 80),
          useSSL: endpointUrl.protocol === 'https:',
          accessKey: import.meta.env.S3_ACCESSKEYID,
          secretKey: import.meta.env.S3_SECRETKEY,
        });

        const preSignedUrl = await minioClient.presignedGetObject(
          import.meta.env.S3_BUCKET,
          'assets/liveDemo.mp4',
          3600 // 1 hour expiry
        );
        
        return { preSignedUrl };
      } catch (error) {
        console.error('Error generating S3 presigned URL:', error);
        throw error;
      }
    }
  })
};