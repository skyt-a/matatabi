CREATE TABLE `place` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`latitude` numeric NOT NULL,
	`longitude` numeric NOT NULL,
	`description` text NOT NULL,
	`url` text NOT NULL
);
