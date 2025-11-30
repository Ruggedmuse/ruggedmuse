"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import CheckoutForm from "@/components/CheckoutForm";
import { MessageCircle, CreditCard, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovingText from "@/components/MovingText";

export default function CartPage() {
  const { cartItems, cartTotal, cartItemsCount, clearCart } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // Build WhatsApp message (euro symbol and safe fallbacks)
  const generateWhatsAppMessage = () => {
    const items = cartItems
      .map((item) => {
        const itemName = item.name || item.title || "Product";
        const article = item.article || "N/A";
        const size = item.size || "Not selected";
        return `${article} - ${itemName} | Size: ${size} | Qty: ${item.quantity} | €${(
          item.price * item.quantity
        ).toFixed(2)}`;
      })
      .join("\n");

    const message = `Hello! I'd like to place an order:\n\n${items}\n\nTotal: €${cartTotal.toFixed(
      2
    )}\n\nPlease confirm. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = "923001234567"; // replace with your number (international format without +)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f6f6] flex flex-col ">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-xl text-center">
            <h1 className="text-3xl font-semibold tracking-wide mb-3">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Add some pieces to build your look.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border px-6 py-3 rounded-sm text-sm hover:bg-black hover:text-white transition"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] text-black">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-10 spacemono">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-wide">Shopping Cart</h1>
            <p className="text-sm text-gray-600 mt-1">
              {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"} in your bag
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:underline"
              title="Clear cart"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT: Product/product-listing area (dark, luxury) */}
          <section className="lg:col-span-8 bg-linear-to-b bg-black rounded-sm p-8 shadow-lg">
            <div className="text-white mb-6">
              <h2 className="text-4xl font-light">Products</h2>
              <p className="mt-2 text-sm text-white/70">Preview items in your bag</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="bg-white rounded-sm overflow-hidden shadow-sm"
                >
                  {/* small product card */}
                  <CartItem item={item} compact />
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: Checkout panel (light, white) */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-sm p-6 shadow-xl sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium tracking-wide">BAG — SUMMARY</h3>
                <span className="text-sm text-gray-500">{cartItemsCount} items</span>
              </div>

              <div className="space-y-3 max-h-[40vh] overflow-auto mb-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.imageUrl ? (
                        // small thumbnail; keep Next Image optional if remote
                        // If imageUrl might be remote ensure next.config allows it
                        // using simple img to avoid layout shift if needed
                        // Replace with Next/Image if you want optimization
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-sm" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {item.article ? `${item.article} - ` : ""}{item.name}
                        </p>
                        <p className="text-xs text-gray-500">Size: {item.size || "-"}</p>
                        <p className="text-sm text-gray-700 mt-1">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">x{item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-semibold mt-2">
                  <span>Total</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>

                <div className="space-y-3 mt-4">
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full flex items-center justify-center gap-2 border py-3 rounded-sm font-medium hover:bg-black hover:text-white transition"
                  >
                    <CreditCard size={18} />
                    Checkout with Card
                  </button>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-sm font-medium hover:brightness-95 transition"
                  >
                    <MessageCircle size={18} />
                    Checkout via WhatsApp
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center mt-3">* Shipping and discounts calculated at checkout</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Checkout modal/form */}
        {showCheckoutForm && <CheckoutForm onClose={() => setShowCheckoutForm(false)} />}
      </main>
              <MovingText/>  
      <Footer />
    </div>
  );
}
