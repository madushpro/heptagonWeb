import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import logo1 from "../assets/Logo1.png";
import logo2 from "../assets/Logo2.png";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 md:pt-32 pb-12 px-4 md:px-12 dark:bg-[#090e14] bg-gray-100 transition-colors duration-500 overflow-hidden border-t dark:border-white/5"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24">
          <div className="footer-col lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              {theme === "light" ? (
                <img src={logo1} alt="" className="w-44" />
              ) : (
                <img
                  src={logo2}
                  alt=""
                  className="w-24 filter brightness-0 invert"
                />
              )}
            </div>
            <p className="dark:text-gray-400 text-gray-500 leading-relaxed text-base md:text-lg mb-8 md:mb-10 max-w-sm font-medium">
              Constructing superior digital ecosystems through our seven core
              principles of software engineering excellence.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-xl dark:bg-white/5  bg-black/5 border dark:border-white/10  border-black/5 flex items-center justify-center dark:text-gray-400  text-gray-600 hover:bg-orange-gradient hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col lg:col-span-2">
            <h4 className="dark:text-white  text-gray-900 text-lg font-bold mb-8 flex items-center">
              Explore
              <div className="ml-3 h-1 w-6 bg-orange-gradient rounded-full" />
            </h4>
            <ul className="space-y-4">
              {["Home", "About Us", "Services", "Portfolio", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      className="group flex items-center dark:text-gray-400  text-gray-500 hover:text-orange-500 transition-colors duration-300 font-bold tracking-wide uppercase text-[11px]"
                    >
                      <ChevronRight
                        size={14}
                        className="mr-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500"
                      />
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="footer-col lg:col-span-3">
            <h4 className="dark:text-white  text-gray-900 text-lg font-bold mb-8 flex items-center">
              Get In Touch
              <div className="ml-3 h-1 w-6 bg-orange-gradient rounded-full" />
            </h4>
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-full dark:bg-white/5  bg-black/5 flex items-center justify-center mr-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                    Call Us
                  </p>
                  <a
                    href="tel:+11234567890"
                    className="dark:text-white  text-gray-800 font-bold hover:text-orange-500 transition-colors"
                  >
                    +1 123 456 7890
                  </a>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-full dark:bg-white/5  bg-black/5 flex items-center justify-center mr-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                    Email Us
                  </p>
                  <a
                    href="mailto:hello@heptagon.ai"
                    className="dark:text-white  text-gray-800 font-bold hover:text-orange-500 transition-colors"
                  >
                    hello@heptagon.ai
                  </a>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-10 h-10 rounded-full dark:bg-white/5  bg-black/5 flex items-center justify-center mr-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                    Visit Us
                  </p>
                  <p className="dark:text-white  text-gray-800 font-bold">
                    421 Allen St, San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-col lg:col-span-3">
            <h4 className="dark:text-white  text-gray-900 text-lg font-bold mb-8 flex items-center">
              Stay Connected
              <div className="ml-3 h-1 w-6 bg-orange-gradient rounded-full" />
            </h4>
            <p className="dark:text-gray-400  text-gray-500 text-sm mb-6 leading-relaxed font-semibold">
              Subscribe to the Heptagon newsletter for the latest in scalable
              architecture.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Work Email"
                className="w-full dark:bg-white/5  bg-black/5 border dark:border-white/10  border-black/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-orange-500 focus:bg-white/10 dark:text-white  text-gray-900 transition-all duration-300"
              />
              <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-orange-gradient rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t dark:border-white/5  border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <p className="dark:text-gray-500  text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              © 2025 Heptagon Systems. Designed for Scale.
            </p>
            <div className="flex space-x-8">
              <a
                href="#"
                className="dark:text-gray-500  text-gray-400 hover:text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="dark:text-gray-500  text-gray-400 hover:text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
              >
                Terms
              </a>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center space-x-3 dark:text-gray-400  text-gray-500 hover:text-orange-500 transition-colors"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Back to Top
            </span>
            <div className="w-10 h-10 rounded-full border dark:border-white/10  border-black/10 flex items-center justify-center group-hover:border-orange-500 transition-colors">
              <ArrowRight size={16} className="-rotate-90" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
