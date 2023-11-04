import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

const App = () => {
  return (
    <div className='app'>
      <div className="app__body">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default App;
//We are going to need this later so guys