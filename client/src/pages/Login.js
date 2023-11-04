import {useState} from 'react'
import './Login.css'
import axios from 'axios'
import { Alert } from '@mui/material'

const Login = () => {

    const [formData,setFormData] = useState({
        "email":"",
         "password":""
      });
    

    const {email, password} = formData;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

      const handleSubmit = async (e) =>{
         e.preventDefault();
        try{
            console.log(email, password);
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/users/login',{email,password});
            //const data = await response.json();
            //console.log(data);
        }
        catch(err){
            const response = await err.response;
            setError(response.data.message);
            setLoading(false);
        }
        setLoading(false);
      }
    
      const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
    
        setFormData((prevState)=>({
            ...prevState,[name]:value
        }));
    
      }

  if(loading){
    return <h1>Loading</h1>
  }

  return (
    <div className='login' >
         <form onSubmit={handleSubmit} >
         <h2 style={{textAlign:"center"}}>Login In</h2>
         {error && <Alert onClose={()=>{setError('')}} variant='outlined' severity='error'>{error}</Alert>}
         <label htmlFor="email">Email</label>
         <input type='email' name='email' id='email' placeholder='Enter your email' required onChange={handleChange} value={formData.email} />
         <label htmlFor="password">Password</label>
         <input type='password' name='password' id='password' placeholder='Enter your password' required onChange={handleChange} value={formData.password} />
         <button className='btn-primary' type='submit'>Login</button>
         </form>

    </div>
  )
}

export default Login;
