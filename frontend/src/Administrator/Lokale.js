import React from "react";
import { Button, Table, ButtonGroup } from 'react-bootstrap'
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react'
import Header from "../Header.js";
import lokaleAPI from "../Axios/lokaleAPI";
import najmyAPI from "../Axios/najmyAPI";
const Lokale = () => {
    const la = new lokaleAPI();
    const na = new najmyAPI();

    const [aktualizuj, setAktualizuj] = useState(false);

    useEffect(() => {
        getLokale();

        setAktualizuj(false);
    }, [aktualizuj]);

    const getLokale = () => {
        la.get()
            .then(response => {
                setLokale(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        na.get()
            .then(response => {
                setUmowy(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getUmowa = (id) => {
        var umowa = Umowy.find(item => item.id === id);
        return umowa ? umowa.numerUmowy : 'brak'
    }

    // eslint-disable-next-line no-unused-vars
    const getLokatorzy = (id) => {
        //TODO
    }

    // eslint-disable-next-line no-unused-vars
    const [Lokale, setLokale] = React.useState([{ id: 1 }])
    const [Umowy, setUmowy] = React.useState([{ id: 1 }])

    function btnEdytuj(id) {
        console.log("BTN Edit");
        console.log(id);

        console.log(Umowy.filter(d => d.id === 1))
        //setEdytujUmowe("true")
        // TODO: okno edycji i edytonanie Lokale
    }

    function btnUsun(id) {
        console.log("BTN Delete");
        console.log(id);
        la.deleteID(id);
    }

    async function btnGetID(id) {
        console.log("BTN getid");
        console.log(id);

        la.getID(id).then(response => {
            console.log(response.data.nieruchomosc)
        })
            .catch(e => {
                console.log(e);
            });
    }
    return (
        <>
            <Header tytul='Lokale' par='Poniżej znajdują się Lokale najmu' />
            <Table responsive hover boarded>
                <thead className="thead-dark">
                    <tr>
                        <th className="align-middle" scope="col">Lp.</th>
                        <th className="align-middle" scope="col">Numer lokalu</th>
                        <th className="align-middle" scope="col">Powierzchnia</th>
                        <th className="align-middle" scope="col">Umowa</th>
                        {/* <th className="align-middle" scope="col">Nieruchomość</th> */}
                        <th className="align-middle" scope="col">Opcje</th>

                    </tr>
                </thead>
                <tbody>{
                    Lokale.map(Lokale => (
                        <tr key={Lokale.id}>
                            <td>{Lokale.id}</td>
                            <td>{Lokale.numerLokalu}</td>
                            <td>{Lokale.powierzchnia}</td>
                            <td>{getUmowa(Lokale.id)}</td>
                            <td>
                                <ButtonGroup aria-label="Basic example" size='sm'>
                                    <Button className="mr-2 ml-2" variant="info" onClick={() => btnEdytuj(Lokale.id)}>Edytuj</Button>
                                    <Button className="mr-2 ml-2" variant="danger" onClick={() => btnUsun(Lokale.id)}>Usuń</Button>
                                </ButtonGroup></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}

export default Lokale
