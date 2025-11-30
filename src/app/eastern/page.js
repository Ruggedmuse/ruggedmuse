"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Eastern() {
  const fade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const Btn = ({ link, text, color = "black" }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="mt-3"
    >
      <Link
        href={link}
        className={`inline-block border border-${color} px-5 py-2 text-sm tracking-wider text-${color} hover:bg-${color} hover:text-white transition`}
      >
        {text}
      </Link>
    </motion.div>
  );

  return (
    <div className="w-full min-h-screen bg-white text-black space-y-10 spacemono">

       <div
        className="text-3xl flex items-center  justify-start w-full cabin py-10  px-2 md:px-6  uppercase       border-gray-800 "
        >
          <h1>Eastern Collection</h1>
        </div>
        <div
        className="text-[12px] spacemono border-b flex items-center justify-start w-full cabin   px-2 md:px-6    mb-2     border-gray-800 pb-2"
        >
          <h1>Eastern Culture </h1>
        </div>
         <p className="spacemono text-[12px] px-2 md:px-6">Explore RuggedMuseCollection complete collection, featuring versatile designs that combine comfort, durability, and timeless style. From relaxed, easygoing fits to more tailored silhouettes, each piece is crafted from high-quality fabrics that wear well on their own or layered.</p>
      {/* HERO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        {/* Best Sellers */}
        <motion.div variants={fade} initial="hidden" animate="show"
          className="col-span-1 md:col-span-2 relative h-[450px] overflow-hidden"
        >
          <Image src="/images/sq-m.jpg" alt="Best Sellers" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-black">
            <div className="text-3xl font-light">Men Shalwar Qameez</div>

            <Btn text="Men" link="/categories/male-shalwar-qameez" color="black" />
            
          </div>
        </motion.div>

        {/* Gift */}
        <motion.div variants={fade} initial="hidden" animate="show"
          className="relative h-[450px] overflow-hidden"
        >
          <Image src="/images/sq-w.jpg" alt="Gift" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-black">
            <div className="text-3xl font-light">Female Shalwar Qameez</div>

            
            <Btn text="Women" link="/categories/female-shalwar-qameez" color="black" />
          </div>
        </motion.div>
      </div>

      {/* SECOND GRID */}
     

      {/* FEATURED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-10">

        <motion.div variants={fade} initial="hidden" animate="show"
          className="relative h-[450px] overflow-hidden"
        >
          <Image src="/images/abaya.jpg" alt="Featured Look" fill className="object-cover" />
          <div className="absolute bottom-6 left-6">

          </div>
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show"
          className="flex flex-col items-start justify-center p-10 bg-white"
        >
          <h3 className="text-sm tracking-widest mb-4">Abaya</h3>
          <p className="text-3xl font-light max-w-xs">Complete in Modern Eastern</p>

          
          <Btn text="Women" link="/categories/abaya" color="black" />
        </motion.div>


    
      </div>
       

    </div>
  );
}
