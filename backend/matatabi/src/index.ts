import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { places, users } from './schema';
import { cors } from 'hono/cors';
import { FlarebaseAuth } from '@marplex/flarebase-auth';
import { getAuth, isFirebaseAuthError, FirebaseAuthError } from './lib/firebase';
import { Env } from './env';
import { HTTPException } from 'hono/http-exception';
import { eq } from 'drizzle-orm';

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
	const result = auth.verifyIdToken(token).catch(null);
	if (!result) {
		return c.json({ error: 'Unauthorized' }, { status: 401 });
	}
	await next();
});
app
	.post('/createUser', async (c) => {
		const { email, password, name } = await c.req.json!();
		const auth = getAuth(c.env);
		const res = await auth.signUpWithEmailAndPassword(email, password).catch((reason) => ({ isError: true, reason } as FirebaseAuthError));
		if (isFirebaseAuthError(res)) {
			throw new HTTPException(400, { message: res.reason });
		}
		const { token, user } = res;
		const db = drizzle(c.env.DB);
		await db.insert(users).values({ name, email, authId: user.localId }).get();
		return c.json({ token, user });
	})
	.post('/login/emailPass', async (c) => {
		const { email, password } = await c.req.json!();
		const auth = getAuth(c.env);
		const res = await auth.signInWithEmailAndPassword(email, password).catch((reason) => ({ isError: true, reason } as FirebaseAuthError));
		if (isFirebaseAuthError(res)) {
			throw new HTTPException(400, { message: res.reason });
		}
		const db = drizzle(c.env.DB);
		const { token, user } = res;
		console.log(user);
		const userInfo = await db.select().from(users).where(eq(users.authId, user.localId)).get();
		if (!userInfo) {
			throw new HTTPException(400, { message: 'User not found' });
		}
		return c.json({ token, user, userInfo });
	})
	.post('/verifyToken', async (c) => {
		const target = await c.req.json!();
		const { token } = target;
		console.log(token, target);
		const auth = getAuth(c.env);
		try {
			const result = await auth.verifyIdToken(token).catch(null);
			return c.json(result);
		} catch (e) {
			throw new HTTPException(401, { message: 'Unauthorized' });
		}
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
