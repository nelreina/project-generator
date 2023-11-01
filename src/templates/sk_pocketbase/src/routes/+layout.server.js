/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const { user } = locals;
	if (user) {
		return { user };
	} else {
		return {};
	}
	// return { foo: 'bar' };
}
