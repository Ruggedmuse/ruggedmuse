// src/lib/cart.js - resilient cart utils with image fallbacks and migration

// Optional: Sanity image builder (use if you have @sanity/image-url and a client).
let urlFor = null;
try {
  // eslint-disable-next-line no-undef
  // only require if installed in your project
  const imageUrlBuilder = require('@sanity/image-url'); // CommonJS require so file still works if not bundled
  const { client } = require('@/sanity/lib/client'); // might throw if not present
  const builder = imageUrlBuilder.default ? imageUrlBuilder.default(client) : imageUrlBuilder(client);
  urlFor = (source) => builder.image(source).width(800).url();
} catch (e) {
  // Sanity builder not available or client not configured; we'll fallback to direct fields
  urlFor = null;
}

// ---------- LocalStorage helpers ----------
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    console.error('getCart parse error', e);
    return [];
  }
};

export const saveCart = (cartItems) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (e) {
    console.error('saveCart error', e);
  }
};

// ---------- Utility: try many image shapes ----------
const resolveImageUrlFromProduct = (product) => {
  if (!product) return '';

  // 1) direct field matches
  if (typeof product.imageUrl === 'string' && product.imageUrl) return product.imageUrl;
  if (typeof product.image === 'string' && product.image) return product.image;
  if (typeof product.image_url === 'string' && product.image_url) return product.image_url;

  // 2) image arrays
  if (Array.isArray(product.imageUrls) && product.imageUrls.length) return product.imageUrls[0];
  if (Array.isArray(product.images) && product.images.length) {
    // If it's an array of string URLs
    if (typeof product.images[0] === 'string') return product.images[0];
    // If it's Sanity image objects try asset.url
    if (product.images[0]?.asset?.url) return product.images[0].asset.url;
  }

  // 3) Sanity style single image object:
  // product.image => { asset: { _ref: '...' } } OR product.image.asset.url
  if (product.image?.asset?.url) return product.image.asset.url;
  if (product.mainImage?.asset?.url) return product.mainImage.asset.url;
  if (product.image && urlFor) {
    // try builder
    try {
      return urlFor(product.image);
    } catch (e) {
      // ignore
    }
  }

  // 4) slugged image path (rare)
  if (product.imagePath) return product.imagePath;

  // 5) fallback to undefined/empty
  return '';
};

// ---------- Add item to cart (unique cartId) ----------
export const addToCart = (product, quantity = 1) => {
  // Debug: uncomment to see what's passed from UI when adding
  // console.log('addToCart product', product);

  const cart = getCart();

  // determine the product id + size (size might be in product.size or supplied on product)
  const _id = product._id || product.id || product._id?.toString() || product.sku || null;
  const size = product.size || product.selectedSize || 'nosize';

  // build cartId unique per product + variation
  const cartId = `${_id}-${size}`;

  // find existing by cartId
  const existingItem = cart.find((it) => it.cartId === cartId);

  // resolve image url with robust fallback
  const imageUrl = resolveImageUrlFromProduct(product);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 0) + quantity;
  } else {
    cart.push({
      cartId,
      _id,
      name: product.name || product.title || 'Product',
      article: product.article || product.articleNumber || '',
      size,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
      slug: (product.slug && (product.slug.current || product.slug)) || product.slug || '',
      imageUrl: imageUrl || '', // explicit empty string if none
      quantity
    });
  }

  saveCart(cart);
  return cart;
};

// ---------- Remove item from cart by cartId OR by _id (backwards compatible) ----------
export const removeFromCart = (productIdOrCartId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.cartId !== productIdOrCartId && item._id !== productIdOrCartId);
  saveCart(updatedCart);
  return updatedCart;
};

// ---------- Update quantity (accept cartId or _id) ----------
export const updateQuantity = (productIdOrCartId, quantity) => {
  if (quantity <= 0) return removeFromCart(productIdOrCartId);

  const cart = getCart();
  const item = cart.find(it => it.cartId === productIdOrCartId || it._id === productIdOrCartId);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }

  return cart;
};

// ---------- Totals ----------
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
};

export const getCartItemsCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + (Number(item.quantity || 0)), 0);
};

// ---------- Clear ----------
export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cart');
};

// ---------- Migration helper: fix old items that lack cartId or imageUrl ----------
export const migrateCart = () => {
  const cart = getCart();
  let changed = false;
  const newCart = cart.map((it) => {
    const size = it.size || it.selectedSize || 'nosize';
    const _id = it._id || it.id || it.sku || null;
    const cartId = `${_id}-${size}`;
    let imageUrl = it.imageUrl || it.image || '';

    if (!imageUrl) {
      // try to resolve if product payload was nested in item.product
      if (it.product) imageUrl = resolveImageUrlFromProduct(it.product);
      // or try resolve from possible fields
      imageUrl = imageUrl || resolveImageUrlFromProduct(it);
    }

    const newItem = {
      ...it,
      cartId,
      _id,
      size,
      imageUrl: imageUrl || ''
    };

    // mark changed if missing new props
    if (!it.cartId || !it.imageUrl) changed = true;
    return newItem;
  });

  if (changed) {
    saveCart(newCart);
    console.log('migrateCart: migration applied, updated localStorage.cart');
  } else {
    console.log('migrateCart: no migration needed');
  }
  return newCart;
};
