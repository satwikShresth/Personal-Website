import handler from '@tanstack/react-start/server-entry';
import { ensureValidToken } from '@/orpc/utils/strava-auth';

export default {
  async fetch(request: Request) {
    await ensureValidToken()
      .then((token) => {
        if (token) {
          console.log('✅ Valid Strava OAuth token available');
        } else {
          console.warn('⚠️ Strava OAuth token not available - authentication required');
        }
      });
    
    return handler.fetch(request);
  }
};
