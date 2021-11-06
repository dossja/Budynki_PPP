import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useState, useContext, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import { Container } from 'react-bootstrap'
//import {BrowserHistory} from 'react-router'

//import {state} from './Login'
import { UserContext } from './UserContext'
import Login from './Login'
import NotFound from "./NotFound";

//Najemca
import NavNajemca from './Najemca/NavNajemca'
import NoweZgloszenie from './Najemca/NoweZgloszenie';
import WynajeteLokale from './Najemca/WynajeteLokale';
import ListaZgloszen from './Najemca/ListaZgloszen'
import Najemca from './Najemca/Najemca'
import PlatnosciNaj from './Najemca/PlatnosciNaj'

//Administrator
import Administrator from './Administrator/Administrator'
import Wspolnoty from './Administrator/Wspolnoty'
import NavAdmin from './Administrator/NavAdmin'
import ZgloszeniaAdm from './Administrator/ZgloszeniaAdm'
import Nieruchomosci from './Administrator/Nieruchomosci'
import Umowy from './Administrator/Umowy'
import Lokale from './Administrator/Lokale'
import PlikTestowyAPI from './Administrator/PlikTestowyAPI'
import Platnosci from './Administrator/Platnosci'
import Bilans from './Administrator/Bilans'

const Auth = () => {
    // eslint-disable-next-line no-unused-vars
    const { userType, setUserType } = useContext(UserContext)

    const routeNajemca = (
        <div>
            <NavNajemca />
            <Switch>
                <Route exact path='/' component={Najemca} />
                <Route exact path='/wynajete_lokale/:id' component={WynajeteLokale} />
                <Route exact path='/moje_zgloszenia/:id' component={ListaZgloszen} />
                <Route exact path='/platnosci/:id' component={PlatnosciNaj} />
                <Route exact path='/moje_zgloszenia/nowe_zgloszenie' component={NoweZgloszenie} />
                <Route component={NotFound} />
            </Switch>
        </div>)

    const routeAdmin = (
        <div>
            <NavAdmin />
            <Switch>
                <Route exact path='/' component={Administrator} />
                <Route exact path='/wspolnoty' component={Wspolnoty} />
                <Route exact path='/zgloszenia' component={ZgloszeniaAdm} />
                <Route exact path='/nieruchomosci' component={Nieruchomosci} />
                <Route exact path='/lokale' component={Lokale} />
                <Route exact path='/umowy' component={Umowy} />
                <Route exact path='/platnosci' component={Platnosci} />
                <Route exact path='/pliktestowyapi' component={PlikTestowyAPI} />
                <Route exact path='/bilans' component={Bilans} />
                <Route component={NotFound} />
            </Switch>
        </div>)

    const routeLogin = (
        <>
            <Route exact path='/login' component={() => <Login />} />
            <Redirect to='/login' />
        </>)

    const app = (
        <BrowserRouter>
            <div className="container">
                {
                    (() => {
                        switch (userType) {
                            case "admin": return routeAdmin;
                            case "najemca": return routeNajemca;
                            default: return routeLogin;
                        }
                    })()}
            </div>
        </BrowserRouter>)

    // const tmp = (<div className="container">
    //     {
    //         (() => {
    //             switch (userType) {
    //                 case "admin": return <h1>admin</h1>
    //                 case "najemca": return <h1>najemca</h1>
    //                 default: return <h1>diff</h1>
    //             }
    //         })()}
    // </div>)

    return (
        <>
            {app}
        </>
    )
}

export default Auth