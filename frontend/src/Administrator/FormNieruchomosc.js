import React from "react";
import { useState } from 'react'
import { Button, Modal, Form, FormGroup, Row, Container } from 'react-bootstrap'

import nieruchomosciAPI from '../Axios/nieruchomosciAPI';

const FormNieruchomosc = (props) => {
    const na = new nieruchomosciAPI();
    const defaultEmpty = {}
    const [validated, setValidated] = useState(false);
    const [form, setForm] = React.useState(defaultEmpty)
    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleAnuluj = (props) => {
        setForm({})
        setValidated(false)
    }

    const handleZapisz = (event) => {
        console.log(props.id_wspolnoty)
        event.preventDefault();
        console.log("Handle zapisz:")
        console.log(form);
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            console.log('invalid')
        }
        else {
            console.log('valid')
            setValidated(true);
            na.post({
                "cenaM2": form.cenaM2, "kwotaOplatyAdm": form.kwotaOplatyAdm, "miejscowosc": form.miejscowosc, "numerBudynku": form.numerBudynku, "ulica": form.ulica, "wspolnota_id": props.id_wspolnoty
            }).then(() => { setForm(defaultEmpty); setValidated(false); props.onHide() });
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
                        Nowa Nieruchomość
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
                                        <Form.Control required pattern="[0-9]+(\\.[0-9][0-9]?)?" name="cenaM2" placeholder="22.35" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane lub podana cena jest niepoprawna
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>

                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Kwota opłaty administracyjnej</Form.Label>
                                        <Form.Control required name="kwotaOplatyAdm" pattern="[0-9]+(\\.[0-9][0-9]?)?" placeholder="150.50" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane lub podana kwota jest niepoprawna
                                        </Form.Control.Feedback>
                                    </FormGroup>

                                </div>
                            </Row>

                            <FormGroup>
                                <Form.Label style={{ fontSize: '20px' }}>Adres nieruchomości</Form.Label>
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

export default FormNieruchomosc
