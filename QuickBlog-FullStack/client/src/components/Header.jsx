import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='header'>
      <div className='header-top'>

        <div className='header-badge'>
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className='header-badge-icon' alt="" />
        </div>

        <h1 className='header-title'>Your own <span className='header-title-highlight'> blogging</span> <br /> platform.</h1>

        <p className='header-desc'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>

        <form onSubmit={onSubmitHandler} className='header-search-form'>
          <input ref={inputRef} type="text" placeholder='Search for blogs' required className='header-search-input' />
          <button type="submit" className='header-search-btn'>Search</button>
        </form>

      </div>

      <div className='header-clear-wrap'>
        {
          input && <button onClick={onClear} className='header-clear-btn'>Clear Search</button>
        }
      </div>

      <img src={assets.gradientBackground} alt="" className='header-bg-image' />
    </div>
  )
}

export default Header
