import React, { useState } from "react";
import { Search, Menu, ArrowRight } from "lucide-react";
import logo1 from "../assets/Logo1.png";
import logo2 from "../assets/Logo2.png";
import ModeToggle from "./mode-toggle";
import { useTheme } from "./theme-provider";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about-us" },
  { label: "Our Service", id: "our-service" },
  { label: "Our Work", id: "our-work" },
  { label: "Contact", id: "contact" },
];

const PAGE_LINKS = [
  { label: "Meet The Crew", href: "/meet-the-crew" },
];

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (id: string) => {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    scrollToSection(id);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const match = NAV_ITEMS.find((item) =>
      item.label.toLowerCase().includes(query),
    );
    if (!match) return;

    handleNavClick(match.id);
    setSearchQuery("");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 md:py-4 px-3 sm:px-4 md:px-12 flex items-center justify-between border-zinc-100 backdrop-blur-xl shadow-sm">
      <button
        type="button"
        onClick={() => handleNavClick("home")}
        className="flex items-center space-x-2 group cursor-pointer"
      >
        {theme === "light" ? (
          <img src={logo1} alt="" className="w-24" />
        ) : (
          <img src={logo2} alt="" className="w-24" />
        )}
      </button>

      <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-xs dark:text-zinc-400 text-zinc-600 font-semibold tracking-[0.2em]">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavClick(item.id)}
            className="hover:text-orange-500 transition-colors"
          >
            {item.label}
          </button>
        ))}
        {PAGE_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-orange-500 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center space-x-4 relative">
        <ModeToggle />

        {/* <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setSearchOpen((prev: any) => !prev)}
            className="flex items-center justify-center w-10 h-10 dark:text-zinc-400 text-zinc-600 hover:text-orange-500 transition-colors"
            aria-label="Toggle section search"
          >
            <Search size={20} />
          </button>

          {searchOpen && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border dark:border-white/10 border-zinc-200 dark:bg-[#0a0a0a] bg-white p-2 shadow-2xl">
              <div className="flex items-center gap-2">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search section..."
                  className="w-full px-3 py-2 rounded-xl text-sm dark:bg-white/5 bg-zinc-100 dark:text-white text-zinc-800 outline-none"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="px-3 py-2 rounded-xl bg-orange-gradient text-white text-xs font-bold uppercase tracking-wide"
                >
                  Go
                </button>
              </div>
            </div>
          )}
        </div> */}

        <button
          type="button"
          onClick={() => handleNavClick("contact")}
          className="hidden bg-orange-gradient hover:scale-105 transition-all text-white px-7 py-3 rounded-full lg:flex items-center space-x-2 text-xs font-black shadow-lg shadow-orange-600/30 tracking-widest"
        >
          <span>Initialize</span>
          <ArrowRight size={16} />
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden p-2 dark:text-zinc-400 text-zinc-600"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="absolute top-full left-4 right-4 mt-3 lg:hidden rounded-2xl border dark:border-white/10 border-zinc-200 dark:bg-[#0a0a0a] bg-white p-4 shadow-2xl"
        >
          <div className="flex flex-col gap-3 text-xs font-black tracking-[0.2em]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="text-left dark:text-zinc-300 text-zinc-700 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
            {PAGE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-left dark:text-zinc-300 text-zinc-700 hover:text-orange-500 transition-colors text-xs font-black tracking-[0.2em]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="mt-2 w-full bg-orange-gradient text-white px-5 py-3 rounded-xl text-xs font-black tracking-widest"
            >
              Initialize
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
