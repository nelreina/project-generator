import { deleteSession } from '$lib/server/sessions';
import { addToStream } from '../../../lib/server/redis-client';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies, locals }) => {
		const entry = Object.fromEntries(await request.formData());
		const { browserSessionToken } = entry;
		addToStream('logout', browserSessionToken, {
			appUserId: locals.user?.id
		});
		await deleteSession(cookies);
	}
};
