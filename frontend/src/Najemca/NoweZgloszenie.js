import React from "react";
import { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Modal, Container } from 'react-bootstrap';

import zgloszeniaAPI from "../Axios/zgloszeniaAPI";
import najmyZgloszeniaAPI from "../Axios/najmyZgloszeniaAPI";
import najmyAPI from "../Axios/najmyAPI";


const NoweZgloszenie = (props) => {
    const na = new najmyAPI();
    const za = new zgloszeniaAPI();
    const nza = new najmyZgloszeniaAPI();

    const [kontynuuj, setKontynuuj] = React.useState(false);
    const [validated, setValidated] = useState(false);
    const [listaNajmow, setListaNajmow] = useState([]);
    const [form, setForm] = useState({})

    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        getNajmy();
    });

    const getNajmy = () => {
        console.log(props.idNajmu)
        if (props.idNajmu !== null && kontynuuj === true) {
            na.get().then(responseNajmy => {
                const najmyUzytkownika = []
                for (let i in responseNajmy.data) {
                    for (let j in props.idNajmu) {
                        if (responseNajmy.data[i].id === props.idNajmu[j]) {
                            const nowyNajem = { "id": responseNajmy.data[i].id, "numerUmowy": responseNajmy.data[i].numerUmowy }
                            console.log(nowyNajem)
                            najmyUzytkownika.push(nowyNajem)
                        }
                    }
                }
                console.log(najmyUzytkownika)
                setListaNajmow(najmyUzytkownika);
            })
            setKontynuuj(false);

        }

        if (props.idNajmu === null && kontynuuj === false) {
            setForm([])
            setListaNajmow([])
        }

        if (props.idNajmu === null) {
            setKontynuuj(true);
        }
    }

    const handleZapisz = (event) => {
        event.preventDefault();
        console.log(props)
        console.log(form)
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            console.log("invalid")
            // event.stopPropagation();
        }
        else {
            console.log("valid")
            setValidated(true);

            let id_kategoria;

            if (form.kategoria === "usterka")
                id_kategoria = 1;
            else if (form.kategoria === "remont")
                id_kategoria = 2;
            else if (form.kategoria === "budynek")
                id_kategoria = 3;

            const dane = { "opis": form.tytul, "kosztCalkowity": 0, "statusZgloszenia": { "id": 1, "nazwa": "oczekujace" }, "kategoriaZgloszenia": { "id": id_kategoria, "nazwa": form.kategoria } }

            za.post(dane).then(resp => {
                za.getNewest().then(response => {
                    console.log(response.data.id)
                    const zgloszenie = { "id": response.data.id, "opis": response.data.opis, "kosztCalkowity": response.data.kosztCalkowity }
                    na.getID(form.id_umowy).then(respNajem => {
                        const najem = { "id": respNajem.data.id, "numerUmowy": respNajem.data.numerUmowy, "dataPoczatku": respNajem.data.dataPoczatku, "dataZakonczona": respNajem.data.dataZakonczona, "emailNajemcy": respNajem.data.emailNajemcy }

                        const dane = { "najem": najem, "zgloszenie": zgloszenie };
                        nza.post(dane).then(responseNZ => {
                            props.onHide()
                        }).catch(e => {
                            console.log(e)
                        })
                    }).catch(e => {
                        console.log(e)
                    })
                }).catch(e => {
                    console.log(e)
                })
            }).catch(e => {
                console.log(e)
            }).then(() => { setForm({}); setValidated(false); props.onHide() });

            props.onHide();
        }
    }

    //TODO spr czy da sie połączyć z propsem onHide
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
                        Nowe Zgłoszenie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>
                            <FormGroup>
                                <div>
                                    <FormGroup controlId="umowa">
                                        <Form.Label>Wybierz umowę, której dotyczy zgłoszenie:</Form.Label>
                                        <Form.Control as='select' required name='id_umowy' custom onChange={updatePole} >
                                            <option value=''>Wybierz...</option>
                                            {
                                                listaNajmow.map(Najem => (
                                                    <option value={Najem.id}>{Najem.numerUmowy}</option>
                                                ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Należy wybrać umowę
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <FormGroup controlId="tytul">
                                            <Form.Label>Tytuł</Form.Label>
                                            <Form.Control name="tytul" required placeholder="Pęknięta rura kanalizacyjna" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Pole jest wymagane
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <Form.Group controlId="kategoria">
                                            <Form.Label>Kategoria</Form.Label>
                                            <Form.Control required name='kategoria' as="select" custom
                                                onChange={updatePole}>
                                                <option value=''>Wybierz...</option>
                                                <option value='budynek'>Część wspólna</option>
                                                <option value="remont">Remont</option>
                                                <option value="usterka">Usterka</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type='invalid'>Pole jest wymagane.</Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>
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

export default NoweZgloszenie
