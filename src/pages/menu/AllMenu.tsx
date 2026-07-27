import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../components/common/SectionTitle';
import { useMenuItems } from '../../hooks/useMenuQuery';
import { Spinner } from '../../components/common/Spinner';

interface MenuCategorySectionProps {
  title: string;
  description?: string;
  bgImage: string;
  category: string;
}

const MenuCategorySection: React.FC<MenuCategorySectionProps> = ({
  title,
  description = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  bgImage,
  category,
}) => {
  const { menuItems, isLoading } = useMenuItems(category);
  const displayItems = menuItems.slice(0, 6);

  return (
    <div className="space-y-14 my-20 md:my-28">
      {/* Category Hero Cover Banner with Increased Height */}
      <div
        className="relative bg-cover bg-center py-28 md:py-44 text-white text-center shadow-xl"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-5xl mx-auto px-4 z-10">
          <div className="bg-black/70 p-10 md:p-20 rounded-none border border-gold-500/20 max-w-3xl mx-auto space-y-4">
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-white">
              {title}
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Category Items 2-Column Grid */}
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {isLoading ? (
          <Spinner label={`Fetching ${title}...`} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
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
                    <h3 className="font-cinzel text-base md:text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                      {item.name} ------------------
                    </h3>
                    <span className="text-gold-500 font-bold text-base md:text-xl">${item.price.toFixed(1)}</span>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">{item.recipe}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Favourite Food Action Button */}
        <div className="text-center pt-6">
          <Link to="/shop">
            <button className="btn bg-white hover:bg-black text-gray-900 hover:text-white font-cinzel font-bold text-xs md:text-sm uppercase tracking-widest px-10 py-3.5 rounded-lg border-b-4 border-t-0 border-x-0 border-gray-900 transition-all shadow-sm">
              ORDER YOUR FAVOURITE FOOD
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AllMenu: React.FC = () => {
  const { menuItems: offeredItems, isLoading: offeredLoading } = useMenuItems('offered');
  const displayOffered = offeredItems.slice(0, 6);

  return (
    <div className="pt-16 pb-16 font-inter bg-white">
      <Helmet>
        <title>SaFuS | Our Menu</title>
        <meta
          name="description"
          content="Explore Bistro Boss restaurant menu catalog. Offerd daily specials, artisanal desserts, pizzas, salads, and soups."
        />
      </Helmet>

      {/* Main Page Top Banner */}
      <div
        className="relative bg-cover bg-center py-32 md:py-48 text-white text-center shadow-xl"
        style={{ backgroundImage: `url('/assets/menu/banner3.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-5xl mx-auto px-4 z-10">
          <div className="bg-black/70 p-12 md:p-20 rounded-none border border-gold-500/20 max-w-4xl mx-auto space-y-4">
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wider text-white">
              OUR MENU
            </h1>
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-white font-semibold uppercase opacity-90">
              WOULD YOU LIKE TO TRY A DISH?
            </p>
          </div>
        </div>
      </div>

      {/* TODAY'S OFFER SECTION */}
      <div className="max-w-6xl mx-auto px-4 my-20 md:my-28 space-y-12">
        <SectionTitle subHeading="Don't miss" heading="TODAY'S OFFER" />

        {offeredLoading ? (
          <Spinner label="Loading Today's Offers..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {displayOffered.map((item) => (
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
                    <h3 className="font-cinzel text-base md:text-xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                      {item.name} ------------------
                    </h3>
                    <span className="text-gold-500 font-bold text-base md:text-xl">${item.price.toFixed(1)}</span>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">{item.recipe}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-6">
          <Link to="/shop">
            <button className="btn bg-white hover:bg-black text-gray-900 hover:text-white font-cinzel font-bold text-xs md:text-sm uppercase tracking-widest px-10 py-3.5 rounded-lg border-b-4 border-t-0 border-x-0 border-gray-900 transition-all shadow-sm">
              ORDER YOUR FAVOURITE FOOD
            </button>
          </Link>
        </div>
      </div>

      {/* DESSERTS SECTION */}
      <MenuCategorySection
        title="DESSERTS"
        category="dessert"
        bgImage="/assets/menu/dessert-bg.jpeg"
      />

      {/* PIZZA SECTION */}
      <MenuCategorySection
        title="PIZZA"
        category="pizza"
        bgImage="/assets/menu/pizza-bg.jpg"
      />

      {/* SALAD SECTION */}
      <MenuCategorySection
        title="SALAD"
        category="salad"
        bgImage="/assets/menu/salad-bg.jpg"
      />

      {/* SOUP SECTION */}
      <MenuCategorySection
        title="SOUP"
        category="soup"
        bgImage="/assets/menu/soup-bg.jpg"
      />
    </div>
  );
};
