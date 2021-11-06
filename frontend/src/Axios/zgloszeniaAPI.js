import API from "./API";

export default class zgloszeniaAPI {
    // Metody GET
    async get() {
        const response = await API.get("/zgloszenia");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/zgloszenia/${id}`);

        return response;
    }

    async getNewest() {
        const resp = await this.get();

        const len = resp.data.length;

        const output = await this.getID(len);

        return output;
    }

    async getZgloszeniaArray(zgloszenia) {
        let zgloszeniaArray = []
        for (let i in zgloszenia) {
            const resp = await this.getID(zgloszenia[i].id);
            zgloszeniaArray.push(resp.data)
        }

        return zgloszeniaArray;
    }

    // Metoda POST
    async post(zgloszenie) {
        const response = await API.post('/zgloszenia', zgloszenie);

        return response;
    }

    // Metoda PUT
    async put(id, zgloszenie) {
        const response = await API.put(`/zgloszenia/${id}`, zgloszenie);

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/zgloszenia/${id}`);

        return response;
    }
}
