import React from 'react'
import './ChatMessage.css';
import { useAuthContext } from '../context/authContext';

const ChatMessage = ({senderName, senderId, receiverName, receiverId, body, time}) => {

  const {user} = useAuthContext();

  return (
    <p className ={`chat__message ${user._id!==senderId && 'received'}`}>
          <span className="chat__name">{user._id === senderId?'You':senderName}</span>
          {body}
          <span className="chat__timestamp">
            {time}
          </span>
    </p>
  )
}

export default ChatMessage
