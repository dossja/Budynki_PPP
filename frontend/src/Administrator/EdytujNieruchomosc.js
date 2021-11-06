import React from "react";
import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Form, FormGroup, Row, Col, Container } from 'react-bootstrap'

import nieruchomosciAPI from '../Axios/nieruchomosciAPI';
import adresyAPI from '../Axios/adresyAPI';

const EdytujNieruchomosc = (props) => {
    const na = new nieruchomosciAPI();
    const a = new adresyAPI();
    // const defaultEmpty = {}
    const [form, setForm] = React.useState([]);
    const [validated, setValidated] = useState(false);
    const [nieruchomosc, setNieruchomosc] = React.useState([]);
    const [kontynuuj, setKontynuuj] = React.useState([]);
    const [adres, setAdres] = React.useState(false);
    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    // useEffect(()=>{
    //     form ? setForm(form): setForm(defaultEmpty)
    // }, [form])
    // const handleAnuluj = (props) => {
    //     setForm({})
    //     setValidated(false)
    // }
    useEffect(() => {
        getNieruchomoscID();
    })

    const getNieruchomoscID = () => {
        console.log(props.id_nieruchomosci);
        if (props.id_nieruchomosci !== null && kontynuuj === true) {
            na.getID(props.id_nieruchomosci)
                .then(response => {
                    console.log(`response w get nieruchomosc id: ${response}`)
                    setNieruchomosc(response.data);
                    console.log(nieruchomosc);
                    console.log(nieruchomosc.adres)
                    const nowyAdres = { "id": nieruchomosc.adres.id, "ulica": nieruchomosc.adres.ulica, "miejscowosc": nieruchomosc.adres.miejscowosc, "numerBudynku": nieruchomosc.adres.numerBudynku };
                    console.log(nowyAdres);
                    setAdres(nowyAdres);
                    console.log(adres);
                    setKontynuuj(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        if (props.id_nieruchomosci === null && kontynuuj === false) {
            setForm([])
            setAdres([])
            setNieruchomosc([])
        }

        if (props.id_nieruchomosci === null) {
            console.log(kontynuuj);
            setKontynuuj(true);
        }

    };

    const handleZapisz = (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            event.preventDefault();
            console.log('invalid');
            setValidated(true)
        }
        else {
            console.log('valid');
            setValidated(true)
            let data = {};
            if (!form.id) {
                data.id = nieruchomosc.id;
            }
            else { data.id = form.id }
            if (!form.cenaM2) {
                data.cenaM2 = nieruchomosc.cenaM2;
            }
            else { data.cenaM2 = form.cenaM2 }
            if (!form.kwotaOplatyAdm) {
                data.kwotaOplatyAdm = nieruchomosc.kwotaOplatyAdm;
            }
            else { data.kwotaOplatyAdm = form.kwotaOplatyAdm }
            let adresNieruchomosci = {}
            adresNieruchomosci.id = adres.id;
            if (!form.ulica) {
                adresNieruchomosci.ulica = adres.ulica
            }
            else { adresNieruchomosci.ulica = form.ulica }
            if (!form.numerBudynku) {
                adresNieruchomosci.numerBudynku = adres.numerBudynku
            }
            else { adresNieruchomosci.numerBudynku = form.numerBudynku }
            if (!form.miejscowosc) {
                adresNieruchomosci.miejscowosc = adres.miejscowosc
            }
            else { adresNieruchomosci.miejscowosc = form.miejscowosc }

            data.adres = adresNieruchomosci;
            a.put(adres.id, data.adres).then(resp => {
                data.adres_id = adresNieruchomosci.id;
                data.wspolnota_id = nieruchomosc.wspolnota.id;
                console.log(data);
                na.put(props.id_nieruchomosci,
                    data
                ).then(resp => {
                    props.onHide();
                    setValidated(false);
                })
            })


        }
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
                        Edytuj Nieruchomość
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>

                            <Form.Label style={{ fontSize: '20px' }}>Dane ogólne</Form.Label>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Cena za m2</Form.Label>
                                        <Form.Control required pattern="{[0-9]+}|{[0-9],[0-9]}" defaultValue={nieruchomosc.cenaM2} name="cenaM2" placeholder="22.35" onChange={updatePole} />
                                    </FormGroup>
                                    <Form.Control.Feedback type="invalid">
                                        Pole jest wymagane
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Kwota opłaty administracyjnej</Form.Label>
                                        <Form.Control required name="kwotaOplatyAdm" defaultValue={nieruchomosc.kwotaOplatyAdm} pattern="{[0-9]+}|{[0-9],[0-9]}" placeholder="150.50" onChange={updatePole} />
                                    </FormGroup>
                                    <Form.Control.Feedback type="invalid">
                                        Pole jest wymagane
                                    </Form.Control.Feedback>
                                </div>
                            </Row>

                            <FormGroup>
                                <Form.Label style={{ fontSize: '20px' }}>Adres nieruchomości</Form.Label>
                                <Row>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Ulica</Form.Label>
                                            <Form.Control required name="ulica" defaultValue={adres.ulica} placeholder="ul. Niepodległości" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Podana ulica jest niepoprawna
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup>
                                            <Form.Label>Numer budynku</Form.Label>
                                            <Form.Control required name="numerBudynku" defaultValue={adres.numerBudynku} placeholder="4a" pattern="[0-9]+[a-zA-Z]?" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Podany numer budynku jest niepoprawny
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col">
                                        <FormGroup controlId="regon">
                                            <Form.Label>Miejscowość</Form.Label>
                                            <Form.Control name="miejscowosc" defaultValue={adres.miejscowosc} required pattern="[a-zA-ZĄąćĆŚśŻżŹźŃńŁłó]{3,20}" placeholder="Gliwice" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Podana miejscowość jest niepoprawna
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                </Row>
                            </FormGroup>

                            <Modal.Footer>
                                <Button type="submit">Zapisz</Button>
                                <Button onClick={props.onHide}>Anuluj</Button>
                            </Modal.Footer>
                        </Form>
                    </Container>
                </Modal.Body>

            </Modal>
        </>
    )

}

export default EdytujNieruchomosc
