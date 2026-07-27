export type UserRole = 'admin' | 'user';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  isVerified?: boolean;
}
