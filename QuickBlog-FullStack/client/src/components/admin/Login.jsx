import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
import { data } from 'react-router-dom';

const Login = () => {

    const {axios, setToken} = useAppContext();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
          const {data} = await axios.post('/api/admin/login', {email, password})

          if(data.success){
            setToken(data.token)
            localStorage.setItem('token', data.token)
            axios.defaults.headers.common['Authorization'] = data.token;
          }
          else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

  return (
    <div className='admin-login-container'>
      <div className='admin-login-card'>
        <div className='admin-login-inner'>
            <div className='admin-login-header'>
                <h1 className='admin-login-title'><span className='admin-login-title-highlight'>Admin</span> Login</h1>
                <p className='admin-login-subtitle'>Enter your credentials to access the admin panel</p>
            </div>
            <form onSubmit={handleSubmit} className='admin-login-form'>
                <div className='admin-form-group'>
                    <label> Email </label>
                    <input onChange={e=> setEmail(e.target.value)} value={email}
                    type="email" required placeholder='your email id' className='admin-form-input'/>
                </div>
                <div className='admin-form-group'>
                    <label> Password </label>
                    <input onChange={e=> setPassword(e.target.value)} value={password}
                    type="password" required placeholder='your password' className='admin-form-input'/>
                </div>
                <button type="submit" className='admin-login-btn'> Login </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
