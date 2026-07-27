import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('verify-otp');

  return (
    <div className="flex flex-col min-h-screen bg-base-100 font-inter">
      {!noHeaderFooter && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!noHeaderFooter && <Footer />}
    </div>
  );
};
