import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMenuItems } from '../../hooks/useMenuQuery';
import { useCart } from '../../hooks/useCart';
import { Spinner } from '../../components/common/Spinner';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const shopCategories = [
  { id: 'salad', name: 'SALAD' },
  { id: 'pizza', name: 'PIZZA' },
  { id: 'soup', name: 'SOUPS' },
  { id: 'dessert', name: 'DESSERTS' },
  { id: 'drinks', name: 'DRINKS' },
];

const ITEMS_PER_PAGE = 6;

export const OurShop: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('salad');
  const { menuItems, isLoading } = useMenuItems(activeTab);
  const { addToCart } = useCart();
  const [page, setPage] = useState(1);

  // Filter items based on active category
  const filteredCategoryItems = menuItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab || (activeTab === 'soup' && item.category === 'soup')
  );

  // Dynamic Pagination Calculations
  const totalPages = Math.max(1, Math.ceil(filteredCategoryItems.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginatedItems = filteredCategoryItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="pt-16 pb-16 font-inter bg-white">
      <Helmet>
        <title>SaFuS | Our Shop</title>
        <meta
          name="description"
          content="Order your favorite dishes online from Bistro Boss shop. Fresh salads, pizzas, soups, desserts, and craft beverages."
        />
      </Helmet>

      {/* Hero Cover Banner */}
      <div
        className="relative bg-cover bg-center py-28 md:py-44 text-white text-center shadow-xl"
        style={{ backgroundImage: `url('/assets/shop/banner2.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-5xl mx-auto px-4 z-10">
          <div className="bg-black/70 p-10 md:p-16 rounded-none border border-gold-500/20 max-w-4xl mx-auto space-y-4">
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wider text-white">
              OUR SHOP
            </h1>
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-white font-semibold uppercase opacity-90">
              WOULD YOU LIKE TO TRY A DISH?
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center space-x-6 md:space-x-10 border-b border-gray-200 pb-2">
          {shopCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setPage(1);
              }}
              className={`font-cinzel font-bold text-sm md:text-base uppercase tracking-wider pb-3 transition-colors ${
                activeTab === cat.id
                  ? 'text-[#BB8506] border-b-4 border-[#BB8506]'
                  : 'text-gray-700 hover:text-[#BB8506]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Shop Items Grid */}
        {isLoading ? (
          <Spinner label="Loading Shop Items..." />
        ) : paginatedItems.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-cinzel">
            No items available in this category currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {paginatedItems.map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-[#F3F3F3] border border-gray-200 rounded-none overflow-hidden shadow-sm flex flex-col items-center text-center group"
              >
                <div className="relative w-full h-64 overflow-hidden bg-gray-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/home/slide1.jpg';
                    }}
                  />
                  {/* Top Right Price Badge */}
                  <span className="absolute top-3 right-3 bg-[#111827] text-white font-bold text-xs px-3 py-1.5 shadow-md">
                    ${item.price.toFixed(1)}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between items-center space-y-4 w-full">
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
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
        )}

        {/* Fully Functional Dynamic Pagination Section */}
        {filteredCategoryItems.length > 0 && (
          <div className="flex items-center justify-center space-x-3 pt-6">
            {/* Previous Page Button */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#BB8506] text-white hover:bg-[#926312]'
              }`}
              title="Previous Page"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>

            {/* Current Page Display */}
            <span className="text-sm font-bold text-gray-800 font-cinzel px-2">
              {currentPage} / {totalPages}
            </span>

            {/* Next Page Button */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#BB8506] text-white hover:bg-[#926312]'
              }`}
              title="Next Page"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>

            {/* Clickable Page Indicator Dots */}
            <div className="flex items-center space-x-1.5 pl-3">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      pageNum === currentPage
                        ? 'bg-[#008000] scale-125 ring-2 ring-emerald-300'
                        : 'bg-gray-400 hover:bg-[#008000]'
                    }`}
                    title={`Page ${pageNum}`}
                  ></button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
