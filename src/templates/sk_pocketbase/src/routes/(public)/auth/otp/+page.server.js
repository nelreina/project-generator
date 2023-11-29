import { checkAuthCode } from '$lib/server/otp.js';

/** @type {import('./$types').PageLoad} */
export async function load({ parent, locals }) {
	await parent();
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: checkAuthCode
};
