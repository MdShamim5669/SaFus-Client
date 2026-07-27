import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { axiosSecure } from '../api/axiosConfig';
import { checkAdminStatus } from '../api/userApi';
import { isUserAdmin } from '../types/user';

export const useRole = () => {
  const { user, loading: authLoading } = useAuth();

  const localIsAdmin = isUserAdmin(user?.role, user?.email);

  const { data: adminData, isLoading: queryLoading } = useQuery({
    queryKey: ['isAdmin', user?.email, user?.role],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      if (localIsAdmin) return { admin: true };
      return await checkAdminStatus(axiosSecure, user!.email);
    },
    initialData: { admin: localIsAdmin },
  });

  const isAdmin = localIsAdmin || (adminData?.admin ?? false);
  const isCustomer = !isAdmin;
  const role = isAdmin ? 'admin' : (user?.role === 'customer' ? 'customer' : 'user');

  return {
    isAdmin,
    isCustomer,
    role,
    isLoading: authLoading || queryLoading,
  };
};

