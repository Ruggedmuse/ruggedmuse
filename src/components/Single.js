"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CartButton from "./CartButton";

/**
 * Single.js
 * - Left: big image area with stacked thumbnails
 * - Right: sticky product panel (black), with title, price, color, size, CTA, accordion
 *
 * Notes:
 * - Ensure Tailwind is configured and framer-motion is installed.
 * - Replace product.imageUrls with real absolute/next-image-compatible URLs.
 */

export default function Single({ product }) {
  const images = product?.imageUrls || [];
  const [mainImage, setMainImage] = useState(images[0] || "");
   const [size, setSize] = useState("M");

   
  const sizes = ["S", "M", "L", "XL"]; 
  // fallback if no images
  if (!mainImage && images.length) setMainImage(images[0]);

  return (
    // pt-24 avoids nav overlap; md:grid-cols-2: split screen on desktop
    <div className="w-full pt-10 spacemono">
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-6rem)]">
        {/* LEFT - IMAGES */}
        <div className="bg-[#d9d9d9] flex gap-6 p-6 items-start">
          {/* Thumbnails column */}
          <div className="flex flex-col gap-4">
            {images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setMainImage(img)}
                whileHover={{ scale: 1.03 }}
                className={`relative w-20 h-20 rounded overflow-hidden transition-shadow focus:outline-none
                  ${mainImage === img ? "ring-2 ring-black" : "ring-0"}
                `}
                aria-label={`select image ${i + 1}`}
              >
                <Image src={img} alt={`${product.name} thumb ${i + 1}`} fill className="object-cover" />
              </motion.button>
            ))}
          </div>

          {/* Main image container */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-full h-[86vh] max-h-[86vh] rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                {mainImage ? (
                  <motion.div
                    key={mainImage}
                    initial={{ opacity: 0, scale: 0.995 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={mainImage}
                      alt={product?.name || "product"}
                      fill
                      priority
                      className="object-contain"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-full"
                  >
                    <div className="text-gray-600">No image</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT - PRODUCT PANEL */}
        <aside className="bg-black text-white p-10 min-h-screen">
          {/* Header Row: Title + Price */}
          <div className="flex items-start justify-between mb-8">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight">{product?.name}</h1>
            <div className="text-3xl font-medium">${product?.price}</div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Color selection */}
          <div className="mb-8">
            <h3 className="mb-2">Size</h3>
            <div className="flex gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 flex items-center justify-center border rounded ${
                    size === s
                      ? "bg-purple-700 border-purple-700"
                      : "border-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
              
            </div>
            <p className="text-gray-700 text-sm mt-3">Note: Confirm the Size through Chat</p>
          </div>

          {/* Size */}
        

          {/* CTAs */}
          <div className="flex gap-4 mb-8">
           

            <CartButton product={product} size={size}>
              <motion.div whileHover={{ y: -2 }} className="flex-1">
                <button className="w-full bg-[#0a0a0a] text-white py-3 rounded-md border border-white/5 font-medium">
                  Add to bag
                </button>
              </motion.div>
            </CartButton>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-6" />

          {/* Accordions */}
          <div className="space-y-4">
            <Accordion title="Details" content={product?.description || "No details available."} />
            <Accordion title="Interview" content={"Interview text placeholder."} />
            <Accordion title="Delivery and Returns" content={"Delivery & returns policy placeholder."} />
          </div>

          {/* Bottom spacing so content doesn't butt up to viewport bottom */}
          <div className="h-8" />
        </aside>
      </div>
    </div>
  );
}

/* ---------------- Accordion Component ---------------- */
function Accordion({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10 pt-4">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between text-left py-2"
      >
        <span className="text-lg font-medium tracking-tight">{title}</span>
        <span className="text-2xl font-bold">{open ? "−" : "+"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/70 mt-3 leading-relaxed">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
