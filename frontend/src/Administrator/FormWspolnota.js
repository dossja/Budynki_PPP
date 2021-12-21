import React from "react";
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Form, FormGroup, Row, Col, Container } from 'react-bootstrap'

import wspolnotyAPI from '../Axios/wspolnotyAPI';

const FormWspolnota = (props) => {
    const wa = new wspolnotyAPI();
    const defaultEmpty = {
        nazwa: '',
        NIP: '',
        REGON: '',
        email: "",
        telefon: "",
        ulica: "",
        numerBudynku: "",
        miejscowosc: ""
    }
    const [validated, setValidated] = useState(false);
    const [form, setForm] = React.useState(defaultEmpty)
    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    // useEffect(()=>{
    //     form ? setForm(form): setForm(defaultEmpty)
    // }, [form])

    const handleZapisz = (event) => {
        event.preventDefault();
        console.log(form)
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            console.log('invalid')
        }
        else {
            console.log('valid')
            setValidated(true);
            wa.post({
                'nazwa': form.nazwa, "NIP": form.NIP, "REGON": form.REGON, "email": form.email, "telefon": form.telefon, "adres": { "ulica": form.ulica, "numerBudynku": form.numerBudynku, "miejscowosc": form.miejscowosc }
            }).then(() => { setForm(defaultEmpty); setValidated(false); props.onHide() }).catch(e => {
                console.log(e);
            });
        }

    }
    const handleAnuluj = (props) => {
        setForm(defaultEmpty)
        setValidated(false)
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
                        Nowa Wspólnota
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
                                        <Form.Control required pattern=".{2,}" name="nazwa" placeholder="Wspólnota Mieszkaniowa Bukaj" onChange={updatePole} />
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
                                        <Form.Control required pattern="[0-9]{10}" name="NIP" placeholder="0123456789" onChange={updatePole} />
                                    </FormGroup>
                                    <Form.Control.Feedback type="invalid">
                                        NIP powinien składać się z 10 cyfr
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="regon">
                                        <Form.Label>REGON</Form.Label>
                                        <Form.Control name="REGON" pattern="[0-9]{9}|[0-9]{14}" placeholder="01234567890" onChange={updatePole} />
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
                                        <Form.Control required name='email' pattern="\w+@\w+.\w+" type="email" placeholder="wspolnota@ws.pl" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Podany adres jest niepoprawny
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="telefon">
                                        <Form.Label>Telefon</Form.Label> {/* poprawić regex telefonu*/}
                                        <Form.Control required name="telefon" pattern="^(?:0|\(\d{2})?\s?\d{2}\s?)[1-79](?:[\.\-\s]?\d\d){4}$" placeholder="+48 678584846" onChange={updatePole} />
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
                                            <Form.Control required name="ulica" placeholder="ul. Niepodległości" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Podana ulica jest niepoprawna
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup>
                                            <Form.Label>Numer budynku</Form.Label>
                                            <Form.Control required name="numerBudynku" placeholder="4a" pattern="[0-9]+[a-zA-Z]?" onChange={updatePole} />
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
                                            <Form.Control name="miejscowosc" required pattern="[a-zA-ZĄąćĆŚśŻżŹźŃńŁłó]{3,20}" placeholder="Gliwice" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Podana miejscowość jest niepoprawna
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                </Row>
                            </FormGroup>

                            <Modal.Footer>
                                <Button type="submit">Zapisz</Button>
                                <Button onClick={props.onHide} onClickCapture={handleAnuluj}>Anuluj</Button>
                            </Modal.Footer>
                        </Form>
                    </Container>
                </Modal.Body>

            </Modal>
        </>
    )

}

export default FormWspolnota