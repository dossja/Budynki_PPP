import React from "react";
// eslint-disable-next-line no-unused-vars
import { Button, Table, ButtonGroup, Alert } from 'react-bootstrap'
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react'
import Header from "../Header.js";

import PlatnosciModal from "./PlatnosciModal";

import najmyAPI from "../Axios/najmyAPI";
import platnosciAPI from "../Axios/platnosciAPI";


const PlatnosciNaj = ({ match: { params: { id } } }) => {
    const na = new najmyAPI();
    const pa = new platnosciAPI();

    const [wyswietlPlatnosc, setWyswietlPlatnosc] = React.useState(false)

    let [idPlatnosci, setIdPlatnosci] = React.useState(null)

    const [Platnosci, setPlatnosci] = React.useState([])
    // eslint-disable-next-line no-unused-vars
    const [aktualizuj, setAktualizuj] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setAktualizuj(false);
        getPlatnosci();
    }, [aktualizuj]);

    const getPlatnosci = () => {
        na.getMojeNajmy(id).then(response => {
            let mojeNajmy = response
            pa.get().then(response =>{
                let platnosci = response.data
                let mojePlatnosci = []
                let indeks = 1;
                for (let i in mojeNajmy) {
                    for (let j in platnosci) {
                        if(platnosci[j].najem.id == mojeNajmy[i].id){
                            let nowaPlatnosc = { "id": indeks, "numerUmowy": mojeNajmy[i].numerUmowy}
                            indeks += 1;
                            nowaPlatnosc["platnosc"] = { "idPlatnosci": platnosci[j].id, "terminPlatnosci": platnosci[j].terminPlatnosci.slice(0,10), "dataPlatnosci": platnosci[j].dataPlatnosci.slice(0,10), "kwota": platnosci[j].kwota }
    
                            mojePlatnosci.push(nowaPlatnosc)
                        }
                        
                    }
                }   

            setPlatnosci(mojePlatnosci)
            })
            
        })
    };

    async function btnZaplac(id) {
        console.log("BTN Zaplac");
        console.log(id);
        setIdPlatnosci(id);
        setWyswietlPlatnosc(true);
    }

    const do_zaplacenia = () => {
        return (
            <>
                <Alert className="align-middle text-center" variant="danger" >Do zapłacenia</Alert>
            </>
        )
    }

    const w_terminie = (data) => {
        return (
            <>
                <Alert className="align-middle text-center" variant="success" >Zapłacono: {data}</Alert>
            </>
        )
    }

    const po_terminie = (data) => {
        return (
            <>
                <Alert className="align-middle text-center" variant="warning" >Zapłacono: {data}</Alert>
            </>
        )
    }

    const zaplacone = (dataZaplacenia, terminZaplacenia) => {
        const zaplacono = new Date(dataZaplacenia);
        const terminZaplaty = new Date(terminZaplacenia);
        const odp = zaplacono - terminZaplaty;

        if (odp > 0) {
            return po_terminie(dataZaplacenia);
        }
        else {
            return w_terminie(dataZaplacenia);
        }
    }

    return (
        <>
            <Header tytul='Płatnosci' par='Poniżej znajdują się Twoje płatności' />
            <Table responsive hover boarded>
                <thead className="thead-dark">
                    <tr>
                        <th className="align-middle" scope="col">Lp.</th>
                        <th className="align-middle" scope="col">Numer Umowy</th>
                        <th className="align-middle" scope="col">Kwota</th>
                        <th className="align-middle" scope="col">Termin Płatności</th>
                        <th className="align-middle" scope="col">Data Płatności</th>
                        <th className="align-middle" scope="col">Opcje</th>

                    </tr>
                </thead>
                <tbody>{
                    Platnosci.map(Platnosci => (
                        <tr key={Platnosci.id}>
                            <td className="align-middle">{Platnosci.id}</td>
                            <td className="align-middle">{Platnosci.numerUmowy}</td>
                            <td className="align-middle">{Platnosci.platnosc.kwota}</td>
                            <td className="align-middle">{Platnosci.platnosc.terminPlatnosci}</td>
                            <td className="align-middle">{(
                                (() => {
                                    switch (Platnosci.platnosc.dataPlatnosci) {
                                        case "1900-01-01": return do_zaplacenia()

                                        default: return zaplacone(Platnosci.platnosc.dataPlatnosci, Platnosci.platnosc.terminPlatnosci);
                                    }
                                })())}</td>
                            <td className="align-middle">{(
                                (() => {
                                    switch (Platnosci.platnosc.dataPlatnosci) {
                                        case "1900-01-01": return (
                                            <ButtonGroup size='sm' aria-label="Basic example">
                                                <Button className="mr-2 ml-2" variant="info" onClick={() => btnZaplac(Platnosci.platnosc.idPlatnosci)}>Zapłać</Button>
                                            </ButtonGroup>)

                                        default: return (<></>)
                                    }
                                })())}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <PlatnosciModal
                show={wyswietlPlatnosc}
                onHide={() => { setWyswietlPlatnosc(false); setIdPlatnosci(null); setAktualizuj(true) }}
                idPlatnosci={idPlatnosci} />
        </>
    )

}

export default PlatnosciNaj

