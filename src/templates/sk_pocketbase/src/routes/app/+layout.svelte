<script>
	import '../../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	import { base } from '$app/paths';

	export let data;
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toast />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href={base} class="flex items-center gap-3">
					<img src="{base}/logo.png" alt="" class="w-12 h-12 rounded" />

					<strong class="text-xl uppercase"> Auth simple </strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="{base}/app/dashboard"> Dashboard </a>
				<a class="btn btn-sm variant-ghost-surface" href="{base}/app/protected"> Protected </a>
				<a class="btn btn-sm variant-ghost-tertiary" href="{base}/app/profile">
					{data.user?.name}
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="flex flex-col justify-center items-center">
		<div class="w-full lg:w-4/5 xl:w-4/5 p-5">
			<slot />
		</div>
	</div>
</AppShell>
