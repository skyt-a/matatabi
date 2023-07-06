// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = ({ locals }: Parameters<LayoutServerLoad>[0]) => {
	const { userSession } = locals;
	console.log(userSession);
	return {
		userSession
	};
};
