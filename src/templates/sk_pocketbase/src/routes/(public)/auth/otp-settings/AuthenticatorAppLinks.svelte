<script>
	import { base } from '$app/paths';

	// export let style = "";
</script>

<main class="flex items-center justify-center">
	<div class="text-center">
		<div class="flex space-x-4">
			<!-- Microsoft Authenticator on Google Play -->
			<a
				href="https://play.google.com/store/apps/details?id=com.azure.authenticator"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-block"
			>
				<img src="{base}/google-play.png" alt="Get it on Google Play" class="h-12" />
			</a>

			<!-- Microsoft Authenticator on the App Store -->
			<a
				href="https://apps.apple.com/us/app/microsoft-authenticator/id983156458"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-block"
			>
				<img src="{base}/apple-app-store.png" alt="Download on the App Store" class="h-12" />
			</a>
		</div>
	</div>
</main>
