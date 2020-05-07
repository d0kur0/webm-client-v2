import axios from "axios";

// Make base API instance for requests
const API = axios.create({
	baseURL: "http://5.180.138.37:3500/",
	responseType: "json"
});

// Unpack layered object to flat array
const unpackFiles = vendors => {
	const files = [];

	for (const vendor in vendors) {
		if (!vendors.hasOwnProperty(vendor)) continue;
		const boards = vendors[vendor];

		for (const board in boards) {
			if (!boards.hasOwnProperty(board)) continue;
			const { threads } = boards[board];

			threads.forEach(thread => files.push(...thread.files))
		}
	}

	return files;
};

// Requesting files by schema, return files array
export const getFilesBySchema = async (inputSchema) => {
	const schema = { vendors: {} };
	inputSchema.forEach(vendor => {
		schema.vendors[vendor.name] = vendor.boards.filter(board => board.checked).map(board => board.name)
	});

	const { data } = await API.post("files/getByStruct", JSON.stringify(schema));

	return unpackFiles(data.vendors);
};

// Requesting server schema of grabbing
export const getSchema = async () => {
	const { data } = await API.get("schema/get");
	const schemaArray = [];

	for (let vendor in data) {
		if (!data.hasOwnProperty(vendor)) continue;

		schemaArray.push({
			name: vendor,
			boards: data[vendor]
		});
	}

	return Promise.resolve(schemaArray);
};

