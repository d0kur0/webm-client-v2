import { writable } from "svelte/store";

// Store factory
const createStore = () => {
	const { subscribe, set, update } = writable(0, function start (set) {
		return () => set(0);
	});

	return {
		set,
		subscribe
	};
};

export const playerCurrentTime = createStore();