import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUtensils,
  FaList,
  FaBook,
  FaUsers,
  FaShoppingCart,
  FaCalendarCheck,
  FaStar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartPie,
  FaWallet,
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useRole } from '../hooks/useRole';
import { useCart } from '../hooks/useCart';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { isAdmin } = useRole();
  const { cart } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItemStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg font-cinzel font-bold text-sm uppercase tracking-wider transition-all duration-200 ${
      isActive
        ? 'bg-gold-500 text-black shadow-lg'
        : 'text-gray-300 hover:bg-gold-500/20 hover:text-gold-400'
    }`;

  const sidebarLinks = isAdmin ? (
    <>
      <li>
        <NavLink to="/dashboard/admin-home" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaHome className="w-4 h-4" /> <span>Admin Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-item" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaUtensils className="w-4 h-4" /> <span>Add Items</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-items" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaList className="w-4 h-4" /> <span>Manage Items</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-bookings" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaBook className="w-4 h-4" /> <span>Manage Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-users" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaUsers className="w-4 h-4" /> <span>All Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/analytics" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaChartPie className="w-4 h-4" /> <span>Analytics</span>
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/dashboard/user-home" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaHome className="w-4 h-4" /> <span>User Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaShoppingCart className="w-4 h-4" />
          <span>My Cart ({cart.length})</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment-history" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaWallet className="w-4 h-4" /> <span>Payment History</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-reservations" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaCalendarCheck className="w-4 h-4" /> <span>My Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-review" className={navItemStyle} onClick={() => setSidebarOpen(false)}>
          <FaStar className="w-4 h-4" /> <span>Add Review</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex h-screen bg-base-100 overflow-hidden font-inter">
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-dark-200 text-white px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <Link to="/" className="font-cinzel font-bold text-lg text-gold-400">
          BISTRO BOSS
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-gold-400 p-2">
          {sidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-dark-200 text-white flex flex-col justify-between p-4 border-r border-gray-800 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand */}
          <div className="text-center pt-4 pb-2 border-b border-gray-800">
            <h1 className="font-cinzel text-xl font-extrabold tracking-widest text-white">SAFUS</h1>
            <p className="font-cinzel text-xs tracking-[0.3em] text-gold-400 mt-1">RESTAURANT</p>
          </div>

          {/* Navigation Items */}
          <ul className="space-y-2">{sidebarLinks}</ul>

          {/* Divider */}
          <div className="border-t border-gray-800 my-4"></div>

          {/* Public Home Links */}
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={navItemStyle}>
                <FaHome className="w-4 h-4" /> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className={navItemStyle}>
                <FaUtensils className="w-4 h-4" /> <span>Menu</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* User Info & Logout Footer */}
        <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <img
              src={
                user?.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Customer')}&background=D1A054&color=fff&bold=true&size=64`
              }
              alt={user?.name || 'Avatar'}
              className="w-9 h-9 rounded-full border border-gold-500 object-cover"
            />
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Guest User'}</p>
              <p className="text-[10px] text-gold-400 capitalize">{isAdmin ? 'Admin' : 'Customer'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 md:pt-8 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};
