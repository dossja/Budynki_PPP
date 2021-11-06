import API from "./API";

export default class statusyZgloszenAPI {
    // Metody GET
    async get() {
        const response = await API.get("/statusyZgloszen");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/statusyZgloszen/${id}`);

        return response;
    }

}
