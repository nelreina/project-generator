import { readable } from 'svelte/store';
import { pb } from '$lib/pocketbase';
import { browser } from '$app/environment';

export const getPbRealtimeDataStore = (data, collection, recordId = 'id') => {
	if (!browser) {
		return readable(data, () => {}); // noop
	}
	const highlightTime = 1000;
	const findAndUpdateSession = (sessions, record, highlight) =>
		sessions.map((session) => {
			if (session[recordId] === record[recordId]) {
				return { ...record, highlight };
			}
			return session;
		});

	return readable(data, (set) => {
		let sessions = data;
		pb.collection(collection).subscribe('*', (coll) => {
			const { action, record } = coll;
			switch (action) {
				case 'create':
					sessions = [{ ...record, highlight: true }, ...sessions];
					setTimeout(() => {
						sessions = findAndUpdateSession(sessions, record, false);
						set(sessions);
					}, highlightTime);
					break;

				case 'update':
					console.log('update');
					sessions = findAndUpdateSession(sessions, record, true);
					setTimeout(() => {
						sessions = findAndUpdateSession(sessions, record, false);
						set(sessions);
					}, highlightTime);
					break;

				case 'delete':
					sessions = sessions.filter((s) => s[recordId] !== record[recordId]);
					break;

				default:
					break;
			}

			set(sessions);
		});
		return () => {
			pb.collection(collection).unsubscribe();
		}; // noop
	});
};
