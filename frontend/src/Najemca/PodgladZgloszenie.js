import React from "react";
import { useState, useEffect } from 'react'
import { Button, Modal, Form, FormGroup, Row, Col, Container, Table, ButtonGroup, Alert } from 'react-bootstrap'
import zgloszeniaAPI from '../Axios/zgloszeniaAPI';

const PodgladZgloszenie = (props) => {
    const zga = new zgloszeniaAPI()

    const [kontynuuj, setKontynuuj] = React.useState(false);

    const [form, setForm] = useState()
    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        //refresh table
        getZgloszenia();
    });

    // eslint-disable-next-line no-unused-vars
    let [Zgloszenia, setZgloszenia] = React.useState({})
    const getZgloszenia = () => {
        console.log(props.idZgloszenia)
        if (props.idZgloszenia !== null && kontynuuj === true) {
            zga.getID(props.idZgloszenia).then(response => {
                const zgloszenie = response.data;
                zgloszenie["kategoriaZgloszenia"] = response.data.kategoriaZgloszenia.nazwa;
                zgloszenie["statusZgloszenia"] = labelStatusZgloszenia(response.data.statusZgloszenia.nazwa);
                console.log(zgloszenie)
                setZgloszenia(zgloszenie)
            }).catch(e => {
                console.log(e)
            })
            setKontynuuj(false);

        }

        if (props.idZgloszenia === null && kontynuuj === false) {
            setForm([])
            setZgloszenia({})
        }

        if (props.idZgloszenia === null) {
            setKontynuuj(true);
        }
    };

    function labelStatusZgloszenia(status) {
        let statusZgloszenia;

        if (status === "oczekujace")
            statusZgloszenia = "Zgłoszenie oczekujące."
        else if (status === "przyjete")
            statusZgloszenia = "Zgłoszenie przyjęte."
        else if (status === "w_realizacji")
            statusZgloszenia = "Zgłoszenie w realizacji."
        else if (status === "zrealizowane")
            statusZgloszenia = "Zgłoszenie zakończone."

        return statusZgloszenia;
    }

    const do_wykonania = () => {
        return (
            <>
                <Alert variant="danger" >Do wykonania</Alert>
            </>
        )
    }

    const w_terminie = (data) => {
        return (
            <>
                <Alert variant="success" >Wykonano: {data}</Alert>
            </>
        )
    }

    const po_terminie = (data) => {
        return (
            <>
                <Alert variant="warning" >Wykonano: {data}</Alert>
            </>
        )
    }



    const wykonane = (dataWykonania, terminWykonania) => {
        const wykonano = new Date(dataWykonania);
        const tWykonania = new Date(terminWykonania);
        const odp = wykonano - tWykonania;
        if (odp > 0) {
            return po_terminie(dataWykonania);
        }
        else {
            return w_terminie(dataWykonania);
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
                        Zgłoszenie
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <>
                            <Form >
                                <Row>
                                    <Col>
                                        <Form.Label>Opis zgłoszenia</Form.Label>
                                        <Form.Control name='opis' disabled defaultValue={Zgloszenia.opis}></Form.Control>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '10px' }}>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Kategoria zgłoszenia</Form.Label>
                                            <Form.Control name="kategoria" disabled defaultValue={Zgloszenia.kategoriaZgloszenia} />
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control disabled name="status" defaultValue={Zgloszenia.statusZgloszenia} />
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup>
                                            <Form.Label>Koszt całkowity</Form.Label>
                                            <Form.Control disabled name="koszt" defaultValue={Zgloszenia.kosztCalkowity} />
                                        </FormGroup>
                                    </div>
                                </Row>
                            </Form>
                        </>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )

}

export default PodgladZgloszenie