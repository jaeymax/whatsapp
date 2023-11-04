import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path = '/register' element = {<Register/>}/>
          <Route path = '/login' element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
//We are going to need this later so guys