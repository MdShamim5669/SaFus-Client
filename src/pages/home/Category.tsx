import React from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';

const categorySlides = [
  { img: '/assets/home/slide1.jpg', name: 'SALADS' },
  { img: '/assets/home/slide2.jpg', name: 'SOUPS' },
  { img: '/assets/home/slide3.jpg', name: 'PIZZAS' },
  { img: '/assets/home/slide4.jpg', name: 'DESSERTS' },
];

export const CategorySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
      <SectionTitle subHeading="From 11:00am to 10:00pm" heading="ORDER ONLINE" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
        {categorySlides.map((cat, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-xl group cursor-pointer border border-gray-800"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-80 md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-8">
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white tracking-widest drop-shadow-lg group-hover:text-gold-400 transition-colors">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {/* Slide dots */}
      <div className="flex justify-center space-x-2 mt-8">
        <span className="w-3 h-3 rounded-full bg-gold-400"></span>
        <span className="w-3 h-3 rounded-full bg-gray-600"></span>
      </div>
    </section>
  );
};
