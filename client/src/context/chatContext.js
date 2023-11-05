import axios from 'axios';
import {useState,useContext,createContext, useEffect} from 'react'
import { useAuthContext } from './authContext';

const chatContext = createContext();

const ChatProvider = ({children}) => {
   const [chats, setChats] = useState([]);
   const {user} = useAuthContext();

    const getChats = async () =>{
        try{
            const config = {
                headers:{
                    authorization:`Bearer ${user.token}`
                }
            }
            const response = await axios.get('http://localhost:5000/api/chats', config);
            setChats(response.data);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(user){
           getChats();
        }
    },[user]);

  return (
    <chatContext.Provider value={{chats,setChats}} >
        {children}
    </chatContext.Provider>
  )
}

export const useChatContext = () =>{
    return useContext(chatContext);
}

export default ChatProvider;
