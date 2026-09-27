import React from 'react'

const Newsletter = () => {
  return (
    <div className='newsletter'>
      <h1 className='newsletter-title'>Never Miss a Blog!</h1>
      <p className='newsletter-desc'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
      <form className='newsletter-form'>
        <input className='newsletter-input' type="text" placeholder='Enter your email id' required/>
        <button type='submit' className='newsletter-btn'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter
