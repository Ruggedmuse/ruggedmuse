"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartItem({ item, compact = false }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => updateQuantity(item._id, item.quantity + 1);
  const handleDecrement = () => {
    if (item.quantity > 1) updateQuantity(item._id, item.quantity - 1);
  };
  const handleRemove = () => removeFromCart(item._id);

  // Compact card (image left, info right) used inside product grid
  if (compact) {
    return (
      <div className="flex items-start gap-4 p-3">
        <div className="w-28 h-28 bg-gray-100 shrink-0 rounded-sm overflow-hidden">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/products/${item.slug}`} className="block font-medium text-sm hover:underline">
              {item.article ? `${item.article} - ` : ""}{item.name}
            </Link>
            <p className="text-xs text-gray-500 mt-1">Size: {item.size || "-"}</p>
            <p className="text-sm font-semibold mt-2">€{(item.price * item.quantity).toFixed(2)}</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 border rounded-sm overflow-hidden">
              <button onClick={handleDecrement} className="px-3 py-1 text-sm" disabled={item.quantity <= 1}>
                <Minus size={14} />
              </button>
              <div className="px-3 py-1 text-sm">{item.quantity}</div>
              <button onClick={handleIncrement} className="px-3 py-1 text-sm">
                <Plus size={14} />
              </button>
            </div>

            <button onClick={handleRemove} className="text-gray-400 hover:text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default large row layout (used if rendering full cart list)
  return (
    <div className="flex items-center gap-4 p-4 border rounded-sm bg-white">
      <div className="shrink-0 w-20 h-20 rounded-sm overflow-hidden bg-gray-100">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      <div className="grow">
        <Link href={`/products/${item.slug}`} className="font-medium text-base hover:underline">
          {item.name}
        </Link>
        <p className="text-xs text-gray-500">Size: {item.size}</p>
        <p className="text-sm text-gray-700 mt-1">€{item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={handleDecrement} className="p-2 rounded-sm border" disabled={item.quantity <= 1}>
          <Minus size={14} />
        </button>
        <div className="px-4 py-1 border rounded-sm text-center min-w-11">{item.quantity}</div>
        <button onClick={handleIncrement} className="p-2 rounded-sm border">
          <Plus size={14} />
        </button>
      </div>

      <div className="text-right min-w-20">
        <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button onClick={handleRemove} title="Remove item" className="p-2 text-gray-400 hover:text-red-600">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
