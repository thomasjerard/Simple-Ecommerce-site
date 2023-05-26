import React from 'react';
import Navbar from './Navbar';
import Products from './Products';
import '../css/Home.css';

function Home({ isLoggedIn, username, handleLogout }) {
  return (
    <div className='wrapper'>
        <Navbar isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
        <Products />  
    </div>  
  );
}

export default Home