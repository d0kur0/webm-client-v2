import { writable } from "svelte/store";

// Store factory
const createStore = () => {
	const { subscribe, set, update } = writable(0.5);

	return {
    set,
		subscribe
	};
};

export const playerVolume = createStore();