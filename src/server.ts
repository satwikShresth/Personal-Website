import handler from '@tanstack/react-start/server-entry';
import "@/orpc/utils"
import { ensureValidToken } from '@/orpc/utils/strava-auth';

await ensureValidToken()
.then(() => {
  console.log('✅ Valid Strava OAuth token available');
})
.catch((error) => {
  console.error('⚠️ OAuth token validation failed:', error);
});

export default {
  fetch(request: Request) {
    return handler.fetch(request);
  }
};
