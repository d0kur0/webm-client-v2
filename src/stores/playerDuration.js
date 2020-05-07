import { writable } from "svelte/store";

// Store factory
const createStore = () => {
	const { subscribe, set, update } = writable(1, function start (set) {
		return () => set(1);
	});

	return {
    set,
		subscribe
	};
};

export const playerDuration = createStore();