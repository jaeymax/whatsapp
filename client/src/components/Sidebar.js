import React, { useEffect } from 'react'
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import {Avatar,IconButton} from '@mui/material';
import {Chat, SearchOutlined ,MoreVert, DonutLarge} from '@mui/icons-material';
import { useChatContext } from '../context/chatContext';
import { useAuthContext } from '../context/authContext';

const Sidebar = () => {

  const {chats,selectedChat,setSelectedChat} = useChatContext();
  const {user} = useAuthContext();

  useEffect(()=>{

    console.log(chats);
    if(chats.length>0){
      setSelectedChat(chats[0]._id);
    }
  },[chats])


  return (
    <div className='sidebar'>
       <div className="sidebar__header">
          <Avatar src='https:xsgames.co/randomusers/avatar.php?g=male' />
          <div className="sidebar__headerRight">
              
              <IconButton>
                <DonutLarge/>
              </IconButton>
              <IconButton>
                <Chat/>
              </IconButton>
              <IconButton>
                <MoreVert/>
              </IconButton>
              
          </div>
       </div>
       <div className="sidebar__search" >
        <SearchOutlined/>
        <div className="sidebar__searchContainer">
          <input placeholder='search or start a new conversation' type="text" />
        </div>
       </div>
       <div className="sidebar__chats">
         {
          chats.map(chat =>{
            const chatUser = (user._id === chat.users[1]._id)?chat.users[0]:chat.users[1];
            return <SidebarChat key={chat._id} id = {chat._id} name = {chatUser.name} image_url={chatUser.image_url} lastMessage = {'This is real time'}  />

          })
         }
       </div>
    </div>
  )
}

export default Sidebar
