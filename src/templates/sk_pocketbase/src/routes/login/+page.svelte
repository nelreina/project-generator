<script>
	export let form;
	import { enhance } from '$app/forms';
</script>

<form action="?/login" method="post" class="p-5 space-y-5" use:enhance>
	<input class="input" type="text" name="username" placeholder="Username" />
	<input class="input" type="password" name="password" placeholder="Password" />
	<button class="btn variant-filled-primary" type="submit">Login</button>
</form>

<div>
	{#if form}
		<pre>{JSON.stringify(form, null, 2)}</pre>
	{/if}
</div>
