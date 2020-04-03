import axios from "axios";

function unpackFiles (vendors) {
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

	console.log(files)

	return files;
}

function createAPI () {
	const transport = axios.create({
		baseURL: "http://5.180.138.37:3500/",
		responseType: "json"
	});

	return {
		async getFilesBySchema (inputSchema) {
			const schema = { vendors: {} };
			inputSchema.forEach(vendor => schema.vendors[vendor.name] = vendor.boards.map(board => board.name));

			const { data } = await transport.post("files/getByStruct", JSON.stringify(schema));

			return unpackFiles(data.vendors);
		},

		async getSchema () {
			const { data } = await transport.get("schema/get");
			const schemaArray = [];

			for (let vendor in data) {
				if (!data.hasOwnProperty(vendor)) continue;

				schemaArray.push({
					name: vendor,
					boards: data[vendor]
				});
			}

			return Promise.resolve(schemaArray);
		}
	}
}

export default createAPI();