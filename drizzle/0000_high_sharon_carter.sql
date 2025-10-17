CREATE TABLE `activities` (
	`id` integer PRIMARY KEY NOT NULL,
	`athlete_id` integer NOT NULL,
	`external_id` text,
	`upload_id` integer,
	`upload_id_str` text,
	`name` text NOT NULL,
	`type` text,
	`sport_type` text,
	`workout_type` integer,
	`distance` real,
	`moving_time` integer,
	`elapsed_time` integer,
	`total_elevation_gain` real,
	`elev_high` real,
	`elev_low` real,
	`average_speed` real,
	`max_speed` real,
	`kilojoules` real,
	`average_watts` real,
	`max_watts` real,
	`weighted_average_watts` real,
	`device_watts` integer,
	`start_date` text NOT NULL,
	`start_date_local` text NOT NULL,
	`timezone` text,
	`start_latlng` text,
	`end_latlng` text,
	`achievement_count` integer DEFAULT 0,
	`kudos_count` integer DEFAULT 0,
	`comment_count` integer DEFAULT 0,
	`athlete_count` integer DEFAULT 1,
	`photo_count` integer DEFAULT 0,
	`total_photo_count` integer DEFAULT 0,
	`trainer` integer DEFAULT false,
	`commute` integer DEFAULT false,
	`manual` integer DEFAULT false,
	`private` integer DEFAULT false,
	`flagged` integer DEFAULT false,
	`has_kudoed` integer DEFAULT false,
	`hide_from_home` integer DEFAULT false,
	`gear_id` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`athlete_id`) REFERENCES `athletes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `activities_athlete_idx` ON `activities` (`athlete_id`);--> statement-breakpoint
CREATE INDEX `activities_start_date_idx` ON `activities` (`start_date`);--> statement-breakpoint
CREATE INDEX `activities_athlete_date_idx` ON `activities` (`athlete_id`,`start_date`);--> statement-breakpoint
CREATE INDEX `activities_type_idx` ON `activities` (`type`);--> statement-breakpoint
CREATE INDEX `activities_sport_type_idx` ON `activities` (`sport_type`);--> statement-breakpoint
CREATE TABLE `activity_maps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`activity_id` integer NOT NULL,
	`map_id` text,
	`polyline` text,
	`summary_polyline` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `activity_maps_activity_id_unique` ON `activity_maps` (`activity_id`);--> statement-breakpoint
CREATE INDEX `activity_maps_activity_idx` ON `activity_maps` (`activity_id`);--> statement-breakpoint
CREATE TABLE `athletes` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
