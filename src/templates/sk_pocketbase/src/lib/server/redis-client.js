import { createClient } from 'redis';
// import { SERVICE } from './constants.js';
import { addToEventLog } from '@nelreina/redis-stream-consumer';
import logger from './logger.js';
import { isObject } from 'lodash-es';
import { building } from '$app/environment';

let url;
const REDIS_HOST = process.env['REDIS_HOST'];
const REDIS_PORT = process.env['REDIS_PORT'] || 6379;
const REDIS_USER = process.env['REDIS_USER'];
const REDIS_PW = process.env['REDIS_PW'];
const STREAM = process.env['STREAM'];
const SERVICE = process.env['SERVICE_NAME'] || 'unknown';

if (REDIS_HOST) {
	url = 'redis://';
	if (REDIS_USER && REDIS_PW) {
		url += `${REDIS_USER}:${REDIS_PW}@`;
	}
	url += `${REDIS_HOST}:${REDIS_PORT}`;
}

export const client = createClient({ url, name: SERVICE });
export const pubsub = client.duplicate();

// Coneect to redis

(async () => {
	if (building) return;
	if (!client.isOpen) await client.connect();

	logger.info(`✅ Connected to redis: ${url}`);
})();

export const addToStream = async (event, aggregateId, payload) => {
	const streamData = {
		streamKeyName: STREAM,
		aggregateId,
		payload,
		event: `${SERVICE}:${event}`,
		serviceName: SERVICE
	};
	await addToEventLog(client, streamData);
};

export const subscribe2RedisChannel = async (channel, callback) => {
	if (!pubsub.isOpen) await pubsub.connect();
	await pubsub.subscribe(channel, (payload) => {
		try {
			callback(JSON.parse(payload));
			// console.log("parsed")
		} catch (error) {
			callback(payload);
		}
	});
	logger.info(`✅ Subscribed to redis channel: ${channel}`);
};

export const publish2RedisChannel = async (channel, payload) => {
	if (!client.isOpen) await client.connect();
	return await client.publish(channel, isObject(payload) ? JSON.stringify(payload) : payload);
};
