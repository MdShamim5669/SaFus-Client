import { AxiosInstance } from 'axios';
import { UserProfile } from './authApi';

export const fetchAllUsers = async (axiosSecure: AxiosInstance): Promise<UserProfile[]> => {
  const response = await axiosSecure.get<UserProfile[]>('/users');
  return response.data;
};

export const makeAdmin = async (axiosSecure: AxiosInstance, userId: string): Promise<UserProfile> => {
  const response = await axiosSecure.patch<UserProfile>(`/users/admin/${userId}`);
  return response.data;
};

export const deleteUser = async (axiosSecure: AxiosInstance, userId: string): Promise<{ success: boolean }> => {
  const response = await axiosSecure.delete<{ success: boolean }>(`/users/${userId}`);
  return response.data;
};

export const fetchAdminAnalytics = async (axiosSecure: AxiosInstance): Promise<{
  usersCount: number;
  menuItemsCount: number;
  ordersCount: number;
  revenue: number;
}> => {
  const response = await axiosSecure.get('/admin-stats');
  return response.data;
};
