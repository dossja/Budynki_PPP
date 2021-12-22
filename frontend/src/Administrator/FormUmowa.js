import React from "react";
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { Button, Modal, Form, FormGroup, Row, Container } from 'react-bootstrap'

import najmyAPI from '../Axios/najmyAPI';
import nieruchomosciAPI from '../Axios/nieruchomosciAPI';
import platnosciAPI from '../Axios/platnosciAPI';
import lokatorzyAPI from '../Axios/lokatorzyAPI';

const FormUmowa = (props) => {
    const na = new najmyAPI();
    const nia = new nieruchomosciAPI();
    const pa = new platnosciAPI();
    const la = new lokatorzyAPI();

    const defaultEmpty = {}
    const [validated, setValidated] = useState(false);
    const [nowyNajemca, setNowyNajemca] = useState(false);
    const [form, setForm] = React.useState(defaultEmpty)
    const [lokatorzy, setLokatorzy] = useState([])
    const [kontynuuj, setKontynuuj] = useState(true)

    const updatePole = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        // form ? setForm(form) : setForm(defaultEmpty)
        getNajmyAPI();
    }, [form])

    const getNajmyAPI = () => {
        if (kontynuuj === true) {
            let listaNajmyLokatorzy = [];
            na.get()
                .then(response => {
                    for (let i in response.data) {
                        if (i == 0) {
                            listaNajmyLokatorzy.push(response.data[i].lokator)
                        }

                        else {
                            const dodaj = lokatorWTablicy(response.data[i].lokator.id, listaNajmyLokatorzy)

                            if (dodaj == true) {
                                listaNajmyLokatorzy.push(response.data[i].lokator)
                            }
                        }
                    }
                    setLokatorzy(listaNajmyLokatorzy);
                    console.log(listaNajmyLokatorzy)
                    setKontynuuj(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    const lokatorWTablicy = (id, tablica) => {
        console.log(tablica)
        let dodaj = true;
        for (let i in tablica) {
            console.log(i)
            console.log(tablica[i]);
            console.log(id)

            if (tablica[i].id === id) {
                console.log("Znaleziono id");
                dodaj = false;
            }
        }
        return dodaj;
    }

    const handleAnuluj = (props) => {
        setForm({})
        setValidated(false)
    }

    const handleZapisz = (event) => {
        event.preventDefault();
        console.log(props)
        console.log(form)
        const target = event.currentTarget;
        if (target.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            console.log('invalid')
        }
        else {
            console.log('valid')
            setValidated(true);

            console.log(form)

            const najemDane = {
                "dataPoczatku": form.dataPoczatku, "dataZakonczona": form.dataZakonczenia, "numerUmowy": form.numerUmowy, "emailNajemcy": form.email, "lokal_id": props.idLokalu
            };

            if (form.id_najemcy) {
                najemDane["lokator_id"] = form.id_najemcy;
                najemDane['emailNajemcy'] = form.email;
                dodajNajem(najemDane, event, props, form)
            }
            else {
                najemDane["nowyNajemca"] = { "imie": form.imie, "nazwisko": form.nazwisko, 'PESEL': form.PESEL }
                la.post(najemDane["nowyNajemca"]).then(
                    la.getNewest().then(resp => {
                        najemDane["lokator_id"] = resp.data.id;
                        najemDane["emailNajemcy"] = form.email;
                    }).then(dodajNajem(najemDane, event, props, form))
                )
            }

            
        }

    }

    const dodajNajem = (najemDane, event, props, form) =>{
        console.log(najemDane)

        nia.getID(props.idNieruchomosci).then(responseNieruchomosci => {
            console.log(responseNieruchomosci.data)
            const kwotaOplatyAdm = responseNieruchomosci.data.kwotaOplatyAdm;

            na.post(najemDane).then(() => {
                na.getNewest().then((response) => {
                    const najemDane = { 'id': response.data.id, 'numerUmowy': response.data.numerUmowy, 'dataPoczatku': response.data.dataPoczatku, 'dataZakonczona': response.data.dataZakonczona, 'emailNajemcy': response.data.emailNajemcy }
                    utworzPlatnosci(form.dataPoczatku, form.dataZakonczenia, najemDane, kwotaOplatyAdm);
                }).catch(e => {
                    console.log(e);
                });
                setForm(defaultEmpty); setValidated(false); props.onHide()
            }).catch(e => {
                console.log(e);
            });
        }).then(() => { setForm(defaultEmpty); setValidated(false); props.onHide() });

        setForm(defaultEmpty); setValidated(false); props.onHide()
    }

    async function utworzPlatnosci(dataPoczatku, dataZakonczenia, najemPlatnosci, kwota) {
        let tablicaWynikowa = []
        const dateDataPoczatku = new Date(dataPoczatku);
        const dateDataZakonczenia = new Date(dataZakonczenia);
        const months = monthDiff(dateDataPoczatku, dateDataZakonczenia);
        console.log(months)

        for (let j = 0; j < months; j++) {
            let newDate = new Date(dateDataPoczatku);
            newDate = new Date(newDate.setMonth(dateDataPoczatku.getMonth() + j));
            let month = newDate.getMonth() + 1;
            if (month < 10) month = `0${month}`
            let day = newDate.getDate();
            if (day < 10) day = `0${day}`
            newDate = newDate.getFullYear() + "-" + month + "-" + day;

            console.log(newDate)
            console.log(najemPlatnosci)

            const platnosc = { "kwota": kwota, "terminPlatnosci": newDate, "dataPlatnosci": '1900-01-01', "typPlatnosci_id": 1, "najem_id": najemPlatnosci.id }

            await pa.post(platnosc);

            const nowy = await pa.getNewest();

            tablicaWynikowa.push(nowy);

        }
        console.log(tablicaWynikowa);
        return tablicaWynikowa;
    }


    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    const change = () => {
        setNowyNajemca(!nowyNajemca)
        console.log(nowyNajemca)
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
                        Nowa Umowa
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleZapisz}>

                            <Form.Label style={{ fontSize: '20px' }}>Dane ogólne</Form.Label>

                            <Row>
                                <div className="col">
                                    <FormGroup>
                                        <Form.Label>Numer Umowy</Form.Label>
                                        <Form.Control required pattern="[0-9][0-9]/[0-9]{4}" name="numerUmowy" placeholder="01/2020" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col">
                                    <FormGroup controlId="datapoczatku">
                                        <Form.Label>Data początku umowy</Form.Label>
                                        <Form.Control required type="date" name="dataPoczatku" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                        </Form.Control.Feedback>
                                    </FormGroup>

                                </div>
                                <div className="col">
                                    <FormGroup controlId="datazakonczenia">
                                        <Form.Label>Data zakończenia umowy</Form.Label>
                                        <Form.Control required type="date" name="dataZakonczenia" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                            </Row>

                            <FormGroup>
                                <Form.Label style={{ fontSize: '20px' }}>Najemca</Form.Label>
                                <Form.Check onChange={change} label='Dodaję nowego najemcę' />
                                <div>
                                    <FormGroup controlId="idnajemcy">
                                        <Form.Control name="id_najemcy" required disabled={nowyNajemca} as='select' className="mt-2 mb-2" onChange={updatePole} custom>
                                            <option value=''>Wybierz...</option>
                                            {
                                                lokatorzy.map(Lokatorzy => (
                                                    <option value={Lokatorzy.id}>{Lokatorzy.nazwisko} {Lokatorzy.imie}</option>
                                                ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Należy wybrać lokatora
                                        </Form.Control.Feedback>
                                    </FormGroup>
                                </div>
                                <Row>
                                    <div className="col">
                                        <FormGroup controlId="imie">
                                            <Form.Label>Imię</Form.Label>
                                            <Form.Control required name="imie" disabled={!nowyNajemca} placeholder="Jan" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Pole jest wymagane
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup controlId="nazwisko">
                                            <Form.Label>Nazwisko</Form.Label>
                                            <Form.Control required name="nazwisko" disabled={!nowyNajemca} placeholder="Kowalski" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                Podane nazwisko jest niepoprawne
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col">
                                        <FormGroup controlId="pesel">
                                            <Form.Label>PESEL</Form.Label>
                                            <Form.Control name="PESEL" disabled={!nowyNajemca} required pattern="[0-9]{11}" placeholder="95024597965" onChange={updatePole} />
                                            <Form.Control.Feedback type="invalid">
                                                PESEL powinien składać się z 11 cyfr
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>

                                </Row>
                                <hr />
                                <div className="col">
                                    <FormGroup controlId="email">
                                        <Form.Label>e-mail</Form.Label>
                                        <Form.Control required name="email" pattern="\w+@\w+.\w+" placeholder="emailtmp@e.pl" onChange={updatePole} />
                                        <Form.Control.Feedback type="invalid">
                                            Pole jest wymagane
                                        </Form.Control.Feedback>
                                    </FormGroup>
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

export default FormUmowa