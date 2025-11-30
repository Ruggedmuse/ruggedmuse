"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";



const products = [
  {
    id: 1,
    brand: "Lustcraft",
    gender: "Both",
    name: "Hoodies",
    price: "£30.00",
    link: "/categories/men-hoodies",
    image: "/images/hoodie.jpg" ,
  },
  {
    id: 2,
    brand: "INOV8",
    gender: "Women's",
    name: "Leather Jacket",
    price: "£50.00",
    link: "/categories/leather-jackets",
    image: "/images/leather_jacket.jpg",
  },
  {
    id: 3,
    brand: "Montane",
    gender: "Men's",
    name: "Female Shalwar Qameez",
    price: "£75.00",
    link: "/categories/female-shalwar-qameez",
    image: "/images/sq-w.jpg",
  },
  {
    id: 4,
    brand: "Patagonia",
    gender: "Women's",
    name: "Tracksuits",
    price: "£90.00",
    link: "/categories/men-tracksuits",
    image: "/images/tracksuit.jpg",
  },
  {
    id: 5,
    brand: "Patagodsnia",
    gender: "Women's",
    name: "T Shirts",
    price: "£96.00",
    link: "/categories/men-t-shirt",
    image: "/images/tshirt.jpg",
  },
];

export default function FeaturedProducts() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // Fix Swiper navigation timing issues
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;

    setTimeout(() => {
      if (swiper.navigation) {
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    });
  }, []);

  return (
   <section className="bg-[#FCF6F5] momo text-black py-6">
  <div className="w-full px-4 2xl:px-10 relative">
    {/* Title */}
    <motion.h2
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-2xl cabin tracking-wide bold mb-6"
    >
      FEATURED PRODUCTS
    </motion.h2>
    
    {/* Swiper */}
    <Swiper
      modules={[Navigation]}
      onSwiper={(s) => (swiperRef.current = s)}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
        clickable: true,
      }}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
    >
      {products.map((item) => (
        <SwiperSlide key={item.id}>
          <Link href={item.link}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center  cabin"
            >
              <div className="w-full h-[400px] md:h-[400px] flex items-center justify-center bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={500}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm md:text-base font-medium text-center">
                {item.name}
              </p>
            </motion.div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Arrows */}
    <button
      ref={prevRef}
      aria-label="Previous slide"
      className="absolute top-1/2 -translate-y-1/2 left-0 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white text-black shadow-lg hover:scale-105 transition"
    >
      <FaChevronLeft />
    </button>

    <button
      ref={nextRef}
      aria-label="Next slide"
      className="absolute top-1/2 -translate-y-1/2 right-0 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white text-black shadow-lg hover:scale-105 transition"
    >
      <FaChevronRight />
    </button>
  </div>
</section>

  );
}
