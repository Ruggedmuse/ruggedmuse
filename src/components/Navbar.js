"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isHome, setIsHome] = useState(true);
  const { cartItemsCount, isLoaded } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

   const phoneNumber = "+923248912969"; // replace with your WhatsApp number
  const message = "Hello, I'm interested in your products!"; // default message

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  // Menu Data
  const menuItems = [
    {
      title: "Men",
      slug: "men",
      links: [
        { title: "T-Shirts", href: "/categories/men-t-shirt" },
        { title: "Shirts", href: "/categories/men-shirt" },
        { title: "Hoodies", href: "/categories/men-hoodies" },
        { title: "Jeans", href: "/categories/men-jeans" },
        { title: "Leather Jackets", href: "/categories/leather-jackets" },
        { title: "Tracksuits", href: "/categories/men-tracksuits" },
        { title: "Shalwar Qameez", href: "/categories/male-shalwar-qameez" },
      ],
    },
    {
      title: "Women",
      slug: "women",
      links: [
         { title: "T-Shirts", href: "/categories/women-t-shirt" },
        { title: "Shirts", href: "/categories/women-shirt" },
        { title: "Hoodies", href: "/categories/women-hoodies" },
        { title: "Jeans", href: "/categories/women-jeans" },
        { title: "Leather Jackets", href: "/categories/leather-jackets" },
        { title: "Tracksuits", href: "/categories/women-tracksuits" },
        { title: "Women Dress", href: "/categories/women-western-dress" },
        { title: "Tops", href: "/categories/women-tops" },
        { title: "Leggings", href: "/categories/women-leggings" },
        { title: "Shalwar Qameez", href: "/categories/female-shalwar-qameez" },
        { title: "Abaya", href: "/categories/abaya" },
      ],
    },
    {
      title: "Accessories",
      slug: "accessories",
      links: [
        { title: "Caps", href: "/categories/caps" },
        { title: "Hats", href: "/categories/hats" },
        { title: "Bed sheets", href: "/categories/bed-sheets" },
        { title: "Sofa covers", href: "/categories/sofa-covers" },
        { title: "Belts", href: "/categories/belts" },
        { title: "Wallets", href: "/categories/wallets" },
        { title: "Men UnderWear", href: "/categories/men-underwear" },
        { title: "Women UnderWear", href: "/categories/women-underwear" },
      ],
    },
  ];

  const toggleDropdown = (slug) => {
    setOpenDropdown(openDropdown === slug ? null : slug);
  };

  return (
    <nav
      className={`momo sticky top-0 w-full z-50 transition-colors duration-300
      ${isHome ? "bg-[#FCF6F5] text-black" : "bg-black text-white  border-b"} 
    `}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
         <Link href={"/"}>
          <span className="font-bold text-xl momo">RuggedMuseCollection</span>
         </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-[14px]">
            {menuItems.map((item) => (
              <div key={item.slug} className="relative">
                <button
                  onClick={() => toggleDropdown(item.slug)}
                  className="hover:text-gray-300 flex items-center gap-1 transition"
                >
                  {item.title}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === item.slug ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Desktop Dropdown */}
                <div
                  className={`absolute left-0 mt-2 w-40 bg-white text-black border rounded shadow-lg
                  transition-all duration-300 overflow-hidden
                  ${
                    openDropdown === item.slug
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {item.links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            
            <Link href={url} target="_blank" className="hover:text-gray-300 transition">Contact</Link>

            {/* CART ICON (Desktop) */}
             <Link
          href="/cart"
          className="cabin flex items-center justify-center relative hover:text-gray-600 transition"
        >
          {/* Cart Icon */}
          <ShoppingCart size={22} />

          {/* Cart Count Badge */}
          {isLoaded && cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Link>
          </div>

          {/* MOBILE: Cart + Hamburger */}
          <div className="md:hidden flex items-center gap-4">
            
            {/* Cart Icon */}
               <Link
          href="/cart"
          className="cabin flex items-center justify-center relative hover:text-gray-600 transition"
        >
          {/* Cart Icon */}
          <ShoppingCart size={22} />

          {/* Cart Count Badge */}
          {isLoaded && cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`${isHome ? "text-black" : "text-white"}`}
            >
              {isMobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white text-black border-t transition-all duration-300 overflow-hidden
        ${isMobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        <Link href="/" className="block px-4 py-2 hover:bg-gray-100">
          Home
        </Link>

        {/* Mobile Dropdowns */}
        {menuItems.map((item) => (
          <div key={item.slug}>
            <button
              onClick={() => toggleDropdown(item.slug)}
              className="w-full px-4 py-2 text-left flex justify-between items-center hover:bg-gray-100"
            >
              {item.title}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  openDropdown === item.slug ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

           <div
  className={`transition-all duration-300 overflow-hidden
  ${openDropdown === item.slug ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
`}
>
              {item.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block px-8 py-2 hover:bg-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}

        
        <Link href={url} target="_blank" className="block px-4 py-2 hover:bg-gray-100">Contact</Link>
      </div>
    </nav>
  );
}
