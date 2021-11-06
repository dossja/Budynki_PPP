//plik roboczy
import React from "react";
import { Button, Table, ButtonGroup, Alert } from 'react-bootstrap'
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react'
import Header from "../Header.js";

import firmyPodwykonawczeAPI from "../Axios/firmyPodwykonawczeAPI.js";
import kategorieZgloszeniaAPI from '../Axios/kategorieZgloszeniaAPI.js';
import lokatorzyAPI from '../Axios/lokatorzyAPI.js';
import najmyAPI from '../Axios/najmyAPI';
import platnosciAPI from '../Axios/platnosciAPI';
import zgloszeniaAPI from '../Axios/zgloszeniaAPI';
import zleceniaAPI from '../Axios/zleceniaAPI';

const PlikTestowyAPI = () => {
    const fpa = new firmyPodwykonawczeAPI();
    const kza = new kategorieZgloszeniaAPI();
    const loa = new lokatorzyAPI();
    const naa = new najmyAPI();
    const pa = new platnosciAPI();
    const za = new zgloszeniaAPI();
    const zla = new zleceniaAPI();

    // eslint-disable-next-line no-unused-vars
    const [dodajFirmePodwykonawcza, setDodajFirmePodwykonawcza] = React.useState(false)
    // eslint-disable-next-line no-unused-vars
    const [dodajLokatora, setDodajLokatora] = React.useState(false)
    // eslint-disable-next-line no-unused-vars
    const [dodajNajem, setDodajNajem] = React.useState(false)
    // eslint-disable-next-line no-unused-vars
    const [dodajPlatnosc, setDodajPlatnosc] = React.useState(false)
    // eslint-disable-next-line no-unused-vars
    const [dodajZgloszenie, setDodajZgloszenie] = React.useState(false)
    // eslint-disable-next-line no-unused-vars
    const [dodajZlecenie, setDodajZlecenie] = React.useState(false)

    useEffect(() => {
        getFirmyPodwykonawcze();
        getKategorieZgloszenia();
        getLokatorzy();
        getNajmy();
        getPlatnosci();
        getZgloszenia();
        getZlecenia();
    });

    const getFirmyPodwykonawcze = () => {
        fpa.get()
            .then(response => {
                setFirmyPodwykonawcze(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };
    // eslint-disable-next-line no-unused-vars
    const [FirmyPodwykonawcze, setFirmyPodwykonawcze] = React.useState([])

    // eslint-disable-next-line no-unused-vars
    const [KategorieZgloszenia, setKategorieZgloszenia] = React.useState([])
    const getKategorieZgloszenia = () => {
        kza.get()
            .then(response => {
                setKategorieZgloszenia(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const [Lokatorzy, setLokatorzy] = React.useState([])
    const getLokatorzy = () => {
        loa.get()
            .then(response => {
                setLokatorzy(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const [Najmy, setNajmy] = React.useState([])
    const getNajmy = () => {
        naa.get()
            .then(response => {
                setNajmy(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const [Platnosci, setPlatnosci] = React.useState([])
    const getPlatnosci = () => {
        pa.get()
            .then(response => {
                setPlatnosci(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const [Zgloszenia, setZgloszenia] = React.useState([])
    const getZgloszenia = () => {
        za.get()
            .then(response => {
                setZgloszenia(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const [Zlecenia, setZlecenia] = React.useState([])
    const getZlecenia = () => {
        zla.get()
            .then(response => {
                setZlecenia(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleDodajFirmePodwykonawcza = () => {
        console.log("Popup handleDodajFirmePodwykonawcza()")
        // TODO: Jakieś quality dodawanie na pewno :)
        setDodajFirmePodwykonawcza("true")
    }

    const handleDodajLokatora = () => {
        console.log("Popup handleDodajLokatora()")
        // TODO: Jakieś quality dodawanie na pewno :)
        setDodajLokatora("true")
    }

    const handleDodajNajem = () => {
        console.log("Popup handleDodajNajem()")
        // TODO: Jakieś quality dodawanie na pewno :)
        setDodajNajem("true")
    }

    const handleDodajPlatnosc = () => {
        console.log("Popup handleDodajPlatnosc()")
        // TODO: Jakieś quality dodawanie na pewno :)
        setDodajPlatnosc("true")
    }

    const handleDodajZgloszenie = () => {
        console.log("Popup handleDodajZgloszenie()")
        // TODO: Jakieś quality dodawanie na pewno :)
        setDodajZgloszenie("true")
    }

    const handleDodajZlecenie = () => {
        console.log("Popup handleDodajZlecenie()")
        // TODO: Jakieś quality dodawanie na pewno :)
        setDodajZlecenie("true")
    }

    // BtnGetID, BtnEdytuj i BtnUsun takie same dla każdych, tylko jakiąś fajną edycję trza dać :P

    async function btnGetID(api, id) {
        console.log("BTN GetID");
        console.log(`ID: ${id}`);
        api.getID(id).then(response => {
            console.log(response.data)
        })
            .catch(e => {
                console.log(e);
            });
    }

    async function btnEdytuj(api, id) {
        // TODO: Edycja
        console.log("BTN Edit");
        console.log(`ID: ${id}`);
    }

    async function btnUsun(api, id) {
        console.log("BTN Delete");
        console.log(`ID: ${id}`);
        // TODO: Naprawić usuwanie

        // api.deleteID(id).then(response => {
        //     console.log(response.data)
        // })
        //     .catch(e => {
        //         console.log(e);
        //     });
    }

    return (
        <>
            <Header tytul='PLIK TESTOWY API' par='Poniżej znajdują się przykładowe odpowiedzi z API.' />
            <Alert variant='dark'>
                <Alert.Heading>Data from FirmyPodwykonawczeAPI:</Alert.Heading>
                <Table responsive hover boarded>
                    <thead className="thead-dark">
                        <tr>
                            <th className="align-middle" scope="col">Lp.</th>
                            <th className="align-middle" scope="col">Nazwa</th>
                            <th className="align-middle" scope="col">Telefon</th>
                            <th className="align-middle" scope="col">Usługa</th>
                            <th className="align-middle" scope="col">Opcje</th>
                        </tr>
                    </thead>
                    <tbody>{
                        FirmyPodwykonawcze.map(FirmyPodwykonawcze => (
                            <tr key={FirmyPodwykonawcze.id}>
                                <td>{FirmyPodwykonawcze.id}</td>
                                <td>{FirmyPodwykonawcze.nazwa}</td>
                                <td>{FirmyPodwykonawcze.telefon}</td>
                                <td>{FirmyPodwykonawcze.usluga}</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example" size='sm'>
                                        <Button variant="success" style={{ marginRight: '10px' }} onClick={() => btnGetID(fpa, FirmyPodwykonawcze.id)}>Pobierz dane po id</Button>
                                        <Button variant="info" style={{ marginRight: '10px' }} onClick={() => btnEdytuj(fpa, FirmyPodwykonawcze.id)}>Edytuj</Button>
                                        <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => btnUsun(fpa, FirmyPodwykonawcze.id)}>Usuń</Button>
                                    </ButtonGroup></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <hr />
                <Button onClick={handleDodajFirmePodwykonawcza} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj do FirmyPodwykonawczeAPI</Button>
            </Alert>

            <hr />
            <Alert variant='dark'>
                <Alert.Heading>Data from KategorieZgloszeniaAPI:</Alert.Heading>
                <Table responsive hover boarded>
                    <thead className="thead-dark">
                        <tr>
                            <th className="align-middle" scope="col">Lp.</th>
                            <th className="align-middle" scope="col">Nazwa</th>
                            <th className="align-middle" scope="col">Opcje</th>
                        </tr>
                    </thead>
                    <tbody>{
                        KategorieZgloszenia.map(KategorieZgloszenia => (
                            <tr key={KategorieZgloszenia.id}>
                                <td>{KategorieZgloszenia.id}</td>
                                <td>{KategorieZgloszenia.nazwa}</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example" size='sm'>
                                        <Button variant="success" style={{ marginRight: '10px' }} onClick={() => btnGetID(kza, FirmyPodwykonawcze.id)}>Pobierz dane po id</Button>
                                    </ButtonGroup></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Alert>

            <hr />
            <Alert variant='dark'>
                <Alert.Heading>Data from LokatorzyAPI:</Alert.Heading>
                <Table responsive hover boarded>
                    <thead className="thead-dark">
                        <tr>
                            <th className="align-middle" scope="col">Lp.</th>
                            <th className="align-middle" scope="col">Imię</th>
                            <th className="align-middle" scope="col">Nazwisko</th>
                            <th className="align-middle" scope="col">PESEL</th>
                            <th className="align-middle" scope="col">Opcje</th>
                        </tr>
                    </thead>
                    <tbody>{
                        Lokatorzy.map(Lokatorzy => (
                            <tr key={Lokatorzy.id}>
                                <td>{Lokatorzy.id}</td>
                                <td>{Lokatorzy.imie}</td>
                                <td>{Lokatorzy.nazwisko}</td>
                                <td>{Lokatorzy.PESEL}</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example" size='sm'>
                                        <Button variant="success" style={{ marginRight: '10px' }} onClick={() => btnGetID(loa, Lokatorzy.id)}>Pobierz dane po id</Button>
                                        <Button variant="info" style={{ marginRight: '10px' }} onClick={() => btnEdytuj(loa, Lokatorzy.id)}>Edytuj</Button>
                                        <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => btnUsun(loa, Lokatorzy.id)}>Usuń</Button>
                                    </ButtonGroup></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <hr />
                <Button onClick={handleDodajLokatora} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj do LokatorzyAPI</Button>
            </Alert>

            <hr />
            <Alert variant='dark'>
                <Alert.Heading>Data from NajmyAPI:</Alert.Heading>
                <Table responsive hover boarded>
                    <thead className="thead-dark">
                        <tr>
                            <th className="align-middle" scope="col">Lp.</th>
                            <th className="align-middle" scope="col">Numer Umowy</th>
                            <th className="align-middle" scope="col">Data Początku Umowy</th>
                            <th className="align-middle" scope="col">Data Zakończenia Umowy</th>
                            <th className="align-middle" scope="col">Email Najemcy</th>
                            <th className="align-middle" scope="col">Lokal</th>
                            <th className="align-middle" scope="col">Platnosc</th>
                            <th className="align-middle" scope="col">Lokator</th>
                            <th className="align-middle" scope="col">najemLokator</th>
                            <th className="align-middle" scope="col">najemZgloszenia</th>
                            <th className="align-middle" scope="col">Opcje</th>

                        </tr>
                    </thead>
                    <tbody>{
                        Najmy.map(Najmy => (
                            <tr key={Najmy.id}>
                                <td>{Najmy.id}</td>
                                <td>{Najmy.numerUmowy}</td>
                                <td>{Najmy.dataPoczatku}</td>
                                <td>{Najmy.dataZakonczona}</td>
                                <td>{Najmy.emailNajemcy}</td>
                                <td>id: {Najmy.lokal.id}, Numer Lokalu:{Najmy.lokal.numerLokalu}, Powierzchnia: {Najmy.lokal.powierzchnia}</td>
                                <td>Tutaj coś ładnego dla platności, ale to tabela jest, a ja nie jestem zbyt ambitna :*</td>
                                <td>id: {Najmy.lokator.id}, {Najmy.lokator.imie} {Najmy.lokator.nazwisko} {Najmy.lokator.PESEL}</td>
                                <td>{Najmy.najemLokator}</td>
                                <td>{Najmy.najemZgloszenia}</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example" size='sm'>
                                        <Button variant="success" style={{ marginRight: '10px' }} onClick={() => btnGetID(naa, Najmy.id)}>Pobierz dane po id</Button>
                                        <Button variant="info" style={{ marginRight: '10px' }} onClick={() => btnEdytuj(naa, Najmy.id)}>Edytuj</Button>
                                        <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => btnUsun(naa, Najmy.id)}>Usuń</Button>
                                    </ButtonGroup></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <hr />
                <Button onClick={handleDodajNajem} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj do NajmyAPI</Button>
            </Alert>

            <hr />
            <Alert variant='dark'>
                <Alert.Heading>Data from PlatnosciAPI:</Alert.Heading>
                <Table responsive hover boarded>
                    <thead className="thead-dark">
                        <tr>
                            <th className="align-middle" scope="col">Lp.</th>
                            <th className="align-middle" scope="col">Kwota</th>
                            <th className="align-middle" scope="col">Termin Płatności</th>
                            <th className="align-middle" scope="col">Data Płatności</th>
                            <th className="align-middle" scope="col">Typ Płatności</th>
                            <th className="align-middle" scope="col">Najem</th>
                            <th className="align-middle" scope="col">Opcje</th>

                        </tr>
                    </thead>
                    <tbody>{
                        Platnosci.map(Platnosci => (
                            <tr key={Platnosci.id}>
                                <td>{Platnosci.id}</td>
                                <td>{Platnosci.kwota}</td>
                                <td>{Platnosci.terminPlatnosci}</td>
                                <td>{Platnosci.dataPlatnosci}</td>
                                <td>typ.nazwa</td>
                                <td>nr Umowy: {Platnosci.najem.numerUmowy}, okres: ({Platnosci.najem.dataPoczatku} -> {Platnosci.najem.dataZakonczona}), email: {Platnosci.najem.emailNajemcy}</td>

                                <td>
                                    <ButtonGroup aria-label="Basic example" size='sm'>
                                        <Button variant="success" style={{ marginRight: '10px' }} onClick={() => btnGetID(pa, Platnosci.id)}>Pobierz dane po id</Button>
                                        <Button variant="info" style={{ marginRight: '10px' }} onClick={() => btnEdytuj(pa, Platnosci.id)}>Edytuj</Button>
                                        <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => btnUsun(pa, Platnosci.id)}>Usuń</Button>
                                    </ButtonGroup></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <hr />
                <Button onClick={handleDodajPlatnosc} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj do PlatnosciAPI</Button>
            </Alert>

            <hr />
            <Alert variant='dark'>
                <Alert.Heading>Data from ZgloszeniaAPI:</Alert.Heading>
                <Table responsive hover boarded>
                    <thead className="thead-dark">
                        <tr>
                            <th className="align-middle" scope="col">Lp.</th>
                            <th className="align-middle" scope="col">Opis</th>
                            <th className="align-middle" scope="col">Koszt Calkowity</th>
                            <th className="align-middle" scope="col">Status</th>
                            <th className="align-middle" scope="col">Kategoria</th>
                            <th className="align-middle" scope="col">Opcje</th>

                        </tr>
                    </thead>
                    <tbody>{
                        Zgloszenia.map(Zgloszenia => (
                            <tr key={Zgloszenia.id}>
                                <td>{Zgloszenia.id}</td>
                                <td>{Zgloszenia.opis}</td>
                                <td>{Zgloszenia.kosztCalkowity}</td>
                                <td>{Zgloszenia.statusZgloszenia.nazwa}</td>
                                <td>{Zgloszenia.kategoriaZgloszenia.nazwa}</td>

                                <td>
                                    <ButtonGroup aria-label="Basic example" size='sm'>
                                        <Button variant="success" style={{ marginRight: '10px' }} onClick={() => btnGetID(za, Zgloszenia.id)}>Pobierz dane po id</Button>
                                        <Button variant="info" style={{ marginRight: '10px' }} onClick={() => btnEdytuj(za, Zgloszenia.id)}>Edytuj</Button>
                                        <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => btnUsun(za, Zgloszenia.id)}>Usuń</Button>
                                    </ButtonGroup></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <hr />
                <Button onClick={handleDodajZgloszenie} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj do ZgloszeniaAPI</Button>
            </Alert>

            <hr />
            <Alert variant='dark'>
                <Alert.Heading>Data from ZleceniaAPI:</Alert.Heading>
                <Table responsive hover boarded>
                    <thead className="thead-dark">
                        <tr>
                            <th className="align-middle" scope="col">Lp.</th>
                            <th className="align-middle" scope="col">Koszt</th>
                            <th className="align-middle" scope="col">Termin Wykonania</th>
                            <th className="align-middle" scope="col">Data Wykonania</th>
                            <th className="align-middle" scope="col">Zgloszenie</th>
                            <th className="align-middle" scope="col">Firma Podwykonawcza</th>
                            <th className="align-middle" scope="col">Opcje</th>

                        </tr>
                    </thead>
                    <tbody>{
                        Zlecenia.map(Zlecenia => (
                            <tr key={Zlecenia.id}>
                                <td>{Zlecenia.id}</td>
                                <td>{Zlecenia.koszt}</td>
                                <td>{Zlecenia.terminWykonania}</td>
                                <td>{Zlecenia.dataWykonania}</td>
                                <td>{Zlecenia.zgloszenie.opis}, koszt: {Zlecenia.zgloszenie.kosztCalkowity}</td>
                                <td>{Zlecenia.firmaPodwykonawcza.nazwa}, nr telefonu: {Zlecenia.firmaPodwykonawcza.telefon}, usługa: {Zlecenia.firmaPodwykonawcza.usluga}</td>


                                <td>
                                    <ButtonGroup aria-label="Basic example" size='sm'>
                                        <Button variant="success" style={{ marginRight: '10px' }} onClick={() => btnGetID(zla, Zlecenia.id)}>Pobierz dane po id</Button>
                                        <Button variant="info" style={{ marginRight: '10px' }} onClick={() => btnEdytuj(zla, Zlecenia.id)}>Edytuj</Button>
                                        <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => btnUsun(zla, Zlecenia.id)}>Usuń</Button>
                                    </ButtonGroup></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <hr />
                <Button onClick={handleDodajZlecenie} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj do ZleceniaAPI</Button>
            </Alert>
        </>
    )

}

export default PlikTestowyAPI
