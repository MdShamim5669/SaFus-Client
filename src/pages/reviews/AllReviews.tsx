import React, { useState } from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';
import reviewsData from '../../data/reviews.json';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, ReviewSchemaType } from '../../schemas/reviewSchema';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export const AllReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState(reviewsData);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      name: '',
      details: '',
      recipeSuggestion: '',
    },
  });

  const ratingValue = watch('rating');

  const onSubmit = (data: ReviewSchemaType) => {
    const newRev = {
      _id: 'rev_' + Date.now(),
      name: data.name,
      details: data.details,
      rating: data.rating,
    };
    setReviewsList([newRev, ...reviewsList]);
    setSuccessMsg('Thank you! Your dining review has been posted.');
    reset();
  };

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
      <SectionTitle heading="CUSTOMER REVIEWS" subHeading="Sharing Experiences" />

      {/* Write a Review Section */}
      <div className="max-w-3xl mx-auto bg-base-200 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl my-8 space-y-6">
        <h3 className="font-cinzel text-xl font-bold text-gold-500 uppercase tracking-wider text-center">
          GIVE US YOUR FEEDBACK
        </h3>

        {successMsg && (
          <div className="alert alert-success bg-emerald-600 text-white rounded-lg p-4 font-semibold text-center">
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-center space-y-2">
            <label className="block text-sm font-semibold">Select Rating *</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setValue('rating', star)}
                  className="focus:outline-none transition-transform hover:scale-125"
                >
                  <FaStar
                    className={`w-8 h-8 ${star <= ratingValue ? 'text-gold-400' : 'text-gray-400 dark:text-gray-700'}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Your Name *</label>
            <input
              type="text"
              placeholder="Full Name"
              {...register('name')}
              className="input input-bordered w-full bg-base-100"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Review Comments *</label>
            <textarea
              rows={4}
              placeholder="Tell us about your food quality, service, ambiance..."
              {...register('details')}
              className="textarea textarea-bordered w-full bg-base-100"
            ></textarea>
            {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-gold-500 hover:bg-gold-600 text-black w-full font-cinzel font-bold uppercase"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
        {reviewsList.map((rev) => (
          <div
            key={rev._id}
            className="bg-base-200 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <FaQuoteLeft className="w-6 h-6 text-gold-500 opacity-60" />
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'text-gold-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic font-light">"{rev.details}"</p>
            </div>
            <div className="border-t border-gray-700 pt-3">
              <h4 className="font-cinzel font-bold text-gold-400 text-base">{rev.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
