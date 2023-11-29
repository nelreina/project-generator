import { generateQrCode, checkAuthCode } from '$lib/server/otp.js';

const OTP_APP_NAME = process.env['OTP_APP_NAME'];

/** @type {import('./$types').PageLoad} */
export async function load({ locals, parent }) {
	await parent();
	const { user } = locals;
	const qrcode = await generateQrCode(user);
	return {
		qrcode
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: checkAuthCode
};
