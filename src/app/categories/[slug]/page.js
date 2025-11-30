import { productsByCategoryQuery } from "@/app/lib/queries";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import MovingText from "@/components/MovingText";
import cat from '../../../../public/images/cat.jpg'

import { client } from "@/sanity/lib/client";
import FeaturedProducts from "@/components/FeaturedProducts";
import Image from "next/image";

export default async function CategoryPage({ params }) {
  // ✅ Await params before using its properties
  const { slug } = await params;

  // ✅ Now safe to pass slug into the query
  const products = await client.fetch(productsByCategoryQuery, { slug });

  return (
    <div className="overflow-x-hidden momo bg-black text-white min-h-screen flex flex-col">
        <Navbar/>
        <div
        className="text-3xl flex items-center  justify-start w-full cabin  mt-12 px-2 md:px-6  uppercase       border-gray-800 "
        >
          <h1>{slug}</h1>
        </div>
        <div
        className="text-[12px] spacemono border-b flex items-center justify-start w-full cabin   px-2 md:px-6    mb-2     border-gray-800 pb-2"
        >
          <h1>Product Listing</h1>
        </div>
         <p className="spacemono text-[12px] px-2 md:px-6">Explore RuggedMuseCollection complete collection, featuring versatile designs that combine comfort, durability, and timeless style. From relaxed, easygoing fits to more tailored silhouettes, each piece is crafted from high-quality fabrics that wear well on their own or layered.</p>
    <div className=" my-5">
      

      {products.length === 0 ? (
        <p className="my-[200px] mx-[50%]">No products found</p>
      ) : (
       <div className="grid grid-cols-2    gap-y-15 py-6 mb-5  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
  {products.map((p) => (
    <ProductCard key={p._id} product={p} />
  ))}
</div>

      )}
    </div>
    <div className="h-[400px] w-full">
      <Image
      src={cat}
      alt="Cat"
      className="w-full h-full object-cover"
      />
    </div>
    <MovingText/>
    <FeaturedProducts/>
    <Footer/>
    </div>
  );
}
