import React, { useState } from 'react'
import CredentialContext from './CredentialContext'

const Credential = (props) => {

 // Credential State
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  return (
    <CredentialContext.Provider value={{credentials,setCredentials}}>
        {props.children}
    </CredentialContext.Provider>
  )
}

export default Credential
