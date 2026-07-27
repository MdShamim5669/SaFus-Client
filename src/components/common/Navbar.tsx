import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const displayCartCount = totalCartCount;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-bold uppercase tracking-wider text-xs lg:text-sm transition-colors duration-200 ${
              isActive ? 'text-[#EEFF25] font-extrabold' : 'hover:text-[#EEFF25] text-white'
            }`
          }
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `font-bold uppercase tracking-wider text-xs lg:text-sm transition-colors duration-200 ${
              isActive ? 'text-[#EEFF25] font-extrabold' : 'hover:text-[#EEFF25] text-white'
            }`
          }
        >
          CONTACT US
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `font-bold uppercase tracking-wider text-xs lg:text-sm transition-colors duration-200 ${
              isActive ? 'text-[#EEFF25] font-extrabold' : 'hover:text-[#EEFF25] text-white'
            }`
          }
        >
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `font-bold uppercase tracking-wider text-xs lg:text-sm transition-colors duration-200 ${
              isActive ? 'text-[#EEFF25] font-extrabold' : 'hover:text-[#EEFF25] text-white'
            }`
          }
        >
          OUR MENU
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `font-bold uppercase tracking-wider text-xs lg:text-sm flex items-center space-x-1.5 transition-colors duration-200 ${
              isActive ? 'text-[#EEFF25] font-extrabold' : 'hover:text-[#EEFF25] text-white'
            }`
          }
        >
          <span>OUR SHOP</span>
          <div className="relative inline-flex items-center ml-1">
            <div className="w-8 h-8 bg-[#007A33] rounded-full flex items-center justify-center text-white border border-emerald-400/30">
              <FaShoppingCart className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              {displayCartCount}
            </span>
          </div>
        </NavLink>
      </li>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-2xl' : 'bg-black/70 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Brand Logo matching screenshot */}
        <Link to="/" className="flex flex-col group">
          <span className="font-cinzel text-xl sm:text-2xl font-black text-white tracking-wider leading-none">
            SAFUS
          </span>
          <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.45em] text-white opacity-90 mt-1">
            RESTAURANT
          </span>
        </Link>

        {/* Right Nav Items & User Actions */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <ul className="flex items-center space-x-6 lg:space-x-8">{navLinks}</ul>

          {/* User Profile / Sign Out Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="font-bold uppercase tracking-wider text-xs lg:text-sm text-white hover:text-[#EEFF25] flex items-center space-x-2 transition-colors"
            >
              <span>SIGN OUT</span>
              <FaUserCircle className="w-7 h-7 text-white" />
            </button>
          ) : (
            <Link
              to="/login"
              className="font-bold uppercase tracking-wider text-xs lg:text-sm text-white hover:text-[#EEFF25] flex items-center space-x-2 transition-colors"
            >
              <span>SIGN IN</span>
              <FaUserCircle className="w-7 h-7 text-white" />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-[#EEFF25] p-2 focus:outline-none"
        >
          {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-b border-gray-800 px-6 pt-4 pb-6 mt-2 space-y-4">
          <ul className="flex flex-col space-y-4" onClick={() => setMobileMenuOpen(false)}>
            {navLinks}
          </ul>
          <div className="pt-2 border-t border-gray-800">
            {user ? (
              <button
                onClick={handleLogout}
                className="font-bold uppercase tracking-wider text-sm text-white hover:text-[#EEFF25] flex items-center space-x-2"
              >
                <span>SIGN OUT</span>
                <FaUserCircle className="w-7 h-7 text-white" />
              </button>
            ) : (
              <Link
                to="/login"
                className="font-bold uppercase tracking-wider text-sm text-white hover:text-[#EEFF25] flex items-center space-x-2"
              >
                <span>SIGN IN</span>
                <FaUserCircle className="w-7 h-7 text-white" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
