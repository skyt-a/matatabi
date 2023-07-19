import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { places } from './schema';
import { cors } from 'hono/cors';
import { FlarebaseAuth } from '@marplex/flarebase-auth';
import { getAuth } from './lib/firebase';
import { Env } from './env';

const app = new Hono<{
	Bindings: Env;
}>();

// set middleware

const expiresIn = 60 * 60 * 24 * 5 * 1000;

app.use('*', cors());
app.use('/authed/*', async (c, next) => {
	const auth = new FlarebaseAuth({
		apiKey: c.env.FIREBASE_API_KEY,
		projectId: c.env.FIREBASE_PROJECT_ID,
		privateKey: c.env.FIREBASE_PRIVATE_KEY,
		serviceAccountEmail: c.env.FIREBASE_SERVICE_ACCOUNT_EMAIL,
	});
	const token = c.req.header('Authorization');
	if (!token) {
		return c.json({ error: 'Unauthorized' }, { status: 401 });
	}
	const result = auth.verifySessionCookie(token).catch(null);
	if (!result) {
		return c.json({ error: 'Unauthorized' }, { status: 401 });
	}
	await next();
});
app
	.post('/createUser', async (c) => {
		const { email, password } = await c.req.json!();
		const auth = getAuth(c.env);
		const { token, user } = await auth.signUpWithEmailAndPassword(email, password);
		return c.json({ token, user });
	})
	.post('/login/emailPass', async (c) => {
		const { email, password } = await c.req.json!();
		const auth = getAuth(c.env);
		console.log(c.env);
		const { token, user } = await auth.signInWithEmailAndPassword(email, password);
		return c.json({ token, user });
	})
	.get('/authed/places', async (c) => {
		const db = drizzle(c.env.DB);
		const res = await db.select().from(places).all();
		return c.json(res);
	})
	.post('/authed/places', async (c) => {
		const db = drizzle(c.env.DB);
		const { name, description, url, latitude, longitude } = await c.req.json!();

		const res = await db
			.insert(places)
			.values({
				name,
				description,
				url,
				latitude,
				longitude,
			})
			.returning()
			.get();

		return c.json(res);
	});

export default app;
