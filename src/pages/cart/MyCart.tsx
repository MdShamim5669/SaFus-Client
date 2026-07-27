import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../components/common/SectionTitle';
import { CartItemRow } from '../../components/cart/CartItem';
import { CartSummary } from '../../components/cart/CartSummary';
import { useCart } from '../../hooks/useCart';
import { FaTrashAlt, FaShoppingBag } from 'react-icons/fa';

export const MyCart: React.FC = () => {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <SectionTitle heading="WANNA ADD MORE?" subHeading="My Cart" />

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-6 my-8 max-w-2xl mx-auto">
          <FaShoppingBag className="w-16 h-16 text-gold-500 mx-auto opacity-50" />
          <h3 className="font-cinzel text-2xl font-bold">Your cart is currently empty!</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Explore our artisanal menu and discover fresh, chef-prepared dishes waiting for you.
          </p>
          <Link to="/menu">
            <button className="btn bg-gold-500 hover:bg-gold-600 text-black font-cinzel font-bold text-sm uppercase tracking-widest px-8">
              Explore Menu
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center bg-base-200 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-cinzel font-bold text-lg">Total Items: {cart.length}</h3>
              <button
                onClick={clearCart}
                className="btn btn-sm btn-ghost text-red-500 hover:bg-red-500/10 flex items-center space-x-1"
              >
                <FaTrashAlt className="w-3.5 h-3.5" />
                <span>Clear Cart</span>
              </button>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md">
              <table className="table w-full">
                <thead className="bg-base-200 text-base-content font-cinzel text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Item Details</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-center">Subtotal</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <CartItemRow
                      key={item._id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cart Summary */}
          <div>
            <CartSummary total={total} itemCount={cart.length} />
          </div>
        </div>
      )}
    </div>
  );
};
