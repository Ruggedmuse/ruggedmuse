// src/context/CartContext.js - Cart context for global state management

"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCart, 
  saveCart, 
  addToCart as addToCartUtil, 
  removeFromCart as removeFromCartUtil,
  updateQuantity as updateQuantityUtil,
  getCartTotal,
  getCartItemsCount,
  clearCart as clearCartUtil
} from '@/lib/cart';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setCartItems(getCart());
    setIsLoaded(true);
  }, []);

  const addToCart = (product, quantity = 1) => {
    const updatedCart = addToCartUtil(product, quantity);
    setCartItems(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = removeFromCartUtil(productId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = updateQuantityUtil(productId, quantity);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    clearCartUtil();
    setCartItems([]);
  };

  const cartTotal = getCartTotal();
  const cartItemsCount = getCartItemsCount();

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartItemsCount,
      isLoaded
    }}>
      {children}
    </CartContext.Provider>
  );
};