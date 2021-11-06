import React from "react";
import { useState, useEffect } from 'react';
import { Button, Modal, Container, Table, ButtonGroup } from 'react-bootstrap';

import FormLokal from './FormLokal';
import FormUmowa from './FormUmowa';
import EdytujLokale from './EdytujLokale';

import nieruchomosciAPI from '../Axios/nieruchomosciAPI';
import lokaleAPI from '../Axios/lokaleAPI';
import najmyAPI from '../Axios/najmyAPI';

const LokaleModal = (props) => {
    const na = new nieruchomosciAPI();
    const la = new lokaleAPI();
    const naa = new najmyAPI();

    const [dodajLokal, setDodajLokal] = React.useState(false)
    const [dodajUmowe, setDodajUmowe] = useState(false)
    const [kontynuuj, setKontynuuj] = React.useState(false);
    const [edytujLokale, setEdytujLokale] = React.useState(false);

    const [ID, setId] = React.useState(null)


    useEffect(() => {
        getLokale();
    });

    const getLokale = () => {
        console.log(props.idNieruchomosci);
        if (props.id_nieruchomosci !== null && kontynuuj === true) {
            na.getIDLokale(props.id_nieruchomosci)
                .then(response => {
                    console.log(response.data);
                    let listaLokali = []
                    for (let i in response.data) {
                        console.log()
                        let lokal = { "id": response.data[i].id, "numerLokalu": response.data[i].numerLokalu, "powierzchnia": response.data[i].powierzchnia }
                        listaLokali.push(lokal)
                    }
                    console.log(listaLokali)
                    setLokale(listaLokali)

                    setKontynuuj(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        if (props.id_nieruchomosci === null) {
            setKontynuuj(true);
        }

    };


    const [Lokale, setLokale] = React.useState([])

    const handleDodajLokal = () => {
        setId(props.id_nieruchomosci);
        console.log("popup")
        setDodajLokal(true)
    }

    async function btnEdytuj(id) {
        console.log("BTN Edit");
        console.log(id);
        setId(id);
        setEdytujLokale(true);
    }

    async function btnUsun(id) {
        console.log("BTN Delete");
        console.log(id);
        la.deleteID(id).then(response => {
            setKontynuuj(true);
        }).catch(e => {
            console.log(e);
        });
    }
    async function btnDodajUmowe(id) {
        console.log("BTN Lokale");
        setId(id);
        setDodajUmowe(true)
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Lokale
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <>

                            <Button onClick={handleDodajLokal} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj lokal</Button>
                            <Table responsive hover boarded>
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="align-middle" scope="col">Lp.</th>
                                        <th className="align-middle" scope="col">Numer Lokalu</th>
                                        <th className="align-middle" scope="col">Powierzchnia</th>
                                        <th className="align-middle" scope="col">Umowa</th>
                                        <th className="align-middle" scope="col">Opcje</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    Lokale.map(Lokale => (
                                        <tr key={Lokale.id}>
                                            <td className="align-middle">{Lokale.id}</td>
                                            <td className="align-middle">{Lokale.numerLokalu}</td>
                                            <td className="align-middle">{Lokale.powierzchnia}</td>
                                            <td className="align-middle">{Lokale.numerUmowy}</td>
                                            <td className="align-middle">
                                                <ButtonGroup size='sm' aria-label="Basic example">
                                                    <Button className="mr-2 ml-2" variant="info" onClick={() => btnEdytuj(Lokale.id)}>Edytuj</Button>
                                                    <Button className="mr-2 ml-2" variant="danger" onClick={() => btnUsun(Lokale.id)}>Usuń</Button>
                                                    {Lokale.numerUmowy ? <Button className="mr-2 ml-2" variant="secondary" disabled >Dodaj umowę</Button> :
                                                        <Button className="mr-2 ml-2" variant="secondary" onClick={() => btnDodajUmowe(Lokale.id)}>Dodaj umowę</Button>}
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </>
                    </Container>
                </Modal.Body>
            </Modal>
            <FormLokal
                show={dodajLokal}
                onHide={() => { setDodajLokal(false); setKontynuuj(true); setId(null) }}
                idNieruchomosci={props.id_nieruchomosci} />
            <FormUmowa show={dodajUmowe}
                onHide={() => { setDodajUmowe(false); setKontynuuj(true); setId(null) }}
                idLokalu={ID}
                idNieruchomosci={props.id_nieruchomosci} />
            <EdytujLokale show={edytujLokale}
                onHide={() => { setEdytujLokale(false); setKontynuuj(true); setId(null) }}
                idLokalu={ID} />
        </>
    )

}

export default LokaleModal