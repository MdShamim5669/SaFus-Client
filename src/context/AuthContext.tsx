import { createContext } from 'react';
import { UserProfile } from '../api/authApi';
import { LoginSchemaType, RegisterSchemaType, OtpSchemaType } from '../schemas/authSchema';

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  pendingEmail: string | null;
  setPendingEmail?: (email: string | null) => void;
  login: (credentials: LoginSchemaType) => Promise<void>;
  register: (userData: Omit<RegisterSchemaType, 'confirmPassword'>) => Promise<void>;
  verifyOtpCode: (payload: OtpSchemaType) => Promise<void>;
  logout: () => Promise<void>;
  updateUserRole: (newRole: 'admin' | 'customer' | 'user') => void;
  updateUserProfilePhoto: (photoURL: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
