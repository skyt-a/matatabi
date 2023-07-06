import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
	schema: './src/schema.ts',
	out: './migrations',
	driver: 'turso',
	breakpoints: false,
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: '',
	},
} satisfies Config;
