import { RedisClient } from 'bun';
import { env } from '@/env';
import {
   buildStorage,
   type CacheRequestConfig,
   type NotEmptyStorageValue,
   type StorageValue
} from 'axios-cache-interceptor';

export const redis = new RedisClient(env.REDIS_URL);
export const redisStorage = buildStorage({
   find: async key => {
      const result = await redis.get(`axios-cache-${key}`);
      return result ? (JSON.parse(result) as StorageValue) : undefined;
   },

   async set(key, value, req) {
      const pxat = getPxat(value, req);
      const keyName = `axios-cache-${key}`;
      if (pxat) {
         await redis.set(keyName, JSON.stringify(value), 'PXAT', pxat);
      } else {
         await redis.set(keyName, JSON.stringify(value));
      }
   },

   async remove(key) {
      await redis.del(`axios-cache-${key}`);
   }
});

function getPxat(
   value: NotEmptyStorageValue,
   req: CacheRequestConfig<any, any> | undefined
) {
   switch (value.state) {
      case 'loading':
         // For loading state, set short TTL (use default or explicit TTL)
         return (
            Date.now() +
            (req?.cache && typeof req.cache.ttl === 'number'
               ? req.cache.ttl
               : env.DEFAULT_TTL)
         );
      case 'cached':
         // For cached state, always set expiration using value.ttl
         // This is the actual cached response that should persist
         return value.ttl
            ? value.createdAt + value.ttl
            : Date.now() + env.DEFAULT_TTL;
      case 'stale':
         // Stale values can still be served, keep them with TTL
         return value.ttl ? value.createdAt + value.ttl : undefined;
      default:
         return undefined;
   }
}
