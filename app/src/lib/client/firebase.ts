import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signOut as _signOut,
	GoogleAuthProvider,
	onIdTokenChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword
} from 'firebase/auth';
import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';

const setToken = async (token: string) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({ token })
	};

	await fetch('/api/token', options);
};

const listenForAuthChanges = () => {
	const auth = getAuth(app);

	onIdTokenChanged(
		auth,
		async (user) => {
			if (user) {
				const token = await user.getIdToken();
				await setToken(token);
			} else {
				await setToken('');
			}
			await invalidateAll();
		},
		(err) => console.error(err.message)
	);
};

export let app: FirebaseApp;
export const initializeFirebase = (options: FirebaseOptions) => {
	if (!browser) {
		throw new Error("Can't use the Firebase client on the server.");
	}
	if (!app) {
		app = initializeApp(options);
		listenForAuthChanges();
	}
};

const providerFor = (name: string) => {
	switch (name) {
		case 'google':
			return new GoogleAuthProvider();
		default:
			throw 'unknown provider ' + name;
	}
};

export const signInWith = async (name: string) => {
	const auth = getAuth(app);
	const provider = providerFor(name);
	await signInWithRedirect(auth, provider);
};

export const createUserWithEmailAndPass = async (email: string, password: string) => {
	const auth = getAuth(app);
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPass = async (email: string, password: string) => {
	const auth = getAuth(app);
	const result = await signInWithEmailAndPassword(auth, email, password);
	return result;
};

export const signOut = async () => {
	const auth = getAuth(app);
	await _signOut(auth);
};
