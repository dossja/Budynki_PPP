import React from "react";
import { Button, Table, ButtonGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Header from "../Header.js";
import FormUmowa from "./FormUmowa"
import najmyAPI from "../Axios/najmyAPI";
const Umowy = () => {
    const na = new najmyAPI();
    const [Umowy, setUmowy] = React.useState([])
    const [aktualizuj, setAktualizuj] = useState(false)
    const [dodajUmowe, setDodajUmowe] = React.useState(false)

    useEffect(() => {
        setAktualizuj(false)
        getUmowy();
    }, [aktualizuj]);

    const getUmowy = () => {
        na.get()
            .then(response => {
                setUmowy(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };


    const handleDodajUmowe = () => {
        console.log("popup")
        setDodajUmowe("true")
    }

    function btnEdytuj(id) {
        console.log("BTN Edit");
        console.log(id);
    }

    function btnUsun(id) {
        console.log("BTN Delete");
        console.log(id);
    }

    return (
        <>
            <Header tytul='Umowy' par='Poniżej znajdują się umowy najmu' />
            <Button onClick={handleDodajUmowe} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj umowę</Button>
            <Table responsive hover boarded>
                <thead className="thead-dark">
                    <tr>
                        <th className="align-middle" scope="col">Lp.</th>
                        <th className="align-middle" scope="col">Numer Umowy</th>
                        <th className="align-middle" scope="col">Data Początku Umowy</th>
                        <th className="align-middle" scope="col">Data Zakończenia Umowy</th>
                        <th className="align-middle" scope="col">Email Najemcy</th>
                        <th className="align-middle" scope="col">Lokal</th>
                        {/* <th className="align-middle" scope="col">Platność</th> */}
                        <th className="align-middle" scope="col">Lokator</th>
                        {/* <th className="align-middle" scope="col">najemLokator</th>
                        <th className="align-middle" scope="col">najemZgloszenia</th> */}
                        <th className="align-middle" scope="col">Opcje</th>

                    </tr>
                </thead>
                <tbody>{
                    Umowy.map(Umowy => (
                        <tr key={Umowy.id}>
                            <td>{Umowy.id}</td>
                            <td>{Umowy.numerUmowy}</td>
                            <td>{Umowy.dataPoczatku}</td>
                            <td>{Umowy.dataZakonczona}</td>
                            <td>{Umowy.emailNajemcy}</td>
                            <td>id: {Umowy.lokal.id}, Numer Lokalu: {Umowy.lokal.numerLokalu}, Powierzchnia: {Umowy.lokal.powierzchnia} </td>
                            {/* <td>Jakiś status czy coś</td> */}
                            <td>id: {Umowy.lokator.id}, {Umowy.lokator.imie} {Umowy.lokator.nazwisko} {Umowy.lokator.PESEL} </td>
                            {/* <td>{Umowy.najemLokator}</td> */}
                            {/* <td>{Umowy.najemZgloszenia}</td> */}
                            <td>
                                <ButtonGroup aria-label="Basic example" size='sm'>
                                    {/* <Button variant="success" onClick={() => btnGetID(Umowy.id)}>Pobierz dane po id</Button> */}
                                    <Button variant="info" onClick={() => btnEdytuj(Umowy.id)}>Edytuj</Button>
                                    <Button variant="danger" onClick={() => btnUsun(Umowy.id)}>Usuń</Button>
                                </ButtonGroup></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <FormUmowa
                show={dodajUmowe}
                onHide={() => { setDodajUmowe(false); setAktualizuj(true) }} />
        </>
    )

}

export default Umowy
