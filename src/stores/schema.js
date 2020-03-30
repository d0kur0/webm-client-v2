import { readable } from "svelte/store";
import API from "/Api.js";

const { getSchema } = API;

function createSchema() {
	const { subscribe, set, update } = readable([], function start (set) {
		getSchema()
			.then(schema => set(schema))
			.catch(error => console.error(error));

		return function stop () {}
	});

	return {
		subscribe,
	};
}

export const schema = createSchema();