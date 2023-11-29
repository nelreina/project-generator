/** @type {import('./$types').PageLoad} */
import { pbAdmin } from '$lib/server/pb-admin';
import { serializePOJO } from '$lib/utils';

export async function load() {
	const records = await pbAdmin.collection('app_sessions').getList(1, 50, {
		sort: '-created'
	});
	const sessions = serializePOJO(records.items);

	return {
		sessions
	};
}
