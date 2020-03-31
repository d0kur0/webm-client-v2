import { writable } from "svelte/store";

function createTheme() {
	const { subscribe, set, update } = writable(true, function start (set) {

		const isDark = localStorage.overrideTheme !== undefined
			? ({ "true": true, "false": false })[localStorage.overrideTheme]
			: window.matchMedia("(prefers-color-scheme: dark)").matches;

		set(Boolean(isDark));

		return function stop () {}
	});

	return {
		subscribe,
		toggleTheme () {
			update(theme => !theme);
		}
	};
}

export const theme = createTheme();