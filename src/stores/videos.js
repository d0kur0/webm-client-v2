import { writable } from "svelte/store";
import API from "/Api.js";

const { getFilesBySchema } = API;

function createVideos() {
	const { subscribe, set, update } = writable({
		currentIndex: 0,
		files: []
	});

	return {
		subscribe,
		async fetchBySchema (schema) {
			set(await getFilesBySchema(schema));
		}
	};
}

export const videos = createVideos();