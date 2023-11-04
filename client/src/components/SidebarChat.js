import React from 'react'
import './SidebarChat.css'
import {Avatar} from '@mui/material';
const SidebarChat = () => {
  return (
    <div className='sidebarChat' >
      <Avatar/>
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>This is real time</p>
      </div>
    </div>
  )
}

export default SidebarChat
