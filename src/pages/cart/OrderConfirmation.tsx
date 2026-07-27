import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaUtensils, FaReceipt } from 'react-icons/fa';

export const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as {
    transactionId?: string;
    totalPrice?: number;
    paymentMethod?: string;
    itemsCount?: number;
  };

  const transactionId = state?.transactionId || 'TXN_' + Math.random().toString(36).substring(2, 10);
  const totalPrice = state?.totalPrice || 0;
  const paymentMethod = state?.paymentMethod || 'Stripe';

  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center">
      <div className="bg-dark-100 text-white p-8 md:p-12 rounded-2xl border border-gold-500/40 shadow-2xl space-y-6">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
          <FaCheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="font-cinzel text-3xl md:text-4xl font-extrabold text-gold-400 uppercase tracking-wider">
            ORDER CONFIRMED!
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Thank you for dining with Bistro Boss. Your order has been placed and is currently being prepared.
          </p>
        </div>

        <div className="bg-dark-200 p-6 rounded-xl border border-gray-800 text-left space-y-3 max-w-lg mx-auto text-sm">
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Transaction ID:</span>
            <span className="font-mono text-gold-400 font-bold">{transactionId}</span>
          </div>
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Payment Gateway:</span>
            <span className="font-semibold uppercase text-white">{paymentMethod}</span>
          </div>
          <div className="flex justify-between border-b border-gray-800 pb-2">
            <span className="text-gray-400">Status:</span>
            <span className="text-emerald-400 font-bold uppercase">Paid & Confirmed</span>
          </div>
          {totalPrice > 0 && (
            <div className="flex justify-between text-base font-bold text-white pt-1">
              <span>Amount Paid:</span>
              <span className="text-gold-400">${totalPrice.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/dashboard">
            <button className="btn bg-gold-500 hover:bg-gold-600 text-black font-cinzel font-bold text-sm uppercase tracking-wider px-6 flex items-center space-x-2">
              <FaReceipt className="w-4 h-4" />
              <span>Track In Dashboard</span>
            </button>
          </Link>
          <Link to="/menu">
            <button className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-black font-cinzel font-bold text-sm uppercase tracking-wider px-6 flex items-center space-x-2">
              <FaUtensils className="w-4 h-4" />
              <span>Order More</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
