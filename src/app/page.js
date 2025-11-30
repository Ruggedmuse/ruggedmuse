

import About from "@/components/About";
import CategoryExplorer from "@/components/CategoryExplorer";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MovingText from "@/components/MovingText";
import Properties from "@/components/Properties";
import WhatsAppButton from "@/components/WhatsAppButton";











export default function Home() {
  return (
    <>
     
       <Hero/>
       <CategoryExplorer/>
       <Properties/>
       <MovingText/>
       <About/>
       <FeaturedProducts/>
       <Footer/>
        <WhatsAppButton/>
    </>
  );
}
