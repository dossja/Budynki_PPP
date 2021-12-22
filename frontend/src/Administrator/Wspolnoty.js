import React from "react";
import { Button, Table, ButtonGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Header from "../Header.js";
import FormWspolnota from "./FormWspolnota";
import EdytujWspolnote from './EdytujWspolnote';
import NieruchomosciModal from './NieruchomosciModal';

import wspolnotyAPI from "../Axios/wspolnotyAPI";

const Wspolnoty = () => {
    const wa = new wspolnotyAPI();

    const [aktualizuj, setAktualizuj] = useState(false);
    const [wspolnoty, setWspolnoty] = React.useState([])
    const [dodajWspolnote, setDodajWspolnote] = React.useState(false)

    const [wyswietlNieruchomosci, setWyswietlNieruchomosci] = React.useState(false)

    const [edytujWspolnote, setEdytujWspolnote] = React.useState(false)

    useEffect(() => {
        setAktualizuj(false)
        getWspolnoty();
    }, [aktualizuj])

    const getWspolnoty = () => {
        wa.get()
            .then(response => {
                setWspolnoty(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const [ID, setId] = React.useState(null)

    const handleDodajWspolnote = () => {
        console.log("popup")
        setDodajWspolnote("true")
    }

    async function btnEdytuj(id) {
        console.log("BTN Edit");
        console.log(id);
        setId(id);

        setEdytujWspolnote("true")
        setAktualizuj(true);
    }

    async function btnUsun(id) {
        console.log("BTN Delete");
        console.log(id);
        wa.deleteID(id).then(response => {
            setAktualizuj(true);
        }).catch(e => {
            console.log(e);
        });
    }

    async function btnNieruchomosci(id) {
        console.log("BTN Nieruchomosci");
        console.log(id);
        setId(id);

        setWyswietlNieruchomosci(true)
        setAktualizuj(true);
    }
    return (
        <>
            <Header tytul='Wspólnoty' par='Poniżej znajdują się wspólnoty, którymi zarządzasz!' />
            <Button onClick={handleDodajWspolnote} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj wspólnotę</Button>
            <Table responsive hover boarded>
                <thead className="thead-dark">
                    <tr>
                        <th className="align-middle" scope="col">Lp.</th>
                        <th className="align-middle" scope="col">Nazwa</th>
                        <th className="align-middle" scope="col">NIP</th>
                        <th className="align-middle" scope="col">REGON</th>
                        <th className="align-middle" scope="col">email</th>
                        <th className="align-middle" scope="col">Telefon</th>
                        <th className="align-middle" scope="col">Adres Siedziby</th>
                        <th className="align-middle" scope="col">Opcje</th>
                    </tr>
                </thead>
                <tbody>{
                    wspolnoty.map(wspolnoty => (
                        <tr key={wspolnoty.id}>
                            <td className="align-middle">{wspolnoty.id}</td>
                            <td className="align-middle">{wspolnoty.nazwa}</td>
                            <td className="align-middle">{wspolnoty.NIP}</td>
                            <td className="align-middle">{wspolnoty.REGON}</td>
                            <td className="align-middle">{wspolnoty.email}</td>
                            <td className="align-middle">{wspolnoty.telefon}</td>
                            <td className="align-middle">{wspolnoty.adres.ulica} {wspolnoty.adres.numerBudynku}, {wspolnoty.adres.miejscowosc}</td>
                            <td className="align-middle">
                                <ButtonGroup size='sm' aria-label="Basic example">
                                    <Button className="mr-2 ml-2" variant="info" onClick={() => btnEdytuj(wspolnoty.id)}>Edytuj</Button>
                                    <Button className="mr-2 ml-2" variant="danger" onClick={() => btnUsun(wspolnoty.id)}>Usuń</Button>
                                    <Button className="mr-2 ml-2" variant="secondary" onClick={() => btnNieruchomosci(wspolnoty.id)}>Nieruchomości</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <FormWspolnota
                show={dodajWspolnote}
                onHide={() => { setDodajWspolnote(false); setAktualizuj(true) }} />
            <NieruchomosciModal
                show={wyswietlNieruchomosci}
                onHide={() => { setWyswietlNieruchomosci(false); setId(null); setAktualizuj(true) }}
                id={ID} />
            <EdytujWspolnote
                show={edytujWspolnote}
                onHide={() => { setEdytujWspolnote(false); setId(null); setAktualizuj(true) }}
                id={ID}
            />
        </>
    )

}

export default Wspolnoty
