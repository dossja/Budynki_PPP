import React from "react";
import { Button, Table, ButtonGroup, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Header from "../Header.js";

import platnosciAPI from "../Axios/platnosciAPI";

const Platnosci = () => {
    const pa = new platnosciAPI();

    const [Platnosci, setPlatnosci] = React.useState([])
    const [aktualizuj, setAktualizuj] = useState(false);

    useEffect(() => {
        setAktualizuj(false);
        getPlatnosci();
    }, [aktualizuj]);

    const getPlatnosci = () => {
        pa.get()
            .then(response => {
                console.log(response.data)
                setPlatnosci(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    async function btnUsun(id) {
        console.log("BTN Delete");
        console.log(id);
        pa.deleteID(id).then(response => {
            setAktualizuj(true);
        }).catch(e => {
            console.log(e);
        });
    }

    const do_zaplacenia = () => {
        return (
            <>
                <Alert variant="danger" >Do zapłacenia</Alert>
            </>
        )
    }

    const w_terminie = (data) => {
        return (
            <>
                <Alert variant="success" >Zapłacono: {data}</Alert>
            </>
        )
    }

    const po_terminie = (data) => {
        return (
            <>
                <Alert variant="warning" >Zapłacono: {data}</Alert>
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
            <Header tytul='Płatności' par='Poniżej znajdują się wszystkie płatności' />
            <Table responsive hover boarded>
                <thead className="thead-dark">
                    <tr>
                        <th className="align-middle" scope="col">Lp.</th>
                        <th className="align-middle" scope="col">Kwota</th>
                        <th className="align-middle" scope="col">Termin Płatności</th>
                        <th className="align-middle" scope="col">Data Płatności</th>
                        <th className="align-middle" scope="col">Typ Płatności</th>
                        <th className="align-middle" scope="col">Nr umowy</th>
                        <th className="align-middle" scope="col">Email</th>
                        <th className="align-middle" scope="col">Opcje</th>
                    </tr>
                </thead>
                <tbody>{
                    Platnosci.map(Platnosci => (
                        <tr key={Platnosci.id}>
                            <td className="align-middle">{Platnosci.id}</td>
                            <td className="align-middle">{Platnosci.kwota}</td>
                            <td className="align-middle">{Platnosci.terminPlatnosci}</td>
                            <td className="align-middle text-center">{
                                (
                                    (() => {
                                        switch (Platnosci.dataPlatnosci) {
                                            case "1900-01-01": return do_zaplacenia()

                                            default: return zaplacone(Platnosci.dataPlatnosci, Platnosci.terminPlatnosci);
                                        }
                                    })())
                            }</td>
                            <td className="align-middle">{Platnosci.typPlatnosci.nazwa}</td>
                            <td className="align-middle">{Platnosci.najem.numerUmowy}</td>
                            <td className="align-middle">{Platnosci.najem.emailNajemcy}</td>
                            <td className="align-middle">
                                <ButtonGroup size='sm' aria-label="Basic example">
                                    <Button className="mr-2 ml-2" variant="danger" onClick={() => btnUsun(Platnosci.id)}>Usuń</Button>
                                </ButtonGroup>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}

export default Platnosci

