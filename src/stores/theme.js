import { writable } from "svelte/store";

// Store factory
const createStore = () => {
	const { subscribe, set, update } = writable(true, function start (set) {

		const isDark = localStorage.overrideTheme !== undefined
			? ({ "true": true, "false": false })[localStorage.overrideTheme]
			: window.matchMedia("(prefers-color-scheme: dark)").matches;

		set(Boolean(isDark));

		return () => {};
	});

	return {
		subscribe,
		toggleTheme: () => update(theme => !theme)
	};
};

export const theme = createStore();