<script>
	import { initializeStores } from '@skeletonlabs/skeleton';
	import GatherInfoMation from '../lib/components/GatherInfoMation.svelte';
	export let data;
	const browserSessionToken = data.browserSessionToken;
	const userId = data.user?.id;
	// console.log('LOG:  ~ file: +layout.svelte:7 ~ data:', data);
	initializeStores();
</script>

<GatherInfoMation {userId} token={browserSessionToken} />
<slot><!-- optional fallback --></slot>
