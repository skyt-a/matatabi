import { decodeToken } from '$lib/server/firebase';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const decodedToken = await decodeToken(cookies.get('token') || '');
	if (!decodedToken) {
		throw error(401, 'Not logged in');
	}
	const uid = decodedToken.uid;
	return new Response(JSON.stringify(uid));
};
