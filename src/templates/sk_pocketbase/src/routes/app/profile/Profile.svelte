<script>
	export let user = {};
	export let browserSessionToken = '';
</script>

<main>
	<div class="profile-card card variant-glass-tertiary flex flex-col justify-center items-center">
		<div class="avatar">
			<!-- Placeholder avatar (you can replace this with an actual image) -->
			<img src="https://via.placeholder.com/100" alt="Avatar Placeholder" />
		</div>
		<h2 class="text-3xl font-bold mb-2">{user.name}</h2>
		<p class="text-gray-600 text-sm mb-2">@{user.username}</p>
		<p class="text-gray-500 text-sm">{user.email}</p>
		<form action="" method="post" class="mt-5">
			<input type="hidden" name="browserSessionToken" value={browserSessionToken} />
			<button class="btn variant-filled-primary"> Logout </button>
		</form>
	</div>
</main>

<style>
	/* Center content on the page */
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80vh;
	}

	/* Profile card styling */
	.profile-card {
		max-width: 400px;
		padding: 20px;
		/* border: 1px solid #ddd; */
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	/* Avatar styling */
	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 20px;
	}
</style>
