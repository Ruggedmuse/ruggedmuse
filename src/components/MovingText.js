"use client";
import { motion } from "framer-motion";


export default function CarouselText() {
  return (
     <div className="overflow-hidden whitespace-nowrap momo  bg-black text-white py-2  flex items-center">
      <motion.div
        className="inline-flex text-[90px] font-light"
        animate={{ x: [0, "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        }}
      >
        {/* First set of text */}
        <span className="block">
          RUGGED MUSE COLLECTION — PREMIUM QUALITY — HANDMADE LEATHER — LIMITED EDITION — RUGGED MUSE COLLECTION — PREMIUM QUALITY — HANDMADE LEATHER — LIMITED EDITION —
        </span>
        {/* Duplicate set for seamless loop */}
        <span className="block">
          RUGGED MUSE COLLECTION — PREMIUM QUALITY — HANDMADE LEATHER — LIMITED EDITION — RUGGED MUSE COLLECTION — PREMIUM QUALITY — HANDMADE LEATHER — LIMITED EDITION —
        </span>
      </motion.div>
    </div>
      
  );
}
