import React, { Component , useState} from 'react'
import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import Home from './components/Home'
import AddProducts from './components/AddProducts'
import Signup from './components/Signup'
import Login from './components/Login'

export class App extends Component {
  render() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (username) => {
      setIsLoggedIn(true);
      setUsername(username);
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername('');
    };
    return (
      <Router>
        <Routes>
          <Route exact path="/addproducts" element={<AddProducts />} />
          <Route exact path="/home" element={<Home isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    )
  }
}

export default App