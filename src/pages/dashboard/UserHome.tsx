import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { axiosSecure } from '../../api/axiosConfig';
import { fetchUserOrders, Order } from '../../api/orderApi';
import { OrderStatusBadge } from '../../components/common/OrderStatusBadge';
import {
  FaShoppingBag,
  FaCalendarCheck,
  FaStar,
  FaWallet,
  FaUtensils,
  FaClock,
  FaCamera,
  FaBoxOpen,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { uploadImageToCloudinary } from '../../utils/imageUpload';

export const UserHome: React.FC = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  // Live orders from backend
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ['user-orders', user?.email],
    queryFn: () => fetchUserOrders(axiosSecure, user!.email),
    enabled: !!user?.email,
  });

  // Pending orders count for metrics
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;

  // Total Spent = sum of all paid orders + current cart value
  const ordersTotalSpent = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const totalSpent = ordersTotalSpent + cartTotal;

  const userStats = [
    {
      title: 'Cart Items',
      value: cart.reduce((acc, item) => acc + (item.quantity || 1), 0),
      icon: FaShoppingBag,
      gradient: 'from-amber-500 to-yellow-600',
      link: '/cart',
    },
    {
      title: 'Reservations',
      value: '2 Bookings',
      icon: FaCalendarCheck,
      gradient: 'from-emerald-500 to-teal-600',
      link: '/dashboard/my-reservations',
    },
    {
      title: 'Reviews Posted',
      value: '4 Reviews',
      icon: FaStar,
      gradient: 'from-purple-600 to-indigo-600',
      link: '/dashboard/add-review',
    },
    {
      title: 'Total Spent',
      value: totalSpent > 0 ? `$${totalSpent.toFixed(2)}` : '$0.00',
      icon: FaWallet,
      gradient: 'from-blue-600 to-cyan-600',
      link: '/dashboard/payment-history',
    },
  ];

  // Dynamic Avatar URL based on PhotoURL or UI-Avatars generated from Name/Email
  const userAvatar =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Customer')}&background=D1A054&color=fff&bold=true&size=128`;

  const handleUpdatePhoto = async () => {
    const { value: file } = await Swal.fire({
      title: 'Upload Profile Photo',
      text: 'Select an image file from your computer to upload to Cloudinary',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile photo',
      },
      showCancelButton: true,
      confirmButtonText: 'Upload & Save',
      confirmButtonColor: '#D1A054',
    });

    if (file) {
      Swal.fire({
        title: 'Uploading to Cloudinary...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
      });

      try {
        const uploadedUrl = await uploadImageToCloudinary(file);
        if (user) {
          const updatedUser = { ...user, photoURL: uploadedUrl };
          localStorage.setItem('user_data', JSON.stringify(updatedUser));
          Swal.fire({
            icon: 'success',
            title: 'Photo Uploaded!',
            text: 'Your profile picture has been updated on Cloudinary.',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (e) {
        Swal.fire('Error', 'Failed to upload photo to Cloudinary.', 'error');
      }
    }
  };

  return (
    <div className="space-y-8 font-inter">
      <Helmet>
        <title>SaFus | Customer Dashboard</title>
      </Helmet>

      {/* User Welcome Profile Banner */}
      <div className="bg-gradient-to-r from-[#1F2937] via-[#111827] to-[#1F2937] p-8 md:p-10 rounded-2xl border border-gold-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-3 text-center md:text-left">
          <span className="bg-[#D1A054]/20 text-[#D1A054] font-cinzel text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#D1A054]/40 inline-block">
            VALUED CUSTOMER
          </span>
          <h1 className="font-cinzel text-3xl md:text-4xl font-extrabold uppercase tracking-wider text-white">
            WELCOME BACK, {user?.name || 'GUEST USER'}!
          </h1>
          <p className="text-gray-300 text-xs md:text-sm font-light">
            {user?.email} • Member Status:{' '}
            <span className="text-emerald-400 font-bold inline-flex items-center space-x-1">
              ✅ Verified
            </span>
          </p>
        </div>

        {/* Profile Avatar with Interactive Photo Upload/Change Button */}
        <div className="mt-6 md:mt-0 flex flex-col items-center">
          <div className="relative group cursor-pointer" onClick={handleUpdatePhoto} title="Click to change profile photo">
            <img
              src={userAvatar}
              alt={user?.name || 'Profile'}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#D1A054] shadow-2xl object-cover transition-transform group-hover:scale-105"
            />
            {/* Camera Overlay Badge */}
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaCamera className="w-6 h-6 text-white" />
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-black rounded-full" title="Online"></span>
          </div>
          <button
            onClick={handleUpdatePhoto}
            className="mt-2 text-xs font-bold text-[#D1A054] hover:underline flex items-center space-x-1"
          >
            <FaCamera className="w-3 h-3" />
            <span>Change Photo</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className={`bg-gradient-to-r ${stat.gradient} text-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group`}
            >
              <div className="space-y-1">
                <p className="text-xs uppercase font-bold text-white/80 tracking-wider">{stat.title}</p>
                <h3 className="font-cinzel text-2xl font-extrabold">{stat.value}</h3>
              </div>
              <div className="p-3.5 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/shop"
          className="bg-dark-100 p-6 rounded-2xl border border-gray-800 hover:border-[#D1A054]/50 transition-all text-white flex items-center space-x-4 shadow-md group"
        >
          <div className="p-4 bg-[#D1A054]/10 text-[#D1A054] rounded-xl group-hover:bg-[#D1A054] group-hover:text-white transition-colors">
            <FaUtensils className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-cinzel font-bold text-base uppercase">ORDER FOOD</h4>
            <p className="text-gray-400 text-xs mt-0.5">Browse shop catalog</p>
          </div>
        </Link>

        <Link
          to="/reservation"
          className="bg-dark-100 p-6 rounded-2xl border border-gray-800 hover:border-[#D1A054]/50 transition-all text-white flex items-center space-x-4 shadow-md group"
        >
          <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <FaCalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-cinzel font-bold text-base uppercase">BOOK TABLE</h4>
            <p className="text-gray-400 text-xs mt-0.5">Reserve dining seats</p>
          </div>
        </Link>

        <Link
          to="/dashboard/add-review"
          className="bg-dark-100 p-6 rounded-2xl border border-gray-800 hover:border-[#D1A054]/50 transition-all text-white flex items-center space-x-4 shadow-md group"
        >
          <div className="p-4 bg-purple-500/10 text-purple-400 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <FaStar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-cinzel font-bold text-base uppercase">GIVE REVIEW</h4>
            <p className="text-gray-400 text-xs mt-0.5">Share your feedback</p>
          </div>
        </Link>
      </div>

      {/* Live Orders Activity Table */}
      <div className="bg-white dark:bg-dark-100 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h3 className="font-cinzel font-bold text-lg uppercase tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
            <FaClock className="w-5 h-5 text-[#D1A054]" />
            <span>My Orders &amp; Order History</span>
          </h3>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <span className="bg-orange-100 text-orange-700 border border-orange-300 font-bold text-xs px-3 py-1 rounded-full">
                {cart.length} in cart
              </span>
            )}
            {pendingCount > 0 && (
              <span className="bg-yellow-100 text-yellow-800 border border-yellow-300 font-bold text-xs px-3 py-1 rounded-full">
                {pendingCount} Pending
              </span>
            )}
            <Link to="/shop" className="text-xs font-bold text-[#D1A054] hover:underline uppercase tracking-wider">
              Explore Menu →
            </Link>
          </div>
        </div>

        {orders.length === 0 && cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <FaBoxOpen className="w-12 h-12 mb-3 opacity-30" />
            <p className="font-cinzel text-sm">No orders yet. Start ordering!</p>
            <Link to="/shop" className="mt-3 text-xs font-bold text-[#D1A054] hover:underline">Browse Our Shop →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-[#F3F3F3] dark:bg-dark-200 text-gray-700 dark:text-gray-300 font-cinzel font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-4 rounded-l">ID / Item</th>
                  <th className="py-4 px-4">Product</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Payment</th>
                  <th className="py-4 px-4 rounded-r">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                {/* ── Cart Items (not yet paid) ── */}
                {cart.map((item) => (
                  <tr key={'cart-' + item._id} className="hover:bg-orange-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-500 text-xs">
                      CART
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 rounded-lg object-cover border border-gray-200 shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[120px]">{item.name}</p>
                          <p className="text-gray-400 text-xs">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs">—</td>
                    <td className="py-3 px-4 font-bold text-[#D1A054]">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to="/checkout"
                        className="text-xs font-bold text-blue-500 hover:underline"
                      >
                        Pay Now →
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-orange-100 text-orange-700 border border-orange-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        In Cart
                      </span>
                    </td>
                  </tr>
                ))}

                {/* ── Paid Orders ── */}
                {orders.slice().reverse().map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-dark-200/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-gray-900 dark:text-white text-xs">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200 max-w-[160px] truncate">
                      {order.items?.map((it) => it.name).join(', ') || `${order.items?.length || 0} item(s)`}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : '—'}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#D1A054]">${order.totalPrice?.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-500 capitalize">{order.paymentMethod || 'Stripe'}</td>
                    <td className="py-3 px-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}

        {/* Cart checkout CTA */}
        {cart.length > 0 && (
          <div className="mt-4 flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-5 py-3">
            <p className="text-xs text-orange-700 font-bold">
              🛒 You have <span className="text-orange-800">{cart.length}</span> item(s) in cart worth{' '}
              <span className="text-orange-800">${cartTotal.toFixed(2)}</span>
            </p>
            <Link
              to="/checkout"
              className="px-4 py-2 bg-[#D1A054] hover:bg-[#b8893e] text-black text-xs font-cinzel font-bold uppercase tracking-wider rounded-lg transition-colors"
            >
              Proceed to Checkout →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

