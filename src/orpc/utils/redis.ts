import { RedisClient } from "bun";
import {env} from "@/env";
import { buildStorage, canStale, type CacheRequestConfig, type NotEmptyStorageValue, type StorageValue } from "axios-cache-interceptor";

export const redis = new RedisClient(env.REDIS_URL);
export const redisStorage = buildStorage({
    find: async(key) => 
        await redis
        .get(`axios-cache-${key}`)
        .then(
            (result)=>result 
                ? (JSON.parse(result) as StorageValue) 
                : undefined
        )
    ,

    async set(key, value, req) {
        const pxat = getPaxt(value,req)
        pxat
            ? await redis.set(`axios-cache-${key}`, JSON.stringify(value), "PXAT", pxat)
            : await redis.set(`axios-cache-${key}`, JSON.stringify(value))
    },

    async remove(key) {
        await redis.del(`axios-cache-${key}`);
    },
});


function getPaxt(value:NotEmptyStorageValue,req:CacheRequestConfig<any, any> | undefined){
    switch (value.state) {
        case "loading":
            return (
                Date.now() +
                    (
                        req?.cache && typeof req.cache.ttl === "number" 
                            ? req.cache.ttl 
                            : env.DEFAULT_TTL
                    )
            );
        case "stale":
            // Only apply TTL if it's explicitly set for a stale value
            return value.ttl ? value.createdAt + value.ttl : undefined;
        case "cached":
            // Only apply TTL if it cannot be stale (i.e., it has a strict expiration)
            return !canStale(value) && value.ttl ? value.createdAt + value.ttl : undefined;
        default:
            return undefined; // No expiration by default or for other states
    }
}
