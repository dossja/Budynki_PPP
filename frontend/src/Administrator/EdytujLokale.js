//plik roboczy
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Form, FormGroup, Row, Col, Container } from 'react-bootstrap'

import lokaleAPI from '../Axios/lokaleAPI';

const EdytujLokale = (props) => {
    const la = new lokaleAPI();
    const [form, setForm] = React.useState([])
    const [validated, setValidated] = useState(false);
    const [lokale, setLokale] = React.useState([])
    const [kontynuuj, setKontynuuj] = React.useState([]);
    // const [aktualizuj, setAktualizuj] = useState(false);
    //initWspolnota();
    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        getLokalID();
    })

    const getLokalID = () => {
        if (props.idLokalu !== null && kontynuuj === true) {
            la.getID(props.idLokalu)
                .then(response => {
                    setLokale(response.data);
                    console.log(lokale);
                    setKontynuuj(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        if (props.idLokalu === null && kontynuuj === false) {
            setForm([])
            setLokale([])
        }

        if (props.idLokalu === null) {
            setKontynuuj(true);
        }

    };

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
            setValidated(true)
            let data = {}
            // Komentarz: Jest mi wstyd, że to robię, ale inaczej nie umiem :/
            if (!form.id) {
                data.id = lokale.id
            }
            else { data.id = form.id }
            if (!form.numerLokalu) {
                data.numerLokalu = lokale.numerLokalu
            }
            else { data.numerLokalu = form.numerLokalu }
            if (!form.powierzchnia) {
                data.powierzchnia = lokale.powierzchnia
            }
            else { data.powierzchnia = form.powierzchnia }

            console.log(data);
            la.put(props.idLokalu, { data }).then(resp => {
                props.onHide();
                setValidated(false);
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
                        Edytuj Lokal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>

                            <Form.Label style={{ fontSize: '20px' }}>Dane ogólne</Form.Label>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Numer Lokalu</Form.Label>
                                        <Form.Control name="numerLokalu" required pattern="[0-9-]+" defaultValue={lokale.numerLokalu} placeholder="22" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane lub podany numer jest niepoprawny
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup controlId="powierzchnia">
                                        <Form.Label>Powierzchnia</Form.Label>
                                        <Form.Control required pattern="[0-9]*[.]?[0-9]+" defaultValue={lokale.powierzchnia} name="powierzchnia" placeholder="50.5" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane lub podana wartość jest niepoprawna
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>

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

export default EdytujLokale