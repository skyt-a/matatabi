import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { userSession } = locals;

	if (!userSession) {
		throw redirect(302, '/login?referrer=/profile');
	}

	return {
		userSession
	};
};
