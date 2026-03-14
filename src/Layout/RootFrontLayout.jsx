import React from 'react';
import { Outlet } from 'react-router-dom'; // ✅ ចាំបាច់
import Navbar from '../components/front/navbar';
import Footer from '../components/front/footer';

const RootFrontLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="main-content flex-grow-1 p-4">
        <Outlet /> {/* Child routes render here */}
      </div>
      <Footer />
    </div>
  );
};

export default RootFrontLayout;