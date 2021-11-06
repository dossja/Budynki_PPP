// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import Header from "./Header.js";
// eslint-disable-next-line no-unused-vars
import { Button, Table, Form, FormGroup, } from 'react-bootstrap';
import { UserContext } from "./UserContext.js";
// eslint-disable-next-line no-unused-vars
import Administrator from './Administrator/Administrator'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';


const Login = (props) => {
    const history = useHistory();

    //redirect to home page
    const redirect = () => {
        let path = '/';
        history.push(path);
    }

    // eslint-disable-next-line no-unused-vars
    const { userType, setUserType } = useContext(UserContext)

    return (
        //         <>
        //         {/*
        //             <Header tytul="Wybierz typ użytkownika" />
        //             <div className="row justify-content-center">
        //                 <div className="Formularz col-lg-8">
        //                     <Form onSubmit={event=>{setUser(event.target.logowanie.value);}}>
        //                         <div className="row">
        //                             <div className="col">
        //                             <FormGroup controlId="logowanie">
        //                                     <Form.Label>Logowanie</Form.Label>
        //                                     <Form.Control placeholder="najemca" />
        //                                     {console.log(user)}
        //                                 </FormGroup>
        //                             </div>
        //                         </div>
        //                     <Button variant="secondary" type='submit'>Login</Button>
        //                     </Form>
        //                 </div>
        //         </div>*/}

        <>
            <Header tytul="Wybierz typ użytkownika" />
            <div className="row justify-content-center">
                <Button variant="danger" onClick={event => { setUserType("admin"); redirect() }} style={{ marginRight: '40px' }}>Administrator</Button>
                <Button onClick={event => { setUserType("najemca"); redirect() }}>Najemca</Button>
            </div>
        </>
    )

}

export default Login