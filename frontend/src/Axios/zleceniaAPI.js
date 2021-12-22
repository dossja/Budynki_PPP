import API from "./API";

export default class zleceniaAPI {
    // Metody GET
    async get() {
        const response = await API.get("/zlecenia");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/zlecenia/${id}`);

        return response;
    }
    async getZgloszeniaZlecenia(id) {
        const response = await API.get(`/zlecenia/zgloszenia/${id}`);

        return response;
    }
    // Metoda POST
    async post(zlecenie) {
        const response = await API.post('/zlecenia', zlecenie);

        return response;
    }

    // Metoda PUT
    async put(id, zlecenie) {
        const response = await API.put(`/zlecenia/${id}`, zlecenie);

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/zlecenia/${id}`);

        return response;
    }
}
