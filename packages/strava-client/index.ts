import axios from 'axios';
import { redisStorage } from '@/orpc/utils';
import { setupCache } from 'axios-cache-interceptor';
import { ensureValidToken } from '@pkg/scripts/strava.auth';
import type { CreateClientConfig } from './sdk/client/client.gen';

export const createClientConfig: CreateClientConfig = config => ({
   ...config,
   axios: setupCache(axios.create(), {
      storage: redisStorage,
      methods: ['get'],
      ttl: 900000, // Cache for 15 minutes
      interpretHeader: false,
      staleIfError: true,
      cachePredicate: {
         statusCheck: status => status >= 200 && status < 400
      },
      generateKey: config => {
         const url = config.url || '';
         const params = config.params ? JSON.stringify(config.params) : '';
         return `${config.method}:${url}:${params}`;
      }
   }),
   auth: async (): Promise<string> => {
      const token = await ensureValidToken();
      if (!token) {
         throw new Error(
            'Strava authentication required. Please authenticate with Strava.'
         );
      }
      return token;
   }
});
