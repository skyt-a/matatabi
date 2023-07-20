import { FlarebaseAuth } from '@marplex/flarebase-auth';
import { Env } from '../../env';

export const getAuth = ({ FIREBASE_API_KEY, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, FIREBASE_SERVICE_ACCOUNT_EMAIL }: Env) =>
	new FlarebaseAuth({
		apiKey: FIREBASE_API_KEY,
		projectId: FIREBASE_PROJECT_ID,
		privateKey: FIREBASE_PRIVATE_KEY,
		serviceAccountEmail: FIREBASE_SERVICE_ACCOUNT_EMAIL,
	});

type FirebaseAuthError = {
	isError: true;
	reason: string;
};

export const isFirebaseAuthError = (target: any): target is FirebaseAuthError =>
	target.hasOwnProperty('isError') && target.isError === true;
