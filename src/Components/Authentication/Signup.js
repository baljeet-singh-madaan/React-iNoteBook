import React,{useContext} from 'react'
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {

const context = useContext(UserContext)
const {credential,setCredential}=context;

  // Destructure Props
  const { showAlert } = props;

   // navigate 
   const navigate = useNavigate();

   // Handle Submit Form
   const handleSubmit = async (e) => {
     e.preventDefault();
     const response = await fetch('http://localhost:5000/api/auth/createuser', {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }), // body data type must match "Content-Type" header
     });
     const json = await response.json(); // parses JSON response into native JavaScript objects
 
     // IF valid email and pass give the auth token and saved in local storage
     if (json.success) {
       localStorage.setItem('token', json.authToken)
       console.log(json)
       // redirect
       navigate('/')
       showAlert('success', ' Account Created Successfully')
     } else {
       showAlert('danger', 'Invalid credential')
     }
   }
 

  // Handle Onchange Input
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <div className='container' >
    <h1 className='text-center'>Sign up</h1>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="name" className='mb-1'>Name</label>
        <input type="text" className="form-control mb-2" id="name" name='name' onChange={onChange} value={credential.name} placeholder="Enter Name" required/>
      </div>

      <div className="form-group">
        <label htmlFor="email" className='mb-1'>Email address</label>
        <input type="email" className="form-control mb-1" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credential.email} placeholder="Enter email" required />
        <small id="email" className="form-text text-muted mb-3" style={{color: 'white'}}>We'll never share your email with anyone else.</small>
      </div>

      <div className="form-group">
        <label htmlFor="password" className='mb-1'>Password</label>
        <input type="password" className="form-control mb-2" id="password" name='password' onChange={onChange} value={credential.password} placeholder="Password" />
      </div>

      <div className="form-group">
        <label htmlFor="confirmpassword" className='mb-1'>Confirm Password</label>
        <input type="password" className="form-control mb-2" id="confirmpassword" name='confirmpassword' onChange={onChange} placeholder="Password" />
      </div>
      
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
  </div>
  )
}

export default Signup
