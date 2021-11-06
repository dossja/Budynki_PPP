import API from "./API";
import adresyAPI from "./adresyAPI";

export default class wspolnotyAPI {
    // Metody GET
    async get() {
        const response = await API.get('/wspolnoty');

        return response;
    }

    async getID(id) {
        const response = await API.get(`/wspolnoty/${id}`)

        return response;
    }

    async getNewest() {
        const resp = await this.get();

        const len = resp.data.length;

        const output = await this.getID(len);

        return output;
    }

    async getIDNieruchomosci(id) {
        const response = await API.get(`/wspolnoty/${id}/nieruchomosci`)

        return response;
    }

    // Metoda POST
    async post(wspolnota) {
        const aa = new adresyAPI();

        const adres = wspolnota.adres;

        await aa.post({ "numerBudynku": adres["numerBudynku"], "ulica": adres["ulica"], "miejscowosc": adres["miejscowosc"] });

        const adresID = await aa.getNewest();

        const wspolnotaID = { "nazwa": wspolnota.nazwa, "NIP": wspolnota.NIP, "REGON": wspolnota.REGON, "email": wspolnota.email, "telefon": wspolnota.telefon, "adres": adresID.data }

        await API.post('/wspolnoty', wspolnotaID);

        // TODO: Zwracanie zaktualizowanej tablicy wspolnot
        return await API.get('/wspolnoty');
    }

    // Metoda PUT
    async put(id, wspolnota) {
        const response = await API.put(`/wspolnoty/${id}`, wspolnota)

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/wspolnoty/${id}`)

        return response;
    }
}