import React from 'react'
import './SidebarChat.css'
import {Avatar} from '@mui/material';
const SidebarChat = ({name, image_url, lastMessage}) => {
  return (
    <div className='sidebarChat' onClick = {()=>{console.log(`chat with ${name}`);}} >
      <Avatar src={image_url} />
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  )
}

export default SidebarChat
