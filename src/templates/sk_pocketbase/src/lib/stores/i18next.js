import i18next from 'i18next';
import { createI18nStore } from 'svelte-i18next';
import { getLanguage } from './language.js';
import Backend from 'i18next-http-backend';
import { base } from '$app/paths';
import { page } from '$app/stores';
import { get } from 'svelte/store';

i18next.use(Backend).init({
	lng: getLanguage(),
	fallbackLng: 'en',
	backend: {
		loadPath: `${base}/locales/{{lng}}/{{ns}}`
	},
	interpolation: {
		escapeValue: false // not needed for svelte as it escapes by default
	}
});

export const changeLang = (lang) => {
	const { data } = get(page);
	const payload = {
		token: data.browserSessionToken,
		appUserId: data.user?.id,
		lang
	};
	fetch(`${base}/api/info/change-lang`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	i18next.changeLanguage(lang);
};

export const i18n = createI18nStore(i18next);
