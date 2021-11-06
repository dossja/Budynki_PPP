// eslint-disable-next-line no-unused-vars
import React, { useEffect, createContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { useState, useContext } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {state} from './Login'
import { UserContext } from './UserContext'
import UserContextProvider from "./UserContext"
import Auth from "./Auth"


function App(props) {
  // eslint-disable-next-line no-unused-vars
  const { userType, setUserType } = useContext(UserContext)

  return (
    <UserContextProvider>
      <Auth />
    </UserContextProvider>
  )
}

export default App;
