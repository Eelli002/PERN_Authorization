import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/dashboard';
import Login from './components/login';
import Register from './components/register';


function App() {
  const [is_authenticated, set_is_authenticated] = useState(false);

  const Set_Auth = bool => set_is_authenticated(bool);

  const Authorization_Check = async () => {
    try 
    {
      // console.log("Authorizing: client/src/App :: Authorization_Check()")
      const response = 
        await fetch(
          'http://localhost:3002/auth/is-verify',
          { "method": "GET", "headers": { "token":localStorage.token } }
        )
      const parsed_response = await response.json();
      // console.log("parsed_response: ", parsed_response);
      parsed_response === true ? set_is_authenticated(true) : set_is_authenticated(false);
      //set_is_authenticated(parsed_response == true)
    } 
    catch (error) {
      console.error(error.message);
    }

  }

  useEffect(() => {
    Authorization_Check();
  } , [])

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route 
              path='/login' 
              element={ !is_authenticated ? <Login Set_Auth={Set_Auth}/> : <Navigate to='/dashboard'/> } >
            </Route>
            <Route 
              path='/register' 
              element={ !is_authenticated ? <Register Set_Auth={Set_Auth}/> : <Navigate to='/dashboard'/> }>
            </Route>
            <Route 
              path='/dashboard' 
              element={ is_authenticated ? <Dashboard Set_Auth={Set_Auth}/> : <Navigate to='/login'/> }>
            </Route>
          </Routes>
          <ToastContainer/>
        </div>
      </Router>
    </>
  );
}

export default App;
