// src/lib/cart.js - Cart utility functions

// Get cart from localStorage
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Save cart to localStorage
export const saveCart = (cartItems) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

// Add item to cart
export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(
    item => item._id === product._id && item.size === product.size // 👈 match by size too
  );
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      _id: product._id,
      name: product.name || product.title || 'Product',
      article: product.article || "N/A",   // 👈 save article
      size: product.size || "M",           // 👈 save size
      price: product.price || 0,
      slug: product.slug,
      imageUrl: Array.isArray(product.imageUrls) ? product.imageUrls[0] : product.imageUrls,
      quantity: quantity
    });
  }
  
  saveCart(cart);
  return cart;
};
// export const addToCart = (product, quantity = 1) => {
//   const cart = getCart();
//   const existingItem = cart.find(item => item._id === product._id);
  
//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     cart.push({
//       _id: product._id,
//       name: product.name || product.title || 'Product', // Ensure name is not null
//       price: product.price || 0,
//       slug: product.slug,
//       imageUrl: Array.isArray(product.imageUrls) ? product.imageUrls[0] : product.imageUrls,
//       quantity: quantity
//     });
//   }
  
//   saveCart(cart);
//   return cart;
// };

// Remove item from cart
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item._id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

// Update item quantity
export const updateQuantity = (productId, quantity) => {
  if (quantity <= 0) return removeFromCart(productId);
  
  const cart = getCart();
  const item = cart.find(item => item._id === productId);
  
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
};

// Get cart total
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart items count
export const getCartItemsCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Clear entire cart
export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cart');
};