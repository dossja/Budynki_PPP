import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { Navbar, Nav, Button } from 'react-bootstrap'
import { UserContext } from '../UserContext'


function NavAdmin(props) {
    // eslint-disable-next-line no-unused-vars
    const { userType, setUserType } = useContext(UserContext)

    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href='/wspolnoty'>Wspólnoty</Nav.Link>
                    <Nav.Link href='/platnosci'>Płatności</Nav.Link>
                    <Nav.Link href='/zgloszenia'>Zgłoszenia</Nav.Link>
                    <Nav.Link href='/bilans'>Bilans</Nav.Link>
                </Nav>
                <Nav className="mr-right">
                    <Nav.Link className='align-right' href='/login' onClick={event => { setUserType("") }}>Wyloguj</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavAdmin;