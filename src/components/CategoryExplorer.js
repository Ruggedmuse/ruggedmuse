"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Western",
    href: "/western",
    imageUrl: "/images/west.jpg",
  },
  {
    title: "Eastern",
    href: "/eastern",
    imageUrl: "/images/east.jpg",
  },
  {
    title: "Goods",
    href: "/goods",
    imageUrl: "/images/things.jpg",
  },
];

export default function CategoryExplorer() {
  return (
    <section className="bg-black py-10 momo lg:py-16">
      <div className="w-full mx-auto px-5 md:px-10 lg:px-[60px]">
        <motion.h2
    initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        className="text-center text-4xl md:text-6xl font-semibold uppercase tracking-tight text-white mb-12">
          EXPLORE BY CATEGORY
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((category) => (
            <a key={category.title} href={category.href} className="group block">
              <div className="relative overflow-hidden">
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  width={750}
                  height={938}
                  className="w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-black/20"></div>
              </div>
              <div className="flex items-center justify-between bg-[#FCF6F5] p-6">
                <h3 className="text-sm font-medium uppercase tracking-[0.05em] text-black">
                  {category.title}
                </h3>
                <ArrowRight className="h-5 w-5 text-black transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
