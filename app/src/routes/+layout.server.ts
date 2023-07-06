import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	const { userSession } = locals;
	console.log(userSession);
	return {
		userSession
	};
};
