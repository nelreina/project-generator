<script>
	import '../../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { PUBLIC_BACKGROUND_IMAGE } from '$env/static/public';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<!-- Page Route Content -->
	<main
		class="bg-cover bg-center bg-fixed h-full mx-auto flex justify-center items-center"
		style="background-image:linear-gradient(rgba(255,255,255,.2), rgba(255,255,255,.3)), url('{PUBLIC_BACKGROUND_IMAGE}')"
	>
		<div class=" container h-full mx-auto flex justify-center items-center">
			<slot />
		</div>
	</main>
</AppShell>
