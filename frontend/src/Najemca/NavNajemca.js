import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import { UserContext } from '../UserContext'

import najmyAPI from "../Axios/najmyAPI";

function NavNajemca(props) {
    const na = new najmyAPI();

    const [aktualizuj, setAktualizuj] = React.useState(true);
    const [lokatorzy, setLokatorzy] = React.useState([]);
    // Tu zmiana indeksu lokatora
    const [value, setValue] = useState(1);

    useEffect(() => {
        setAktualizuj(false);
        getNajmyAPI();
    }, [aktualizuj]);

    const getNajmyAPI = () => {
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
            })
            .catch(e => {
                console.log(e);
            });
    }


    const lokatorWTablicy = (id, tablica) => {
        let dodaj = true;
        for (let i in tablica) {
            if (tablica[i].id == id) {
                dodaj = false;
            }
        }
        return dodaj;
    }

    const handleSelect = (e) => {
        setValue(e)
    }
    // eslint-disable-next-line no-unused-vars
    const { userType, setUserType } = useContext(UserContext)
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href='/' >Home</Nav.Link>
                    <Nav.Link href={`/moje_zgloszenia/${value}`}>Zgłoszenia</Nav.Link>
                    <Nav.Link href={`/wynajete_lokale/${value}`}>Lokale</Nav.Link>
                    <Nav.Link href={`/platnosci/${value}`}>Płatności</Nav.Link>
                </Nav>
                <NavDropdown title="Użytkownik" name="uzytkownikDropDown" defaultValue={lokatorzy[0]} onSelect={handleSelect}>
                    {
                        lokatorzy.map(Lokatorzy => (
                            <NavDropdown.Item eventKey={Lokatorzy.id}>id: {Lokatorzy.id}, {Lokatorzy.imie} {Lokatorzy.nazwisko}</NavDropdown.Item>
                        ))}
                </NavDropdown>
                <Nav className="mr-right">
                    <Nav.Link className='align-right' href='/login' onClick={event => { setUserType("") }}>Wyloguj</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavNajemca;