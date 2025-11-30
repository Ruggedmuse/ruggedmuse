import Image from "next/image";
import about from "../../public/images/about.jpg";

export default function About(){
    return (
        <div className="flex momo bg-[#FCF6F5] md:flex-row flex-col justify-between items-center w-full h-full">
            <div className="md:w-[50%] w-full h-full">
                <Image
                src={about}
                alt="AboutImage"
                />
            </div>
            <div className="md:px-20 px-2 md:w-[50%] w-full">
                <h1 className="pb-5 py-5 text-[30px]">About Us — Rugged Muse Collection</h1>
                <p className="">Rugged Muse Collection is a modern apparel and home-lifestyle brand built on craftsmanship, quality, and timeless style. We specialize in men’s and women’s clothing, as well as premium home accessories, including bedsheets and curated lifestyle essentials designed for everyday comfort.</p>
                <p className="">s a certified manufacturing and exporting company, we control the entire production process—from sourcing high-grade materials to crafting every product with precision. This allows us to deliver exceptional quality at honest prices while ensuring every piece meets international standards.</p>
            </div>
        </div>
    )
}