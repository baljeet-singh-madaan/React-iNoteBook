import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import CredentialContext from '../../Context/CredentialContext';


const Login = (props) => {
  // Destructure Props
const {showAlert}=props;

const context = useContext(CredentialContext)
const {credentials,setCredentials}=context;
  // navigate 
  const navigate=useNavigate();



  // Handle Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    
    // IF valid email and pass give the auth token and saved in local storage
    if(json.success){
      localStorage.setItem('token',json.authToken)
      showAlert('success','  Logged in Successfully')
      // redirect
      navigate('/')
    }else{
      showAlert('danger','Invalid Credentials')
    }
  }
  // Handle Onchange Input
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container' >
      <h1 className='text-center'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className='mb-1'>Email address</label>
          <input type="email" className="form-control mb-1" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} placeholder="Enter email" required />
          <small id="emailHelp" className="form-text mb-2 " style={{color: 'white'}} >We'll never share your email with anyone else.</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className='mb-1 mt-3'>Password</label>
          <input type="password" className="form-control mb-2" id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
