<script>
	import { changeLang } from '$lib/stores/i18next.js';
	import { setLanguage, language } from '$lib/stores/language.js';
	import { PUBLIC_TRANSLATIONS_ENABLED } from '$env/static/public';

	const changeLanguage = (lang) => {
		changeLang(lang);
		setLanguage(lang);
	};
</script>

{#if PUBLIC_TRANSLATIONS_ENABLED === 'true'}
	<!-- content here -->
	<div class="w-full flex justify-end p-2 space-x-1 card">
		<button
			class:btn-lang-selected={$language === 'en'}
			class="hover:bg-[#004FC8] hover:text-white px-2 rounded-md"
			on:click={() => changeLanguage('en')}>🇺🇸 EN</button
		>
		<button
			class:btn-lang-selected={$language === 'nl'}
			class="hover:bg-[#004FC8] hover:text-white px-2 rounded-md"
			on:click={() => changeLanguage('nl')}>🇳🇱 NL</button
		>
		<button
			class:btn-lang-selected={$language === 'cw'}
			class="hover:bg-[#004FC8] hover:text-white px-2 rounded-md"
			on:click={() => changeLanguage('cw')}>🇨🇼 PAP</button
		>
		<button
			class:btn-lang-selected={$language === 'es'}
			class="hover:bg-[#004FC8] hover:text-white px-2 rounded-md"
			on:click={() => changeLanguage('es')}>🇪🇸 ES</button
		>
	</div>
{/if}

<style>
	.btn-lang-selected {
		background-color: #004fc8;
		color: white;
		font-size: 1.4em;
	}
</style>
