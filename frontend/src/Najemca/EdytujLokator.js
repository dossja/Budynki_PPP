import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal, Form, FormGroup } from 'react-bootstrap'

import lokatorzyAPI from "../Axios/lokatorzyAPI";

const EdytujLokator = (props) => {
    const la = new lokatorzyAPI();

    const [validated, setValidated] = useState(false);
    const [form, setForm] = React.useState([]);
    const [lokator, setLokator] = React.useState([]);
    const [kontynuuj, setKontynuuj] = React.useState(true);

    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        getLokatorID();
    })

    const getLokatorID = () => {
        if (props.idLokatora !== null && kontynuuj === true) {
            la.getID(props.idLokatora)
                .then(response => {
                    setKontynuuj(false)
                    console.log(response.data)
                    setLokator(response.data)
                    setForm(response.data)
                })
                .catch(e => {
                    console.log(e);
                });
        }

        if (props.idLokatora === null && kontynuuj === false) {
            setForm([])
            setLokator([])
        }

        if (props.idLokatora === null) {
            setKontynuuj(true);
        }

    }

    const handleZapisz = (event) => {
        console.log(props)
        event.preventDefault();
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            event.preventDefault();
            setValidated(true);
            console.log("nie jest ok")
            // event.stopPropagation();
        }
        else {
            console.log("jest ok")
            setValidated(true);

            const dane = { "id": props.idLokatora, "imie": form.imie, "nazwisko": form.nazwisko, "PESEL": form.PESEL }
            console.log(dane)

            la.put(props.idLokatora, dane).then(resp => {
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
                        Edytuj Lokatora
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleZapisz}>
                        <div className="row">
                            <div className="col">
                                <FormGroup>
                                    <Form.Label>Imię</Form.Label>
                                    <Form.Control required pattern="[A-ZŁŚ][a-ząęółśżźćń]{2,}" controlId="imie" name="imie" defaultValue={lokator.imie} placeholder="Jan" onChange={updatePole} />
                                    <Form.Control.Feedback type="invalid">
                                        Imię powinno rozpoczynać się wielką literą i składać z co najmniej 3 liter
                                    </Form.Control.Feedback>
                                </FormGroup>
                            </div>
                            <div className="col">
                                <FormGroup controlId="nazwisko">
                                    <Form.Label>Nazwisko</Form.Label>
                                    <Form.Control name='nazwisko' required pattern="[A-Za-z-WzóąśłżźćńÓĄŚŁŻŹĆŃ]{3,4}[\s]*[a-z-zóąśłżźćńÓĄŚŁŻŹĆŃ]{0,25}" placeholder="Kowalski" defaultValue={lokator.nazwisko} onChange={updatePole} />
                                    <Form.Control.Feedback type="invalid" >
                                        Nazwisko powinno składać się z co najmniej 3 znaków
                                    </Form.Control.Feedback>
                                </FormGroup>
                            </div>
                            <div className="col">
                                <FormGroup controlId="pesel">
                                    <Form.Label>PESEL</Form.Label>
                                    <Form.Control name='PESEL' required placeholder="01234567890" onChange={updatePole} pattern="[0-9]{11}" defaultValue={lokator.PESEL} />
                                    <Form.Control.Feedback type="invalid">
                                        PESEL powinien składać się z 11 cyfr
                                    </Form.Control.Feedback>
                                </FormGroup>
                            </div>
                        </div>

                        <Modal.Footer>
                            <Button type="submit">Zapisz</Button>
                            <Button onClick={props.onHide}>Anuluj</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )

}

export default EdytujLokator
