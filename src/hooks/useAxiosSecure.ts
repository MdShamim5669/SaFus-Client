import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosSecure } from '../api/axiosConfig';
import { useAuth } from './useAuth';

export const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logout();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate]);

  return axiosSecure;
};
