import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Facebook, Linkedin, Mail, MapPin, Phone, ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "./theme-provider";
import logo1 from "../assets/Logo1.png";
import logo2 from "../assets/Logo2.png";

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/heptagon", label: "Facebook" },
  { Icon: WhatsAppIcon, href: "https://wa.me/94714144147", label: "WhatsApp" },
  { Icon: Mail, href: "mailto:contact@heptagon.lk", label: "Email" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/heptagon-software-solutions/", label: "LinkedIn" },
];

const navLinks = ["Home", "About Us", "Services", "Portfolio", "Contact"];

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative pt-12 pb-6 px-4 md:px-12 dark:bg-zinc-900 bg-gray-100 border-t dark:border-white/5 overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-orange-900/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="footer-col">
            <div className="mb-3">
              {theme === "light"
                ? <img src={logo1} alt="Heptagon" className="w-36" />
                : <img src={logo2} alt="Heptagon" className="w-20 brightness-0 invert" />}
            </div>
            <p className="dark:text-gray-400 text-gray-500 text-sm leading-relaxed mb-4">
              Leave it us we make it happen.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 flex items-center justify-center dark:text-gray-400 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-transparent hover:-translate-y-0.5 transition-all duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4 className="dark:text-white text-gray-900 text-sm font-bold mb-4 flex items-center gap-2">
              Explore <span className="h-0.5 w-5 bg-orange-500 rounded-full inline-block" />
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="group flex items-center dark:text-gray-400 text-gray-500 hover:text-orange-500 transition-colors text-xs font-semibold uppercase tracking-wider">
                    <ChevronRight size={12} className="mr-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="dark:text-white text-gray-900 text-sm font-bold mb-4 flex items-center gap-2">
              Contact <span className="h-0.5 w-5 bg-orange-500 rounded-full inline-block" />
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 group">
                <Phone size={14} className="mt-0.5 shrink-0 text-orange-500" />
                <div>
                  <a href="tel:+94706145157" className="block dark:text-gray-300 text-gray-700 hover:text-orange-500 transition-colors font-medium">(+94) 70 614 5157</a>
                  <a href="tel:+94714144147" className="block dark:text-gray-300 text-gray-700 hover:text-orange-500 transition-colors font-medium">(+94) 71 414 4147</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-orange-500" />
                <a href="mailto:info@heptagon.lk" className="dark:text-gray-300 text-gray-700 hover:text-orange-500 transition-colors font-medium">info@heptagon.lk</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-orange-500" />
                <a href="https://maps.app.goo.gl/FpgRiQeXnGjLrWfz6" target="_blank" rel="noopener noreferrer"
                  className="dark:text-gray-300 text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="footer-col">
            <h4 className="dark:text-white text-gray-900 text-sm font-bold mb-4 flex items-center gap-2">
              Our Location <span className="h-0.5 w-5 bg-orange-500 rounded-full inline-block" />
            </h4>
            <div className="rounded-xl overflow-hidden border dark:border-white/10 border-black/10">
              <iframe
                src="https://maps.google.com/maps?q=Heptagon+Software+Solutions+Sri+Lanka&output=embed&z=15"
                width="100%"
                height="160"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Heptagon Location"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t dark:border-white/5 border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="dark:text-gray-500 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            © 2025 Heptagon. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="dark:text-gray-500 text-gray-400 hover:text-orange-500 text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="dark:text-gray-500 text-gray-400 hover:text-orange-500 text-[10px] font-bold uppercase tracking-widest transition-colors">Terms</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 dark:text-gray-400 text-gray-500 hover:text-orange-500 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-widest">Top</span>
              <div className="w-7 h-7 rounded-full border dark:border-white/10 border-black/10 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                <ArrowRight size={12} className="-rotate-90" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
