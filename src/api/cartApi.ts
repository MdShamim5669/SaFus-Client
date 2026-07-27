import { AxiosInstance } from 'axios';
import { MenuItem } from './menuApi';

export interface CartItem {
  _id: string;
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  userEmail: string;
}

export const fetchUserCart = async (axiosSecure: AxiosInstance, email: string): Promise<CartItem[]> => {
  const response = await axiosSecure.get<CartItem[]>(`/carts?email=${email}`);
  return response.data;
};

export const addToCart = async (axiosSecure: AxiosInstance, cartData: Omit<CartItem, '_id'>): Promise<CartItem> => {
  const response = await axiosSecure.post<CartItem>('/carts', cartData);
  return response.data;
};

export const updateCartQuantity = async (axiosSecure: AxiosInstance, id: string, quantity: number): Promise<CartItem> => {
  const response = await axiosSecure.patch<CartItem>(`/carts/${id}`, { quantity });
  return response.data;
};

export const deleteCartItem = async (axiosSecure: AxiosInstance, id: string): Promise<{ success: boolean }> => {
  const response = await axiosSecure.delete<{ success: boolean }>(`/carts/${id}`);
  return response.data;
};

export const clearUserCart = async (axiosSecure: AxiosInstance, email: string): Promise<{ success: boolean }> => {
  const response = await axiosSecure.delete<{ success: boolean }>(`/carts/clear?email=${email}`);
  return response.data;
};
