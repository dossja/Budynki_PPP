import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal, Form, FormGroup, Container } from 'react-bootstrap'

import lokatorzyAPI from "../Axios/lokatorzyAPI";
import najmyAPI from "../Axios/najmyAPI";
import najmyLokatorzyAPI from "../Axios/najmyLokatorzyAPI";

const Lokator = (props) => {
    const la = new lokatorzyAPI();
    const na = new najmyAPI();
    const nla = new najmyLokatorzyAPI();

    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(
        {
            imie: '',
            nazwisko: '',
            PESEL: ''
        }
    )
    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {

    }, [form])

    const handleZapisz = (event) => {
        event.preventDefault();
        console.log(props);
        console.log(form)
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            setValidated(true)
            event.preventDefault();
            console.log("invalid")
        }
        else {
            console.log("valid")
            setValidated(true);

            const dane = { "imie": form.imie, "nazwisko": form.nazwisko, "PESEL": form.PESEL }

            la.post(dane).then(resp => {
                console.log(resp.data)
                na.getID(props.idNajmu).then(response => {
                    const najem = { "id": response.data.id, "numerUmowy": response.data.numerUmowy, "dataPoczatku": response.data.dataPoczatku, "dataZakonczona": response.data.dataZakonczona, "emailNajemcy": response.data.emailNajemcy }

                    const danePost = { "lokator": resp.data, "najem": najem }
                    nla.post(danePost);
                })
            }).then(resp => {
                props.onHide();
                setValidated(false);
            })



            props.onHide()
        }
    }


    const handleAnuluj = (props) => {
        setForm({})
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
                        Nowy Lokator
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>
                            <div className="row">
                                <div className="col">
                                    <FormGroup controlId="imie">
                                        <Form.Label>Imię</Form.Label>
                                        <Form.Control required name="imie" placeholder="Jan" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Imię powinno rozpoczynać się wielką literą i składać z co najmniej 3 liter
                                    </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="nazwisko">
                                        <Form.Label>Nazwisko</Form.Label>
                                        <Form.Control name='nazwisko' required placeholder="Kowalski" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid" >
                                            Nazwisko powinno składać się z co najmniej 3 znaków
                                    </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="pesel">
                                        <Form.Label>PESEL</Form.Label>
                                        <Form.Control name='PESEL' required placeholder="01234567890" onChange={updatePole} pattern="[0-9]{11}" />
                                        <Form.Control.Feedback type="invalid">
                                            PESEL powinien składać się z 11 cyfr
                                    </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </div>

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

export default Lokator
