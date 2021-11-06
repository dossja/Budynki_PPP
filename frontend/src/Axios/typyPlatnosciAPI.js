import API from "./API";

export default class typyPlatnosciAPI {
    // Metody GET
    async get() {
        const response = await API.get("/typyPlatnosci");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/typyPlatnosci/${id}`);

        return response;
    }

}
