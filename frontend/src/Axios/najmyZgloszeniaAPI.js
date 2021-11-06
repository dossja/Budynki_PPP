import API from "./API";

export default class najmyZgloszeniaAPI {
    // Metody GET
    async get() {
        const response = await API.get("/najmyZgloszenia");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/najmyZgloszenia/${id}`);

        return response;
    }

    async getTwojeZgloszenia(id) {
        const response = await API.get(`/najmyZgloszenia`);

        const zgloszenia = [];

        for (let i in response.data) {
            for (let j in id) {
                if (response.data[i].najem.id === id[j]) {
                    zgloszenia.push(response.data[i])
                }
            }
        }

        return zgloszenia;
    }

    // Metoda POST
    async post(najemZgloszenia) {
        const response = await API.post('/najmyZgloszenia', najemZgloszenia);

        return response;
    }

    // Metoda PUT
    async put(id, najemZgloszenia) {
        const response = await API.put(`/najmyZgloszenia/${id}`, najemZgloszenia);

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/najmyZgloszenia/${id}`);

        return response;
    }
}
