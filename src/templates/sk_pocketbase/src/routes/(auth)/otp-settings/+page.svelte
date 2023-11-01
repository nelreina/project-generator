<script>
	export let data;
	export let form;
</script>

<section class="flex flex-col items-center justify-center gap-5">
	<h3 class="h3">Please Setup 2nd Factor Authentication</h3>

	<p>Download Authenticator app from App Stores and scan this qrcode with your phone</p>

	<img src={data.qrcode} alt="qrcode" />

	<form action="" method="post">
		<input class="input" name="authCode" type="text" placeholder="Enter Authenticator Code" />
	</form>
	{#if form?.error}
		<p class="alert variant-ghost-error">
			{form.message}
		</p>
	{/if}
</section>
