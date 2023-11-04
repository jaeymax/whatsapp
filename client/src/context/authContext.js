import {createContext, useContext, useEffect, useState} from 'react'

const authContext = createContext();

const AuthProvider = ({children}) => {


  const userData = JSON.parse(localStorage.getItem('userInfo'))==undefined?null:JSON.parse(localStorage.getItem('userInfo'));  
  const [user, setUser] = useState(userData);
  console.log(user);
  /*useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userData);
  },[user]);*/

  return (
    <authContext.Provider value={{user, setUser}} >
      {children}
    </authContext.Provider>
  )
}

export const useAuthContext = () =>{
    return useContext(authContext);
}

export default AuthProvider;
