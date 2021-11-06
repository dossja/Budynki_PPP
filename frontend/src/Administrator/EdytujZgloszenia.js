import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal, Form, FormGroup, Row, Container } from 'react-bootstrap'
import zgloszeniaAPI from '../Axios/zgloszeniaAPI'

const EdytujZgloszenia = (props) => {
    const zga = new zgloszeniaAPI();
    const [kontynuuj, setKontynuuj] = React.useState([]);
    const [kategoria_zgloszenia, setKategoria] = React.useState(false);
    const [Zgloszenia, setZgloszenia] = React.useState([])
    const [validated, setValidated] = useState(false);
    const [form, setForm] = React.useState([]);

    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        getZgloszenia();
    });


    const getZgloszenia = () => {
        if (props.id !== null && kontynuuj === true) {
            zga.getID(props.id)
                .then(response => {
                    console.log(response.data)
                    setZgloszenia(response.data);
                    const nowaKategoria = { "id": Zgloszenia.kategoriaZgloszenia.id, "nazwa": Zgloszenia.kategoriaZgloszenia.nazwa };
                    setKategoria(nowaKategoria);
                    setKontynuuj(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        if (props.id === null && kontynuuj === false) {
            setForm([])
            setZgloszenia([])
            setKategoria([])
        }

        if (props.id === null) {
            setKontynuuj(true);
        }
    };


    const handleZapisz = (event) => {
        event.preventDefault();
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            console.log('invalid');
            console.log(form)
        }
        else {
            setValidated(true);
            console.log('valid');
            let data = {};
            if (!form.id) {
                data.id = Zgloszenia.id;
            }
            else { data.id = form.id }
            if (!form.opis) {
                data.opis = Zgloszenia.opis;
            }
            else { data.opis = form.opis }
            if (!form.kosztCalkowity) {
                data.kosztCalkowity = Zgloszenia.kosztCalkowity;
            }
            else { data.kosztCalkowity = form.kosztCalkowity }
            let kategoriaZgloszenia = {}
            kategoriaZgloszenia.id = kategoria_zgloszenia.id;
            if (!form.nazwa) {
                kategoriaZgloszenia.nazwa = kategoria_zgloszenia.nazwa
            }
            else { kategoriaZgloszenia.nazwa = form.nazwa }
            data.kategoriaZgloszenia = kategoriaZgloszenia;
            zga.put(props.id,
                data
            ).then(props.onHide())
                .catch(e => {
                    console.log(e);
                });
            props.onHide();
            setValidated(false);
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
                        Edytuj Zgłoszenie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Opis zgłoszenia</Form.Label>
                                        <Form.Control required defaultValue={Zgloszenia.opis} name="opis" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Podany opis jest niepoprawny
                                            </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Kategoria zgłoszenia</Form.Label>
                                        <Form.Control required name="kategoria" disabled defaultValue={kategoria_zgloszenia.nazwa} onChange={updatePole} />
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Koszt całkowity</Form.Label>
                                        <Form.Control disabled pattern="{[0-9]+}|{[0-9],[0-9]}" name="kosztCalkowity" defaultValue={Zgloszenia.kosztCalkowity} onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Podany koszt jest niepoprawny
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

export default EdytujZgloszenia