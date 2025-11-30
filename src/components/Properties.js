"use client";

import { motion } from "framer-motion";
import { Headphones, Tag, CheckCircle, Truck } from "lucide-react";

export default function Properties() {
  const items = [
    {
      icon: <Headphones className="w-10 h-10 text-black" />,
      title: "Free Expert Help 7 Days a Week",
      desc: "Get dedicated support from our experts anytime you need.",
    },
    {
      icon: <Tag className="w-10 h-10 text-black" />,
      title: "Price Breaks for Every Item",
      desc: "Enjoy better pricing as your order quantity increases.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-black" />,
      title: "Free Design Review for Every Order",
      desc: "We’ll review your designs before printing to ensure perfection.",
    },
    {
      icon: <Truck className="w-10 h-10 text-black" />,
      title: "Always Express Shipping",
      desc: "Fast, reliable delivery for every order you place.",
    },
  ];

  return (
    <div className="w-full bg-[#f8f4ed] momo ">
      <div className="w-full mx-auto border  grid grid-cols-1 md:grid-cols-4  ">

        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="  border  p-10 flex flex-col items-center text-center hover:shadow-md transition"
          >
            <div className="mb-4">{item.icon}</div>
            <h1 className="text-2xl font-semibold pb-4">{item.title}</h1>
            <p className="spacemono text-[14px] text-gray-700">{item.desc}</p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
