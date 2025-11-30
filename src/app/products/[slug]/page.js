
import { client } from "@/sanity/lib/client";
import { productBySlugQuery } from "@/app/lib/queries";
import Single from "@/components/Single";
import Navbar from "@/components/Navbar";
import MovingText from "@/components/MovingText";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import cat from '../../../../public/images/cat.jpg'
import Image from "next/image";


export default async function ProductPage({ params }) {
  // ✅ Await params first
  const { slug } = await params;

  // ✅ Now use slug safely
  const product = await client.fetch(productBySlugQuery, { slug });

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
   <Single product={product}/>
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
