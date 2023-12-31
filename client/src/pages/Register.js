import {useEffect, useState} from 'react'
import './Register.css';
import axios from 'axios';
import { Alert, CircularProgress,Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const Register = () => {

  const [formData,setFormData] = useState({
    "name":"",
    "email":"",
     "password":"",
     "confirm_password":""
  });

  const {name, email, password, confirm_password} = formData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {user, setUser} = useAuthContext();

  const navigate = useNavigate();

  useEffect(()=>{
      if(user){
        navigate('/');
      }
  },[user]);

  const handleSubmit = async (e) =>{
     e.preventDefault();

     if(password != confirm_password){
        setError('Passwords must match');
        return;
     }

     try{
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/users/', {name, email, password});
        
        if(response.status == 201){
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            setUser(response.data);
        }
        setLoading(false);
     }
     catch(err){
        console.log(err);
        const response = await err.response;
        setError(response.data.message);
        setLoading(false);
     }
     
  }

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevState)=>({
        ...prevState,[name]:value
    }));

  }

  
  if(loading){
    return <div className="login">
    <Backdrop
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open = {true}
    >
    <CircularProgress/>
    </Backdrop>
    </div>
  }

  return (
    <div className='register' >
         <form onSubmit={handleSubmit} >
         <h2 style={{textAlign:"center"}}>Create Account</h2>
         {error && <Alert onClose={()=>{setError('')}} variant='outlined' severity='error'>{error}</Alert>}
         <label htmlFor="name">Name</label>
         <input type='text' name='name' id='name' value={formData.name} placeholder='Enter your name' onChange={handleChange} />
         <label htmlFor="email">Email</label>
         <input type='email' name='email' id='email' placeholder='Enter your email' onChange={handleChange} value={formData.email} />
         <label htmlFor="password">Password</label>
         <input type='password' name='password' id='password' placeholder='Enter your password' onChange={handleChange} value={formData.password} />
         <label htmlFor="confirm_password">Confirm Password</label>
         <input type='password' name='confirm_password' id='confirm_password' placeholder='Confirm password' onChange={handleChange} value={formData.confirm_password} />
         <button className = 'btn-primary' type='submit'>Register</button>
         </form>

    </div>
  )
}

export default Register
