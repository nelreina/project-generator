<script>
	export let data;
	const sessions = data.sessions;
	import { getPbRealtimeDataStore } from '$lib/stores/pb-store';

	let rt_sessions = getPbRealtimeDataStore(sessions, 'app_sessions');
</script>

<h1 class="text-3xl">App Sessions</h1>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead class="sticky-header">
			<tr>
				<th>Created</th>
				<th>Session</th>
				<th>User</th>
				<th>event</th>
				<th>Device</th>
				<th>Os</th>
				<th>Browser</th>
				<th>Country</th>
			</tr>
		</thead>
		<tbody>
			{#each $rt_sessions as row, i}
				<tr class:table-row-checked={row.highlight === true}>
					<td class="no-wrap">{row.created}</td>
					<td class="ellipsis">{row.browserSessionToken}</td>
					<td class="no-wrap">{row.username}</td>
					<td class="no-wrap">{row.event}</td>
					<td class="no-wrap">{row.device}</td>
					<td class="no-wrap">{row.os}</td>
					<td class="no-wrap">{row.browser}</td>
					<td class="no-wrap">{row.countryCode}</td>
					<!-- <td>{JSON.stringify(row.payload)}</td> -->
				</tr>
				<tr>
					<td colspan="4" class="hidden">
						<pre>{JSON.stringify(row, null, 2)}</pre>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="4">No sessions found</td>
				</tr>
			{/each}
		</tbody>
		<!-- <tfoot>
			<tr>
				<th colspan="3">Calculated Total Weight</th>
				<td>{totalWeight}</td>
			</tr>
		</tfoot> -->
	</table>
</div>

<style>
	.no-wrap {
		white-space: nowrap;
	}
	.sticky-header th {
		position: sticky;
		top: 0;
		/* background-color: #f2f2f2; Add background color for the sticky effect */
	}

	.ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 8ch; /* Adjust this value based on your requirement */
	}
</style>
