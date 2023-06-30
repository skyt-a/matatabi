import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import admin from 'firebase-admin';

const initializeFirebase = () => {
	if (!admin.apps.length) {
		const serviceAccount = JSON.parse(import.meta.env.VITE_PUBLIC_ADMIN_SECRET);
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount)
		});
	}
};

export const decodeToken = async (token: string): Promise<DecodedIdToken | null> => {
	if (!token || token === 'null' || token === 'undefined') return null;
	try {
		initializeFirebase();
		return await admin.auth().verifyIdToken(token);
	} catch (err) {
		return null;
	}
};
