import API from "./API";

export default class lokatorzyAPI {
    // Metody GET
    async get() {
        const response = await API.get("/lokatorzy");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/lokatorzy/${id}`);

        return response;
    }

    async getNewest() {
        const resp = await this.get();

        const len = resp.data.length;

        const output = await this.getID(len);

        return output;
    }

    // Metoda POST
    async post(lokator) {
        const response = await API.post('/lokatorzy', lokator);

        return response;
    }

    // Metoda PUT
    async put(id, lokator) {
        const response = await API.put(`/lokatorzy/${id}`, lokator);

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/lokatorzy/${id}`);

        return response;
    }
}
