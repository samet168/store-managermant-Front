import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/navbar';
import Sidebar from '../components/dashboard/sidebar';
import Footer from '../components/dashboard/footer';

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (

  
  <div className="app-layout">
    <Navbar onSidebarToggle={() => setSidebarOpen(v => !v)} />
    <div className="app-body">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  </div>
  );
};

export default RootLayout;