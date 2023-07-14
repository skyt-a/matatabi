import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('token');
	console.log(`${import.meta.env.VITE_API_DOMAIN}/authed/places`);
	const result = await fetch(`${import.meta.env.VITE_API_DOMAIN}/authed/places`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});

	return json(await result.json());
};
