import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import {SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic} from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import { useChatContext } from '../context/chatContext';
import axios from 'axios';
import { useAuthContext } from '../context/authContext';
import { CircularProgress, Backdrop } from '@mui/material';

const Chat = () => {
  
  const [messages, setMessages] = useState([]);
  const {selectedChat} = useChatContext();
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext();

  const getMessages = async () => {
      try{
         const options = {
           headers:{
             authorization:`Bearer ${user.token}`
           }
         }
         setLoading(true);
         const response = await axios.get(`http://localhost:5000/api/messages/?chatId=${selectedChat}`, options);
         setMessages(response.data);
         setLoading(false);
      }
      catch(err){
         console.log(err);
         setLoading(false);
      }
  }

  useEffect(()=>{
      if(selectedChat){
        getMessages();
      }
  },[selectedChat]);


  if(loading){
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
        <div className="chat__body" style={{display:"grid",placeItems:'center'}} >
            <CircularProgress/>
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
        {/* <ChatMessage sender = {'Jay'} body = {'Yoo Tony'} time = {new Date().toUTCString()}  /> */}
        {
          messages.map(message=><ChatMessage key={message._id} _id = {message._id} senderName = {message.from.name} senderId = {message.from._id} receiverName = {message.to.name} receiverId = {message.to._id} body={message.body} time = {message.createdAt} />)
        }
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
