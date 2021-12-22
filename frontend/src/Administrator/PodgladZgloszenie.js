import React from "react";
import { useEffect } from 'react';
import { Button, Modal, Form, FormGroup, Row, Col, Container, Table, ButtonGroup, Alert } from 'react-bootstrap';

import FormZlecenie from './FormZlecenie';
import EdytujZlecenie from './EdytujZlecenie';

import zleceniaAPI from '../Axios/zleceniaAPI';
import zgloszeniaAPI from '../Axios/zgloszeniaAPI';

const PodgladZgloszenie = (props) => {
    const zla = new zleceniaAPI();
    const zga = new zgloszeniaAPI()

    const [dodajZlecenie, setDodajZlecenie] = React.useState(false)
    const [edytujZlecenie, setEdytujZlecenie] = React.useState(false)
    const [kontynuuj, setKontynuuj] = React.useState(false);
    const [sumaZgloszenia, setSumaZgloszenia] = React.useState(null);

    const [idZgloszenia, setIdZgloszenia] = React.useState(null)
    const [idZlecenia, setIdZlecenia] = React.useState(null)

    useEffect(() => {
        getZlecenia();
    });

    // eslint-disable-next-line no-unused-vars
    let [Zgloszenia, setZgloszenia] = React.useState({})
    const [Zlecenia, setZlecenia] = React.useState([])
    const getZgloszenia = (suma) => {
        zga.getID(props.id)
            .then(responseFirst => {
                const zmieniona = { "id": responseFirst.data.id, "opis": responseFirst.data.opis, "kosztCalkowity": suma, "statusZgloszenia": responseFirst.data.statusZgloszenia, "kategoriaZgloszenia": responseFirst.data.kategoriaZgloszenia };
                zga.put(props.id, zmieniona).then(resp => {
                    zga.getID(props.id)
                        .then(response => {
                            setKontynuuj(false);

                            const statusZgloszenia = labelStatusZgloszenia(response.data.statusZgloszenia.nazwa);

                            Zgloszenia = {
                                'id': response.data.id, 'opis': response.data.opis, 'kosztCalkowity': response.data.kosztCalkowity, "statusZgloszenia": statusZgloszenia, "kategoriaZgloszenia": response.data.kategoriaZgloszenia.nazwa
                            }
                            setZgloszenia(Zgloszenia)
                            setKontynuuj(false);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                })
            });
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

    function getZlecenia() {
        if (props.id !== null && kontynuuj === true) {
            zla.getZgloszeniaZlecenia(props.id).then(response => {
                setKontynuuj(false);
                let zlecenia = []
                let suma = 0;
                for (let i in response.data) {
                        suma += response.data[i].koszt;
                        zlecenia.push(response.data[i]);
                }
                getZgloszenia(suma);
                const sumaString = `${suma} zł`
                setSumaZgloszenia(sumaString);
                setZlecenia(zlecenia);
            }).catch(e => {
                console.log(e);
            });
        }

        if (props.id === null && kontynuuj === false) {
            setZgloszenia({})
            setZlecenia([])
        }

        if (props.id === null) {
            setKontynuuj(true);
        }
    }

    const handleDodajZlecenie = () => {
        setIdZgloszenia(props.id);
        setDodajZlecenie(true)
    }

    async function btnUsun(id) {
        console.log("BTN Delete");
        console.log(id);
        zla.deleteID(id).then(resp => {
            setKontynuuj(true)
        })
    }

    async function btnEdytuj(id) {
        console.log("BTN Edytuj");
        console.log(id);
        setIdZlecenia(id);

        setEdytujZlecenie(true);
    }

    async function btnZakoncz(id) {
        console.log("BTN Zakoncz");
        console.log(id);
        zla.getID(id).then(response => {
            const dane = response.data;
            let dataPlatnosci = new Date();
            let month = dataPlatnosci.getMonth() + 1;
            if (month < 10) month = `0${month}`
            let day = dataPlatnosci.getDate();
            if (day < 10) day = `0${day}`
            dataPlatnosci = dataPlatnosci.getFullYear() + "-" + month + "-" + day;

            dane["dataWykonania"] = dataPlatnosci;

            zla.put(id, dane).then(resp => { setKontynuuj(true) });

        })
        setKontynuuj(true);
    }


    const do_wykonania = () => {
        return (
            <>
                <Alert className="align-middle text-center" variant="danger" >Do wykonania</Alert>
            </>
        )
    }

    const w_terminie = (data) => {
        return (
            <>
                <Alert className="align-middle text-center" variant="success" >Wykonano: {data.slice(0,10)}</Alert>
            </>
        )
    }

    const po_terminie = (data) => {
        return (
            <>
                <Alert className="align-middle text-center" variant="warning" >Wykonano: {data.slice(0,10)}</Alert>
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
                                        <Form.Control name='opis' disabled as="textarea" defaultValue={Zgloszenia.opis}></Form.Control>
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

                            <Button onClick={handleDodajZlecenie} variant='secondary' style={{ marginTop: '50px', marginBottom: '10px' }}>Dodaj zlecenie</Button>
                            <Table responsive hover boarded>
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="align-middle" scope="col">Lp.</th>
                                        {/* <th className="align-middle" scope="col">Firma</th> */}
                                        <th className="align-middle" scope="col">Termin wykonania</th>
                                        <th className="align-middle" scope="col">Data wykonania</th>
                                        <th className="align-middle" scope="col">Koszt</th>
                                        <th className="align-middle" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    Zlecenia.map(Zlecenia => (
                                        <tr key={Zlecenia.id}>
                                            <td className="align-middle">{Zlecenia.id}</td>
                                            {/* <td className="align-middle">{Zlecenia.firmaPodwykonawcza.nazwa}</td> */}
                                            <td className="align-middle">{Zlecenia.terminWykonania.slice(0,10)}</td>
                                            <td className="align-middle">{
                                                (
                                                    (() => {
                                                        switch (Zlecenia.dataWykonania) {
                                                            case "1900-01-01 00:00:00": return do_wykonania()

                                                            default: return wykonane(Zlecenia.dataWykonania, Zlecenia.terminWykonania);
                                                        }
                                                    })())
                                            }</td>
                                            <td className="align-middle">{Zlecenia.koszt}</td>
                                            <td className="align-middle">
                                                {(
                                                    (() => {
                                                        switch (Zlecenia.dataWykonania) {
                                                            case "1900-01-01 00:00:00": return (<><ButtonGroup size='sm' aria-label="Basic example">
                                                                <Button variant="danger" onClick={() => btnUsun(Zlecenia.id)}>Usuń</Button>
                                                                <Button variant="secondary" onClick={() => btnEdytuj(Zlecenia.id)}>Edytuj</Button>
                                                                <Button variant="success" onClick={() => btnZakoncz(Zlecenia.id)}>Zakończ</Button>
                                                            </ButtonGroup></>)

                                                            default: return (<></>)
                                                        }
                                                    })())}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </>
                    </Container>
                </Modal.Body>
            </Modal>
            <FormZlecenie
                show={dodajZlecenie}
                onHide={() => { setDodajZlecenie(false); setKontynuuj(true); setIdZgloszenia(null) }}
                idZgloszenia={idZgloszenia} />
            <EdytujZlecenie
                show={edytujZlecenie}
                onHide={() => { setEdytujZlecenie(false); setKontynuuj(true); setIdZlecenia(null) }}
                idZlecenia={idZlecenia} />
        </>
    )

}

export default PodgladZgloszenie