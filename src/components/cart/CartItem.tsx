import React from 'react';
import { CartItem as CartItemType } from '../../api/cartApi';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-800 hover:bg-base-200/50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center space-x-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg shadow border border-gray-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/home/slide1.jpg';
            }}
          />
          <div>
            <span className="font-cinzel font-bold text-base text-base-content block">{item.name}</span>
            <span className="text-gold-500 text-sm font-semibold">${item.price.toFixed(2)} / item</span>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-center">
        <div className="inline-flex items-center space-x-2 border border-gray-300 dark:border-gray-700 rounded-lg p-1 bg-base-100">
          <button
            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-gold-500 hover:text-black transition-colors"
          >
            <FaMinus className="w-3 h-3" />
          </button>
          <span className="font-bold w-8 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-gold-500 hover:text-black transition-colors"
          >
            <FaPlus className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="py-4 px-4 text-center font-bold text-gold-500">
        ${(item.price * item.quantity).toFixed(2)}
      </td>
      <td className="py-4 px-4 text-center">
        <button
          onClick={() => onRemove(item._id)}
          className="btn btn-sm btn-circle btn-error text-white hover:scale-110 transition-transform"
          title="Remove Item"
        >
          <FaTrashAlt className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  );
};
