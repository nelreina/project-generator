/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	return {
		user: locals.user
	};
}
