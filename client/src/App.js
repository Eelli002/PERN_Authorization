import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Register from './components/register';

function App() {
  const [is_authenticated, set_is_authenticated] = useState(false);

  const Set_Auth = bool => set_is_authenticated(bool);

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
        </div>
      </Router>
    </>
  );
}

export default App;
