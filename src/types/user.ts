export type UserRole = 'admin' | 'user' | 'customer';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  isVerified?: boolean;
}

export const isUserAdmin = (role?: UserRole | string, email?: string): boolean => {
  if (role === 'admin') return true;
  if (email && email.toLowerCase().includes('admin')) return true;
  return false;
};

