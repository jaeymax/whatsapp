import React from 'react'
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import {Avatar,IconButton} from '@mui/material';
import {Chat, SearchOutlined ,MoreVert, DonutLarge} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div className='sidebar'>
       <div className="sidebar__header">
          <Avatar/>
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
       <div className="sidebar__search">
        <SearchOutlined/>
        <div className="sidebar__searchContainer">
          <input placeholder='search or start a new conversation' type="text" />
        </div>
       </div>
       <div className="sidebar__chats">
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>
           <SidebarChat/>
       </div>
    </div>
  )
}

export default Sidebar
