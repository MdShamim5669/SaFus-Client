import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAxiosPublic } from './useAxiosPublic';
import { useAxiosSecure } from './useAxiosSecure';
import { fetchMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, MenuItem } from '../api/menuApi';
import menuData from '../data/menu.json';

export const useMenuItems = (category?: string) => {
  const axiosPublic = useAxiosPublic();

  const query = useQuery({
    queryKey: ['menu', category],
    queryFn: async () => {
      try {
        const data = await fetchMenuItems(axiosPublic, category);
        return data && data.length > 0 ? data : (menuData as MenuItem[]);
      } catch (error) {
        // Fallback to static seed data if backend server is not active
        const localMenu = menuData as MenuItem[];
        if (category && category !== 'all') {
          return localMenu.filter((item) => item.category === category);
        }
        return localMenu;
      }
    },
  });

  return {
    menuItems: query.data || (menuData as MenuItem[]),
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export const useAddMenuItem = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newItem: Parameters<typeof createMenuItem>[1]) => createMenuItem(axiosSecure, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMenuItem(axiosSecure, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    },
  });
};
