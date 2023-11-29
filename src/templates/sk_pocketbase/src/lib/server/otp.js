import { addToStream, client as redis } from './redis-client.js';
import { redirect, fail } from '@sveltejs/kit';
import { redirect as flash_redirect } from 'sveltekit-flash-message/server';

import { authenticator } from 'otplib';
import QRCode from 'qrcode';

import { base } from '$app/paths';
import { getToken, saveSession } from './sessions.js';
const OTP_ENABLED = process.env['OTP_ENABLED'];
const OTP_APP_NAME = process.env['OTP_APP_NAME'];
const OTP_SESSION_EXPIRED = process.env['OTP_SESSION_EXPIRED'];

export const checkOtp = async (user, token, event) => {
	if (OTP_ENABLED === 'true') {
		if (await redis.exists(`user:${user.id}:otp-secret`)) {
			// Check if user as
			if (!(await redis.exists(`active:otp:session:${token}`))) {
				event.locals.otpMessage = 'Your OTP Session has expired!';

				throw flash_redirect(
					303,
					`${base}/auth/otp`,
					{
						message: 'Your OTP Session has expired!',
						type: 'error'
					},
					event
				);
			}
		} else {
			throw redirect(303, `${base}/auth/otp-settings`);
		}
	}
};

export const generateQrCode = async (user) => {
	const secret = authenticator.generateSecret();
	// Temporary store secret in redis
	await redis.set(`user:${user.id}:otp-settings`, secret);
	// 5 minutes
	await redis.expire(`user:${user.id}:otp-settings`, 300);

	// Generate authKey for the user
	const authKey = authenticator.keyuri(user.email, OTP_APP_NAME, secret);
	const qrcode = await QRCode.toDataURL(authKey);

	return qrcode;
};

export const saveSecret = async (user, secret) => {
	// Store secret in redis

	await redis.set(`user:${user.id}:otp-secret`, secret);
	await redis.del(`user:${user.id}:otp-settings`);
};

export const checkAuthCode = async ({ locals, request, cookies }) => {
	const { user } = locals;
	const token = getToken(cookies);
	const data = Object.fromEntries(await request.formData());
	const { authCode, page, browserSessionToken } = data;

	const secret = await redis.get(`user:${user.id}:${page || 'otp-secret'}`);

	const isValid = authenticator.check(authCode, secret);
	if (isValid) {
		await saveSecret(user, secret);
		redis.set(`active:otp:session:${token}`, JSON.stringify({ ...user, otp: true }));
		redis.expire(`active:otp:session:${token}`, OTP_SESSION_EXPIRED);
		await saveSession(token, { ...user, otp: true });
		addToStream('otp-success', browserSessionToken, {
			appUserId: user.id,
			page: page || 'otp-secret'
		});
		throw redirect(303, `${base}/app/dashboard`);
	} else {
		addToStream('otp-error', browserSessionToken, {
			error: 'Invalid code! Please try again.',
			page: page || 'otp-secret',
			appUserId: user.id
		});
		return fail(400, {
			error: 'Invalid code! Please try again.'
		});
	}
};
