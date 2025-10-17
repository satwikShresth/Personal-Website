import { desc } from 'drizzle-orm';
import { db, activities } from '@/db';
import { redis } from '@pkg/scripts/strava.auth';
import { syncAfter } from '@pkg/scripts/strava.sync';

function redisTimestamp(stored: string) {
   console.log(
      `Syncing from Redis timestamp: ${new Date(afterTimestamp * 1000).toISOString()}`
   );
   return Number.parseInt(stored, 10);
}

async function mostRecentTimestamp() {
   const mostRecentActivity = await db
      .select({ startDate: activities.startDate })
      .from(activities)
      .orderBy(desc(activities.startDate))
      .limit(1)
      .get()
      .then(s => s?.startDate);

   if (mostRecentActivity) {
      const mostRecentActivityTimestamp = Math.floor(
         new Date(mostRecentActivity).getTime() / 1000
      );
      console.log(
         `Syncing from most recent activity: ${new Date(mostRecentActivityTimestamp * 1000).toISOString()}`
      );
      return mostRecentActivityTimestamp;
   }

   console.log(`📅 No previous data, syncing from 30 days ago`);
   return Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;
}

const LAST_SYNC_KEY = 'strava:last-sync-timestamp';
const stored = await redis.get(LAST_SYNC_KEY);
const afterTimestamp = stored
   ? redisTimestamp(stored)
   : await mostRecentTimestamp();

console.log(`🏃 Starting sync...`);
await syncAfter(afterTimestamp, { notifyOnSuccess: true }).then(
   async result => {
      if (result.success) {
         const currentTimestamp = Math.floor(Date.now() / 1000);
         await redis.set(LAST_SYNC_KEY, currentTimestamp.toString());
         console.log(
            `Sync complete: ${result.newActivities} new, ${result.updatedActivities} updated`
         );
      } else {
         console.error(`Sync failed:`, result.errors);
      }
   }
);
