import axios from "axios";

function createAPI () {
	const transport = axios.create({
		baseURL: "http://5.180.138.37:3500/",
		responseType: "json"
	});

	return {
		async getFiles () {

		},

		async getFilesBySchema (schema) {

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