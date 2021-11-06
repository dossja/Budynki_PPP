import React from "react";
import { Button, Modal, Form, FormGroup, Row, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Header from "../Header.js";

import BilansModal from "./BilansModal";
import najmyAPI from '../Axios/najmyAPI';


const Bilans = (props) => {
    const defaultEmpty = {}

    const [kontynuuj, setKontynuuj] = useState(true)
    const [validated, setValidated] = useState(false);

    const na = new najmyAPI();

    const [form, setForm] = React.useState(defaultEmpty)
    const [najmy, setNajmy] = useState([])
    const [wyswietlBilans, setWyswietlBilans] = React.useState(false)

    let [dataPoczatkowa, setDataPoczatkowa] = React.useState(null)
    let [dataKoncowa, setDataKoncowa] = React.useState(null)
    let [numerUmowy, setNumerUmowy] = React.useState(null)
    let [idLokalu, setIdLokalu] = React.useState(null)


    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        form ? setForm(form) : setForm(defaultEmpty)
        getNajmyAPI();
    }, [form])

    const getNajmyAPI = () => {
        if (kontynuuj === true) {
            let listaNajmyUmowy = [];
            na.get()
                .then(response => {
                    console.log(response.data)
                    for (let i in response.data) {
                        console.log(response.data[i].lokal.id)
                        console.log(response.data[i].numerUmowy)
                        const dana = { "id": response.data[i].lokal.id, "numerUmowy": response.data[i].numerUmowy }
                        listaNajmyUmowy.push(dana)
                    }
                    console.log(listaNajmyUmowy)
                    setNajmy(listaNajmyUmowy);
                    setKontynuuj(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    const handleZapisz = (event) => {
        event.preventDefault();
        console.log(najmy)
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            console.log('invalid')
        }
        else {
            let id_lokalu;
            for (let i in najmy) {
                if (najmy[i].numerUmowy === form.numerUmowy) { id_lokalu = najmy[i].id; }
            }
            console.log('valid')

            setValidated(true);
            setIdLokalu(id_lokalu);
            setDataPoczatkowa(form.dataPoczatku);
            setDataKoncowa(form.dataZakonczenia);
            setNumerUmowy(form.numerUmowy);

            setForm(defaultEmpty);

            setWyswietlBilans(true);

            setValidated(false);
            setForm(defaultEmpty);
        }
    }

    return (
        <>
            <Header tytul='Bilans' par='Wyszukaj interesujące Cię dane by uzyskać bilans zysków i strat.' />
            <>

                <Container>
                    <Form noValidate validated={validated} onSubmit={handleZapisz}>
                        <Form.Label>Numer Umowy</Form.Label>
                        <Form.Control as='select' required name='numerUmowy' custom onChange={updatePole} >
                            <option value=''>Wybierz...</option>
                            {
                                najmy.map(Najem => (
                                    <option>{Najem.numerUmowy}</option>
                                ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>Pole jest wymagane</Form.Control.Feedback>
                        <Row>
                        </Row>
                        <Row>
                            <div className="col">
                                <FormGroup>
                                    <Form.Label>Data początku umowy</Form.Label>
                                    <Form.Control required type="date" name="dataPoczatku" onChange={updatePole} />
                                    <Form.Control.Feedback type="invalid">
                                        Pole jest wymagane
                                    </Form.Control.Feedback>
                                </FormGroup>

                            </div>
                            <div className="col">
                                <FormGroup>
                                    <Form.Label>Data zakończenia umowy</Form.Label>
                                    <Form.Control required type="date" name="dataZakonczenia" onChange={updatePole} />
                                    <Form.Control.Feedback type="invalid">
                                        Pole jest wymagane
                                    </Form.Control.Feedback>
                                </FormGroup>

                            </div>
                        </Row>
                        <Modal.Footer>
                            <Button type="submit">Wybierz</Button>
                        </Modal.Footer>
                    </Form>
                </Container>
            </>
            <BilansModal
                show={wyswietlBilans}
                onHide={() => { setWyswietlBilans(false); setKontynuuj(true); setDataPoczatkowa(""); setDataKoncowa(""); setNumerUmowy(""); setIdLokalu(null) }}
                idLokalu={idLokalu}
                numerUmowy={numerUmowy}
                dataPoczatkowa={dataPoczatkowa}
                dataKoncowa={dataKoncowa} />
        </>
    )

}

export default Bilans

