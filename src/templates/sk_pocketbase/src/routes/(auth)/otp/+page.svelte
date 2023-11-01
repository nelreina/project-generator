<script>
	export let form;
</script>

<div class="flex flex-col gap-5">
	<h3 class="h3">Please Enter Authentication Code</h3>
	<form action="" method="post">
		<input class="input" name="authCode" type="text" placeholder="Enter Authenticator Code" />
	</form>
	{#if form?.error}
		<p class="alert variant-ghost-error">
			{form.message}
		</p>
	{/if}
</div>
