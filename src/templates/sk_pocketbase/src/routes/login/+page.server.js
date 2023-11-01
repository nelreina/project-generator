import { fail, redirect } from '@sveltejs/kit';
import { redirectIfLoggedIn } from '$lib/utils';
/** @type {import('./$types').PageLoad} */
// import { pb } from '$lib/pocketbase';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const { user } = locals;
	if (user) redirectIfLoggedIn(user);
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals }) => {
		const { pb } = locals;
		const data = Object.fromEntries(await request.formData());
		let authData;

		try {
			const { username, password } = data;
			// Login the user
			authData = await pb.collection('users').authWithPassword(username, password);
		} catch (error) {
			console.log('Unable to login: ', error.message);
			return fail(400, {
				error: true,
				message: error.message
			});
		}

		redirectIfLoggedIn(authData.record);

		// throw redirect(303, `/`);
	}
};
