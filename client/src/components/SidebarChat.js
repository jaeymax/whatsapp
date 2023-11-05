import React from 'react'
import './SidebarChat.css'
import {Avatar} from '@mui/material';
import { useChatContext } from '../context/chatContext';


const SidebarChat = ({name, id, image_url, lastMessage}) => {

  const {selectedChat, setSelectedChat} = useChatContext();

  const handleClick = () =>{
    console.log(`chat with ${name}`);
    setSelectedChat(id);
  }

  return (
    <div className='sidebarChat' onClick = {handleClick} >
      <Avatar src={image_url} />
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  )
}

export default SidebarChat
