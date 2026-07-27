import { useAuth } from './useAuth';

export const useRole = () => {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');
  return { isAdmin, role: isAdmin ? 'admin' : 'user', isLoading: loading };
};
