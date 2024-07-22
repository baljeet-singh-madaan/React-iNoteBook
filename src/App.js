import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import NotesState from "./Context/NotesState"
import Alert from './Components/Alert';
import Login from "./Components/Authentication/Login"
import Signup from "./Components/Authentication/Signup"
import Profile from './Components/Authentication/Profile';
import UserState from './Context/UserState';
import Credential from './Context/Credential';

function App() {

    // ALert Message Set
    const [alert, setAlert] = useState(null)

    const showAlert=(type,msg)=>{
      setAlert({
        type:type,
        msg:msg
      })
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  return (
    <>
      <Credential>
      <NotesState showAlert={showAlert}>
        <Router>
        <UserState>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path='/profile' element={<Profile/>} />
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About showAlert={showAlert}/>} />
              <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
          </UserState>
        </Router>
      </NotesState>
      </Credential>
      </>  
  );
}

export default App;
