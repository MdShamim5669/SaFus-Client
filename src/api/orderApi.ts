import { AxiosInstance } from 'axios';
import { CartItem } from '../types/cart';

export type OrderStatus = 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';

export interface Order {
  _id: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  totalPrice: number;
  paymentMethod: string;
  transactionId: string;
  status: OrderStatus;
  createdAt: string;
}

export const fetchUserOrders = async (axiosSecure: AxiosInstance, email: string): Promise<Order[]> => {
  const response = await axiosSecure.get<Order[]>(`/orders?email=${email}`);
  return response.data;
};

export const fetchAllOrders = async (axiosSecure: AxiosInstance): Promise<Order[]> => {
  const response = await axiosSecure.get<Order[]>('/orders');
  return response.data;
};

export const updateOrderStatus = async (
  axiosSecure: AxiosInstance,
  id: string,
  status: OrderStatus
): Promise<Order> => {
  const response = await axiosSecure.patch<Order>(`/orders/${id}`, { status });
  return response.data;
};
