import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { axiosSecure } from '../api/axiosConfig';
import { fetchUserCart, addToCart as addToCartApi, deleteCartItem, updateCartQuantity, clearUserCart, CartItem } from '../api/cartApi';
import { MenuItem } from '../api/menuApi';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Local state fallback for non-logged-in guest cart
  const [localCart, setLocalCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bistro_guest_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const { data: serverCart = [], isLoading, refetch } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: () => fetchUserCart(axiosSecure, user!.email),
    enabled: !!user?.email,
  });

  const cart = user ? serverCart : localCart;

  const addItemMutation = useMutation({
    mutationFn: (item: MenuItem) => {
      if (user) {
        return addToCartApi(axiosSecure, {
          menuId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: 1,
          userEmail: user.email,
        });
      } else {
        return Promise.resolve(null);
      }
    },
    onSuccess: (_, item) => {
      toast.success(`${item.name} added to cart!`);
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['cart', user.email] });
      } else {
        setLocalCart((prev) => {
          const existing = prev.find((c) => c.menuId === item._id);
          let updated: CartItem[];
          if (existing) {
            updated = prev.map((c) =>
              c.menuId === item._id ? { ...c, quantity: c.quantity + 1 } : c
            );
          } else {
            updated = [
              ...prev,
              {
                _id: 'guest_' + Date.now(),
                menuId: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: 1,
                userEmail: 'guest',
              },
            ];
          }
          localStorage.setItem('bistro_guest_cart', JSON.stringify(updated));
          return updated;
        });
      }
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (id: string) => {
      if (user) {
        return deleteCartItem(axiosSecure, id);
      } else {
        return Promise.resolve(null);
      }
    },
    onSuccess: (_, id) => {
      toast.success('Item removed from cart');
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['cart', user.email] });
      } else {
        setLocalCart((prev) => {
          const updated = prev.filter((item) => item._id !== id);
          localStorage.setItem('bistro_guest_cart', JSON.stringify(updated));
          return updated;
        });
      }
    },
  });

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      removeItemMutation.mutate(id);
      return;
    }
    if (user) {
      updateCartQuantity(axiosSecure, id, newQty).then(() => {
        queryClient.invalidateQueries({ queryKey: ['cart', user.email] });
      });
    } else {
      setLocalCart((prev) => {
        const updated = prev.map((item) => (item._id === id ? { ...item, quantity: newQty } : item));
        localStorage.setItem('bistro_guest_cart', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearCart = () => {
    if (user) {
      clearUserCart(axiosSecure, user.email).then(() => {
        queryClient.invalidateQueries({ queryKey: ['cart', user.email] });
      });
    } else {
      setLocalCart([]);
      localStorage.removeItem('bistro_guest_cart');
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        total,
        addToCart: (item: MenuItem) => addItemMutation.mutate(item),
        removeFromCart: (id: string) => removeItemMutation.mutate(id),
        updateQuantity,
        clearCart,
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
