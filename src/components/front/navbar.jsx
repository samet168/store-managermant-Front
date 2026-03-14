import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Front/GlobalFront.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbarD">
      {/* Logo */}
      <div className="logo">StoreFront</div>

      {/* Desktop Menu */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Call-to-action buttons */}
      <div className="cta-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="register-btn">Register</button>
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="mobile-menu">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li className="mobile-cta">
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/register"><button className="register-btn">Register</button></Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;