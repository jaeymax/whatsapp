import {useState} from 'react'
import './Login.css'

const Login = () => {

    const [formData,setFormData] = useState({
        "email":"",
         "password":""
      });
    
      const handleSubmit = (e) =>{
         e.preventDefault();
         
      }
    
      const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
    
        setFormData((prevState)=>({
            ...prevState,[name]:value
        }));
    
      }

  return (
    <div className='login' >
         <form onSubmit={handleSubmit} >
         <h2 style={{textAlign:"center"}}>Login In</h2>
         <label htmlFor="email">Email</label>
         <input type='email' name='email' id='email' placeholder='Enter your email' onChange={handleChange} value={formData.email} />
         <label htmlFor="password">Password</label>
         <input type='password' name='password' id='password' placeholder='Enter your password' onChange={handleChange} value={formData.password} />
         <button type='submit'>Login</button>
         </form>

    </div>
  )
}

export default Login;
