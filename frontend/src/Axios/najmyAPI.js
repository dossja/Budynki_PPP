import API from "./API";

import lokaleAPI from './lokaleAPI';
import lokatorzyAPI from './lokatorzyAPI';
import nieruchomosciAPI from './nieruchomosciAPI';
import najmyLokatorzyAPI from './najmyLokatorzyAPI';

export default class najmyAPI {
    // Metody GET
    async get() {
        const response = await API.get("/najmy");

        return response;
    }

    async getID(id) {
        const response = await API.get(`/najmy/${id}`);

        return response;
    }

    async getNewest() {
        const resp = await this.get();
        console.log(resp)

        const len = resp.data.length;
        console.log(len)

        const output = await this.getID(len);
        console.log(output)

        return output;
    }

    async getMojeNajmy(idLokatora) {
        const la = new lokaleAPI();
        const na = new nieruchomosciAPI();
        const nla = new najmyLokatorzyAPI();

        const resp = await this.get();

        let najmyResponse = [];

        for (let i in resp.data) {
            if (resp.data[i].lokator.id == idLokatora) {
                najmyResponse.push({ "idNajmu": resp.data[i].id, "idLokalu": resp.data[i].lokal.id, "powierzchnia": resp.data[i].lokal.powierzchnia })
            }
        }

        for (let i in najmyResponse) {
            const respLokale = await la.getID(najmyResponse[i].idLokalu);
            najmyResponse[i]["idNieruchomosci"] = respLokale.data.nieruchomosc.id;
            najmyResponse[i]["cena"] = respLokale.data.nieruchomosc.kwotaOplatyAdm;
        }

        for (let i in najmyResponse) {
            const respNieruchomosci = await na.getID(najmyResponse[i].idNieruchomosci);
            najmyResponse[i]["adres"] = `${respNieruchomosci.data.adres.miejscowosc}, ${respNieruchomosci.data.adres.ulica} ${respNieruchomosci.data.adres.numerBudynku}`
            najmyResponse[i]["wspolnota"] = respNieruchomosci.data.wspolnota.nazwa;
        }

        for (let i in najmyResponse) {
            const respLokatorzy = await nla.getLokatorzyNajmu(najmyResponse[i].idNajmu);
            najmyResponse[i]["lokatorzy"] = respLokatorzy;
        }

        return najmyResponse;
    }

    // Metoda POST
    async post(najem) {
        const la = new lokaleAPI();
        const loa = new lokatorzyAPI();

        const lokalID = await la.getID(najem.id_lokalu);
        console.log(lokalID)

        // Jeszcze nie ma żadnej płatności
        const platnosc = [{}];
        console.log(`Platnosc: ${platnosc}`)

        let lokatorID;
        if (najem.id_najemcy) {
            lokatorID = await loa.getID(najem.id_najemcy)
        }
        else {
            const lokatorDane = { "imie": najem.nowyNajemca.imie, "nazwisko": najem.nowyNajemca.nazwisko, "PESEL": najem.nowyNajemca.PESEL }
            console.log(lokatorDane)
            lokatorID = await loa.post(lokatorDane)
        }
        console.log(`Lokator: ${lokatorID}`)

        const najemLokator = [];
        const najemZgloszenia = [];

        const najemID = { "numerUmowy": najem.numerUmowy, "dataPoczatku": najem.dataPoczatku, "dataZakonczona": najem.dataZakonczona, "emailNajemcy": najem.emailNajemcy, "lokal": lokalID.data, "platnosc": platnosc, "lokator": lokatorID.data, "najemLokator": najemLokator, "najemZgloszenia": najemZgloszenia }


        const response = await API.post('/najmy', najemID);

        return response;
    }

    // Metoda PUT
    async put(id, najem) {
        const response = await API.put(`/najmy/${id}`, najem);

        return response;
    }

    // Metody DELETE
    async deleteID(id) {
        const response = await API.delete(`/najmy/${id}`);

        return response;
    }
}
