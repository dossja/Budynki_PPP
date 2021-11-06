import React from "react";
import { Button, Table, ButtonGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Header from "../Header.js";

import nieruchomosciAPI from "../Axios/nieruchomosciAPI.js";

const Nieruchomosci = () => {
    const na = new nieruchomosciAPI();
    const [aktualizuj, setAktualizuj] = useState(false);
    useEffect(() => {
        getNieruchomosci();
    }, [aktualizuj]);

    const getNieruchomosci = () => {
        na.get()
            .then(response => {
                console.log(`response w get Nieruchomosci: ${response}`)
                console.log(response.data)
                setNieruchomosci(response.data)
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const [Nieruchomosci, setNieruchomosci] = React.useState([])

    async function btnEdytuj(id) {
        console.log("BTN Edit");
        console.log(id);

        setAktualizuj(true)
    }
    return (
        <>
            <Header tytul='Nieruchomości' par='Poniżej znajdują się nieruchomości, którymi zarządzasz!' />
            <Table responsive hover boarded>
                <thead className="thead-dark">
                    <tr>
                        <th className="align-middle" scope="col">Lp.</th>
                        <th className="align-middle" scope="col">Wspólnota</th>
                        <th className="align-middle" scope="col">Cena m2</th>
                        <th className="align-middle" scope="col">Kwota opłaty administracyjnej</th>
                        <th className="align-middle" scope="col">Adres</th>
                        <th className="align-middle" scope="col">Opcje</th>

                    </tr>
                </thead>
                <tbody>{
                    Nieruchomosci.map(Nieruchomosci => (
                        <tr key={Nieruchomosci.id}>
                            <td>{Nieruchomosci.id}</td>
                            <td>{Nieruchomosci.wspolnota.nazwa}</td>
                            <td>{Nieruchomosci.cenaM2}</td>
                            <td>{Nieruchomosci.kwotaOplatyAdm} zł/msc</td>
                            <td>{Nieruchomosci.adres.ulica} {Nieruchomosci.adres.numerBudynku}, {Nieruchomosci.adres.miejscowosc}</td>

                            <td>
                                <ButtonGroup size='sm' aria-label="Basic example">
                                    <Button className="mr-2 ml-2" variant="info" onClick={() => btnEdytuj(Nieruchomosci.id)}>Edytuj</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </>
    )

}

export default Nieruchomosci
