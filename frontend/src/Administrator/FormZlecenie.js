// TODO: dodanie firmy nowej? czy te firmy wyswietlac osobno?
// Raczej lista firm dostępnych?
import React from "react";
import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Form, FormGroup, Row, Col, Container } from 'react-bootstrap'

import zleceniaAPI from '../Axios/zleceniaAPI';
import zgloszeniaAPI from "../Axios/zgloszeniaAPI";
import firmyPodwykonawczeAPI from "../Axios/firmyPodwykonawczeAPI";

const FormZlecenie = (props) => {
    const zla = new zleceniaAPI();
    const zga = new zgloszeniaAPI();
    const fpa = new firmyPodwykonawczeAPI();

    const defaultEmpty = {}
    const [kontynuuj, setKontynuuj] = useState(true)
    const [validated, setValidated] = useState(false);
    const [form, setForm] = React.useState(defaultEmpty)
    const [firmyPodwykonawcze, setFirmyPodwykonawcze] = React.useState([])
    const [nowaFirma, setNowaFirma] = React.useState(false);

    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        // form ? setForm(form) : setForm(defaultEmpty)
        getFirmyPodwykonawczeAPI();
    }, [form])

    const getFirmyPodwykonawczeAPI = () => {
        if (kontynuuj === true) {
            fpa.get().then(response => {
                console.log(response.data);
                setFirmyPodwykonawcze(response.data);
                setKontynuuj(false);
            }).catch(e => {
                console.log(e);
            });
        }
    }

    const handleAnuluj = (props) => {
        setForm({})
        setValidated(false)
    }

    const handleZapisz = (event) => {
        event.preventDefault();
        console.log("Handle zapisz:")
        console.log(form);
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            event.preventDefault();
            setValidated(true)
            console.log('invalid')
        }
        else {
            console.log('valid')
            console.log(form)
            setValidated(true);
            if (form.firmaPodwykonawcza) {
                fpa.getID(form.firmaPodwykonawcza).then(responseFirmy => {
                    console.log(responseFirmy.data)
                    zga.getID(props.idZgloszenia).then(responseZgloszenia => {
                        const dane = {
                            "koszt": form.koszt, "terminWykonania": form.terminWykonania, "dataWykonania": "1900-01-01", "zgloszenie": responseZgloszenia.data, "firmaPodwykonawcza": responseFirmy.data
                        }
                        console.log(dane)
                        zla.post(dane).then(() => { setForm(defaultEmpty); setValidated(false); props.onHide(); setNowaFirma(false) });
                    })

                })
            }
            else {
                const firma = { "nazwa": form.nazwa, "usluga": form.usluga, "telefon": form.numerTelefonu };
                fpa.post(firma).then(resp => {
                    fpa.getNewest().then(responseFirmy => {
                        console.log(responseFirmy.data)

                        zga.getID(props.idZgloszenia).then(responseZgloszenia => {
                            const dane = {
                                "koszt": form.koszt, "terminWykonania": form.terminWykonania, "dataWykonania": "1900-01-01", "zgloszenie": responseZgloszenia.data, "firmaPodwykonawcza": responseFirmy.data
                            }
                            console.log(dane)
                            zla.post(dane).then(() => { setForm(defaultEmpty); setValidated(false); props.onHide(); setNowaFirma(false) }).catch(e => {
                                console.log(e);
                            });;
                        }).catch(e => {
                            console.log(e);
                        });
                    }).catch(e => {
                        console.log(e);
                    });
                }).catch(e => {
                    console.log(e);
                });
            }




            // console.log(dane)

        }

    }

    const change = () => {
        setNowaFirma(!nowaFirma)
        console.log(nowaFirma)
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
                        Nowe Zlecenie
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
                                        <Form.Control required pattern="{[0-9]+}|{[0-9],[0-9]}" name="koszt" placeholder="50.50" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                    </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Termin wykonania</Form.Label>
                                        <Form.Control required type="date" name="terminWykonania" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                    </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>
                            <hr />
                            <FormGroup>
                                <Form.Label style={{ fontSize: '20px' }}>Firma</Form.Label>
                                <Form.Check onChange={change} label='Dodaję nową firmę.' />
                                <hr />
                                <div className="col">
                                    <FormGroup>
                                        <Form.Control as='select' required name='firmaPodwykonawcza' disabled={nowaFirma} custom onChange={updatePole} className="mt-2 mb-2" >
                                            <option value=''>Wybierz...</option>
                                            {
                                                firmyPodwykonawcze.map(firmyPodwykonawcze => (
                                                    <option value={firmyPodwykonawcze.id}>{firmyPodwykonawcze.nazwa}, usługa: {firmyPodwykonawcze.usluga}</option>
                                                ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type='invalid'>Należy wybrać firmę</Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <hr />
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Nazwa:</Form.Label>
                                        <Form.Control name="nazwa" disabled={!nowaFirma} required placeholder="Firma Stolarska" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                            </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <Row>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Usługa:</Form.Label>
                                            <Form.Control name="usluga" disabled={!nowaFirma} required placeholder="stolarka" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Pole jest wymagane
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Numer telefonu:</Form.Label>
                                            <Form.Control name="numerTelefonu" disabled={!nowaFirma} required pattern="[0-9]{9}" placeholder="123456789" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Numer telefonu powinien składać się z 9 cyfr
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

export default FormZlecenie
