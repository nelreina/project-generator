/** @type {import('./$types').RequestHandler} */
import { addToStream } from '$lib/server/redis-client.js';
const SERVICE_NAME = process.env['SERVICE_NAME'];

export async function POST({ request, params }) {
	const body = await request.json();
	// console.log('LOG:  ~ file: +server.js:11 ~ POST ~ body', body);
	await addToStream(params.event, body.token, body);
	return new Response();
}
