import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text, numeric, SQLiteBoolean } from 'drizzle-orm/sqlite-core';

export const places = sqliteTable('place', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	latitude: numeric('latitude').notNull(),
	longitude: numeric('longitude').notNull(),
	description: text('description').notNull(),
	url: text('url').notNull(),
	userId: integer('user_id'),
});

export const users = sqliteTable('user', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	authId: text('auth_id').notNull(),
	isInitialized: integer('is_initialized').notNull().default(0),
});

export const usersRelations = relations(users, ({ one }) => ({
	invitee: one(places, {
		fields: [users.id],
		references: [places.userId],
	}),
}));
