import { writable } from "svelte/store";

const stateStruct = {
  isFullscreen: false
};

// Store factory
const createStore = () => {
	const { subscribe, set, update } = writable(stateStruct, function start (set) {
		return () => set(stateStruct);
	});

	return {
		subscribe
	};
};

export const playerUI = createStore();