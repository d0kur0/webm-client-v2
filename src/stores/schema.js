import { writable } from "svelte/store";
import API from "/Api.js";

const { getSchema } = API;

function addCheckedPropertyForBoards (schema) {
	return schema.map(vendor => {
		return {
			...vendor,
			boards: vendor.boards.map(board => ({ ...board, checked: true }))
		}
	});
}

function getLocalSchema () {
	if (localStorage.localSchema === undefined) return false;

	try {
		const schema = JSON.parse(localStorage.localSchema);
		return schema;
	} catch (e) {
		console.error(e);
		return false;
	}
}

function setLocalSchema (schema) {
	try {
		localStorage.localSchema = JSON.stringify(schema);
	} catch (e) {
		console.error(e);
	}
}

function createSchema() {
	const { subscribe, set, update } = writable([], function start (set) {
		const localSchema = getLocalSchema();

		if (!localSchema) {
			getSchema()
				.then(schema => addCheckedPropertyForBoards(schema))
				.then(schema => set(schema))
				.catch(error => console.error(error));
		} else {
			set(localSchema);
		}

		return function stop () {}
	});

	return {
		subscribe,
		toggleCheckedOfBoard (vendorName, boardName) {
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
	};
}

export const schema = createSchema();