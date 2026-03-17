import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../style/GlobalDashboard.css';

const Sidebar = () => {

  const [openAdmin, setOpenAdmin] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCashier, setOpenCashier] = useState(false);
  const location = useLocation();

  // auto open when inside admin
  React.useEffect(() => {
    if (location.pathname.includes("/admin")) {
      setOpenAdmin(true);
    }

    
  }, [location]);

  React.useEffect(() => {
    if (location.pathname.includes("/cashier")) {
      setOpenUser(true);
    }
  }, [location]);

  React.useEffect(() => {
    if (location.pathname.includes("/cashier")) {
      setOpenCashier(true);
    }
  }, [location]);

  return (
    <div className="sidebar d-flex flex-column">

      {/* Logo */}
      <div className="sidebar-header mb-4">
        <h2 className="text-white">MyApp</h2>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav flex-grow-1">

        <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active" : ""}>
          Dashboard
        </NavLink>

        {/* ADMIN DROPDOWN */}
        <div 
          className="sidebar-link"
          onClick={() => setOpenAdmin(!openAdmin)}
        >
          Admin ▾
        </div>

        {openAdmin && (
          <div className="submenu sidebar-nav flex-grow-1">

            <NavLink to="/dashboard/admin/products">
              Products
            </NavLink>

            <NavLink to="/dashboard/admin/users">
              User
            </NavLink>

            <NavLink to="/dashboard/admin/Categories">
              Categories
            </NavLink>

            <NavLink to="/dashboard/admin/suppliers">
              suppliers
            </NavLink>

            <NavLink to="/dashboard/admin/suppliers">
              suppliers
            </NavLink>

            <NavLink to="/dashboard/admin/suppliers">
              suppliers
            </NavLink>

            <NavLink to="/dashboard/admin/orders">
              orders
            </NavLink>

            <NavLink to="/dashboard/admin/stock-logs">
              stock-logs
            </NavLink>

          </div>
        )}

        {/* <NavLink to="/dashboard/user" className={({ isActive }) => isActive ? "active" : ""}>
          User
        </NavLink> */}

        {/* USER DROPDOWN */}
        <div 
          className="sidebar-link"
          onClick={() => setOpenUser(!openUser)}
        >
          charchri ▾
        </div>

        <NavLink to="/dashboard/customer" >
          Customers
        </NavLink>
        <NavLink to="/dashboard/employee" >
          Employee
        </NavLink>

        {/* <NavLink to="/dashboard/cashier" className={({ isActive }) => isActive ? "active" : ""}>
          Cashier
        </NavLink> */}

        <div 
          className="sidebar-link"
          onClick={() => setOpenCashier(!openCashier)}
        >
          Cashier ▾
        </div>
        {
          openCashier && (
            <div className="submenu sidebar-nav flex-grow-1">
              <NavLink to="/dashboard/cashier" className={({ isActive }) => isActive ? "active" : ""}>
                Cashier
              </NavLink>
            </div>
          )
        }

        <NavLink to="/dashboard/supplier" className={({ isActive }) => isActive ? "active" : ""}>
          Supplier
        </NavLink>

        <NavLink to="/dashboard/manager" className={({ isActive }) => isActive ? "active" : ""}>
          Manager
        </NavLink>

      </nav>

      {/* Bottom */}
      <nav className="sidebar-nav">
        <NavLink to="/support">Support</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>

    </div>
  );
};

export default Sidebar;