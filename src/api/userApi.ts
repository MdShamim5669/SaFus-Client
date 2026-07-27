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

export const checkAdminStatus = async (axiosSecure: AxiosInstance, email: string): Promise<{ admin: boolean }> => {
  try {
    const response = await axiosSecure.get<{ admin: boolean }>(`/users/admin/${encodeURIComponent(email)}`);
    if (typeof response.data?.admin === 'boolean') {
      return response.data;
    }
  } catch (e) {
    // Fallback if backend route not live
  }

  // Inspect local active user session and profiles db
  try {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.email?.toLowerCase() === email.toLowerCase() && parsed.role === 'admin') {
        return { admin: true };
      }
    }
    const savedDbProfile = getSavedUserProfile(email);
    if (savedDbProfile?.role === 'admin') {
      return { admin: true };
    }
  } catch (e) {}

  return { admin: email.toLowerCase().includes('admin') };
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

export const updateUserProfileInBackend = async (
  axiosSecure: AxiosInstance,
  email: string,
  updates: Partial<UserProfile>
): Promise<UserProfile> => {
  try {
    const response = await axiosSecure.patch<UserProfile>('/users/profile', updates);
    return response.data;
  } catch (e) {
    try {
      const response = await axiosSecure.patch<UserProfile>(`/users/${encodeURIComponent(email)}`, updates);
      return response.data;
    } catch (e2) {
      return updates as UserProfile;
    }
  }
};

export const getSavedUserProfile = (email: string): Partial<UserProfile> | null => {
  if (!email) return null;
  try {
    const db = JSON.parse(localStorage.getItem('safus_user_profiles_db') || '{}');
    return db[email.toLowerCase()] || null;
  } catch (e) {
    return null;
  }
};

export const saveUserProfileToDb = (user: Partial<UserProfile> & { email: string }) => {
  if (!user.email) return;
  try {
    const db = JSON.parse(localStorage.getItem('safus_user_profiles_db') || '{}');
    const existing = db[user.email.toLowerCase()] || {};
    db[user.email.toLowerCase()] = {
      ...existing,
      ...user,
    };
    localStorage.setItem('safus_user_profiles_db', JSON.stringify(db));
  } catch (e) {}
};


