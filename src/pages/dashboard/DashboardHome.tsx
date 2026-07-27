import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRole } from '../../hooks/useRole';
import { UserHome } from './UserHome';
import { useAuth } from '../../hooks/useAuth';
import { axiosSecure, axiosPublic } from '../../api/axiosConfig';
import { fetchAllOrders, Order, OrderStatus } from '../../api/orderApi';
import { fetchAllUsers } from '../../api/userApi';
import menuData from '../../data/menu.json';
import { fetchMenuItems, MenuItem } from '../../api/menuApi';
import { fetchAllReservations, updateReservationStatus, Reservation } from '../../api/reservationApi';
import { UserProfile } from '../../api/authApi';
import { OrderStatusBadge } from '../../components/common/OrderStatusBadge';
import {
  FaUtensils,
  FaUsers,
  FaWallet,
  FaShoppingBag,
  FaPlusCircle,
  FaList,
  FaBookOpen,
  FaClock,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useRole();
  const queryClient = useQueryClient();

  if (roleLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#D1A054]"></span>
      </div>
    );
  }

  if (!isAdmin) {
    return <UserHome />;
  }

  // 1. Fetch real-time orders
  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['admin-orders-live'],
    queryFn: async () => {
      try {
        return await fetchAllOrders(axiosSecure);
      } catch (e) {
        return [];
      }
    },
    enabled: isAdmin,
  });

  // 2. Fetch real-time users
  const { data: usersList = [], isLoading: usersLoading } = useQuery<UserProfile[]>({
    queryKey: ['admin-users-live'],
    queryFn: async () => {
      try {
        return await fetchAllUsers(axiosSecure);
      } catch (e) {
        return [];
      }
    },
    enabled: isAdmin,
  });

  // 3. Fetch real-time menu catalog items
  const { data: rawMenuItems = [], isLoading: menuLoading } = useQuery<MenuItem[]>({
    queryKey: ['admin-menu-live'],
    queryFn: async () => {
      try {
        const res = await fetchMenuItems(axiosPublic);
        return res.length > 0 ? res : (menuData as MenuItem[]);
      } catch (e) {
        return menuData as MenuItem[];
      }
    },
    enabled: isAdmin,
  });

  const menuItems = rawMenuItems.length > 0 ? rawMenuItems : (menuData as MenuItem[]);

  // 4. Fetch real-time reservations
  const { data: reservations = [], isLoading: resLoading } = useQuery<Reservation[]>({
    queryKey: ['admin-reservations-live'],
    queryFn: async () => {
      try {
        return await fetchAllReservations(axiosSecure);
      } catch (e) {
        return [];
      }
    },
    enabled: isAdmin,
  });

  // Reservation Status Mutation
  const updateReservationMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Reservation['status'] }) =>
      updateReservationStatus(axiosSecure, id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reservations-live'] });
      toast.success('Reservation status updated!');
    },
    onError: () => {
      toast.error('Failed to update reservation.');
    },
  });

  const handleUpdateReservation = (resItem: Reservation, newStatus: Reservation['status']) => {
    Swal.fire({
      title: `${newStatus === 'confirmed' ? 'Confirm' : 'Cancel'} Booking?`,
      text: `Update table reservation for ${resItem.name} (${resItem.guests} guests)?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'confirmed' ? '#10B981' : '#EF4444',
      confirmButtonText: `Yes, ${newStatus.toUpperCase()}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateReservationMutation.mutate({ id: resItem._id, status: newStatus });
      }
    });
  };

  // Calculate real-time mathematical totals with fallback
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
  const totalCustomers = Math.max(usersList.length, 1);
  const menuProductsCount = menuItems.length;
  const totalOrdersCount = orders.length;

  // Order status counts
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const processingOrders = orders.filter((o) => o.status === 'Processing').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const cancelledOrders = orders.filter((o) => o.status === 'Cancelled').length;

  // Category distribution calculation
  const categoriesList = ['salad', 'pizza', 'soup', 'dessert', 'drinks', 'offered'];
  const categoryCounts = categoriesList.map((cat) => ({
    name: cat,
    count: menuItems.filter((i) => i.category?.toLowerCase() === cat).length,
    percentage: menuProductsCount > 0
      ? Math.round((menuItems.filter((i) => i.category?.toLowerCase() === cat).length / menuProductsCount) * 100)
      : 0,
  }));

  const adminStats = [
    {
      title: 'Total Revenue',
      value: totalRevenue > 0 ? `$${totalRevenue.toFixed(2)}` : '$0.00',
      icon: FaWallet,
      gradient: 'from-purple-600 to-indigo-600',
      subtitle: `${orders.length} transactions processed`,
      link: '/dashboard/manage-orders',
    },
    {
      title: 'Total Customers',
      value: totalCustomers.toString(),
      icon: FaUsers,
      gradient: 'from-amber-500 to-yellow-600',
      subtitle: 'Registered user accounts',
      link: '/dashboard/all-users',
    },
    {
      title: 'Menu Products',
      value: menuProductsCount.toString(),
      icon: FaUtensils,
      gradient: 'from-pink-600 to-rose-600',
      subtitle: 'Active catalog items',
      link: '/dashboard/manage-items',
    },
    {
      title: 'Total Orders',
      value: totalOrdersCount.toString(),
      icon: FaShoppingBag,
      gradient: 'from-cyan-600 to-blue-600',
      subtitle: 'Customer orders placed',
      link: '/dashboard/manage-orders',
    },
  ];

  const adminAvatar =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=D1A054&color=fff&bold=true&size=128`;

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
          <p className="text-gray-300 text-xs md:text-sm font-light">
            Real-Time System Operations, Table Bookings & Revenue Analytics
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col items-center">
          <img
            src={adminAvatar}
            alt={user?.name || 'Admin Avatar'}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gold-500 shadow-2xl object-cover"
          />
        </div>
      </div>

      {/* Admin Metrics Grid with Interactive Click Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              title={`Click to manage ${stat.title}`}
              className={`bg-gradient-to-r ${stat.gradient} text-white p-6 rounded-2xl shadow-lg flex items-center justify-between transform hover:-translate-y-1 hover:shadow-2xl transition-all cursor-pointer group border border-white/10`}
            >
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-extrabold font-cinzel">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider font-semibold opacity-90 group-hover:text-yellow-200 transition-colors">{stat.title}</p>
                <p className="text-[10px] text-white/80 font-medium flex items-center space-x-1">
                  <span>{stat.subtitle}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
                </p>
              </div>
              <div className="p-3.5 bg-white/20 group-hover:bg-white/30 rounded-xl transition-colors">
                <Icon className="w-8 h-8 opacity-90 group-hover:scale-110 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Order Status Breakdown Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-yellow-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Pending Orders</p>
            <p className="text-2xl font-black font-cinzel">{pendingOrders}</p>
          </div>
          <FaClock className="w-6 h-6 text-yellow-600 opacity-60" />
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Processing</p>
            <p className="text-2xl font-black font-cinzel">{processingOrders}</p>
          </div>
          <FaUtensils className="w-6 h-6 text-blue-600 opacity-60" />
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Delivered</p>
            <p className="text-2xl font-black font-cinzel">{deliveredOrders}</p>
          </div>
          <FaCheckCircle className="w-6 h-6 text-emerald-600 opacity-60" />
        </div>

        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-800 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Cancelled</p>
            <p className="text-2xl font-black font-cinzel">{cancelledOrders}</p>
          </div>
          <FaTimesCircle className="w-6 h-6 text-red-600 opacity-60" />
        </div>
      </div>

      {/* Analytics & Quick Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Menu Catalog Category Distribution Progress Bars */}
        <div className="lg:col-span-7 bg-white dark:bg-dark-100 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
          <h3 className="font-cinzel font-bold text-base uppercase tracking-wider text-gray-900 dark:text-white flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-3">
            <FaChartPie className="w-5 h-5 text-gold-500" />
            <span>Menu Catalog Category Analytics</span>
          </h3>

          <div className="space-y-3 pt-2">
            {categoryCounts.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-gray-700 dark:text-gray-300 capitalize">{cat.name}</span>
                  <span className="text-gold-500">{cat.count} items ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-dark-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 to-amber-500 transition-all duration-500"
                    style={{ width: `${cat.percentage || 5}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/dashboard/add-item"
            className="bg-white dark:bg-dark-100 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold-500 transition-all flex items-center space-x-3 shadow-sm hover:shadow-md"
          >
            <div className="p-3 bg-gold-500/15 text-gold-500 rounded-xl">
              <FaPlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-sm text-gray-900 dark:text-white">Add Items</h3>
              <p className="text-[11px] text-gray-500">Create new dish</p>
            </div>
          </Link>

          <Link
            to="/dashboard/manage-items"
            className="bg-white dark:bg-dark-100 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold-500 transition-all flex items-center space-x-3 shadow-sm hover:shadow-md"
          >
            <div className="p-3 bg-purple-500/15 text-purple-500 rounded-xl">
              <FaList className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-sm text-gray-900 dark:text-white">Manage Menu</h3>
              <p className="text-[11px] text-gray-500">Update catalog</p>
            </div>
          </Link>

          <Link
            to="/dashboard/manage-bookings"
            className="bg-white dark:bg-dark-100 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold-500 transition-all flex items-center space-x-3 shadow-sm hover:shadow-md"
          >
            <div className="p-3 bg-emerald-500/15 text-emerald-500 rounded-xl">
              <FaBookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-sm text-gray-900 dark:text-white">Bookings</h3>
              <p className="text-[11px] text-gray-500">Customer tables</p>
            </div>
          </Link>

          <Link
            to="/dashboard/all-users"
            className="bg-white dark:bg-dark-100 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gold-500 transition-all flex items-center space-x-3 shadow-sm hover:shadow-md"
          >
            <div className="p-3 bg-blue-500/15 text-blue-500 rounded-xl">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-sm text-gray-900 dark:text-white">All Users</h3>
              <p className="text-[11px] text-gray-500">Roles & permissions</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Live Dining Table Bookings Widget */}
      <div className="bg-white dark:bg-dark-100 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h3 className="font-cinzel font-bold text-lg uppercase tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
            <FaCalendarCheck className="w-5 h-5 text-emerald-500" />
            <span>Recent Dining Table Bookings</span>
          </h3>
          <Link
            to="/dashboard/manage-bookings"
            className="text-xs font-bold text-gold-500 hover:underline uppercase tracking-wider"
          >
            View All Bookings →
          </Link>
        </div>

        {resLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-gold-500"></span>
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs font-cinzel">
            No table reservations recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-[#F3F3F3] dark:bg-dark-200 text-gray-700 dark:text-gray-300 font-cinzel font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l">Customer</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Guests</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center rounded-r">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {reservations.slice(0, 5).map((resItem) => (
                  <tr key={resItem._id} className="hover:bg-gray-50 dark:hover:bg-dark-200/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">{resItem.name}</td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">{resItem.email}</td>
                    <td className="py-3 px-4 font-semibold text-[#D1A054]">{resItem.guests} Guests</td>
                    <td className="py-3 px-4 text-gray-500">{resItem.date} @ {resItem.time}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        resItem.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : resItem.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      }`}>
                        {resItem.status || 'pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center space-x-1">
                      {resItem.status !== 'confirmed' && (
                        <button
                          onClick={() => handleUpdateReservation(resItem, 'confirmed')}
                          className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white border-none"
                          title="Confirm Booking"
                        >
                          Confirm
                        </button>
                      )}
                      {resItem.status !== 'cancelled' && (
                        <button
                          onClick={() => handleUpdateReservation(resItem, 'cancelled')}
                          className="btn btn-xs btn-ghost text-red-500 hover:bg-red-50"
                          title="Cancel Booking"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Real-time Recent Customer Orders Table */}
      <div className="bg-white dark:bg-dark-100 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h3 className="font-cinzel font-bold text-lg uppercase tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
            <FaClock className="w-5 h-5 text-gold-500" />
            <span>Real-Time Customer Orders</span>
          </h3>
          <Link
            to="/dashboard/manage-orders"
            className="text-xs font-bold text-gold-500 hover:underline uppercase tracking-wider"
          >
            Manage All Orders →
          </Link>
        </div>

        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-gold-500"></span>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs font-cinzel">
            No live customer orders found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-[#F3F3F3] dark:bg-dark-200 text-gray-700 dark:text-gray-300 font-cinzel font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l">Order ID</th>
                  <th className="py-3 px-4">Customer Email</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Order Date</th>
                  <th className="py-3 px-4 rounded-r">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-dark-200/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-900 dark:text-white text-xs">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200 font-medium">
                      {order.userEmail}
                    </td>
                    <td className="py-3 px-4 font-bold text-gold-500">
                      ${order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-gray-500 capitalize">
                      {order.paymentMethod || 'Stripe'}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};


