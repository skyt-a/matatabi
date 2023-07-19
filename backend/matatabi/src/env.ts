import { parseEnv } from 'znv';
import { z } from 'zod';

export const {
	DATABASE_URL,
	DATABASE_AUTH_TOKEN,
	FIREBASE_API_KEY,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_SERVICE_ACCOUNT_EMAIL,
	FIREBASE_PROJECT_ID,
} = parseEnv(process.env, {
	DATABASE_URL: z.string().min(1),
	DATABASE_AUTH_TOKEN: z.string().min(1).optional(),
	FIREBASE_API_KEY: z.string().min(1),
	FIREBASE_PRIVATE_KEY: z.string().min(1),
	FIREBASE_SERVICE_ACCOUNT_EMAIL: z.string().min(1),
	FIREBASE_PROJECT_ID: z.string().min(1),
});

export type Env = {
	DATABASE_URL: string;
	DATABASE_AUTH_TOKEN: string;
	FIREBASE_API_KEY: string;
	FIREBASE_PRIVATE_KEY: string;
	FIREBASE_SERVICE_ACCOUNT_EMAIL: string;
	FIREBASE_PROJECT_ID: string;
};
