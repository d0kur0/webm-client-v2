import { writable } from "svelte/store";
import { getFilesBySchema } from "/Api.js";

// Default data struct
const stateStruct = {
	currentIndex: 0,
	files: []
};

// Randomize array elements
const shuffleArray = array => {
	const { random } = Math;

	return array.sort(() => random() - 0.5);
};

// Make store
const createStore = () => {
	const { subscribe, set, update } = writable({ ...stateStruct });

	return {
		subscribe,

		// Requesting files by schema
		async fetchBySchema (schema) {
			const files = await getFilesBySchema(schema) || [];
			return update(oldState => ({ ...oldState, files }));
		}
	}
};

export const videos = createStore();