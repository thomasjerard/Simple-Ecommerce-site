import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo.svg'
import '../css/Navbar.css'

function Navbar({ isLoggedIn, username, handleLogout }) {
  return (
    <div className='navbox'>
        <div className='navbox__left'>
            <div className='navbox__logo'>        
                <img src={logo} alt='logo' />        
            </div>            
        </div>
        <div className='navbox__right'>
        {isLoggedIn ? (
          <>
            <span className="navbox__username">Welcome, {username}</span>
            <button onClick={handleLogout} className="navbox__link">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbox__link">
              Login
            </Link>
            <Link to="/signup" className="navbox__link">
              Signup
            </Link>
          </>
        )}
        </div> 
    </div>
  )
}

export default Navbar