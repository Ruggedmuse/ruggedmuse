"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const firstImage =
    Array.isArray(product.imageUrls) ? product.imageUrls[0] : product.imageUrls;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group w-full spacemono"
    >
      <Link href={`/products/${product.slug}`}>
        {/* Image container */}
        <motion.div
          className="
            relative 
            w-full 
            h-[450px]           /* 👈 Tall card height */
            overflow-hidden 
            bg-[#f6f6f6]       /* light background like pand.co */
          "
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src={firstImage}
            alt={product.name}
            fill
            className="
              object-cover        /* 👈 This gives pand.co style */
              group-hover:scale-105
              transition-transform 
              duration-700
            "
          />
        </motion.div>

        {/* Product info */}
        <div className="mt-3 text-left pl-5">
          <p className="text-[11px] uppercase tracking-wide text-gray-500">
            {product.article}
          </p>

          <p className="text-[15px] font-medium leading-tight">
            {product.name}
          </p>

          <p className="text-[13px] mt-1 font-semibold">
            $ {product.price}
          </p>
        </div>
        
      </Link>
    </motion.div>
  );
}
