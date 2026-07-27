import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaStar, FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useAddReview } from '../../hooks/useReviewsQuery';
import { useAuth } from '../../hooks/useAuth';

import { reviewSchema, ReviewFormType } from '../../schemas';

export const AddReviewForm: React.FC = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const addReviewMutation = useAddReview();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      recipeLike: '',
      suggestion: '',
      details: '',
    },
  });

  const onSubmit = async (data: ReviewFormType) => {
    try {
      await addReviewMutation.mutateAsync({
        name: user?.name || 'Valued Customer',
        details: data.details,
        rating,
      });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank You For Your Review!',
        text: 'Your feedback helps us continuously elevate our cuisine and dining experience at SaFus.',
        showConfirmButton: true,
        confirmButtonColor: '#D1A054',
      });

      toast.success('Review published successfully!');
      reset();
      setRating(5);
    } catch (err) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-inter">
      <Helmet>
        <title>SaFus | Add Review</title>
      </Helmet>

      <div className="bg-[#F3F3F3] dark:bg-dark-100 p-8 md:p-14 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <span className="font-cinzel text-xs font-bold text-[#D1A054] tracking-[0.25em] uppercase">
            ---Sharing is Caring---
          </span>
          <h1 className="font-cinzel text-3xl md:text-4xl font-extrabold uppercase text-gray-900 dark:text-white">
            GIVE A RATING & REVIEW
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Interactive Star Rating */}
          <div className="text-center space-y-3 bg-white dark:bg-dark-200 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <label className="block font-cinzel font-bold text-sm uppercase text-gray-800 dark:text-gray-200">
              RATE YOUR EXPERIENCE (1 - 5 STARS)
            </label>
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-125"
                >
                  <FaStar
                    className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${
                      star <= (hoverRating || rating) ? 'text-[#D1A054]' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-[#D1A054] uppercase tracking-wider">
              {rating === 5 ? 'Excellent 🌟' : rating === 4 ? 'Very Good 👍' : rating === 3 ? 'Average 👌' : 'Below Expectation'}
            </p>
          </div>

          {/* Recipe Liked Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              Which recipe you liked most?*
            </label>
            <input
              type="text"
              placeholder="e.g. Caeser Salad, Pizza Margherita"
              {...register('recipeLike')}
              className="w-full px-4 py-3.5 text-sm bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-[#D1A054] text-gray-800 dark:text-white shadow-sm"
            />
            {errors.recipeLike && <p className="text-red-500 text-xs mt-1">{errors.recipeLike.message}</p>}
          </div>

          {/* Suggestion Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              Do you have any suggestion for us?*
            </label>
            <input
              type="text"
              placeholder="Suggestion in short"
              {...register('suggestion')}
              className="w-full px-4 py-3.5 text-sm bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-[#D1A054] text-gray-800 dark:text-white shadow-sm"
            />
            {errors.suggestion && <p className="text-red-500 text-xs mt-1">{errors.suggestion.message}</p>}
          </div>

          {/* Detailed Review Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              Kindly express your care in a detailed review*
            </label>
            <textarea
              rows={6}
              placeholder="Write your review in detail here..."
              {...register('details')}
              className="w-full px-4 py-3.5 text-sm bg-white dark:bg-dark-200 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-[#D1A054] text-gray-800 dark:text-white shadow-sm resize-y"
            ></textarea>
            {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>}
          </div>

          {/* Submit Review Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting || addReviewMutation.isPending}
              className="inline-flex items-center space-x-2.5 px-10 py-3.5 bg-[#D1A054] hover:bg-[#b88b44] text-white font-cinzel font-bold text-sm uppercase rounded-lg tracking-wider transition-colors shadow-md disabled:opacity-50"
            >
              <span>Send Review</span>
              <FaPaperPlane className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
