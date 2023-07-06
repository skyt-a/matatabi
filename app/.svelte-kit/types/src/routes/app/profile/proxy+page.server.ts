// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
	const { userSession } = locals;

	if (!userSession) {
		throw redirect(302, '/login?referrer=/profile');
	}

	return {
		userSession
	};
};
