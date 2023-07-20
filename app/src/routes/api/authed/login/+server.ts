import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/login/emailPass`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(await request.json())
	}).catch(null);
	const resJson = await res.json();
	const idToken: string = resJson.token.idToken || '';
	if (idToken) {
		cookies.set('token', idToken, {
			path: '/',
			httpOnly: true
		});
	} else {
		cookies.delete('token', { path: '/' });
		throw error(401, 'Invalid email or password');
	}
	return json(resJson);
};
