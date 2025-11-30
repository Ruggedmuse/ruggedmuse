import Link from "next/link";
import { ArrowRight, Apple, Play, Star, Mail } from "lucide-react";
import { FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";

const AppStoreButton = () => (
  <a
    href="#"
    aria-label="Download on the App Store"
    className="group flex w-[150px] items-center gap-2 rounded-md border border-white/50 px-3 py-2 transition-colors duration-300 hover:border-white"
  >
    <Apple className="h-7 w-7 text-white" />
    <div>
      <p className="text-[10px] font-light tracking-wider text-white/80 group-hover:text-white">
        Download on the
      </p>
      <p className="text-base font-medium leading-tight">App Store</p>
    </div>
  </a>
);

const GooglePlayButton = () => (
  <a
    href="#"
    aria-label="Get it on Google Play"
    className="group flex w-[150px] items-center gap-2 rounded-md border border-white/50 px-3 py-2 transition-colors duration-300 hover:border-white"
  >
    <Play className="h-6 w-6 text-white" fill="white" />
    <div>
      <p className="text-[10px] font-light tracking-wider text-white/80 group-hover:text-white">
        GET IT ON
      </p>
      <p className="text-base font-medium leading-tight">Google Play</p>
    </div>
  </a>
);

const PaymentIcons = () => {
  const Icon = ({ name }) => (
    <div className="flex h-6 items-center justify-center rounded-sm bg-white px-2 text-[10px] font-bold uppercase text-black">
      {name}
    </div>
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
      <Icon name="visa" />
      <Icon name="mastercard" />
      <Icon name="maestro" />
      <Icon name="amex" />
      <Icon name="klarna" />
      <Icon name="paypal" />
      <Icon name="apple pay" />
      <Icon name="gpay" />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full momo px-10">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <div className="border-b border-white/20 py-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="flex items-center gap-4 lg:col-span-4">
              <span className="text-xl font-medium tracking-widest">RuggedMuseCollection</span>
              <div>
                <p className="text-[5px] uppercase tracking-wider">
                  Sign up to our newsletter  for tailored offers
                </p>
                
              </div>
            </div>

           
            <form className="flex w-full lg:col-span-4">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full border border-r-0 border-white/50 bg-transparent px-4 text-xs tracking-wider placeholder:text-white/50 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center border border-white/50 px-4 transition-colors hover:bg-white/10"
              >
                <span className="mr-2 text-xs uppercase tracking-wider">
                  Submit
                </span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Main Links Section */}
        <div className="py-12">
          <div className="grid grid-cols-2 gap-8 text-xs md:grid-cols-4 lg:grid-cols-6">
            <div>
              <ul className="space-y-4 uppercase tracking-wider">
                <li><Link href="/western" className="hover:opacity-70">Western</Link></li>
                <li><Link href="/eastern" className="hover:opacity-70">Eastern</Link></li>
                <li><Link href="#" className="hover:opacity-70">Home Accessories</Link></li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4 uppercase tracking-wider">
                <li><Link href="/return" className="hover:opacity-70">Refund Policy</Link></li>
                <li><Link href="/return" className="hover:opacity-70">Returns Policy</Link></li>
                <li><Link href="/faq" className="hover:opacity-70">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4 uppercase tracking-wider">
                <li><Link href="#" className="hover:opacity-70">Instagram</Link></li>
                <li><Link href="#" className="hover:opacity-70">Tiktok</Link></li>
                <li><Link href="#" className="hover:opacity-70">Facebook</Link></li>
              </ul>
            </div>

            <div className="leading-relaxed tracking-normal text-white/70">
              <p>Sialkot</p>
              <p>Punjab, Pakistan</p>
              <br />
              <p>Mon-Fri: 11-7</p>
              <p>Sat: 10-7</p>
              <p>Sun: 12-6</p>
            </div>

            <div className="col-span-2 grid grid-cols-1 gap-8 md:col-span-4 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <h4 className="mb-4 text-xs uppercase tracking-wider">
                  Shop via the Whatsapp or Email
                </h4>
                <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col">
                  <FaWhatsapp size={25}/>
                  <Mail/>
                </div>
              </div>

              <div>
                <button className="flex items-center gap-2 text-white/70 hover:text-white">
                  <span className="text-xs uppercase tracking-wider">
                    Currency: 🇬🇧 GBP (£/GBP) or USD ($)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
            <div className="order-2 text-center md:order-1 md:text-left">
              <div className="text-xs uppercase tracking-wider text-white/50">
                <span>© RUGGEDMUSE {new Date().getFullYear()}</span>
                {" | "}
                <Link href="#" className="hover:text-white">Terms & Conditions</Link>
                {" | "}
                <Link href="#" className="hover:text-white">Privacy</Link>
              </div>
            </div>

            <div className="order-1 flex flex-col items-center gap-4 md:order-2 md:items-end">
              <PaymentIcons />

              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
                <span className="flex gap-0.5">
                  <Star size={14} fill="white" className="text-white" />
                  <Star size={14} fill="white" className="text-white" />
                  <Star size={14} fill="white" className="text-white" />
                  <Star size={14} fill="white" className="text-white" />
                  <Star size={14} fill="white" className="text-white" />
                </span>
                <span>Excellent 4.8 / 5</span>
              </div>

              <div className="text-xs uppercase tracking-wider text-white/50">
                Powered by Ahmed
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
