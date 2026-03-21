// import React, { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';


// const Sidebar = () => {

//   const [openAdmin, setOpenAdmin] = useState(false);
//   const [openUser, setOpenUser] = useState(false);
//   const [openCashier, setOpenCashier] = useState(false);
//   const location = useLocation();

//   // auto open when inside admin
//   React.useEffect(() => {
//     if (location.pathname.includes("/admin")) {
//       setOpenAdmin(true);
//     }

    
//   }, [location]);

//   React.useEffect(() => {
//     if (location.pathname.includes("/cashier")) {
//       setOpenUser(true);
//     }
//   }, [location]);

//   React.useEffect(() => {
//     if (location.pathname.includes("/cashier")) {
//       setOpenCashier(true);
//     }
//   }, [location]);

//   return (
//     <div className="sidebar d-flex flex-column">

//       {/* Logo */}
//       <div className="sidebar-header mb-4">
//         <h2 className="text-white">MyApp</h2>
//       </div>

//       {/* Main Navigation */}
//       <nav className="sidebar-nav flex-grow-1">

//         <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active" : ""}>
//           Dashboard
//         </NavLink>

//         {/* ADMIN DROPDOWN */}
//         <div 
//           className="sidebar-link"
//           onClick={() => setOpenAdmin(!openAdmin)}
//         >
//           Admin ▾
//         </div>

//         {openAdmin && (
//           <div className="submenu sidebar-nav flex-grow-1">

//             <NavLink to="/dashboard/admin/products">
//               Products
//             </NavLink>

//             <NavLink to="/dashboard/admin/users">
//               User
//             </NavLink>

//             <NavLink to="/dashboard/admin/Categories">
//               Categories
//             </NavLink>

//             <NavLink to="/dashboard/admin/suppliers">
//               suppliers
//             </NavLink>
//             <NavLink to="/dashboard/admin/orders">
//               orders
//             </NavLink>

//             <NavLink to="/dashboard/admin/stock-logs">
//               stock-logs
//             </NavLink>

//           </div>
//         )}

//         {/* <NavLink to="/dashboard/user" className={({ isActive }) => isActive ? "active" : ""}>
//           User
//         </NavLink> */}

//         {/* USER DROPDOWN */}
//         <div 
//           className="sidebar-link"
//           onClick={() => setOpenUser(!openUser)}
//         >
//           charchri ▾
//         </div>

//         <NavLink to="/dashboard/customer" >
//           Customers
//         </NavLink>
//         <NavLink to="/dashboard/employee" >
//           Employee
//         </NavLink>

//         {/* <NavLink to="/dashboard/cashier" className={({ isActive }) => isActive ? "active" : ""}>
//           Cashier
//         </NavLink> */}

//         <div 
//           className="sidebar-link"
//           onClick={() => setOpenCashier(!openCashier)}
//         >
//           Cashier ▾
//         </div>
//         {
//           openCashier && (
//             <div className="submenu sidebar-nav flex-grow-1">
//               <NavLink to="/dashboard/cashier" className={({ isActive }) => isActive ? "active" : ""}>
//                 Cashier
//               </NavLink>
//             </div>
//           )
//         }

//         <NavLink to="/dashboard/supplier" className={({ isActive }) => isActive ? "active" : ""}>
//           Supplier
//         </NavLink>

//         <NavLink to="/dashboard/manager" className={({ isActive }) => isActive ? "active" : ""}>
//           Manager
//         </NavLink>

//       </nav>

//       {/* Bottom */}
//       <nav className="sidebar-nav">
//         <NavLink to="/support">Support</NavLink>
//         <NavLink to="/settings">Settings</NavLink>
//       </nav>

//     </div>
//   );
// };

// export default Sidebar;




import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/* ─── icons ─────────────────────────────────────────────── */
const Icon = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l2.09 6.26L20 10l-5 4.87L16.18 21 12 17.77 7.82 21 9 14.87 4 10l5.91-1.74L12 2z"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  cashier: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <path d="M2 10h20"/>
    </svg>
  ),
  customer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  employee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  ),
  supplier: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  manager: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/>
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
};

/* ─── sub-menu items ─────────────────────────────────────── */
const ADMIN_ITEMS = [
  { to: '/dashboard/admin/products',   label: 'Products'   },
  { to: '/dashboard/admin/users',      label: 'Users'      },
  { to: '/dashboard/admin/Categories', label: 'Categories' },
  { to: '/dashboard/admin/suppliers',  label: 'Suppliers'  },
  { to: '/dashboard/admin/orders',     label: 'Orders'     },
  { to: '/dashboard/admin/stock-logs', label: 'Stock Logs' },
];

const CASHIER_ITEMS = [
  { to: '/dashboard/cashier', label: 'Cashier' },
];

/* ─── accordion group ───────────────────────────────────── */
function AccordionGroup({ icon, label, items, open, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (contentRef.current) setHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div className="sb-group">
      <button className="sb-group-btn" onClick={onToggle}>
        <span className="sb-icon">{icon}</span>
        <span className="sb-label">{label}</span>
        <span className={`sb-chevron${open ? ' sb-chevron--open' : ''}`}>{Icon.chevron}</span>
      </button>
      <div className="sb-accordion" style={{ height }} ref={contentRef}>
        <div className="sb-sub">
          {items.map(({ to, label: l }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `sb-sub-link${isActive ? ' sb-sub-link--active' : ''}`}>
              <span className="sb-sub-dot" />
              {l}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────────────────── */
export default function Sidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const [openAdmin,   setOpenAdmin]   = useState(false);
  const [openCharchri, setOpenCharchri] = useState(false);
  const [openCashier, setOpenCashier] = useState(false);

  /* auto-open relevant group */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (location.pathname.includes('/admin'))   setOpenAdmin(true);
    if (location.pathname.includes('/cashier')) setOpenCashier(true);
  }, [location.pathname]);

  const link = (to, icon, label, end = false) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `sb-link${isActive ? ' sb-link--active' : ''}`}
      onClick={onClose}
    >
      <span className="sb-icon">{icon}</span>
      <span className="sb-label">{label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div className="sb-overlay" onClick={onClose} />}

      <aside className={`sb${mobileOpen ? ' sb--open' : ''}`}>
        {/* Top accent line */}
        <div className="sb-topline" />

        {/* Header */}
        <div className="sb-head">
          <div className="sb-logo">
            <div className="sb-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <span className="sb-logo-text">Apex</span>
          </div>
          <button className="sb-close" onClick={onClose} aria-label="Close sidebar">{Icon.close}</button>
        </div>

        {/* Section label */}
        <p className="sb-section-label">Main</p>

        {/* Navigation */}
        <nav className="sb-nav">
          {link('/dashboard', Icon.dashboard, 'Dashboard', true)}

          <AccordionGroup
            icon={Icon.admin}
            label="Admin"
            items={ADMIN_ITEMS}
            open={openAdmin}
            onToggle={() => setOpenAdmin(v => !v)}
          />

          <div
            className="sb-group-btn sb-group-btn--plain"
            onClick={() => setOpenCharchri(v => !v)}
          >
            <span className="sb-icon">{Icon.users}</span>
            <span className="sb-label">Charchri</span>
            <span className={`sb-chevron${openCharchri ? ' sb-chevron--open' : ''}`}>{Icon.chevron}</span>
          </div>

          {link('/dashboard/customer',  Icon.customer,  'Customers')}
          {link('/dashboard/employee',  Icon.employee,  'Employee')}

          <AccordionGroup
            icon={Icon.cashier}
            label="Cashier"
            items={CASHIER_ITEMS}
            open={openCashier}
            onToggle={() => setOpenCashier(v => !v)}
          />

          {link('/dashboard/supplier', Icon.supplier, 'Supplier')}
          {link('/dashboard/manager',  Icon.manager,  'Manager')}
        </nav>

        <div className="sb-divider" />

        {/* Bottom nav */}
        <p className="sb-section-label">System</p>
        <nav className="sb-nav">
          {link('/support',  Icon.support,  'Support')}
          {link('/settings', Icon.settings, 'Settings')}
        </nav>

        {/* Footer badge */}
        <div className="sb-foot">
          <div className="sb-version">v1.0.0</div>
        </div>
      </aside>
    </>
  );
}