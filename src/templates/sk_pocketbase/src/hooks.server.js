/** @type {import('./$types').ParamMatcher */
import { redirect } from '@sveltejs/kit';
import { createInstance } from '$lib/pocketbase.js';
import { addToStream } from '$lib/server/redis-client.js';

import { base } from '$app/paths';
const OTP_ENABLED = process.env['OTP_ENABLED'];

import { getSessionUser } from './lib/server/sessions';
import { checkOtp } from './lib/server/otp';

export const handle = async ({ event, resolve }) => {
	const pb = createInstance();
	const session = await getSessionUser(event.cookies);
	const { user, token } = session || {};
	event.locals.user = user;
	if (
		event.url.pathname.startsWith(`${base}/app`)
		// ||
		// event.url.pathname.startsWith(`${base}/auth`)
	) {
		if (!user) {
			throw redirect(303, `${base}/login`);
		} else {
			if (user.browserSessionToken) {
				// addToStream('navigate-to', user.browserSessionToken, {
				// 	path: event.url.pathname,
				// 	ts: Date.now(),
				// 	appUserId: user.id
				// });
			}
			await checkOtp(user, token, event);
		}
	}

	const response = await resolve(event);
	return response;
};
