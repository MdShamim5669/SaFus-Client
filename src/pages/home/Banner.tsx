import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const bannerImages = [
  { src: '/assets/home/01.jpg', label: 'PREMIUM MENU - USE COUPON BBKHABO50 GET 50% OFF' },
  { src: '/assets/home/02.jpg', label: 'DELICIOUS TASTE' },
  { src: '/assets/home/03.png', label: 'THE BEST FOOD IN TOWN' },
  { src: '/assets/home/04.jpg', label: 'SPECIAL DESSERTS' },
  { src: '/assets/home/05.png', label: 'CHEF RECOMMENDS' },
  { src: '/assets/home/06.png', label: 'FRESH DRINKS' },
];

export const Banner: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="w-full bg-white pt-16 font-inter">
      {/* Main Slide Frame matching screenshot */}
      <div className="relative w-full h-[70vh] md:h-[88vh] overflow-hidden group">
        {bannerImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover filter brightness-95"
            />
          </div>
        ))}

        {/* Side Arrow Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
          aria-label="Previous Slide"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
          aria-label="Next Slide"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        {/* Slider Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 bg-black/40 px-4 py-2 rounded-full backdrop-blur-xs">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIdx
                  ? 'bg-blue-400 scale-125 ring-2 ring-white'
                  : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Thumbnails Navigation Row (White Background matching screenshot) */}
      <div className="bg-white py-6 px-4 flex justify-center items-center space-x-3 md:space-x-4 overflow-x-auto border-b border-gray-200">
        {bannerImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`relative rounded overflow-hidden transition-all duration-300 flex-shrink-0 ${
              idx === currentIdx
                ? 'border-2 border-gray-900 ring-2 ring-gray-900/30 scale-105 opacity-100 shadow-md'
                : 'border-2 border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-20 h-12 md:w-28 md:h-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
