import { client as redis } from './redis-client.js';
import { redirect } from '@sveltejs/kit';

import { base } from '$app/paths';
const SESSION_EXPIRED = process.env['SESSION_EXPIRED'];
const cookieName = 'auth';

export const saveSession = async (token, authUser) => {
	await redis.set(token, JSON.stringify(authUser)); // 1 week
	await redis.expire(token, SESSION_EXPIRED);
};

export const createSession = async (authUser, cookies) => {
	// Use node crypto to generate a random token
	const token = crypto.randomUUID();
	await saveSession(token, authUser);
	// const token = Math.random().toString(36).slice(2);
	cookies.set(cookieName, token, {
		httponly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 86400, // 1 day
		// Secure when in production

		secure: import.meta.env.PROD ? true : false
	});
};

export const getToken = (cookies) => {
	return cookies.get(cookieName);
};

export const deleteSession = async (cookies) => {
	// Delete token from redis
	const token = getToken(cookies);
	await redis.del(token);
	// Delete cookie
	cookies.set(cookieName, '', {
		httponly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 0,
		// Secure when in production

		secure: import.meta.env.PROD ? true : false
	});
	throw redirect(303, `${base}/login`);
};

export const getSessionUser = async (cookies) => {
	const token = getToken(cookies);
	if (!token) return;
	const user = await redis.get(token);
	if (!user) {
		await deleteSession(cookies);
		return;
	}
	return { token, user: JSON.parse(user) };
};
