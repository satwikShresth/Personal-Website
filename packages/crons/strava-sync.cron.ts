import { desc } from 'drizzle-orm';
import { db, activities } from '@/db';
import { redis } from '@pkg/scripts/strava-auth';
import { syncAfter } from '@pkg/scripts/strava-sync';
import { sendDiscordNotification } from '@pkg/scripts/discord';

function redisTimestamp(stored: string) {
   const redisTimestamp = Number.parseInt(stored, 10);
   console.log(
      `Syncing from Redis timestamp: ${new Date(Number.parseInt(stored, 10) * 1000).toISOString()}`
   );
   return redisTimestamp;
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

   console.log(`No previous data, syncing from 30 days ago`);
   return Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;
}

const LAST_SYNC_KEY = 'strava:last-sync-timestamp';
const stored = await redis.get(LAST_SYNC_KEY);
const afterTimestamp = stored
   ? redisTimestamp(stored)
   : await mostRecentTimestamp();

console.log(`Starting sync...`);
await syncAfter(afterTimestamp, { notifyOnSuccess: false }).then(
   async result => {
      if (result.success) {
         const currentTimestamp = Math.floor(Date.now() / 1000);
         await redis.set(LAST_SYNC_KEY, currentTimestamp.toString());
         console.log(
            `Sync complete: ${result.newActivities} new, ${result.updatedActivities} updated`
         );

         if (result.newActivities > 0) {
            await sendDiscordNotification(
               `Strava Cron Sync Complete\n\nNew activities: ${result.newActivities}\nUpdated activities: ${result.updatedActivities}\nTotal processed: ${result.totalProcessed}\nTime: ${new Date().toLocaleString()}`,
               'Strava Cron'
            ).catch(() => {});
         }
      } else {
         console.error(`Sync failed:`, result.errors);

         await sendDiscordNotification(
            `Strava Cron Sync Failed\n\nErrors: ${result.errors.join(', ')}\nTime: ${new Date().toLocaleString()}`,
            'Strava Cron'
         ).catch(() => {});
      }
   }
);
