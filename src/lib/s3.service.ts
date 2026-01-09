import * as MinIO from 'minio';

/**
 * S3 Service for generating presigned URLs
 */
export class S3Service {
  private client: MinIO.Client;

  constructor() {
    const endpointUrl = new URL(import.meta.env.S3_ENDPOINT);
    this.client = new MinIO.Client({
      endPoint: endpointUrl.hostname,
      port: endpointUrl.port
        ? parseInt(endpointUrl.port)
        : endpointUrl.protocol === 'https:'
          ? 443
          : 80,
      useSSL: endpointUrl.protocol === 'https:',
      accessKey: import.meta.env.S3_ACCESSKEYID,
      secretKey: import.meta.env.S3_SECRETKEY,
    });
  }

  /**
   * Generate a presigned URL for an object
   * @param objectKey - The key/path of the object in the bucket
   * @param expirySeconds - Expiry time in seconds (default: 3600 = 1 hour)
   * @returns Presigned URL string
   */
  async getPresignedUrl(
    objectKey: string,
    expirySeconds: number = 3600
  ): Promise<string> {
    try {
      const preSignedUrl = await this.client.presignedGetObject(
        import.meta.env.S3_BUCKET,
        objectKey,
        expirySeconds
      );
      return preSignedUrl;
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to generate presigned URL'
      );
    }
  }
}

// Export a singleton instance
export const s3Service = new S3Service();
