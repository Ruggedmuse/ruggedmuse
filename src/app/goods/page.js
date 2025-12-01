"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Good() {
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
          <h1>Goods</h1>
        </div>
        <div
        className="text-[12px] spacemono border-b flex items-center justify-start w-full cabin   px-2 md:px-6    mb-2     border-gray-800 pb-2"
        >
          <h1>Other Accesories</h1>
        </div>
         <p className="spacemono text-[12px] px-2 md:px-6">Explore RuggedMuseCollection complete collection, featuring versatile designs that combine comfort, durability, and timeless style. From relaxed, easygoing fits to more tailored silhouettes, each piece is crafted from high-quality fabrics that wear well on their own or layered.</p>
      {/* HERO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        {/* Best Sellers */}
        <motion.div variants={fade} initial="hidden" animate="show"
          className="col-span-1 md:col-span-2 relative h-[450px] overflow-hidden"
        >
          <Image src="/images/underwear.jpg" alt="Best Sellers" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-black">
            <div className="text-3xl font-light">UnderWear</div>

            <Btn text="Men" link="/categories/men-underwear" color="black" />
            <Btn text="Women" link="/categories/women-underwear" color="black" />
          </div>
        </motion.div>

        {/* Gift */}
        <motion.div variants={fade} initial="hidden" animate="show"
          className="relative h-[450px] overflow-hidden"
        >
          <Image src="/images/wallet.jpg" alt="Gift" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-3xl font-light">Wallets</div>

            <Btn text="Explore" link="/categories/wallets" color="white" />
            
          </div>
        </motion.div>
      </div>

      {/* SECOND GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        <motion.div variants={fade} initial="hidden" animate="show"
          className="relative h-[350px] overflow-hidden"
        >
          <Image src="/images/belt.jpg" alt="Soft Knit" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-xl">Belts</div>

            <Btn text="Explore" link="/categories/belts" color="white" />
            
          </div>
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show"
          className="relative h-[350px] overflow-hidden"
        >
          <Image src="/images/sofacover.jpg" alt="Men Collection" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-xl">Sofa covers</div>

            <Btn text="Explore" link="/categories/sofa-covers" color="white" />
            
          </div>
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show"
          className="relative h-[350px] overflow-hidden"
        >
          <Image src="/images/bedsheet.jpg" alt="Essential Wear" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-xl">Bed sheets</div>

            <Btn text="Explore" link="/categories/bed-sheets" color="white" />
            
          </div>
        </motion.div>
      </div>

      {/* FEATURED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-10">

        <motion.div variants={fade} initial="hidden" animate="show"
          className="relative h-[450px] overflow-hidden"
        >
          <Image src="/images/hat.jpg" alt="Featured Look" fill className="object-cover" />
          <div className="absolute bottom-6 left-6">

          </div>
        </motion.div>

        <motion.div variants={fade} initial="hidden" animate="show"
          className="flex flex-col items-start justify-center p-10 bg-white"
        >
          <h3 className="text-sm tracking-widest mb-4">Hats</h3>
          <p className="text-3xl font-light max-w-xs">Complete in Modern Western</p>

          <Btn text="Explore" link="/categories/hats" color="black" />
          
        </motion.div>


    
      </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

        <motion.div variants={fade} initial="hidden" animate="show"
          className="relative h-[350px] overflow-hidden"
        >
          <Image src="/images/cap.jpg" alt="Soft Knit" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="text-xl">Caps</div>

            <Btn text="Explore" link="/categories/caps" color="white" />
          </div>
        </motion.div>

       
      </div>

    </div>
  );
}
