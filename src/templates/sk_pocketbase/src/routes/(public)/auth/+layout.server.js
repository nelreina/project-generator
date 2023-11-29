import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (!locals.user) throw redirect(303, `${base}/login`);
}
