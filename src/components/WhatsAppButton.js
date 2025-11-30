"use client";


import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "+923248912969"; // replace with your WhatsApp number
  const message = "Hello, I'm interested in your products!"; // default message

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-full shadow-lg hover:bg-black hover:text-white transition-all z-50"
    >
      <FaWhatsapp size={28} />
    </Link>
  );
}
