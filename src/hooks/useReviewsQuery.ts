import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxiosPublic } from './useAxiosPublic';
import { useAxiosSecure } from './useAxiosSecure';
import { fetchReviews, createReview, CustomerReview } from '../api/reviewApi';
import reviewsData from '../data/reviews.json';

export const useReviews = () => {
  const axiosPublic = useAxiosPublic();

  const query = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      try {
        const data = await fetchReviews(axiosPublic);
        return data && data.length > 0 ? data : (reviewsData as CustomerReview[]);
      } catch (error) {
        return reviewsData as CustomerReview[];
      }
    },
  });

  return {
    reviews: query.data || (reviewsData as CustomerReview[]),
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};

export const useAddReview = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newReview: Parameters<typeof createReview>[1]) => createReview(axiosSecure, newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
