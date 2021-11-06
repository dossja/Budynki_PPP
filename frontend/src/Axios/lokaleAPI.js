import API from "./API";

export default class lokaleAPI {
    // Metody GET
    async get() {
        const response = await API.get("/lokale")

        return response;
    }

    async getID(id) {
        const response = await API.get(`/lokale/${id}`)

        return response;
    }

    async getBilansID(id, dataPoczatkowa, dataKoncowa) {
        // Format daty: rok-miesiac-dzien
        const response = await API.get(`/lokale/${id}/bilans/${dataPoczatkowa}&${dataKoncowa}`)

        return response;
    }

    async getNewest() {
        const resp = await this.get();

        const len = resp.data.length;

        const output = await this.getID(len);

        return output;
    }

    // Metoda POST
    async post(lokal) {
        const response = await API.post('/lokale', lokal)

        return response;
    }

    // Metoda PUT
    async put(id, lokal) {
        const data = lokal.data;
        const response = await API.put(`/lokale/${id}`, data)

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/lokale/${id}`)

        return response;
    }
}
