import API from "./API";

export default class kategorieZgloszeniaAPI {
    // Metody GET
    async get() {
        const response = await API.get("/kategorieZgloszenia");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/kategorieZgloszenia/${id}`);

        return response;
    }
}
