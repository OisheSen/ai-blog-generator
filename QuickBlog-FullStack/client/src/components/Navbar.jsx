import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    const {navigate, token} = useAppContext()

  return (
    <div className='navbar'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='navbar-logo' />
      <button onClick={()=>navigate('/admin')} className='navbar-btn'>
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className='navbar-btn-arrow' alt="arrow" />
      </button>
    </div>
  )
}

export default Navbar
