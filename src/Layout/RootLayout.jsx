import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/navbar';
import Sidebar from '../components/dashboard/sidebar';
import Footer from '../components/dashboard/footer';

const RootLayout = () => {
  return (
    <div className="app-container d-flex flex-column vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="main-content flex-grow-1">
          <Outlet /> {/* Child route (Customer) renders here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;