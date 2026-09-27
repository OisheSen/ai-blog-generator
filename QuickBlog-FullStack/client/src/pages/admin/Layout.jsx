import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

    const {axios, setToken, navigate} = useAppContext()

    const logout = ()=>{
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
        setToken(null)
        navigate('/')
    }

  return (
    <>
      <div className='admin-header'>
        <img src={assets.logo} alt="" className='admin-header-logo' onClick={()=> navigate('/')}/>
        <button onClick={logout} className='admin-logout-btn'>Logout</button>
      </div>
      <div className='admin-body'>
            <Sidebar />
            <Outlet />
      </div>
    </>
  )
}

export default Layout
