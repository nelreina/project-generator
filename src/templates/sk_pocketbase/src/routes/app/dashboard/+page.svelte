<script>
	export let data;
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	const flash = getFlash(page);
	const toastStore = getToastStore();

	$: {
		if ($flash) {
			toastStore.trigger({
				message: $flash.message,
				timeout: 5000,
				background: 'variant-ringed-success'
			});
		}
	}
</script>

<h1 class="text-3xl">Dashboard</h1>
<div>
	<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
