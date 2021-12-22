import API from "./API";

export default class platnosciAPI {
    // Metody GET
    async get() {
        const response = await API.get("/platnosci");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/platnosci/${id}`);

        return response;
    }

    async getNewest() {
        const response = await API.get(`/platnosci/newest`);

        return response;
    }

    // Metoda POST
    async post(platnosc) {
        const response = await API.post('/platnosci', platnosc);

        return response;
    }

    // Metoda PUT
    async put(id, platnosc) {
        const response = await API.put(`/platnosci/${id}`, platnosc);

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/platnosci/${id}`);

        return response;
    }
}
