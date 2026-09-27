import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='admin-sidebar'>

      <NavLink end={true} to='/admin' className={({isActive})=> `admin-sidebar-link ${isActive ? "admin-sidebar-link-active" : ""}`}>
        <img src={assets.home_icon} alt="" className='admin-sidebar-icon'/>
        <p className='admin-sidebar-label'>Dashboard</p>
      </NavLink>

      <NavLink to='/admin/addBlog' className={({isActive})=> `admin-sidebar-link ${isActive ? "admin-sidebar-link-active" : ""}`}>
        <img src={assets.add_icon} alt="" className='admin-sidebar-icon'/>
        <p className='admin-sidebar-label'>Add blogs</p>
      </NavLink>

      <NavLink to='/admin/listBlog' className={({isActive})=> `admin-sidebar-link ${isActive ? "admin-sidebar-link-active" : ""}`}>
        <img src={assets.list_icon} alt="" className='admin-sidebar-icon'/>
        <p className='admin-sidebar-label'>Blog lists</p>
      </NavLink>

      <NavLink to='/admin/comments' className={({isActive})=> `admin-sidebar-link ${isActive ? "admin-sidebar-link-active" : ""}`}>
        <img src={assets.comment_icon} alt="" className='admin-sidebar-icon'/>
        <p className='admin-sidebar-label'>Comments</p>
      </NavLink>

    </div>
  )
}

export default Sidebar
