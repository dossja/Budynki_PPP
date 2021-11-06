import React from "react";
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { Modal, Button, Form, FormGroup, ButtonGroup } from 'react-bootstrap'

import platnosciAPI from "../Axios/platnosciAPI";
import typyPlatnosciAPI from "../Axios/typyPlatnosciAPI";


const PlatnosciModal = (props) => {
    const pa = new platnosciAPI();
    const tpa = new typyPlatnosciAPI();

    const [kontynuuj, setKontynuuj] = React.useState(true);
    const [platnoscDane, setPlatnoscDane] = React.useState([]);
    const [typyPlatnosci, setTypyPlatnosci] = React.useState([]);

    useEffect(() => {
        getPlatnosci();
    });

    const getPlatnosci = () => {
        if (props.idPlatnosci !== null && kontynuuj === true) {
            console.log(props)
            pa.getID(props.idPlatnosci).then(response => {
                console.log(response.data)
                const dane = { "id": response.data.id, "numerUmowy": response.data.najem.numerUmowy, "kwota": response.data.kwota };

                setPlatnoscDane(dane);
            })
            getTypyPlatnosci();
            setKontynuuj(false);
        }

        if (props.idLokalu === null) {
            setKontynuuj(true);
        }
    }

    const getTypyPlatnosci = () => {
        tpa.get().then(response => {
            console.log(response.data);
            setTypyPlatnosci(response.data);
        })
    }

    async function btnZaplac(idTypu) {
        console.log("BTN Zaplac");

        pa.getID(props.idPlatnosci).then(response => {
            const dane = response.data;
            dane["typPlatnosci"] = idTypu;

            let dataPlatnosci = new Date();
            let month = dataPlatnosci.getMonth() + 1;
            if (month < 10) month = `0${month}`
            let day = dataPlatnosci.getDate();
            if (day < 10) day = `0${day}`
            dataPlatnosci = dataPlatnosci.getFullYear() + "-" + month + "-" + day;

            dane["dataPlatnosci"] = dataPlatnosci;

            pa.put(props.idPlatnosci, dane);

            alert(`Wykonano platność typu: ${idTypu.nazwa}`)

            props.onHide()
        })
        props.onHide()
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
                        Płatność o numerze: {platnoscDane.id} dla umowy numer: {platnoscDane.numerUmowy}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '25px', fontWeight: 'bold' }}> Płatność na kwotę: {platnoscDane.kwota} zł</div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>Wybierz sposób płatności:</div>
                    <div>
                        <ButtonGroup style={{ display: 'flex', justifyContent: 'center' }} >
                            <Button className="m-3" variant="success" value={typyPlatnosci[0]} onClick={() => btnZaplac(typyPlatnosci[0])}>Karta</Button>
                            <Button className="m-3" variant="danger" value={typyPlatnosci[1]} onClick={() => btnZaplac(typyPlatnosci[1])}>Przelew</Button>
                            <Button className="m-3" variant="primary" value={typyPlatnosci[2]} onClick={() => btnZaplac(typyPlatnosci[2])}>PayPal</Button>
                        </ButtonGroup>

                    </div>
                </Modal.Body>
            </Modal >
        </>
    )

}

export default PlatnosciModal