import React from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import {SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic} from '@mui/icons-material';

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar/>
        <div className="chat__headerInfo">
            <h3>Room name</h3>
            <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>
        </div>
      </div>
      <div className="chat__body">
         <p className ='chat__message'>
          <span className="chat__name">Jay</span>
          Yooo Tony
          <span className="chat__timestamp">
            {new Date().toUTCString()}
          </span>
         </p>
         <p className ='chat__message  received'>
          <span className="chat__name">Tonny</span>
          Yooo jay wassop?
          <span className="chat__timestamp">
            {new Date().toUTCString()}
          </span>
         </p>
         <p className ='chat__message'>
          <span className="chat__name">Jay</span>
          Normal vybs oh bwoy your end? 
          <span className="chat__timestamp">
            {new Date().toUTCString()}
          </span>
         </p>
         <p className ='chat__message received'>
          <span className="chat__name">Tonny</span>
          Vyb same here oh breda me too i dey inside
          <span className="chat__timestamp">
            {new Date().toUTCString()}
          </span>
         </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon/>
        <form>
          <input placeholder = 'Type a message'/>
          <button type='submit' hidden >Send a message</button>
        </form>
        <Mic/>
      </div>
    </div>
  )
}

export default Chat
