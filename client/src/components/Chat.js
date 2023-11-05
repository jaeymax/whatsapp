import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import {SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic} from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import { useChatContext } from '../context/chatContext';
import axios from 'axios';
import { useAuthContext } from '../context/authContext';
import { CircularProgress} from '@mui/material';

const Chat = () => {
  
  const [messages, setMessages] = useState([]);
  //const [message, setMessage] = useState('');
  const {selectedChat} = useChatContext();
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext();
  const messageRef = useRef(null);

  const handleSubmit = async(e) =>{
    if(!messageRef?.current.value)return;
    e.preventDefault();
    try{
      const config = {
        headers:{
          authorization:`Bearer ${user.token}`
        }
      }
      const receiver = selectedChat.users[0]._id === user._id?selectedChat.users[1]:selectedChat.users[0];
      const data = {chat:selectedChat._id, from:user._id, to:receiver._id, body:messageRef.current.value}
      messageRef.current.value = '';

      const response = await axios.post('http://localhost:5000/api/messages', data, config);
      
      if(response.status === 201){
         console.log(`message sent from ${user.name} to ${receiver.name}`);
         const res = await axios.put(`http://localhost:5000/api/chats/${selectedChat._id}`, {messageId:response.data._id}, config);
         if(res.status === 200){
           console.log(`${selectedChat._id} was updated`);
         }
      }
    }
    catch(err){
      console.log(err);
    }
  }


  const getMessages = async () => {
      try{
         const options = {
           headers:{
             authorization:`Bearer ${user.token}`
           }
         }
         setLoading(true);
         const response = await axios.get(`http://localhost:5000/api/messages/?chatId=${selectedChat._id}`, options);
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
        {
          messages.map(message=><ChatMessage key={message._id} _id = {message._id} senderName = {message.from.name} senderId = {message.from._id} receiverName = {message.to.name} receiverId = {message.to._id} body={message.body} time = {message.createdAt} />)
        }
      </div>
      <div className="chat__footer">
        <InsertEmoticon/>
        <form onSubmit={handleSubmit} >
          <input ref={messageRef} placeholder = 'Type a message'/>
          <button type='submit' hidden >Send a message</button>
        </form>
        <Mic/>
      </div>
    </div>
  )
}

export default Chat
