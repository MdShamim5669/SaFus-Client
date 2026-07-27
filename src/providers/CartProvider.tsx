import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { axiosSecure } from '../api/axiosConfig';
import { fetchUserCart, addToCart as addToCartApi, deleteCartItem, updateCartQuantity, clearUserCart, CartItem } from '../api/cartApi';
import { MenuItem } from '../api/menuApi';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Local state fallback for logged-in user cart & instant client sync
  const [localCart, setLocalCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bistro_guest_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const { data: serverCart = [], isLoading, refetch } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: () => fetchUserCart(axiosSecure, user!.email),
    enabled: !!user?.email,
  });

  // Cart is active only when user is logged in
  const cart = user ? (serverCart.length > 0 ? serverCart : localCart) : [];

  const addItemMutation = useMutation({
    mutationFn: async (item: MenuItem) => {
      if (user) {
        try {
          return await addToCartApi(axiosSecure, {
            menuId: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1,
            userEmail: user.email,
          });
        } catch (e) {
          // Fallback if backend API endpoint differs
        }
      }
      return null;
    },
    onSuccess: (_, item) => {
      toast.success(`${item.name} added to cart!`);
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['cart', user.email] });
      }
      setLocalCart((prev) => {
        const existing = prev.find((c) => c.menuId === item._id || c._id === item._id);
        let updated: CartItem[];
        if (existing) {
          updated = prev.map((c) =>
            (c.menuId === item._id || c._id === item._id) ? { ...c, quantity: c.quantity + 1 } : c
          );
        } else {
          updated = [
            ...prev,
            {
              _id: 'cart_' + Date.now() + Math.random().toString(36).substr(2, 4),
              menuId: item._id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: 1,
              userEmail: user?.email || 'guest',
            },
          ];
        }
        localStorage.setItem('bistro_guest_cart', JSON.stringify(updated));
        return updated;
      });
    },
  });

  const handleAddToCart = (item: MenuItem) => {
    if (!user) {
      Swal.fire({
        title: 'You are not Logged In',
        text: 'Please login to add items to the cart.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, login!',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      return;
    }
    addItemMutation.mutate(item);
  };

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      if (user) {
        try {
          return await deleteCartItem(axiosSecure, id);
        } catch (e) {}
      }
      return null;
    },
    onSuccess: (_, id) => {
      toast.success('Item removed from cart');
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['cart', user.email] });
      }
      setLocalCart((prev) => {
        const updated = prev.filter((item) => item._id !== id && item.menuId !== id);
        localStorage.setItem('bistro_guest_cart', JSON.stringify(updated));
        return updated;
      });
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
      }).catch(() => {});
    }
    setLocalCart((prev) => {
      const updated = prev.map((item) => (item._id === id || item.menuId === id ? { ...item, quantity: newQty } : item));
      localStorage.setItem('bistro_guest_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    if (user) {
      clearUserCart(axiosSecure, user.email).then(() => {
        queryClient.invalidateQueries({ queryKey: ['cart', user.email] });
      }).catch(() => {});
    }
    setLocalCart([]);
    localStorage.removeItem('bistro_guest_cart');
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        total,
        addToCart: handleAddToCart,
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
