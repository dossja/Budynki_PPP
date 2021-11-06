import API from "./API";

export default class najmyLokatorzyAPI {
    // Metody GET
    async get() {
        const response = await API.get("/najmyLokatorzy");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/najmyLokatorzy/${id}`);

        return response;
    }

    async getLokatorzyNajmu(id) {
        const resp = await this.get();
        let lokatorzy = []

        for (let i in resp.data) {
            if (resp.data[i].najem.id == id) {
                lokatorzy.push(resp.data[i].lokator)
            }
        }

        return lokatorzy;
    }

    // Metoda POST
    async post(najemLokator) {
        const response = await API.post('/najmyLokatorzy', najemLokator);

        return response;
    }

    // Metoda PUT
    async put(id, najemLokator) {
        const response = await API.put(`/najmyLokatorzy/${id}`, najemLokator);

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/najmyLokatorzy/${id}`);

        return response;
    }
}
