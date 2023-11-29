import { json } from '@sveltejs/kit';
import { getTranslations } from '$lib/server/rest-client.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	try {
		const lang = params.lang;
		const translations = await getTranslations(lang);

		return json(translations);
	} catch (error) {
		console.log('LOG:  ~ file: +server.js:11 ~ GET ~ error:', error);
		return json({});
	}
}
