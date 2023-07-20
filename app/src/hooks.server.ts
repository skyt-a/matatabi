import { redirect, type Handle } from '@sveltejs/kit';
import { getContext } from 'svelte';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.url.pathname.startsWith('/app')) {
		return await resolve(event);
	}
	const token = event.cookies.get('token') || '';
	const user = getContext('user');
	const decodedToken = await fetch(`${import.meta.env.VITE_API_DOMAIN}/verifyToken`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ token })
	}).then((res) => res.status === 200 && res.json());
	if (decodedToken) {
		const { uid, name, email, picture } = decodedToken;
		event.locals.userSession = { uid, name, email, picture };
	} else {
		console.log('no token');
		event.cookies.delete('token', { path: '/' });
		throw redirect(303, '/login');
	}

	const response = await resolve(event);

	return response;
};
