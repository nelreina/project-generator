import PocketBase from 'pocketbase';
import 'dotenv/config';
import { building } from '$app/environment';
import logger from '$lib/server/logger.js';

const POCKETBASE_URL = process.env['POCKETBASE_URL'];
const POCKETBASE_ADMIN = process.env['POCKETBASE_ADMIN'];
const POCKETBASE_PASSWORD = process.env['POCKETBASE_ADMIN_PASSWORD'];

function createInstance() {
	return new PocketBase(POCKETBASE_URL);
}

const pb = createInstance();
if (POCKETBASE_ADMIN === undefined || POCKETBASE_PASSWORD === undefined) {
	// skip authentication
	logger.warn('Pocketbase admin credentials not provided.');
} else {
	try {
		if (!building) {
			logger.info('🔑 Authenticating PocketBase admin...');
			await pb.admins.authWithPassword(POCKETBASE_ADMIN, POCKETBASE_PASSWORD);
			logger.info('✅ PocketBase admin authenticated for admin user: ' + POCKETBASE_ADMIN);
		}
		// schedule.scheduleJob(RESET_SCHEDULE, resetCalculations);
	} catch (error) {
		logger.error('❗️ PocketBase admin authentication failed:  ' + error.message);
	}
}

export const pbAdmin = pb;
