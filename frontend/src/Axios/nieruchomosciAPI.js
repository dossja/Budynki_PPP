import API from "./API";

import adresyAPI from './adresyAPI';
import wspolnotyAPI from './wspolnotyAPI';

export default class nieruchomosciAPI {
    // Metody GET
    async get() {
        const response = await API.get('/nieruchomosci')

        return response;
    }

    async getIDLokale(id) {
        const response = await API.get(`/nieruchomosci/${id}/lokale`);

        return response;
    }

    async getID(id) {
        const response = await API.get(`/nieruchomosci/${id}`)

        return response;
    }

    // Metoda POST
    async post(nieruchomosc) {
        console.log(nieruchomosc);
        const wa = new wspolnotyAPI();
        const aa = new adresyAPI();
        console.log(nieruchomosc['wspolnota_id'])


        const adres = { "numerBudynku": nieruchomosc["numerBudynku"], "ulica": nieruchomosc["ulica"], "miejscowosc": nieruchomosc["miejscowosc"] };

        console.log("Nowy Adres: ");
        console.log(adres);

        await aa.post({ "numerBudynku": nieruchomosc["numerBudynku"], "ulica": nieruchomosc["ulica"], "miejscowosc": nieruchomosc["miejscowosc"] })

        const data = await aa.get();
        const len = data.data.length;
        const adresID = await aa.getID(len);

        console.log("Adres z API");
        console.log(adresID.data)

        let nieruchomoscID = { "cenaM2": nieruchomosc["cenaM2"], "kwotaOplatyAdm": nieruchomosc["kwotaOplatyAdm"], "wspolnota_id": nieruchomosc["wspolnota_id"], "adres_id": adresID.data.id }
        console.log("Nieruchomosc ID:")
        console.log(nieruchomoscID)
        const response = await API.post('/nieruchomosci', nieruchomoscID)

        return response;
    }

    // Metody PUT
    async put(id, nieruchomosc) {
        const response = await API.put(`/nieruchomosci/${id}`, nieruchomosc)

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/nieruchomosc/${id}`)

        return response;
    }
}
