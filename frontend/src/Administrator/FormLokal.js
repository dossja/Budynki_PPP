import React from "react";
import { useState } from 'react'
import { Button, Modal, Form, FormGroup, Row, Container } from 'react-bootstrap'

import lokaleAPI from '../Axios/lokaleAPI';
import nieruchomosciAPI from '../Axios/nieruchomosciAPI';

const FormLokal = (props) => {
    const la = new lokaleAPI();
    const na = new nieruchomosciAPI();

    const defaultEmpty = {
        numerLokalu: '',
        powierzchnia: ''
    }
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(defaultEmpty)
    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    // useEffect(()=>{
    //     form ? setForm(form): setForm(defaultEmpty)
    // }, [form])
    const handleAnuluj = (props) => {
        setForm({})
        setValidated(false)
    }

    const handleZapisz = (event) => {
        console.log(props)
        console.log(props.idNieruchomosci)
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
            console.log(props.idNieruchomosci)
            na.getID(props.idNieruchomosci).then(response => {
                console.log(response.data);
                const nieruchomosc = { 'id': response.data.id, 'kwotaOplatyAdm': response.data.kwotaOplatyAdm, 'cenaM2': response.data.cenaM2 }
                console.log(`Nieruchomosc: ${nieruchomosc}`)
                la.post({
                    "numerLokalu": form.numerLokalu, "powierzchnia": form.powierzchnia, 'nieruchomosc_id': props.idNieruchomosci
                }).then(() => { setForm(defaultEmpty); setValidated(false); props.onHide() });
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
                        Nowy Lokal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>
                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Numer lokalu</Form.Label>
                                        <Form.Control required pattern="[0-9-]+" name="numerLokalu" placeholder="1" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane lub podany numer jest niepoprawny
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Powierzchnia</Form.Label>
                                        <Form.Control required name="powierzchnia" pattern="[0-9]*[.]?[0-9]+" placeholder="65.50" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane lub podana wartość jest niepoprawna
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>
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

export default FormLokal
