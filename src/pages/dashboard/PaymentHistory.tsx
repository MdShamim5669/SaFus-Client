import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../hooks/useAuth';
import { FaWallet, FaCheckCircle, FaDownload, FaCreditCard } from 'react-icons/fa';

export const PaymentHistory: React.FC = () => {
  const { user } = useAuth();

  const mockPayments = [
    {
      id: 'TXN-984210',
      date: 'March 26, 2026',
      items: 'Caeser Salad, Pizza Margherita, Cold Beverage',
      amount: 42.5,
      gateway: 'Stripe Card',
      status: 'Paid',
    },
    {
      id: 'TXN-874219',
      date: 'March 20, 2026',
      items: 'Roast Duck Breast, French Wine',
      amount: 68.0,
      gateway: 'SSLCommerz Gateway',
      status: 'Paid',
    },
    {
      id: 'TXN-761205',
      date: 'March 14, 2026',
      items: 'Chicken & Walnut Salad, Fruit Dessert',
      amount: 34.0,
      gateway: 'Stripe Card',
      status: 'Paid',
    },
    {
      id: 'TXN-650192',
      date: 'March 05, 2026',
      items: 'Soup of the Day, Garlic Bread',
      amount: 19.5,
      gateway: 'SSLCommerz Gateway',
      status: 'Paid',
    },
  ];

  const totalSpent = mockPayments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 font-inter">
      <Helmet>
        <title>SaFus | Payment History</title>
      </Helmet>

      {/* Header Summary Banner */}
      <div className="bg-gradient-to-r from-dark-200 via-dark-300 to-dark-200 p-8 md:p-10 rounded-2xl border border-gold-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-cinzel text-xs font-bold text-[#D1A054] tracking-[0.25em] uppercase">
            TRANSACTION LOGS
          </span>
          <h1 className="font-cinzel text-3xl md:text-4xl font-extrabold uppercase text-white">
            PAYMENT HISTORY
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-light">
            Review all completed dining payments & downloadable receipts for {user?.name || 'Customer'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-[#D1A054]/20 p-5 rounded-2xl border border-[#D1A054]/40 flex items-center space-x-4">
          <FaWallet className="w-10 h-10 text-[#D1A054]" />
          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-gray-300">TOTAL SPENT</p>
            <p className="text-2xl font-extrabold font-cinzel text-white">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Payment Records Table */}
      <div className="bg-white dark:bg-dark-100 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="font-cinzel font-bold text-lg uppercase tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
            <FaCreditCard className="w-5 h-5 text-[#D1A054]" />
            <span>Completed Transactions ({mockPayments.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-[#F3F3F3] dark:bg-dark-200 text-gray-700 dark:text-gray-300 font-cinzel font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-4 rounded-l">Transaction ID</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Purchased Items</th>
                <th className="py-4 px-4">Payment Method</th>
                <th className="py-4 px-4">Amount</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 rounded-r text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {mockPayments.map((pay, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-200/50 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-gray-900 dark:text-white">{pay.id}</td>
                  <td className="py-4 px-4 text-gray-500">{pay.date}</td>
                  <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">{pay.items}</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300 font-semibold">{pay.gateway}</td>
                  <td className="py-4 px-4 font-bold text-[#D1A054]">${pay.amount.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-full text-xs border border-emerald-500/30 inline-flex items-center space-x-1">
                      <FaCheckCircle className="w-3 h-3 mr-1" /> {pay.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => alert(`Downloading Invoice PDF for ${pay.id}...`)}
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#D1A054] transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200 inline-flex items-center space-x-1 font-bold text-xs"
                      title="Download Invoice"
                    >
                      <FaDownload className="w-4 h-4" />
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
