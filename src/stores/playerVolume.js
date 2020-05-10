import { writable } from "svelte/store";

// Store factory
const createStore = () => {
	const value = localStorage.volume !== undefined
							? +localStorage.volume 
							: 0.5;

	const { subscribe, set, update } = writable(value);

	return {
    set,
		subscribe
	};
};

export const playerVolume = createStore();