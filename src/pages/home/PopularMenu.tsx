import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../components/common/SectionTitle';
import { useMenuItems } from '../../hooks/useMenuQuery';
import { Spinner } from '../../components/common/Spinner';

export const PopularMenu: React.FC = () => {
  const { menuItems, isLoading } = useMenuItems('popular');
  const displayItems = menuItems.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
      <SectionTitle subHeading="Check it out" heading="FROM OUR MENU" />

      {isLoading ? (
        <Spinner label="Fetching Menu Items from Backend..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-12 max-w-6xl mx-auto">
          {displayItems.map((item) => (
            <div key={item._id} className="flex items-start space-x-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px] bg-gray-200 border border-gray-300 flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/home/slide1.jpg';
                }}
              />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center border-b border-dashed border-gray-400 dark:border-gray-700 pb-2">
                  <h3 className="font-cinzel text-lg md:text-xl font-bold uppercase tracking-wider text-base-content">
                    {item.name} ------------------
                  </h3>
                  <span className="text-gold-500 font-bold text-lg md:text-xl">${item.price.toFixed(1)}</span>
                </div>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">{item.recipe}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/menu">
          <button className="btn btn-outline border-b-4 border-t-0 border-x-0 border-black dark:border-white text-base-content hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-cinzel font-bold text-sm uppercase tracking-widest px-10 py-3.5 rounded-lg">
            VIEW FULL MENU
          </button>
        </Link>
      </div>
    </section>
  );
};
