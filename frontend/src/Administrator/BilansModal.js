import React from "react";
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { Modal } from 'react-bootstrap'

import lokaleAPI from "../Axios/lokaleAPI";

const BilansModal = (props) => {
    const la = new lokaleAPI();
    const [kontynuuj, setKontynuuj] = React.useState(true);
    const [bilansDane, setBilansDane] = React.useState([]);

    useEffect(() => {
        getBilans();
    });

    const getBilans = () => {
        if (props.idLokalu !== null && kontynuuj === true) {
            setKontynuuj(false);
            console.log("GetBilans")
            console.log(props)

            la.getBilansID(props.idLokalu, props.dataPoczatkowa, props.dataKoncowa).then(response => {
                console.log(response.data);
                const dane = { "przychod": response.data[0], "koszt": response.data[1], "bilans": response.data[2] }
                setBilansDane(dane);
            })
        }

        if (props.idLokalu === null) {
            setKontynuuj(true);
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
                        Bilans dla umowy numer: {props.numerUmowy}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>W okresie od: {props.dataPoczatkowa} do: {props.dataKoncowa}:</div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>Przychody: {bilansDane.przychod}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>Koszty: {bilansDane.koszt}</div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}>Bilans: {bilansDane.bilans}</div>
                </Modal.Body>
            </Modal >
        </>
    )

}

export default BilansModal