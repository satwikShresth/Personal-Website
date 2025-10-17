import { sql } from 'drizzle-orm';
import {
   text,
   integer,
   real,
   sqliteTable,
   index
} from 'drizzle-orm/sqlite-core';

/**
 * Athletes table - stores basic athlete information
 * Normalized to avoid duplication across activities
 */
export const athletes = sqliteTable('athletes', {
   id: integer('id').primaryKey(), // Strava athlete ID
   createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
   updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`)
});

/**
 * Main activities table - stores all activity data from Strava
 * Optimized for common query patterns:
 * - Filtering by athlete
 * - Filtering by date range
 * - Filtering by activity type
 * - Sorting by various metrics
 */
export const activities = sqliteTable(
   'activities',
   {
      id: integer('id').primaryKey(),
      athleteId: integer('athlete_id')
         .notNull()
         .references(() => athletes.id, { onDelete: 'cascade' }),
      externalId: text('external_id'),
      uploadId: integer('upload_id'),
      uploadIdStr: text('upload_id_str'),

      name: text('name').notNull(),
      type: text('type'),
      sportType: text('sport_type'),
      workoutType: integer('workout_type'),

      // Distance and time metrics (stored in base units: meters and seconds)
      distance: real('distance'), // meters
      movingTime: integer('moving_time'), // seconds
      elapsedTime: integer('elapsed_time'), // seconds

      // Elevation metrics (stored in meters)
      totalElevationGain: real('total_elevation_gain'), // meters
      elevHigh: real('elev_high'), // meters
      elevLow: real('elev_low'), // meters

      // Speed metrics (stored in meters per second)
      averageSpeed: real('average_speed'), // m/s
      maxSpeed: real('max_speed'), // m/s

      // Heart rate metrics (beats per minute)
      averageHeartrate: real('average_heartrate'), // bpm
      maxHeartrate: real('max_heartrate'), // bpm

      // Power metrics (for cycling activities)
      kilojoules: real('kilojoules'),
      averageWatts: real('average_watts'),
      maxWatts: real('max_watts'),
      weightedAverageWatts: real('weighted_average_watts'),
      deviceWatts: integer('device_watts', { mode: 'boolean' }), // boolean: from power meter or estimated

      // Date and time information
      startDate: text('start_date').notNull(), // ISO 8601 format
      startDateLocal: text('start_date_local').notNull(), // ISO 8601 format in local timezone
      timezone: text('timezone'),

      // Geographic coordinates (stored as JSON for efficiency)
      // Format: [latitude, longitude] or null
      startLatlng: text('start_latlng', { mode: 'json' }).$type<
         [number, number] | null
      >(),
      endLatlng: text('end_latlng', { mode: 'json' }).$type<
         [number, number] | null
      >(),

      // Social metrics
      achievementCount: integer('achievement_count').default(0),
      kudosCount: integer('kudos_count').default(0),
      commentCount: integer('comment_count').default(0),
      athleteCount: integer('athlete_count').default(1),
      photoCount: integer('photo_count').default(0),
      totalPhotoCount: integer('total_photo_count').default(0),

      // Boolean flags
      trainer: integer('trainer', { mode: 'boolean' }).default(false),
      commute: integer('commute', { mode: 'boolean' }).default(false),
      manual: integer('manual', { mode: 'boolean' }).default(false),
      private: integer('private', { mode: 'boolean' }).default(false),
      flagged: integer('flagged', { mode: 'boolean' }).default(false),
      hasKudoed: integer('has_kudoed', { mode: 'boolean' }).default(false),
      hideFromHome: integer('hide_from_home', { mode: 'boolean' }).default(
         false
      ),

      // Equipment
      gearId: text('gear_id'),

      // Timestamps for record keeping
      createdAt: integer('created_at', { mode: 'timestamp' })
         .notNull()
         .default(sql`(unixepoch())`),
      updatedAt: integer('updated_at', { mode: 'timestamp' })
         .notNull()
         .default(sql`(unixepoch())`)
   },
   table => [
      index('activities_athlete_idx').on(table.athleteId),
      index('activities_start_date_idx').on(table.startDate),
      index('activities_athlete_date_idx').on(table.athleteId, table.startDate),
      index('activities_type_idx').on(table.type),
      index('activities_sport_type_idx').on(table.sportType)
   ]
);

/**
 * Activity maps table - stores polyline data for rendering activity routes
 * Separated from main activities table because:
 * 1. Polyline data can be very large (thousands of characters)
 * 2. Not needed for most queries (list views, stats, etc.)
 * 3. Improves performance by keeping activities table smaller
 */
export const activityMaps = sqliteTable(
   'activity_maps',
   {
      id: integer('id').primaryKey({ autoIncrement: true }),
      activityId: integer('activity_id')
         .notNull()
         .unique()
         .references(() => activities.id, { onDelete: 'cascade' }),

      // Map identifier from Strava
      mapId: text('map_id'),

      // Polyline encoding of the full route
      // This is a large text field, so we store it separately
      polyline: text('polyline'),

      // Summary polyline (lower resolution, smaller size)
      // Useful for map previews and lightweight displays
      summaryPolyline: text('summary_polyline'),

      createdAt: integer('created_at', { mode: 'timestamp' })
         .notNull()
         .default(sql`(unixepoch())`),
      updatedAt: integer('updated_at', { mode: 'timestamp' })
         .notNull()
         .default(sql`(unixepoch())`)
   },
   table => [index('activity_maps_activity_idx').on(table.activityId)]
);

// Type exports for TypeScript
export type Athlete = typeof athletes.$inferSelect;
export type NewAthlete = typeof athletes.$inferInsert;

export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;

export type ActivityMap = typeof activityMaps.$inferSelect;
export type NewActivityMap = typeof activityMaps.$inferInsert;
