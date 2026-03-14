import React, { useEffect, useState } from 'react';
import '../../style/GlobalDashboard.css';
import api from '../../services/api';

const Navbar = () => {
  // state to store logged in user
  const [user, setUser] = useState(null);

  // Check localStorage for token and user info on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user_name = localStorage.getItem('user_name');

    if (token && user_name) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ name: user_name });
    }
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      // Call Laravel logout API
      await api.post(
        '/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove token and user info
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');

      // Update state
      setUser(null);
      alert('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      alert('Logout failed');
    }
  };

  return (
    <nav className="navbarD">
      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo">Apex Dashboard</div>

        {/* Menu */}
        <ul className="navbar-menu">
          <li><a className="nav-link active" href="#">Dashboard</a></li>
          <li><a className="nav-link" href="#">Analytics</a></li>
          <li><a className="nav-link" href="#">Reports</a></li>
          <li><a className="nav-link" href="#">Settings</a></li>
        </ul>

        {/* Login/Register or Logout */}
        <div className="navbar-actions">
          {user ? (
            <>
              <span className="user-name me-2">Hello, {user.name}</span>
              <button className="btn-logout btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <a href="/dashboard/login" className="btn-login btn btn-primary me-2">Login</a>
              <a href="/dashboard/register" className="btn-register btn btn-secondary">Register</a>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;