// TODO: dodanie firmy nowej? czy te firmy wyswietlac osobno?
import React from "react";
import { useState, useEffect } from 'react';
import { Button, Modal, Form, FormGroup, Row, Col, Container } from 'react-bootstrap';

import zleceniaAPI from '../Axios/zleceniaAPI';

const EdytujZlecenie = (props) => {
    const zla = new zleceniaAPI();

    const defaultEmpty = {}
    const [kontynuuj, setKontynuuj] = useState(true)
    const [validated, setValidated] = useState(false);
    const [form, setForm] = React.useState(defaultEmpty)
    const [zlecenia, setZlecenia] = React.useState([]);
    const [firma, setFirma] = React.useState([]);

    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        getZlecenia();
    })

    const getZlecenia = () => {
        if (props.idZlecenia !== null && kontynuuj === true) {
            zla.getID(props.idZlecenia)
                .then(response => {
                    setKontynuuj(false)

                    setZlecenia(response.data)
                    setForm(response.data)

                    setFirma(response.data.firmaPodwykonawcza)
                })
                .catch(e => {
                    console.log(e);
                });
        }

        if (props.idZlecenia === null && kontynuuj === false) {
            setForm([])
            setZlecenia([])
        }

        if (props.idZlecenia === null) {
            setKontynuuj(true);
        }
    };

    const handleAnuluj = (props) => {
        setForm([])
        setValidated(false)
    }

    const handleZapisz = (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            event.preventDefault();
            setValidated(true)
            console.log('invalid')
        }
        else {
            console.log('valid')
            setValidated(true);
            const dane = { "id": form.id, "koszt": form.koszt, "terminWykonania": form.terminWykonania, "dataWykonania": form.dataWykonania }
            zla.put(form.id, dane).then(resp => {
                props.onHide();
                setValidated(false);
            })

            props.onHide()
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
                        Edytuj Zlecenie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>

                            <Form.Label style={{ fontSize: '20px' }}>Dane</Form.Label>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Koszt</Form.Label>
                                        <Form.Control required pattern="{[0-9]+}|{[0-9],[0-9]}" name="koszt" placeholder="50.50" onChange={updatePole} defaultValue={zlecenia.koszt} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                    </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Termin wykonania</Form.Label>
                                        <Form.Control required type="date" name="terminWykonania" onChange={updatePole} defaultValue={zlecenia.terminWykonania} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                    </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>
                            <hr />
                            <FormGroup>
                                <Form.Label style={{ fontSize: '20px' }}>Firma</Form.Label>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Nazwa:</Form.Label>
                                        <Form.Control name="nazwa" disabled defaultValue={firma.nazwa} />
                                    </FormGroup>
                                </div>
                                <Row>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Usługa:</Form.Label>
                                            <Form.Control name="usluga" disabled defaultValue={firma.usluga} />
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Numer telefonu:</Form.Label>
                                            <Form.Control name="telefon" disabled defaultValue={firma.telefon} />
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

export default EdytujZlecenie
