import API from "./API";

export default class adresyAPI {
    // Metody GET
    async get() {
        const response = await API.get("/adresy");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/adresy/${id}`);

        return response;
    }

    async getNewest() {
        const response = await API.get(`/adresy/newest`);

        return response;
    }

    // Metoda POST
    async post(adres) {
        const response = await API.post('/adresy', adres)

        return response;
    }

    // Metoda PUT
    async put(id, adres) {
        const response = await API.put(`/adresy/${id}`, adres);

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/adresy/${id}`)

        return response;
    }
}
