import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';

const lang = browser ? localStorage.getItem('language') : 'en';

export const language = writable(lang);

language.subscribe((value = 'en') => {
	if (browser) localStorage.setItem('language', value);
});

export const setLanguage = (value) => {
	language.set(value);
};

export const getLanguage = () => {
	return get(language);
};
