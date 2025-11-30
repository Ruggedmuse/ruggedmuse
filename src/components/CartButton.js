"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function CartButton({ product, size, className = "" }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    setIsAdding(true);

    const productToAdd = {
      _id: product._id,
      name: product.name || product.title || "Product",
      price: product.price || 0,
      slug: product.slug,
      article: product.article || "N/A",
      size: size || "Default",
      imageUrl: Array.isArray(product.imageUrls) ? product.imageUrls[0] : product.imageUrl || "",
    };

    addToCart(productToAdd, quantity);

    // visual feedback then reset
    setTimeout(() => {
      setIsAdding(false);
    }, 900);
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center border rounded-sm overflow-hidden">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-2 text-sm"
          disabled={quantity <= 1}
        >
          -
        </button>
        <div className="px-4 py-2 border-l border-r text-sm min-w-12 text-center">{quantity}</div>
        <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-sm">
          +
        </button>
      </div>

      <motion.button
        onClick={handleAddToCart}
        disabled={isAdding}
        whileHover={{ y: -2 }}
        className={`px-5 py-3 text-sm font-medium rounded-sm border transition flex items-center gap-2 ${
          isAdding ? "bg-green-600 text-white border-green-600" : "bg-white text-black"
        }`}
      >
        {isAdding ? "Added ✓" : "Add to Bag"}
      </motion.button>
    </div>
  );
}
