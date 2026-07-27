import React from 'react';
import { MenuItem } from '../../api/menuApi';
import { useCart } from '../../hooks/useCart';
import { FaPlus } from 'react-icons/fa';

export const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-base-200 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group">
      <div className="relative overflow-hidden h-52 bg-gray-900">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/home/slide1.jpg';
          }}
        />
        <span className="absolute top-3 right-3 bg-dark-200 text-gold-400 font-bold px-3 py-1 rounded-md text-sm shadow-md border border-gold-500/30">
          ${item.price.toFixed(2)}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between text-center space-y-4">
        <div>
          <h3 className="font-cinzel text-xl font-bold text-base-content group-hover:text-gold-500 transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-3 leading-relaxed">
            {item.recipe}
          </p>
        </div>
        <button
          onClick={() => addToCart(item)}
          className="w-full py-2.5 px-4 bg-gold-500/10 hover:bg-gold-500 text-gold-500 hover:text-black font-semibold uppercase text-xs tracking-widest border-2 border-gold-500 rounded-lg transition-all flex items-center justify-center space-x-2"
        >
          <FaPlus className="w-3 h-3" />
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
};
