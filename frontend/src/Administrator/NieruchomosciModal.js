import React from "react";
import { useEffect } from 'react';
import { Button, Modal, Container, Table, ButtonGroup } from 'react-bootstrap';

import FormNieruchomosc from './FormNieruchomosc';
import LokaleModal from './LokaleModal';
import EdytujNieruchomosc from './EdytujNieruchomosc';

import wspolnotyAPI from '../Axios/wspolnotyAPI';

const NieruchomosciModal = (props) => {
    const wa = new wspolnotyAPI();

    const [wyswietlLokale, setWyswietlLokale] = React.useState(false)
    const [dodajNieruchomosc, setDodajNieruchomosc] = React.useState(false)
    const [kontynuuj, setKontynuuj] = React.useState(false);
    const [edytujNieruchomosc, setEdytujNieruchomosc] = React.useState(false);

    const [ID, setId] = React.useState(null)


    useEffect(() => {
        getNieruchomosci();
    });

    const getNieruchomosci = () => {
        if (props.id !== null && kontynuuj === true) {
            wa.getIDNieruchomosci(props.id)
                .then(response => {
                    setNieruchomosci(response.data)

                    setKontynuuj(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        if (props.id === null) {
            setKontynuuj(true);
        }
    };

    const [Nieruchomosci, setNieruchomosci] = React.useState([])

    const handleDodajNieruchomosc = () => {
        setId(props.id);
        console.log("ID Nieruchomosci:")
        console.log(props.id)
        setDodajNieruchomosc(true)
    }

    async function btnEdytuj(id) {
        console.log("BTN Edit");
        console.log(id);
        setId(id);
        setEdytujNieruchomosc(true);
    }

    async function btnLokale(id) {
        console.log("BTN Lokale");
        setId(id);
        setWyswietlLokale(true)
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
                        Nieruchomości
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <>

                            <Button onClick={handleDodajNieruchomosc} variant='secondary' style={{ marginBottom: '10px' }}>Dodaj nieruchomość</Button>
                            <Table responsive hover boarded>
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="align-middle" scope="col">Lp.</th>
                                        <th className="align-middle" scope="col">Cena m2</th>
                                        <th className="align-middle" scope="col">Kwota opłaty administracyjnej</th>
                                        <th className="align-middle" scope="col">Adres</th>
                                        <th className="align-middle" scope="col">Opcje</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    Nieruchomosci.map(Nieruchomosci => (
                                        <tr key={Nieruchomosci.id}>
                                            <td className="align-middle">{Nieruchomosci.id}</td>
                                            <td className="align-middle">{Nieruchomosci.cenaM2}</td>
                                            <td className="align-middle">{Nieruchomosci.kwotaOplatyAdm} zł/msc</td>
                                            <td className="align-middle">{Nieruchomosci.adres.ulica} {Nieruchomosci.adres.numerBudynku}, {Nieruchomosci.adres.miejscowosc}</td>
                                            <td className="align-middle">
                                                <ButtonGroup size='sm' aria-label="Basic example">
                                                    <Button className="mr-2 ml-2" variant="info" onClick={() => btnEdytuj(Nieruchomosci.id)}>Edytuj</Button>
                                                    <Button className="mr-2 ml-2" variant="secondary" onClick={() => btnLokale(Nieruchomosci.id)}>Lokale</Button>
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
            <FormNieruchomosc
                show={dodajNieruchomosc}
                onHide={() => { setDodajNieruchomosc(false); setKontynuuj(true); setId(null) }}
                id_wspolnoty={ID} />
            <LokaleModal
                show={wyswietlLokale}
                onHide={() => { setWyswietlLokale(false); setKontynuuj(true); setId(null) }}
                id_nieruchomosci={ID} />
            <EdytujNieruchomosc
                show={edytujNieruchomosc}
                onHide={() => { setEdytujNieruchomosc(false); setKontynuuj(true); setId(null) }}
                id_nieruchomosci={ID} />
        </>
    )

}

export default NieruchomosciModal