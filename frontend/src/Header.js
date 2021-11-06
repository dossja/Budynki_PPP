import React from 'react';
import { UserContext } from './UserContext.js'
import { useContext } from 'react'

const Header = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { userType, setUserType } = useContext(UserContext)
    return (
        <div className="text-center" style={{ marginTop: "25px", marginBottom: "40px" }}>
            <h2>{props.tytul}</h2>
            <p className="lead">{props.par}</p>
        </div>
    )
}

export default Header;
