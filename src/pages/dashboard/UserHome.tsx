import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import {
  FaShoppingBag,
  FaCalendarCheck,
  FaStar,
  FaWallet,
  FaUtensils,
  FaClock,
  FaCheckCircle,
  FaCamera,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { uploadImageToCloudinary } from '../../utils/imageUpload';

export const UserHome: React.FC = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  const userStats = [
    {
      title: 'Cart Items',
      value: cart.length,
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
      value: '$184.50',
      icon: FaWallet,
      gradient: 'from-blue-600 to-cyan-600',
      link: '/dashboard/payment-history',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-9821',
      name: 'Caeser Salad & Pizza Margherita',
      date: 'March 24, 2026',
      price: '$34.50',
      payment: 'Stripe',
      status: 'Delivered',
    },
    {
      id: 'ORD-9740',
      name: 'Roasted Pork Belly',
      date: 'March 18, 2026',
      price: '$28.00',
      payment: 'SSLCommerz',
      status: 'Delivered',
    },
    {
      id: 'ORD-9612',
      name: 'Tuna Niçoise & Soft Drink',
      date: 'March 10, 2026',
      price: '$22.00',
      payment: 'Stripe',
      status: 'Delivered',
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
              <FaCheckCircle className="w-3.5 h-3.5 inline mr-1" /> Verified
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

      {/* Recent Orders Activity Table */}
      <div className="bg-white dark:bg-dark-100 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h3 className="font-cinzel font-bold text-lg uppercase tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
            <FaClock className="w-5 h-5 text-[#D1A054]" />
            <span>Recent Activity & Order History</span>
          </h3>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#D1A054] hover:underline uppercase tracking-wider"
          >
            Explore Menu →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-[#F3F3F3] dark:bg-dark-200 text-gray-700 dark:text-gray-300 font-cinzel font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4 rounded-l">Order ID</th>
                <th className="py-4 px-4">Items</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Gateway</th>
                <th className="py-4 px-4 rounded-r">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-200/50 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-gray-900 dark:text-white">{order.id}</td>
                  <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">{order.name}</td>
                  <td className="py-4 px-4 text-gray-500">{order.date}</td>
                  <td className="py-4 px-4 font-bold text-[#D1A054]">{order.price}</td>
                  <td className="py-4 px-4 text-gray-500">{order.payment}</td>
                  <td className="py-4 px-4">
                    <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-full text-xs border border-emerald-500/30 inline-flex items-center space-x-1">
                      <FaCheckCircle className="w-3 h-3 mr-1" /> {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
