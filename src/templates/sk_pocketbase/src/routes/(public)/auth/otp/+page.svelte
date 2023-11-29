<script>
	export let form;
	export let data;
	const browserSessionToken = data.browserSessionToken;
	import { enhance } from '$app/forms';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	const flash = getFlash(page);
	const toastStore = getToastStore();

	$: {
		if ($flash) {
			toastStore.trigger({
				message: $flash.message,
				timeout: 10000,
				background: 'variant-ringed-error'
			});
		}
	}
</script>

<div class="card p-10 variant-glass-tertiary">
	<div class="flex flex-col gap-5">
		<h3 class="h3">Please Enter Authentication Code</h3>
		{#if form?.error}
			<div class="alert variant-filled-error rounded-md">
				<div class="alert-message">
					{form?.error}
				</div>
			</div>
		{/if}
		<form action="" method="post" use:enhance>
			<input type="hidden" name="browserSessionToken" value={browserSessionToken} />

			<!-- svelte-ignore a11y-autofocus -->
			<input
				class="input"
				name="authCode"
				type="number"
				autofocus
				placeholder="Enter Authenticator Code"
			/>
		</form>
	</div>
</div>
