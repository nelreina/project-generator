<script>
	// import { browser } from '$app/environment';

	import { gatherInfo } from '$lib/utils/gatherInfo.js';
	import { onMount } from 'svelte';
	export let token;
	export let userId;

	onMount(async () => {
		// if (!browser) return;
		let info = await await gatherInfo();
		try {
			const resp = await fetch('https://api64.ipify.org?format=json');
			const data = await resp.json();
			info.ip = data.ip;
			info.token = token;
			info.appUserId = userId;
			// POST request to /api/gather-info
			fetch('/api/info/gather-info', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(info)
			});
			// await
		} catch (error) {
			console.log(error.message);
		}
	});
</script>
