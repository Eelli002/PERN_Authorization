import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route exact path='/login' />
            <Route exact path='/register' />
            <Route exact path='/dashboard' />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
