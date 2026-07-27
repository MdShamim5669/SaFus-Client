import { AxiosInstance } from 'axios';
import { MenuSchemaType } from '../schemas/menuSchema';
import { MenuItem } from '../types/menu';

export type { MenuItem };

export const fetchMenuItems = async (axiosPublic: AxiosInstance, category?: string): Promise<MenuItem[]> => {
  const url = category && category !== 'all' ? `/menu?category=${category}` : '/menu';
  const response = await axiosPublic.get<MenuItem[]>(url);
  return response.data;
};

export const fetchMenuItemById = async (axiosPublic: AxiosInstance, id: string): Promise<MenuItem> => {
  const response = await axiosPublic.get<MenuItem>(`/menu/${id}`);
  return response.data;
};

export const createMenuItem = async (axiosSecure: AxiosInstance, itemData: MenuSchemaType): Promise<MenuItem> => {
  const response = await axiosSecure.post<MenuItem>('/menu', itemData);
  return response.data;
};

export const updateMenuItem = async (axiosSecure: AxiosInstance, id: string, itemData: Partial<MenuSchemaType>): Promise<MenuItem> => {
  const response = await axiosSecure.patch<MenuItem>(`/menu/${id}`, itemData);
  return response.data;
};

export const deleteMenuItem = async (axiosSecure: AxiosInstance, id: string): Promise<{ success: boolean }> => {
  const response = await axiosSecure.delete<{ success: boolean }>(`/menu/${id}`);
  return response.data;
};
