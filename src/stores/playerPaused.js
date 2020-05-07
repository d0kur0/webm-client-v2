import { writable } from "svelte/store";

// Store factory
const createStore = () => {
	const { subscribe, set, update } = writable(true, function start (set) {
		return () => set(true);
	});

	return {
    set,
		subscribe,

    // Method for inverse value
    toggle () {
      update(state => {
        return !state
      });
    }
	};
};

export const playerPaused = createStore();