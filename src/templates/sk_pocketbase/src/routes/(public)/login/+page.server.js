import { redirect } from 'sveltekit-flash-message/server';
import { createSession } from '$lib/server/sessions';
import { base } from '$app/paths';
import { pbAdmin } from '$lib/server/pb-admin';
import logger from '$lib/server/logger';
import { fail } from '@sveltejs/kit';
import { addToStream } from '$lib/server/redis-client.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	if (event.locals.user)
		throw redirect(
			303,
			`${base}/app/dashboard`,
			{ message: 'Already Logged in!', type: 'success' },
			event
		);
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		// Get form data
		const { request, cookies } = event;
		const formData = await request.formData();
		const entry = Object.fromEntries(formData);
		const { browserSessionToken } = entry;
		if (!entry.username || !entry.password) {
			const error = 'Username and Password are required!';
			addToStream('login-error', browserSessionToken, {
				error,
				username: entry.username
			});
			return fail(400, {
				error,
				username: entry.username
			});
		}

		const { username, password } = entry;
		// Login the user
		try {
			logger.info(`🔑 Authenticating ${entry.username} ...`);
			const user = await pbAdmin.collection('users').authWithPassword(username, password);
			const authData = { ...user.record, token: user.token, browserSessionToken };
			await createSession(authData, cookies);
			addToStream('login-success', browserSessionToken, {
				appUserId: authData.id
			});
			logger.info(`✅ User authenticated: ${entry.username}`);
		} catch (error) {
			logger.error(`❗️ User authentication failed: ${entry.username}`);
			addToStream('login-error', browserSessionToken, {
				error: error.message,
				username: entry.username
			});
			return fail(400, {
				error: error.message,
				username: entry.username
			});
		}

		// Generate random token

		const message = { type: 'success', message: 'Sign in successful!' };
		throw redirect(303, `${base}/app/dashboard`, message, event);
	}
};
