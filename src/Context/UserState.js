import React, { useState } from "react";
import UserContext from "./UserContext";



const UserState = (props) => {

  // Credential State
  const [credential, setCredential] = useState({ name: '', email: '', password: '', confirmpassword: '' })

   return (
    <UserContext.Provider value={{ credential, setCredential }}>
      {props.children}
    </UserContext.Provider>

  )
}

export default UserState
