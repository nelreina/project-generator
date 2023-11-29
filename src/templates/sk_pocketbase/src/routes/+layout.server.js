/** @type {import('./$types').PageLoad} */
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async ({ locals }) => {
	let browserSessionToken = crypto.randomUUID();
	if (locals.user) {
		browserSessionToken = locals.user.browserSessionToken || browserSessionToken;
	}
	return {
		browserSessionToken,
		...locals
	};
});
