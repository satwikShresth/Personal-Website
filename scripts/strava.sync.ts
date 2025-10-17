import { getLoggedInAthleteActivities } from '@/strava-client/sdk/client/sdk.gen';
import { ensureValidToken, getStoredToken } from './strava.auth';
import { sendDiscordNotification } from './discord';
import { db, athletes, activities, activityMaps } from '@/db';
import type { SummaryActivity } from '@/strava-client/sdk/client/types.gen';
import { eq } from 'drizzle-orm';

interface SyncResult {
   success: boolean;
   athleteId?: number;
   newActivities: number;
   updatedActivities: number;
   totalProcessed: number;
   errors: string[];
   timestamp: string;
}

const upsertAthlete = async (athleteId: number) => {
   const existing = await db
      .select()
      .from(athletes)
      .where(eq(athletes.id, athleteId))
      .get();

   return existing
      ? await db
           .update(athletes)
           .set({ updatedAt: new Date() })
           .where(eq(athletes.id, athleteId))
           .run()
      : await db.insert(athletes).values({ id: athleteId }).run();
};

const upsertActivity = async (activity: SummaryActivity, athleteId: number) => {
   const data = {
      id: activity.id!,
      athleteId,
      externalId: activity.external_id ?? null,
      uploadId: activity.upload_id ?? null,
      uploadIdStr: activity.upload_id_str ?? null,
      name: activity.name!,
      type: activity.type ?? null,
      sportType: activity.sport_type ?? null,
      workoutType: activity.workout_type ?? null,
      distance: activity.distance ?? null,
      movingTime: activity.moving_time ?? null,
      elapsedTime: activity.elapsed_time ?? null,
      totalElevationGain: activity.total_elevation_gain ?? null,
      elevHigh: activity.elev_high ?? null,
      elevLow: activity.elev_low ?? null,
      averageSpeed: activity.average_speed ?? null,
      maxSpeed: activity.max_speed ?? null,
      averageHeartrate: (activity as any).average_heartrate ?? null,
      maxHeartrate: (activity as any).max_heartrate ?? null,
      kilojoules: activity.kilojoules ?? null,
      averageWatts: activity.average_watts ?? null,
      maxWatts: activity.max_watts ?? null,
      weightedAverageWatts: activity.weighted_average_watts ?? null,
      deviceWatts: activity.device_watts ?? null,
      startDate: activity.start_date!,
      startDateLocal: activity.start_date_local!,
      timezone: activity.timezone ?? null,
      startLatlng: activity.start_latlng ?? null,
      endLatlng: activity.end_latlng ?? null,
      achievementCount: activity.achievement_count ?? 0,
      kudosCount: activity.kudos_count ?? 0,
      commentCount: activity.comment_count ?? 0,
      athleteCount: activity.athlete_count ?? 1,
      photoCount: activity.photo_count ?? 0,
      totalPhotoCount: activity.total_photo_count ?? 0,
      trainer: activity.trainer ?? false,
      commute: activity.commute ?? false,
      manual: activity.manual ?? false,
      private: activity.private ?? false,
      flagged: activity.flagged ?? false,
      hasKudoed: activity.has_kudoed ?? false,
      hideFromHome: activity.hide_from_home ?? false,
      gearId: activity.gear_id ?? null
   };

   const existing = await db
      .select()
      .from(activities)
      .where(eq(activities.id, activity.id!))
      .get();

   const isNew = !existing;

   await (existing
      ? db
           .update(activities)
           .set({ ...data, updatedAt: new Date() })
           .where(eq(activities.id, activity.id!))
           .run()
      : db.insert(activities).values(data).run());

   if (activity.map) {
      const existingMap = await db
         .select()
         .from(activityMaps)
         .where(eq(activityMaps.activityId, activity.id!))
         .get();

      const mapData = {
         activityId: activity.id!,
         mapId: activity.map.id ?? null,
         polyline: activity.map.polyline ?? null,
         summaryPolyline: activity.map.summary_polyline ?? null
      };

      await (existingMap
         ? db
              .update(activityMaps)
              .set({ ...mapData, updatedAt: new Date() })
              .where(eq(activityMaps.activityId, activity.id!))
              .run()
         : db.insert(activityMaps).values(mapData).run());
   }

   return isNew;
};

export const syncStravaActivities = async (
   options: {
      perPage?: number;
      maxPages?: number;
      notifyOnSuccess?: boolean;
      after?: number;
      before?: number;
   } = {}
): Promise<SyncResult> => {
   const {
      perPage = 30,
      maxPages = 3,
      notifyOnSuccess = false,
      after,
      before
   } = options;
   const result: SyncResult = {
      success: false,
      newActivities: 0,
      updatedActivities: 0,
      totalProcessed: 0,
      errors: [],
      timestamp: new Date().toISOString()
   };

   const token = await ensureValidToken().catch(error => {
      result.errors.push(
         `Token validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      return null;
   });

   if (!token) {
      result.errors.push('Authentication required - no valid token');
      return result;
   }

   const storedToken = await getStoredToken().catch(error => {
      result.errors.push(
         `Failed to get stored token: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      return null;
   });

   if (!storedToken?.athleteId) {
      result.errors.push('Athlete ID not found in stored token');
      return result;
   }

   result.athleteId = storedToken.athleteId;

   await upsertAthlete(storedToken.athleteId).catch(error => {
      result.errors.push(
         `Failed to upsert athlete: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
   });

   if (result.errors.length > 0) {
      await sendDiscordNotification(
         `🏃 **Strava Sync Failed**\n\n❌ **Error:** ${result.errors.join(', ')}\n⏰ ${new Date().toLocaleString()}`,
         'Strava Sync Bot'
      ).catch(() => {});
      return result;
   }

   for (let page = 1; page <= maxPages; page++) {
      const response = await getLoggedInAthleteActivities({
         query: {
            per_page: perPage,
            page,
            ...(after && { after }),
            ...(before && { before })
         }
      }).catch(error => {
         result.errors.push(
            `Failed to fetch page ${page}: ${error instanceof Error ? error.message : 'Unknown error'}`
         );
         return null;
      });

      if (!response) break;

      const fetchedActivities = response.data ?? [];
      if (fetchedActivities.length === 0) break;

      for (const activity of fetchedActivities) {
         if (!activity.id) {
            result.errors.push('Activity missing ID, skipping');
            continue;
         }

         const isNew = await upsertActivity(
            activity,
            storedToken.athleteId
         ).catch(error => {
            result.errors.push(
               `Failed to process activity ${activity.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
            return null;
         });

         if (isNew !== null) {
            isNew ? result.newActivities++ : result.updatedActivities++;
            result.totalProcessed++;
         }
      }

      if (fetchedActivities.length < perPage) break;
   }

   result.success = result.totalProcessed > 0 || result.errors.length === 0;

   if (result.success && notifyOnSuccess && result.newActivities > 0) {
      await sendDiscordNotification(
         `🏃 **Strava Sync Complete**\n\n✅ **${result.newActivities} new activities** added\n🔄 **${result.updatedActivities} activities** updated\n📊 Total processed: ${result.totalProcessed}\n⏰ ${new Date().toLocaleString()}`,
         'Strava Sync Bot'
      ).catch(() => {});
   }

   if (result.errors.length > 0) {
      console.error('Sync completed with errors:', result.errors);
   }

   return result;
};

export const quickSync = () =>
   syncStravaActivities({ perPage: 30, maxPages: 1, notifyOnSuccess: false });

export const fullSync = () =>
   syncStravaActivities({ perPage: 100, maxPages: 10, notifyOnSuccess: true });

export const syncAfter = (
   afterTimestamp: number,
   options?: { before?: number; notifyOnSuccess?: boolean }
) =>
   syncStravaActivities({
      perPage: 100,
      maxPages: 10,
      after: afterTimestamp,
      before: options?.before,
      notifyOnSuccess: options?.notifyOnSuccess ?? false
   });