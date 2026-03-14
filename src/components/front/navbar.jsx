import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Front/GlobalFront.css';
import api from '../../services/api';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("user_name");
    console.log(userName);
    
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ name: userName  });
    }
  }, []);

  // Logout function
const handleLogout = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }

    // Call Laravel logout API with Authorization header
    await api.post(
      '/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // send token to backend
        },
      }
    );

    // Remove token and user info
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');

    // Update Navbar state
    setUser(null);
    alert('Logout successful');
  } catch (error) {
    console.error('Logout failed:', error.response?.data || error.message);
    alert('Logout failed');
  }
};

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">StoreFront</div>

      {/* Desktop Menu */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Desktop CTA */}
      <div className="cta-buttons">
        {user ? (
          <>
            <span className="user-name">Hi, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/register"><button className="register-btn">Register</button></Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="mobile-menu">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>

          <li className="mobile-cta">
            {user ? (
              <>
                <span className="user-name">Hi, {user.name}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login"><button className="login-btn">Login</button></Link>
                <Link to="/register"><button className="register-btn">Register</button></Link>
              </>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;