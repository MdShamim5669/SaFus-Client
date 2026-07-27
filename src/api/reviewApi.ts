import { AxiosInstance } from 'axios';
import { ReviewSchemaType } from '../schemas/reviewSchema';

export interface CustomerReview {
  _id: string;
  name: string;
  details: string;
  rating: number;
  recipeSuggestion?: string;
  createdAt?: string;
}

export const fetchReviews = async (axiosPublic: AxiosInstance): Promise<CustomerReview[]> => {
  const response = await axiosPublic.get<CustomerReview[]>('/reviews');
  return response.data;
};

export const createReview = async (axiosSecure: AxiosInstance, reviewData: ReviewSchemaType): Promise<CustomerReview> => {
  const response = await axiosSecure.post<CustomerReview>('/reviews', reviewData);
  return response.data;
};
