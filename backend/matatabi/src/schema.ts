import { integer, sqliteTable, text, numeric } from 'drizzle-orm/sqlite-core';

export const places = sqliteTable('place', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	latitude: numeric('latitude').notNull(),
	longitude: numeric('longitude').notNull(),
	description: text('description').notNull(),
	url: text('url').notNull(),
});

export const users = sqliteTable('user', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	authId: text('auth_id').notNull(),
});
