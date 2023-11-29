import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
console.log('LOG:  ~ file: pocketbase.js:2 ~ PUBLIC_POCKETBASE_URL:', PUBLIC_POCKETBASE_URL);
import PocketBase from 'pocketbase';

export function createInstance() {
	return new PocketBase(PUBLIC_POCKETBASE_URL);
}

export const pb = createInstance();
