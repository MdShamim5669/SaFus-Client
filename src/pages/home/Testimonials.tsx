import React, { useState } from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { useReviews } from '../../hooks/useReviewsQuery';
import { Spinner } from '../../components/common/Spinner';

export const TestimonialsSection: React.FC = () => {
  const { reviews, isLoading } = useReviews();
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevReview = () => {
    if (reviews.length === 0) return;
    setCurrentIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    if (reviews.length === 0) return;
    setCurrentIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIdx] || {
    name: 'JANE DOE',
    details: 'The food was absolutely divine and the service was top notch! Will definitely be visiting again.',
    rating: 5,
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-24 md:py-32">
      <SectionTitle subHeading="What Our Clients Say" heading="TESTIMONIALS" />

      {isLoading ? (
        <Spinner label="Loading Reviews..." />
      ) : (
        <div className="relative mt-12 bg-base-200 dark:bg-dark-100 rounded-2xl p-10 md:p-20 shadow-xl text-center border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto">
          {/* Side Nav Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-gold-500 hover:text-gold-400 text-2xl transition-colors focus:outline-none"
            aria-label="Previous Review"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-4 md:left-auto md:right-8 top-1/2 -translate-y-1/2 p-3 text-gold-500 hover:text-gold-400 text-2xl transition-colors focus:outline-none"
            aria-label="Next Review"
          >
            <FaChevronRight />
          </button>

          <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto px-6">
            {/* Rating Stars */}
            <div className="flex items-center space-x-1.5 text-gold-400 text-2xl">
              {Array.from({ length: currentReview.rating || 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Big Quote Icon */}
            <FaQuoteLeft className="w-16 h-16 md:w-20 md:h-20 text-gray-800 dark:text-gray-200 my-2 opacity-80" />

            {/* Review Details */}
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-light italic">
              "{currentReview.details}"
            </p>

            {/* Customer Name */}
            <h3 className="font-cinzel text-xl md:text-2xl font-extrabold uppercase text-gold-500 tracking-widest pt-2">
              {currentReview.name}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};
