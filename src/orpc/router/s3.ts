import { os } from '@orpc/server';
import { s3 } from '@/orpc/utils';

export const getInspirationVideoLink = os
   .route({
      path: '/inspiration-video-link',
      method: 'GET',
      successStatus: 200
   })
   .handler(async () => ({ preSignedUrl: s3!.presign('assets/liveDemo.mp4') }));
