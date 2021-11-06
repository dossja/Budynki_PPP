import API from "./API";

export default class firmyPodwykonawczeAPI {
    // Metody GET
    async get() {
        const response = await API.get('/firmyPodwykonawcze');

        return response;
    }

    async getID(id) {
        const response = await API.get(`/firmyPodwykonawcze/${id}`);

        return response;
    }

    async getNewest() {
        const resp = await this.get();

        const len = resp.data.length;

        const output = await this.getID(len);

        return output;
    }

    // Metoda POST
    async post(firma) {
        const response = await API.post('/firmyPodwykonawcze', firma)

        return response;
    }

    // Metoda PUT
    async put(id, firma) {
        const response = await API.put(`/firmyPodwykonawcze/${id}`, firma)

        return response
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/firmyPodwykonawcze/${id}`);

        return response;
    }
}
