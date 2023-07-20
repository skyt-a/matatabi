CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`auth_id` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE place ADD `user_id` integer;