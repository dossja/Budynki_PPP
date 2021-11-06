//plik roboczy
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Form, FormGroup, Row, Col, Container } from 'react-bootstrap'

import wspolnotyAPI from '../Axios/wspolnotyAPI';

const EdytujWspolnote = (props) => {
    const wa = new wspolnotyAPI();
    const [form, setForm] = React.useState([])
    const [validated, setValidated] = useState(false);
    const [wspolnota, setWspolnota] = React.useState([])
    const [kontynuuj, setKontynuuj] = React.useState([]);
    const [adres, setAdres] = React.useState(false);

    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        getWspolnotaID();
    })

    const getWspolnotaID = () => {
        console.log(props.id);
        if (props.id !== null && kontynuuj === true) {
            wa.getID(props.id)
                .then(response => {
                    console.log(`response w get wspolnoty id: ${response}`)
                    setWspolnota(response.data);
                    setForm(response.data);

                    const nowyAdres = { "id": wspolnota.adres.id, "ulica": wspolnota.adres.ulica, "miejscowosc": wspolnota.adres.miejscowosc, "numerBudynku": wspolnota.adres.numerBudynku };
                    setAdres(nowyAdres);
                    setKontynuuj(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        if (props.id === null && kontynuuj === false) {
            setForm([])
            setAdres([])
            setWspolnota([])
        }

        if (props.id === null) {
            console.log(kontynuuj);
            setKontynuuj(true);
        }

    };
    // useEffect(()=>{
    //     console.log('wchodzi w efekt')
    //     form.id ? form.id=form.id : setForm(defaultWspolnota)
    // }, [form])

    const handleZapisz = (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            event.preventDefault();
            console.log('invalid');
            setValidated(true);
        }
        else {
            console.log('valid')
            setValidated(true);
            let data = {}
            // Komentarz: Jest mi wstyd, że to robię, ale inaczej nie umiem :/
            if (!form.id) {
                data.id = wspolnota.id
            }
            else { data.id = form.id }
            if (!form.nazwa) {
                data.nazwa = wspolnota.nazwa
            }
            else { data.nazwa = form.nazwa }
            if (!form.NIP) {
                data.NIP = wspolnota.NIP
            }
            else { data.NIP = form.NIP }
            if (!form.REGON) {
                data.REGON = wspolnota.REGON
            }
            else { data.REGON = form.REGON }
            if (!form.email) {
                data.email = wspolnota.email
            }
            else { data.email = form.email }
            if (!form.telefon) {
                data.telefon = wspolnota.telefon
            }
            else { data.telefon = form.telefon }

            let adresWspolnoty = {}
            adresWspolnoty.id = adres.id;
            if (!form.ulica) {
                adresWspolnoty.ulica = adres.ulica
            }
            else { adresWspolnoty.ulica = form.ulica }
            if (!form.numerBudynku) {
                adresWspolnoty.numerBudynku = adres.numerBudynku
            }
            else { adresWspolnoty.numerBudynku = form.numerBudynku }
            if (!form.miejscowosc) {
                adresWspolnoty.miejscowosc = adres.miejscowosc
            }
            else { adresWspolnoty.miejscowosc = form.miejscowosc }

            data.adres = adresWspolnoty;

            console.log(data);
            wa.put(props.id,
                data
            ).then(resp => {
                props.onHide();
                setForm([]);
                setValidated(false);
            });
        }

    }

    //const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


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
                        Edytuj Wspólnotę
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>

                            <Form.Label style={{ fontSize: '20px' }}>Dane ogólne</Form.Label>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Nazwa</Form.Label>
                                        <Form.Control name="nazwa" defaultValue={wspolnota.nazwa} required pattern=".{2,}" valuename="nazwa" placeholder="Wspólnota Mieszkaniowa Bukaj" onChange={updatePole} />
                                    </FormGroup>
                                    <Form.Control.Feedback type="invalid">
                                        Pole jest wymagane
                                    </Form.Control.Feedback>
                                </div>
                            </Row>
                            <Row>
                                <div className="col">
                                    <FormGroup controlId="nip">
                                        <Form.Label>NIP</Form.Label>
                                        <Form.Control defaultValue={wspolnota.NIP} required pattern="[0-9]{10}" name="NIP" placeholder="0123456789" onChange={updatePole} />
                                    </FormGroup>
                                    <Form.Control.Feedback type="invalid">
                                        NIP powinien składać się z 10 cyfr
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="regon">
                                        <Form.Label>REGON</Form.Label>

                                        <Form.Control defaultValue={wspolnota.REGON} name="REGON" pattern="[0-9]{9}|[0-9]{14}" placeholder="01234567890" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            REGON powinien składać się z 9 lub 14 cyfr
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col">
                                    <FormGroup controlId="email">
                                        <Form.Label>Adres e-mail</Form.Label>
                                        <Form.Control defaultValue={wspolnota.email} name='email' pattern="\w+@\w+.\w+" type="email" placeholder="wspolnota@ws.pl" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Podany adres jest niepoprawny
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="telefon">
                                        <Form.Label>Telefon</Form.Label> {/* poprawić regex telefonu*/}
                                        <Form.Control defaultValue={wspolnota.telefon} name="telefon" pattern="(/+)?[0-9]{9,15}" laceholder="678584846" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Podany telefon jest niepoprawny
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>

                            <FormGroup>
                                <Form.Label style={{ fontSize: '20px' }}>Adres siedziby</Form.Label>
                                <Row>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Ulica</Form.Label>
                                            <Form.Control defaultValue={adres.ulica} required name="ulica" placeholder="ul. Niepodległości" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Podana ulica jest niepoprawna
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup>
                                            <Form.Label>Numer budynku</Form.Label>
                                            <Form.Control defaultValue={adres.numerBudynku} required name="numerBudynku" placeholder="4a" pattern="[0-9]+[a-zA-Z]?" onChange={updatePole} />
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
                                            <Form.Control defaultValue={adres.miejscowosc} name="miejscowosc" required pattern="[a-zA-ZĄąćĆŚśŻżŹźŃńŁłó]{3,20}" placeholder="Gliwice" onChange={updatePole} />
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

export default EdytujWspolnote