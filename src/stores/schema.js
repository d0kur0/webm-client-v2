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
	const { subscribe, set, update } = writable([]);

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
			})
		},

		// Getting schema
		async fetch () {
			const localSchema = getLocalSchema();

			if (localSchema) {
				set(localSchema);
			} else {
				let schema = await getSchema();
				schema = addCheckedPropertyForBoards(schema);

				setLocalSchema(schema);
				set(schema);
			}
		},

		// Check case then all boards disable
		isAllDisable () {
			const schema = getLocalSchema();
			if (!schema.length) return true;

			const checkedList = schema.map(vendor => vendor.boards).flat().filter(board => board.checked);
			
			return !Boolean(checkedList.length);
		}
	}
};

export const schema = createStore();