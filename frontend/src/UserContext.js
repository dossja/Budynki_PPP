

//TODO: login component + aktualizacja hooka user lub nawigacja/ context?
// export const UserContext = createContext({
//     user: "",
//     toggleUser: ()=>{}
//   }) //?

// eslint-disable-next-line no-unused-vars
import React, { Component, createContext, useState, useMemo, useEffect } from 'react';

const prevUser = window.localStorage.getItem('userType') || "";
export const UserContext = createContext(prevUser);

function UserContextProvider({ children }) {


  const [userType, setUserType] = useState(prevUser)
  const value = useMemo(() => ({ userType, setUserType }), [userType, setUserType]);
  useEffect(
    () => {
      window.localStorage.setItem("userType", userType);
      //alert(userType)
    },
    [userType]
  );
  // eslint-disable-next-line no-unused-vars
  const toggleUser = (userType) => {
    setUserType(userType);
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );

}

export default UserContextProvider;