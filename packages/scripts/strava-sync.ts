import { eq } from 'drizzle-orm';
import { sendDiscordNotification } from './discord';
import { db, athletes, activities, activityMaps } from '@/db';
import { ensureValidToken, getStoredToken } from './strava-auth';
import {
   getLoggedInAthleteActivities,
   getActivityById
} from '@pkg/strava-client/sdk/client/sdk.gen';
import type {
   SummaryActivity,
   DetailedActivity
} from '@pkg/strava-client/sdk/client/types.gen';

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

/**
 * Fetch detailed activity data from Strava API
 */
const fetchDetailedActivity = async (
   activityId: number,
   token: string
): Promise<DetailedActivity | null> => {
   try {
      const response = await getActivityById({
         path: { id: activityId },
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return response.data ?? null;
   } catch (error) {
      console.error(`Failed to fetch detailed activity ${activityId}:`, error);
      return null;
   }
};

const upsertActivity = async (
   activity: SummaryActivity | DetailedActivity,
   athleteId: number,
   detailedData?: DetailedActivity
) => {
   // Use detailed data if provided, otherwise use the activity data
   const activityData = detailedData ?? activity;

   const data = {
      id: activityData.id!,
      athleteId,
      externalId: activityData.external_id ?? null,
      uploadId: activityData.upload_id ?? null,
      uploadIdStr: activityData.upload_id_str ?? null,
      name: activityData.name!,
      type: activityData.type ?? null,
      sportType: activityData.sport_type ?? null,
      workoutType: activityData.workout_type ?? null,
      distance: activityData.distance ?? null,
      movingTime: activityData.moving_time ?? null,
      elapsedTime: activityData.elapsed_time ?? null,
      totalElevationGain: activityData.total_elevation_gain ?? null,
      elevHigh: (activityData as any).elev_high ?? null,
      elevLow: (activityData as any).elev_low ?? null,
      averageSpeed: activityData.average_speed ?? null,
      maxSpeed: activityData.max_speed ?? null,
      averageHeartrate: (activityData as any).average_heartrate ?? null,
      maxHeartrate: (activityData as any).max_heartrate ?? null,
      kilojoules: activityData.kilojoules ?? null,
      averageWatts: activityData.average_watts ?? null,
      maxWatts: (activityData as any).max_watts ?? null,
      weightedAverageWatts: activityData.weighted_average_watts ?? null,
      deviceWatts: activityData.device_watts ?? null,
      calories: (activityData as any).calories ?? null,
      startDate: activityData.start_date!,
      startDateLocal: activityData.start_date_local!,
      timezone: activityData.timezone ?? null,
      startLatlng: activityData.start_latlng ?? null,
      endLatlng: activityData.end_latlng ?? null,
      achievementCount: activityData.achievement_count ?? 0,
      kudosCount: activityData.kudos_count ?? 0,
      commentCount: activityData.comment_count ?? 0,
      athleteCount: activityData.athlete_count ?? 1,
      photoCount: activityData.photo_count ?? 0,
      totalPhotoCount: (activityData as any).total_photo_count ?? 0,
      trainer: activityData.trainer ?? false,
      commute: activityData.commute ?? false,
      manual: activityData.manual ?? false,
      private: activityData.private ?? false,
      flagged: activityData.flagged ?? false,
      hasKudoed: (activityData as any).has_kudoed ?? false,
      hideFromHome: (activityData as any).hide_from_home ?? false,
      gearId: activityData.gear_id ?? null,
      description: (activityData as any).description ?? null,
      photos: (activityData as any).photos ?? null
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
      fetchDetailedData?: boolean; // Fetch detailed data for all activities
      fetchDetailedForNew?: boolean; // Fetch detailed data only for new activities
   } = {}
): Promise<SyncResult> => {
   const {
      perPage = 30,
      maxPages = 3,
      notifyOnSuccess = false,
      after,
      before,
      fetchDetailedData = false,
      fetchDetailedForNew = true // Default: fetch details only for new activities
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
         `Strava Sync Failed\n\nError: ${result.errors.join(', ')}\nTime: ${new Date().toLocaleString()}`,
         'Strava Sync'
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

         // Determine if we should fetch detailed data
         let detailedActivity: DetailedActivity | null = null;
         const shouldFetchDetailed = fetchDetailedData || fetchDetailedForNew;

         if (shouldFetchDetailed) {
            // Check if activity exists to determine if it's new
            const existing = await db
               .select()
               .from(activities)
               .where(eq(activities.id, activity.id))
               .get();

            const isNew = !existing;

            // Fetch detailed data if:
            // 1. fetchDetailedData is true (always fetch), OR
            // 2. fetchDetailedForNew is true AND it's a new activity
            if (fetchDetailedData || (fetchDetailedForNew && isNew)) {
               detailedActivity = await fetchDetailedActivity(
                  activity.id,
                  token
               );

               if (!detailedActivity) {
                  console.warn(
                     `Failed to fetch detailed data for activity ${activity.id}, using summary data`
                  );
               }
            }
         }

         const isNew = await upsertActivity(
            activity,
            storedToken.athleteId,
            detailedActivity ?? undefined
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
         `Strava Sync Complete\n\nNew activities: ${result.newActivities}\nUpdated activities: ${result.updatedActivities}\nTotal processed: ${result.totalProcessed}\nTime: ${new Date().toLocaleString()}`,
         'Strava Sync'
      ).catch(() => {});
   }

   if (result.errors.length > 0) {
      console.error('Sync completed with errors:', result.errors);
   }

   return result;
};

/**
 * Quick sync - fetches recent activities with detailed data for new ones only
 */
export const quickSync = () =>
   syncStravaActivities({
      perPage: 30,
      maxPages: 1,
      notifyOnSuccess: false,
      fetchDetailedForNew: true
   });

/**
 * Full sync - fetches all activities with detailed data for all
 * Use this to backfill detailed data for existing activities
 */
export const fullSync = () =>
   syncStravaActivities({
      perPage: 100,
      maxPages: 10,
      notifyOnSuccess: true,
      fetchDetailedData: true // Fetch detailed data for ALL activities
   });

/**
 * Sync after a specific timestamp - fetches detailed data for new activities
 */
export const syncAfter = (
   afterTimestamp: number,
   options?: {
      before?: number;
      notifyOnSuccess?: boolean;
      fetchDetailedData?: boolean;
   }
) =>
   syncStravaActivities({
      perPage: 100,
      maxPages: 10,
      after: afterTimestamp,
      before: options?.before,
      notifyOnSuccess: options?.notifyOnSuccess ?? false,
      fetchDetailedData: options?.fetchDetailedData ?? false,
      fetchDetailedForNew: true
   });
