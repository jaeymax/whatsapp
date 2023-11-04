import {useState} from 'react'
import './Register.css';

const Register = () => {

  const [formData,setFormData] = useState({
    "name":"",
    "email":"",
     "password":"",
     "confirm_password":""
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
    <div className='register' >
         <form onSubmit={handleSubmit} >
         <h2 style={{textAlign:"center"}}>Create Account</h2>
         <label htmlFor="name">Name</label>
         <input type='text' name='name' id='name' value={formData.name} placeholder='Enter your name' onChange={handleChange} />
         <label htmlFor="email">Email</label>
         <input type='email' name='email' id='email' placeholder='Enter your email' onChange={handleChange} value={formData.email} />
         <label htmlFor="password">Password</label>
         <input type='password' name='password' id='password' placeholder='Enter your password' onChange={handleChange} value={formData.password} />
         <label htmlFor="confirm_password">Confirm Password</label>
         <input type='password' name='comfirm_password' id='confirm_password' placeholder='Confirm password' onChange={handleChange} value={formData.confirm_password} />
         <button type='submit'>Register</button>
         </form>

    </div>
  )
}

export default Register
