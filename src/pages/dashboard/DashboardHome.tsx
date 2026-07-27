import React from 'react';
import { useRole } from '../../hooks/useRole';
import { UserHome } from './UserHome';
import { useAuth } from '../../hooks/useAuth';
import { FaUtensils, FaUsers, FaWallet, FaShoppingBag, FaChartPie, FaPlusCircle, FaList, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { isAdmin } = useRole();

  if (!isAdmin) {
    return <UserHome />;
  }

  const adminStats = [
    { title: 'Total Revenue', value: '$14,280', icon: FaWallet, gradient: 'from-purple-600 to-indigo-600' },
    { title: 'Total Customers', value: '1,240', icon: FaUsers, gradient: 'from-amber-500 to-yellow-600' },
    { title: 'Menu Products', value: '78', icon: FaUtensils, gradient: 'from-pink-600 to-rose-600' },
    { title: 'Total Orders', value: '450', icon: FaShoppingBag, gradient: 'from-cyan-600 to-blue-600' },
  ];

  return (
    <div className="space-y-8 font-inter">
      {/* Admin Executive Header */}
      <div className="bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 p-8 md:p-10 rounded-2xl border border-gold-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-3 text-center md:text-left">
          <span className="bg-gold-500/20 text-gold-400 font-cinzel text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-gold-500/40 inline-block">
            ADMINISTRATOR CONTROL PANEL
          </span>
          <h1 className="font-cinzel text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-white">
            HI, WELCOME BACK, {user?.name || 'ADMIN'}!
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-light">
            System Operations & Revenue Analytics Dashboard
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col items-center">
          <img
            src="/assets/others/profile.png"
            alt="Admin Avatar"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gold-500 shadow-2xl object-cover"
          />
        </div>
      </div>

      {/* Admin Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`bg-gradient-to-r ${stat.gradient} text-white p-6 rounded-2xl shadow-lg flex items-center justify-between`}
            >
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-extrabold font-cinzel">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider font-semibold opacity-80">{stat.title}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Icon className="w-8 h-8 opacity-80" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Link
          to="/dashboard/add-item"
          className="bg-white dark:bg-dark-100 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold-500 transition-all flex items-center space-x-4 shadow-sm hover:shadow-md"
        >
          <div className="p-4 bg-gold-500/15 text-gold-500 rounded-xl">
            <FaPlusCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-cinzel font-bold text-base text-gray-900 dark:text-white">Add Items</h3>
            <p className="text-xs text-gray-500">Create new dish</p>
          </div>
        </Link>

        <Link
          to="/dashboard/manage-items"
          className="bg-white dark:bg-dark-100 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold-500 transition-all flex items-center space-x-4 shadow-sm hover:shadow-md"
        >
          <div className="p-4 bg-purple-500/15 text-purple-500 rounded-xl">
            <FaList className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-cinzel font-bold text-base text-gray-900 dark:text-white">Manage Menu</h3>
            <p className="text-xs text-gray-500">Update catalog</p>
          </div>
        </Link>

        <Link
          to="/dashboard/manage-bookings"
          className="bg-white dark:bg-dark-100 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold-500 transition-all flex items-center space-x-4 shadow-sm hover:shadow-md"
        >
          <div className="p-4 bg-emerald-500/15 text-emerald-500 rounded-xl">
            <FaBookOpen className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-cinzel font-bold text-base text-gray-900 dark:text-white">Bookings</h3>
            <p className="text-xs text-gray-500">Customer tables</p>
          </div>
        </Link>

        <Link
          to="/dashboard/all-users"
          className="bg-white dark:bg-dark-100 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold-500 transition-all flex items-center space-x-4 shadow-sm hover:shadow-md"
        >
          <div className="p-4 bg-blue-500/15 text-blue-500 rounded-xl">
            <FaUsers className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-cinzel font-bold text-base text-gray-900 dark:text-white">All Users</h3>
            <p className="text-xs text-gray-500">Roles & permissions</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
