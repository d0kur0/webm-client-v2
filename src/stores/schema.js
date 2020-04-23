import { writable } from "svelte/store";
import { getSchema } from "/Api.js";

// Add checked property for boards
const addCheckedPropertyForBoards = schema => {
	return schema.map(vendor => {
		const boards = vendor.boards.map(board => ({ ...board, checked: true }));

		return { ...vendor, boards }
	});
};

// Get schema from localStorage
const getLocalSchema = () => {
	if (localStorage.localSchema === undefined) return false;

	try {
		const schema = JSON.parse(localStorage.localSchema);
		return schema;
	} catch (e) {
		console.error(e);
		return false;
	}
};

// Save schema in localStorage
const setLocalSchema = schema => {
	localStorage.localSchema = JSON.stringify(schema);
};

// Fabric of store
const createStore = () => {
	const { subscribe, set, update } = writable([], function start (set) {
		const localSchema = getLocalSchema();

		localSchema
			? set(localSchema)
			: getSchema()
				.then(schema => addCheckedPropertyForBoards(schema))
				.then(schema => set(schema))
				.catch(error => console.error(error));

		return () => set(0);
	});

	return {
		subscribe,

		// Toggle checked state for board of vendor
		toggleCheckedOfBoard ({ vendorName, boardName })  {
			update(schema => {
				const newSchema = schema.map(vendor => {
					if (vendor.name !== vendorName) return vendor;

					const boards = vendor.boards.map(board => {
						if (board.name !== boardName) return board;
						return { ...board, checked: !board.checked }
					});

					return { ...vendor, boards };
				});

				setLocalSchema(newSchema);
				return newSchema;
			});
		}
	}
};

export const schema = createStore();