import { decodeToken } from '$lib/server/firebase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token') || '';
	const decodedToken = await decodeToken(token);
	if (decodedToken) {
		const { uid, name, email, picture } = decodedToken;
		event.locals.userSession = { uid, name, email, picture };
	}

	const response = await resolve(event);

	return response;
};
