"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


import hero2 from "../../public/images/hero2.jpg";


import Navbar from "./Navbar";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative momo bg-[#FCF6F5] w-full ">
      {/* Navbar */}
      <Navbar />

      <div className="flex w-full text-white px-2  md:h-[500px] 2xl:h-[650px] mt-0  lg:mt-4    ">
        {isMounted && (
          <motion.div
            className="relative w-full   h-[500px] 2xl:h-[650px]  overflow-hidden"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <Image
              src={hero2}
              alt="Banner"
              priority
              className="object-cover w-full h-full"
            />
          </motion.div>
        )}
      </div>

      {isMounted && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            
            className="md:flex text-black  w-full hidden  items-center text-[45px] font-light cabin mt-6 2xl:mt-7  px-4 md:px-8"
          >
            <p>RuggedMuseCollection: Redefining Streetwear</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex  text-black w-full font-extrabold md:hidden cabin  items-center text-[20px] mt-6 2xl:mt-7 mx-auto px-4 md:px-8"
          >
            <p>RuggedMuseCollection: Redefining Streetwear</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex w-full barlow text-black  items-center text-[15px] mt-3 2xl:mt-4  px-4 md:px-8"
          >
            <p className="md:w-[50%] cabin  pb-10">
              Discover our latest collection — crafted for those who embrace style, comfort, and bold individuality. Each piece is designed to make a statement and elevate your everyday look.
            </p>
          </motion.div>
        </>
      )}
    </div>
  );
}
