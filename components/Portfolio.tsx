import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "./projectsData";

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const scrollWrapper = containerRef.current;
        if (!scrollWrapper || !sectionRef.current) return;

        const getScrollAmount = () => {
          const wrapperWidth = scrollWrapper.scrollWidth;
          return -(wrapperWidth - window.innerWidth);
        };

        const tween = gsap.to(scrollWrapper, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWrapper.scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray(".project-card").forEach((card: any) => {
          gsap.fromTo(
            card.querySelector("img"),
            { scale: 1.2 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        const refreshAfterSetup = window.setTimeout(() => {
          ScrollTrigger.refresh();
          window.dispatchEvent(new Event("portfolio-scroll-ready"));
        }, 80);

        const refreshOnLoad = () => {
          ScrollTrigger.refresh();
          window.dispatchEvent(new Event("portfolio-scroll-ready"));
        };
        window.addEventListener("load", refreshOnLoad);

        return () => {
          window.clearTimeout(refreshAfterSetup);
          window.removeEventListener("load", refreshOnLoad);
        };
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="dark:bg-[#070a0e] bg-[#f8f8f8] overflow-hidden transition-colors duration-500 dark:border-y dark:border-white/5"
      id="our-work"
    >
      <div className="py-16 md:py-0 md:h-screen flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-12 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                Selected Works
              </span>
              <h2 className="text-4xl md:text-8xl font-black tracking-tighter dark:text-white text-gray-900">
                Latest <span className="text-orange-gradient">Innovations</span>
              </h2>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:block text-right">
                <p className="dark:text-gray-500  text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">
                  Navigation
                </p>
                <p className="dark:text-white  text-gray-600 text-xs font-medium">
                  Scroll to explore projects
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border dark:border-white/10  border-black/10 flex items-center justify-center animate-bounce">
                <ArrowRight
                  size={18}
                  className="rotate-90 md:rotate-0 dark:text-white  text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden px-4 space-y-6">
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={`/projects#${p.id}`}
              className="group relative block overflow-hidden rounded-[2rem] h-80 dark:bg-[#0a0a0a] bg-white border dark:border-white/5 border-black/5 shadow-sm"
            >
              <img
                src={p.img}
                className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                alt={p.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/20 dark:to-transparent from-white via-white/20 to-transparent opacity-80" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <span className="text-orange-500 text-xs font-black mb-2 block tracking-widest">
                  PROJECT 0{i + 1}
                </span>
                <h3 className="text-2xl font-black tracking-tight leading-tight max-w-[85%] dark:text-white text-gray-900">
                  {p.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        <div
          ref={containerRef}
          className="hidden md:flex items-center h-[70vh] w-fit px-4 md:px-12 gap-6 md:gap-12 will-change-transform"
        >
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={`/projects#${p.id}`}
              className="project-card group relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] w-[85vw] md:w-[550px] h-full flex-shrink-0 dark:bg-[#0a0a0a]  bg-white border dark:border-white/5  border-black/5 shadow-sm"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={p.img}
                  className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0"
                  alt={p.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/20 dark:to-transparent  from-white  via-white/20  to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                  <span className="dark:bg-white/10  bg-black/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border dark:border-white/10  border-black/10 dark:text-white  text-gray-900">
                    {p.cat}
                  </span>
                  <div className="w-12 h-12 bg-orange-gradient rounded-full flex items-center justify-center shadow-xl shadow-orange-600/40 text-white">
                    <ArrowUpRight size={20} strokeWidth={3} />
                  </div>
                </div>

                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-orange-500 text-xs font-black mb-2 block tracking-widest">
                    PROJECT 0{i + 1}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-none max-w-[80%] dark:text-white  text-gray-900">
                    {p.title}
                  </h3>
                  <div className="mt-6 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                    <div className="h-px w-8 bg-orange-500"></div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] dark:text-gray-400  text-gray-500">
                      View Case Study
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}

          <div className="flex-shrink-0 w-[85vw] md:w-[550px] h-full flex items-center justify-center px-12 text-center">
            <div className="max-w-xs">
              <div className="w-20 h-20 dark:bg-white/5  bg-black/5 rounded-full flex items-center justify-center mx-auto mb-8 border dark:border-white/10  border-black/10">
                <ArrowRight size={32} className="text-orange-500" />
              </div>
              <h4 className="text-3xl font-black mb-4 dark:text-white  text-gray-900">
                Your Next Big{" "}
                <span className="text-orange-gradient">Idea?</span>
              </h4>
              <p className="dark:text-gray-500  text-gray-600 text-sm mb-8 leading-relaxed font-medium">
                Let's collaborate to build something that disrupts the market.
              </p>
              <button className="bg-orange-gradient w-full py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl shadow-orange-600/20 text-white">
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
