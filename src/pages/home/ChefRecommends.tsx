import React from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { useCart } from '../../hooks/useCart';
import { MenuItem } from '../../api/menuApi';

const recommendItems: MenuItem[] = [
  {
    _id: 'rec_1',
    name: 'Caeser Salad',
    recipe: 'Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.',
    image: '/assets/home/slide1.jpg',
    category: 'salad',
    price: 14.5,
  },
  {
    _id: 'rec_2',
    name: 'Caeser Salad',
    recipe: 'Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.',
    image: '/assets/home/slide2.jpg',
    category: 'salad',
    price: 14.5,
  },
  {
    _id: 'rec_3',
    name: 'Caeser Salad',
    recipe: 'Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.',
    image: '/assets/home/slide3.jpg',
    category: 'salad',
    price: 14.5,
  },
];

export const ChefRecommends: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle subHeading="Should Try" heading="CHEF RECOMMENDS" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 max-w-6xl mx-auto">
        {recommendItems.map((item, idx) => (
          <div
            key={item._id}
            className="bg-base-200 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col items-center text-center group"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-6 flex-1 flex flex-col justify-between items-center space-y-4">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-base-content mb-2">{item.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs">{item.recipe}</p>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="px-6 py-2.5 rounded-md font-cinzel font-bold text-xs uppercase tracking-widest transition-colors duration-200 bg-[#E8E8E8] text-[#BB8506] border-b-4 border-[#BB8506] border-t-0 border-x-0 hover:bg-[#111827] hover:text-[#BB8506]"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
