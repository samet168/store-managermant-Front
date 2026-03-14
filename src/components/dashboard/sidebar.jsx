import React from 'react';
import { NavLink } from 'react-router-dom';
// import "../../App.css";
import '../../style/GlobalDashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column">
      {/* Logo / Brand */}
      <div className="sidebar-header mb-4">
        <h2 className="text-white">MyApp</h2>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav flex-grow-1">
        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active" : ""}>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/admin" className={({ isActive }) => isActive ? "active" : ""}>
          Admin
        </NavLink>
        <NavLink to="/dashboard/customer" className={({ isActive }) => isActive ? "active" : ""}>
          Customers
        </NavLink>
        <NavLink to="/dashboard/cashier" className={({ isActive }) => isActive ? "active" : ""}>
          Cashier
        </NavLink>
        <NavLink to="/dashboard/supplier" className={({ isActive }) => isActive ? "active" : ""}>
          supplier
        </NavLink>
        <NavLink to="/dashboard/manager" className={({ isActive }) => isActive ? "active" : ""}>
          Manager
        </NavLink>

      </nav>

      {/* <hr className="my-3" /> */}

      {/* Secondary Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/support" className={({ isActive }) => isActive ? "active" : ""}>
          Support
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;