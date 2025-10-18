import { z } from 'zod';
import { os } from '@orpc/server';
import { storeOAuthToken, stravaOAuth } from '@pkg/scripts/strava-auth';
import { db, activities, activityMaps } from '@/db';
import { desc, eq, and, gte, lte } from 'drizzle-orm';
import { env } from '@/env';

export const handleCallback = os
   .route({
      path: '/callback/:key',
      method: 'GET',
      successStatus: 200,
      inputStructure: 'detailed'
   })
   .input(
      z.object({
         params: z.object({
            key: z.string().refine(key => key === env.STRAVA_CALLBACK_KEY, {
               message: 'Invalid callback key'
            })
         }),
         query: z.object({
            code: z.string(),
            scope: z.string().optional(),
            state: z.string().optional(),
            error: z.string().optional()
         })
      })
   )
   .handler(async ({ input }) => {
      const { code, error, scope, state } = input.query;

      if (error === 'access_denied') {
         throw new Error('User denied access to Strava');
      }

      if (!code) {
         throw new Error('Authorization code is required');
      }

      return await stravaOAuth
         .exchangeCode(code)
         .then(async (tokenResponse: any) => {
            await storeOAuthToken(tokenResponse);

            return {
               success: true,
               athleteId: tokenResponse.athlete?.id,
               athlete: tokenResponse.athlete,
               expiresAt: tokenResponse.expires_at,
               scopes: scope?.split(','),
               state: state
            };
         })
         .catch((error: unknown) => {
            throw new Error(
               `Failed to exchange authorization code: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
         });
   });

export const getActivityDates = os
   .route({
      path: '/activity-dates',
      method: 'GET',
      successStatus: 200
   })
   .input(
      z
         .object({
            year: z.number().min(2000).max(2100)
         })
         .catch({ year: new Date().getFullYear() })
   )
   .handler(async ({ input }) => {
      const year = input?.year;
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31T23:59:59`;

      const dates = await db
         .select({
            date: activities.startDateLocal,
            type: activities.type,
            sportType: activities.sportType
         })
         .from(activities)
         .where(
            and(
               gte(activities.startDateLocal, startDate),
               lte(activities.startDateLocal, endDate)
            )
         )
         .orderBy(desc(activities.startDateLocal))
         .all();

      const result: Record<string, { count: number; sportType: string }> = {};

      dates.forEach(val => {
         const date = val.date.split('T')[0];
         const sportType = val.sportType || val.type || 'Unknown';

         if (!result[date]) {
            result[date] = {
               count: 0,
               sportType
            };
         }

         result[date].count++;
      });

      return result;
   });

export const getActivities = os
   .route({
      path: '/activities',
      method: 'GET',
      successStatus: 200
   })
   .input(
      z
         .object({
            year: z.number().min(2000).max(2100).optional(),
            page: z.number().min(1).optional().catch(1),
            perPage: z.number().min(1).max(100).optional().catch(30)
         })
         .catch({ page: 1, perPage: 30 })
   )
   .handler(async ({ input }) => {
      const year = input?.year;
      const page = input?.page ?? 1;
      const perPage = input?.perPage ?? 30;
      const offset = (page - 1) * perPage;

      let query = db.select().from(activities);

      // Apply year filter if provided
      if (year) {
         const startDate = `${year}-01-01`;
         const endDate = `${year}-12-31T23:59:59`;
         query = query.where(
            and(
               gte(activities.startDateLocal, startDate),
               lte(activities.startDateLocal, endDate)
            )
         ) as any;
      }

      const fetchedActivities = await query
         .orderBy(desc(activities.startDateLocal))
         .limit(perPage)
         .offset(offset)
         .all();

      const activitiesWithMaps = await Promise.all(
         fetchedActivities.map(async activity => {
            const map = await db
               .select()
               .from(activityMaps)
               .where(eq(activityMaps.activityId, activity.id))
               .get();

            return { ...activity, map };
         })
      );

      return {
         success: true,
         activities: activitiesWithMaps,
         count: activitiesWithMaps.length,
         page,
         perPage
      };
   });
