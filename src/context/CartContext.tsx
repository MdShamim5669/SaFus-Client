import { createContext } from 'react';
import { CartItem } from '../api/cartApi';
import { MenuItem } from '../api/menuApi';

export interface CartContextType {
  cart: CartItem[];
  isLoading: boolean;
  total: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQty: number) => void;
  clearCart: () => void;
  refetch: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
