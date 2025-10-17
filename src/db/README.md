# Database Schema Documentation

This directory contains the database schema and query utilities for storing Strava activity data.

## Technology Stack

- **Database**: Turso (LibSQL - SQLite-compatible)
- **ORM**: Drizzle ORM
- **Type Safety**: Full TypeScript support with inferred types

## Schema Overview

### Tables

#### `athletes`
Stores basic athlete information. Normalized to prevent duplication across activities.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Strava athlete ID |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Record last update timestamp |

#### `activities`
Main table storing all activity data from Strava. Optimized for common query patterns:
- Filtering by athlete
- Filtering by date range
- Filtering by activity type
- Sorting by various metrics

**Key Fields:**
- **Identifiers**: id, athlete_id, external_id, upload_id
- **Basic Info**: name, type, sport_type, workout_type
- **Metrics**: distance (meters), moving_time (seconds), elapsed_time (seconds)
- **Elevation**: total_elevation_gain, elev_high, elev_low (all in meters)
- **Speed**: average_speed, max_speed (m/s)
- **Power**: kilojoules, average_watts, max_watts, weighted_average_watts
- **Dates**: start_date, start_date_local, timezone
- **Coordinates**: start_latlng, end_latlng (stored as JSON: `[lat, lng]`)
- **Social**: achievement_count, kudos_count, comment_count
- **Flags**: trainer, commute, manual, private, flagged

**Indexes:**
- `activities_athlete_idx` - Fast athlete filtering
- `activities_start_date_idx` - Fast date sorting
- `activities_athlete_date_idx` - Composite index for athlete + date queries
- `activities_type_idx` - Activity type filtering
- `activities_sport_type_idx` - Sport type filtering

#### `activity_maps`
Stores polyline data for rendering activity routes. Separated from main table because:
1. Polyline data can be very large (thousands of characters)
2. Not needed for most queries (list views, stats, etc.)
3. Improves performance by keeping activities table smaller

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK, Auto) | Internal ID |
| activity_id | INTEGER (FK, Unique) | References activities.id |
| map_id | TEXT | Strava map ID |
| polyline | TEXT | Full polyline encoding |
| summary_polyline | TEXT | Lower resolution polyline |

## Usage

### Setup & Migration

```bash
# Generate migration files from schema
bun run db:generate

# Apply migrations to database
bun run db:migrate

# Push schema directly to database (development)
bun run db:push

# Open Drizzle Studio to browse data
bun run db:studio
```

### Query Examples

```typescript
import { upsertActivity, getActivitiesByAthlete, getActivityWithMap } from '@/db/queries';
import type { SummaryActivity } from '@/strava-client/sdk/client/types.gen';

// Insert a single activity from Strava API
const stravaActivity: SummaryActivity = await fetchFromStrava();
await upsertActivity(stravaActivity);

// Get all activities for an athlete
const activities = await getActivitiesByAthlete(123456, {
   limit: 50,
   offset: 0
});

// Get activities in a date range
const runningActivities = await getActivitiesByAthlete(123456, {
   startDate: '2024-01-01',
   endDate: '2024-12-31',
   type: 'Run'
});

// Get activity with map data
const activityWithMap = await getActivityWithMap(98765);
if (activityWithMap?.map?.polyline) {
   // Decode and render polyline
}

// Bulk insert multiple activities
const activities: SummaryActivity[] = await fetchMultipleFromStrava();
const results = await bulkUpsertActivities(activities);
```

### Type Safety

All database types are automatically inferred from the schema:

```typescript
import type { Activity, NewActivity, ActivityMap } from '@/db/schema';

// Activity - full activity record with all fields
// NewActivity - for inserting new activities (optional fields allowed)
// ActivityMap - map data with polylines
```

## Performance Considerations

### Indexes
The schema includes strategic indexes for common query patterns:
- Single column indexes for frequently filtered fields
- Composite indexes for common multi-field queries
- Unique constraints where needed

### Data Storage
- **Coordinates**: Stored as JSON for flexibility (`[lat, lng]`)
- **Polylines**: Separated into dedicated table to keep main table lean
- **Booleans**: Stored as integers (0/1) for SQLite compatibility
- **Timestamps**: Stored as Unix timestamps (integers)
- **Floats**: Stored as REAL type for numeric precision

### Query Optimization Tips
1. Always filter by athlete_id when possible (uses index)
2. Sort by start_date descending for recent activities (uses index)
3. Fetch map data separately when not needed for listing
4. Use pagination (limit/offset) for large datasets
5. Cache frequently accessed data (e.g., recent activities)

## Data Integrity

### Foreign Keys
- `activities.athlete_id` → `athletes.id` (CASCADE DELETE)
- `activity_maps.activity_id` → `activities.id` (CASCADE DELETE)

When an athlete is deleted, all their activities and maps are automatically removed.

### Upserts
The query utilities use upsert operations (`INSERT OR REPLACE`) to handle:
- Initial data sync from Strava
- Updates when activity data changes
- Re-importing without duplicates

## Migration Strategy

When modifying the schema:

1. Update `src/db/schema.ts`
2. Run `bun run db:generate` to create migration
3. Review generated SQL in `drizzle/` directory
4. Apply migration with `bun run db:migrate`
5. Update query utilities if needed
6. Update TypeScript types (auto-inferred)

## Monitoring

Use Drizzle Studio to:
- Browse all tables and data
- Run ad-hoc queries
- Verify data integrity
- Debug issues

```bash
bun run db:studio
```

## Future Enhancements

Potential additions to consider:
- `activity_streams` table for detailed time-series data (heartrate, power, etc.)
- `segments` table for segment efforts
- `gear` table for bike/shoe tracking
- `athlete_stats` table for aggregated statistics
- Full-text search on activity names/descriptions
- Materialized views for common aggregations

