import { FlarebaseAuth } from '@marplex/flarebase-auth';
import { FIREBASE_API_KEY, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, FIREBASE_SERVICE_ACCOUNT_EMAIL } from '../../env';

export const auth = new FlarebaseAuth({
	apiKey: FIREBASE_API_KEY,
	projectId: FIREBASE_PROJECT_ID,
	privateKey: FIREBASE_PRIVATE_KEY,
	serviceAccountEmail: FIREBASE_SERVICE_ACCOUNT_EMAIL,
});
