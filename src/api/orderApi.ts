import { AxiosInstance } from 'axios';
import { CartItem } from './cartApi';

export interface Order {
  _id: string;
  userEmail: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: CartItem[];
  totalPrice: number;
  paymentMethod: 'stripe' | 'sslcommerz';
  transactionId: string;
  status: 'pending' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  createdAt: string;
}

export const fetchUserOrders = async (axiosSecure: AxiosInstance, email: string): Promise<Order[]> => {
  const response = await axiosSecure.get<Order[]>(`/orders?email=${email}`);
  return response.data;
};

export const fetchAllOrders = async (axiosSecure: AxiosInstance): Promise<Order[]> => {
  const response = await axiosSecure.get<Order[]>('/orders/all');
  return response.data;
};

export const updateOrderStatus = async (axiosSecure: AxiosInstance, id: string, status: Order['status']): Promise<Order> => {
  const response = await axiosSecure.patch<Order>(`/orders/${id}`, { status });
  return response.data;
};
