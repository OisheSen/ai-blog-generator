import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-top'>

        <div className='footer-brand'>
            <img src={assets.logo} alt="logo" className='footer-logo'/>
            <p className='footer-desc'> Insightful articles, powered by AI. Quickblog helps you write,
            publish, and share ideas faster — without losing your voice.</p>
        </div>

        <div className='footer-links'>
            {footer_data.map((section, index)=> (
                <div key={index} className='footer-col'>
                    <h3 className='footer-col-title'>{section.title}</h3>
                    <ul className='footer-col-list'>
                        {section.links.map((link, i)=> (
                            <li key={i}>
                                <a href="#" className='footer-link'>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>


      </div>
      <p className='footer-copyright'>Copyright 2025 © QuickBlog GreatStack - All Right Reserved.</p>
    </div>
  )
}

export default Footer
