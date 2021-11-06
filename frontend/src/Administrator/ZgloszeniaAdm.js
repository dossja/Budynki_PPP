import React from "react";
import { Button, Table, ButtonGroup, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Header from "../Header.js";
import PodgladZgloszenie from './PodgladZgloszenie';
import EdytujZgloszenia from './EdytujZgloszenia';

import zgloszeniaAPI from '../Axios/zgloszeniaAPI';

const ZgloszeniaAdm = () => {
    const za = new zgloszeniaAPI();

    const [aktualizuj, setAktualizuj] = useState(false)
    const [podgladID, setPodgladID] = useState(null)
    const [edytujID, setEdytujID] = useState(null)
    const [podgladZgloszenia, setPodgladZgloszenia] = useState(false)
    const [Zgloszenia, setZgloszenia] = React.useState([])
    const [edytujZgloszenia, setEdytujZgloszenia] = React.useState(false)

    useEffect(() => {
        getZgloszenia();
        setAktualizuj(false);
    }, [aktualizuj]);

    const getZgloszenia = () => {
        za.get()
            .then(response => {
                setZgloszenia(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const btnPodglad = (id) => {
        console.log(`Podglad id: ${id}`)
        setPodgladID(id)
        setPodgladZgloszenia(true)
    }

    const btnAkceptuj = (id) => {
        console.log(`Akceptuj id: ${id}`)

        za.getID(id).then(response => {
            console.log(response.data)
            const dane = { "id": response.data.id, "opis": response.data.opis, "kosztCalkowity": response.data.kosztCalkowity, "statusZgloszenia": { "id": 2, "nazwa": "przyjete" }, "kategoriaZgloszenia": { "id": response.data.kategoriaZgloszenia.id, "nazwa": response.data.kategoriaZgloszenia.nazwa } };
            console.log(dane)

            za.put(id, dane).then(resp => { setAktualizuj(true) })
        })
    }

    const btnOdrzuc = (id) => {
        console.log(`Odrzuc id: ${id}`)

        za.getID(id).then(response => {
            const dane = { "id": response.data.id, "opis": response.data.opis, "kosztCalkowity": response.data.kosztCalkowity, "statusZgloszenia": { "id": 4, "nazwa": "zrealizowane" }, "kategoriaZgloszenia": { "id": response.data.kategoriaZgloszenia.id, "nazwa": response.data.kategoriaZgloszenia.nazwa } };

            za.put(id, dane).then(resp => { setAktualizuj(true) })
        })
    }

    const btnEdytuj = (id) => {
        console.log(`Edytuj id: ${id}`)
        setEdytujID(id);
        setEdytujZgloszenia(true);

        setAktualizuj(true)
    }
    const btnRealizuj = (id) => {
        console.log(`Realizuj id: ${id}`)

        za.getID(id).then(response => {
            const dane = { "id": response.data.id, "opis": response.data.opis, "kosztCalkowity": response.data.kosztCalkowity, "statusZgloszenia": { "id": 3, "nazwa": "w_realizacji" }, "kategoriaZgloszenia": { "id": response.data.kategoriaZgloszenia.id, "nazwa": response.data.kategoriaZgloszenia.nazwa } };

            za.put(id, dane).then(resp => { setAktualizuj(true) })
        })
    }
    const btnZrealizuj = (id) => {
        console.log(`Zrealizuj id: ${id}`)

        za.getID(id).then(response => {
            const dane = { "id": response.data.id, "opis": response.data.opis, "kosztCalkowity": response.data.kosztCalkowity, "statusZgloszenia": { "id": 4, "nazwa": "zrealizowane" }, "kategoriaZgloszenia": { "id": response.data.kategoriaZgloszenia.id, "nazwa": response.data.kategoriaZgloszenia.nazwa } };

            za.put(id, dane).then(resp => { setAktualizuj(true) })
        })
    }


    const przyjete = (id) => {
        return (
            <>
                <td className="align-middle text-center"><Alert variant="secondary" >Zgłoszenie przyjęte</Alert></td>
                <td className="align-middle">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ButtonGroup className="align-middle" size='sm' aria-label="Basic example">
                            <Button className="mr-2 ml-2" variant="secondary" onClick={() => btnPodglad(id)}>Podgląd</Button>
                            <Button className="mr-2 ml-2" variant="info" onClick={() => btnEdytuj(id)}>Edytuj</Button>
                            <Button className="mr-2 ml-2" variant="primary" onClick={() => btnRealizuj(id)}>Realizuj</Button>
                        </ButtonGroup>
                    </div>
                </td>
            </>)
    }

    const oczekujace = (id) => {
        return (
            <>
                <td className="align-middle text-center"><Alert variant="warning" >Zgłoszenie oczekujące</Alert></td>
                <td className="align-middle">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ButtonGroup className="align-middle" size='sm' aria-label="Basic example">
                            <Button className="mr-2 ml-2" variant="success" onClick={() => btnAkceptuj(id)}>Akceptuj</Button>
                            <Button className="mr-2 ml-2" variant="danger" onClick={() => btnOdrzuc(id)}>Odrzuć</Button>
                        </ButtonGroup>
                    </div>
                </td>
            </>)
    }

    const wRealizacji = (id) => {
        return (
            <>
                <td className="align-middle text-center"><Alert variant="primary" >Zgłoszenie w realizacji</Alert></td>
                <td className="align-middle" >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ButtonGroup size='sm' aria-label="Basic example">
                            <Button className="mr-2 ml-2" variant="secondary" onClick={() => btnPodglad(id)}>Podgląd</Button>
                            <Button className="mr-2 ml-2" variant="info" onClick={() => btnEdytuj(id)}>Edytuj</Button>
                            <Button className="mr-2 ml-2" variant="success" onClick={() => btnZrealizuj(id)}>Zakończ zgłoszenie</Button>
                        </ButtonGroup >
                    </div>
                </td>
            </>
        )
    }

    const zakonczone = (id) => {
        return (
            <>
                <td className="align-middle text-center"><Alert variant="success" style={{ marginRight: '10px' }}>Zgłoszenie zakończone</Alert></td>
                <td className="align-middle">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ButtonGroup size="sm" aria-label="Basic example">
                            <Button className="mr-2 ml-2" variant="secondary" onClick={() => { btnPodglad(id) }}>Podgląd</Button>
                        </ButtonGroup>
                    </div>
                </td>
            </>
        )
    }

    return (
        <>
            <Header tytul='Zgłoszenia' par='Poniżej znajduje się lista wszystkich zgłoszeń' />
            <Table responsive hover boarded>
                <thead className="thead-dark">
                    <tr>
                        <th className="align-middle" scope="col">Lp.</th>
                        <th className="align-middle" scope="col">Opis</th>
                        <th className="align-middle" scope="col">Koszt całkowity</th>
                        <th className="align-middle" scope="col">Status</th>
                        <th className="align-middle" scope="col">Opcje</th>
                    </tr>
                </thead>
                <tbody>{
                    Zgloszenia.map(Zgloszenia => (
                        <tr key={Zgloszenia.id}>
                            <td className="align-middle">{Zgloszenia.id}</td>
                            <td className="align-middle">{Zgloszenia.opis}</td>
                            <td className="align-middle">{Zgloszenia.kosztCalkowity}</td>
                            {
                                (
                                    (() => {
                                        switch (Zgloszenia.statusZgloszenia.nazwa) {
                                            case "oczekujace": return oczekujace(Zgloszenia.id)
                                            case "przyjete": return przyjete(Zgloszenia.id);
                                            case "w_realizacji": return wRealizacji(Zgloszenia.id);

                                            default: return zakonczone(Zgloszenia.id);
                                        }
                                    })())
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            <PodgladZgloszenie show={podgladZgloszenia}
                onHide={() => { setPodgladZgloszenia(false); setAktualizuj(true); setPodgladID(null) }}
                id={podgladID} />
            <EdytujZgloszenia show={edytujZgloszenia}
                onHide={() => { setEdytujZgloszenia(false); setAktualizuj(true); setEdytujID(null); }}
                id={edytujID} />
        </>
    )

}

export default ZgloszeniaAdm