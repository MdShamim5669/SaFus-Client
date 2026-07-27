import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

interface CartSummaryProps {
  total: number;
  itemCount: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ total, itemCount }) => {
  const tax = total * 0.05; // 5% tax
  const grandTotal = total + tax;

  return (
    <div className="bg-dark-100 text-white rounded-xl p-6 border border-gold-500/30 shadow-xl space-y-4">
      <h3 className="font-cinzel text-xl font-bold text-gold-400 border-b border-gray-800 pb-3 uppercase tracking-wider">
        ORDER SUMMARY
      </h3>
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Items ({itemCount}):</span>
          <span className="font-semibold text-white">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Tax (5%):</span>
          <span className="font-semibold text-white">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-800 pt-3 text-base font-bold text-gold-400">
          <span>TOTAL:</span>
          <span className="text-xl">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <Link to="/checkout" className="block w-full pt-2">
        <Button variant="primary" size="lg" className="w-full">
          PROCEED TO CHECKOUT
        </Button>
      </Link>
    </div>
  );
};
