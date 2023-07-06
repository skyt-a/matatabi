import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { places } from './schema';

const app = new Hono(); // ①
app
	.get('/places', async (c) => {
		const db = drizzle(c.env.DB);
		const res = await db.select().from(places).all();
		return c.json(res);
	})
	.post('/places', async (c) => {
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
