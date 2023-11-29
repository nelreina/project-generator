<script>
	import Profile from './Profile.svelte';

	export let data;
	const browserSessionToken = data.browserSessionToken;
	const user = data.user;
</script>

<div>
	<Profile {user} {browserSessionToken} />
</div>
