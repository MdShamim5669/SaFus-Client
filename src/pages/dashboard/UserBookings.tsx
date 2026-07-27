import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../hooks/useAuth';
import { FaCalendarCheck, FaClock, FaUsers, FaTrash, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UserBookings: React.FC = () => {
  const { user } = useAuth();

  const mockReservations = [
    {
      id: 'RES-3820',
      date: 'April 02, 2026',
      time: '07:30 PM',
      guests: 4,
      status: 'Confirmed',
      phone: '+88 0192345678',
    },
    {
      id: 'RES-2914',
      date: 'April 15, 2026',
      time: '08:00 PM',
      guests: 2,
      status: 'Pending',
      phone: '+88 0192345678',
    },
  ];

  const handleCancelBooking = (resId: string) => {
    Swal.fire({
      title: 'Cancel Reservation?',
      text: `Are you sure you want to cancel reservation ${resId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cancelled!', 'Your reservation has been cancelled.', 'success');
      }
    });
  };

  return (
    <div className="space-y-8 font-inter">
      <Helmet>
        <title>SaFus | My Bookings</title>
      </Helmet>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1F2937] via-[#111827] to-[#1F2937] p-8 md:p-10 rounded-2xl border border-gold-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-cinzel text-xs font-bold text-[#D1A054] tracking-[0.25em] uppercase">
            TABLE RESERVATIONS
          </span>
          <h1 className="font-cinzel text-3xl md:text-4xl font-extrabold uppercase text-white">
            MY BOOKINGS
          </h1>
          <p className="text-gray-300 text-xs md:text-sm font-light">
            Manage your upcoming dining table reservations for {user?.name || 'Customer'}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/reservation"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D1A054] hover:bg-[#b88b44] text-white font-cinzel font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
          >
            <FaPlusCircle className="w-4 h-4" />
            <span>Book New Table</span>
          </Link>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-dark-100 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="font-cinzel font-bold text-lg uppercase tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
            <FaCalendarCheck className="w-5 h-5 text-[#D1A054]" />
            <span>Active Reservations ({mockReservations.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-[#F3F3F3] dark:bg-dark-200 text-gray-700 dark:text-gray-300 font-cinzel font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4 rounded-l">Reservation ID</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Time</th>
                <th className="py-4 px-4">Guests</th>
                <th className="py-4 px-4">Contact</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 rounded-r text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {mockReservations.map((res, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-200/50 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-gray-900 dark:text-white">{res.id}</td>
                  <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-medium">{res.date}</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300 font-semibold">{res.time}</td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300 font-bold">{res.guests} Guests</td>
                  <td className="py-4 px-4 text-gray-500">{res.phone}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-xs border inline-block ${
                        res.status === 'Confirmed'
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleCancelBooking(res.id)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                      title="Cancel Booking"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
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
