<script>
	export let data;
	export let form;
	import { enhance } from '$app/forms';
	import { i18n } from '$lib/stores/i18next.js';
	import AuthenticatorAppLinks from './AuthenticatorAppLinks.svelte';

	const browserSessionToken = data.browserSessionToken;
</script>

<div class="card p-10 variant-glass-tertiary">
	<section class="flex flex-col items-center justify-center gap-5">
		<h3 class="h3">
			{$i18n.t('Please Setup 2nd Factor Authentication')}
		</h3>

		<p>
			{$i18n.t('Download Authenticator app from App Stores and scan this qrcode with your phone')}
		</p>
		<AuthenticatorAppLinks />
		<img src={data.qrcode} alt="qrcode" />
		{#if form?.error}
			<div class="alert variant-filled-error rounded-md">
				<div class="alert-message">
					{$i18n.t(form?.error)}
				</div>
			</div>
		{/if}
		<form action="" method="post" use:enhance>
			<input type="hidden" name="browserSessionToken" value={browserSessionToken} />
			<input type="hidden" name="page" value="otp-settings" />
			<!-- svelte-ignore a11y-autofocus -->
			<input
				class="input"
				name="authCode"
				type="number"
				autofocus
				placeholder="Enter Authenticator Code"
			/>
		</form>
	</section>
</div>
