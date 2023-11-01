import { redirect } from '@sveltejs/kit';
import { redirectIfLoggedIn } from '../../lib/utils.js';

export const load = async ({ locals, route }) => {
	const { user } = locals;
	if (!user) throw redirect(302, `/login`);

	if (user.otpSettingCompleted) {
		if (!user.otp && route.id !== '/(auth)/otp') throw redirect(302, `/otp`);
	} else {
		if (!user.otpSettingCompleted && route.id !== '/(auth)/otp-settings') {
			throw redirect(302, `/otp-settings`);
		}
	}

	// redirectIfLoggedIn(user);

	return { title: 'App Layout' };
};
