import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "./theme-provider";

const ContactCTA: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-text", {
        x: -200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".cta-reveal", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 px-4 md:px-12 overflow-hidden dark:bg-[#050505]  bg-white transition-colors duration-500"
    >
      <div className="max-w-[1600px] mx-auto relative rounded-[4rem] dark:bg-[#0a0a0a]  bg-[#f3f4f6] border dark:border-white/5  border-black/5 h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 blur-[150px] rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 mix-blend-overlay dark:bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]  bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap opacity-[0.05] select-none pointer-events-none">
          <span
            className="parallax-text text-[20vw] font-black uppercase tracking-tighter"
            style={{
              WebkitTextStroke: theme === "dark" ? "2px white" : "2px black",
              color: "transparent",
            }}
          >
            NEXT GEN SOFTWARE NEXT GEN SOFTWARE
          </span>
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="cta-reveal mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 text-orange-500 text-xs font-bold uppercase tracking-widest">
              Ready to scale?
            </span>
          </div>

          <h2
            ref={textRef}
            className="cta-reveal text-5xl md:text-9xl font-black mb-16 tracking-tighter leading-[0.9] dark:text-white  text-gray-900"
          >
            HAVE A PROJECT <br />
            <span className="text-orange-gradient">IN MIND?</span>
          </h2>

          <div className="cta-reveal flex justify-center">
            <div
              ref={circleRef}
              className="relative group cursor-pointer w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 max-w-full"
            >
              <div className="absolute inset-0 animate-[spin_12s_linear_infinite] [animation-play-state:running] group-hover:[animation-play-state:paused]">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full overflow-visible"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
                    fill="transparent"
                  />
                  <text className="text-[7px] sm:text-[9px] font-bold uppercase tracking-[1.5px] dark:fill-white/40 fill-gray-500">
                    <textPath href="#circlePath">
                      START YOUR PROJECT NOW WORK WITH HEPTAGON
                    </textPath>
                  </text>
                </svg>
              </div>

              <button className="absolute inset-3 sm:inset-4 rounded-full bg-orange-gradient flex flex-col items-center justify-center text-white shadow-2xl shadow-orange-600/50 group-hover:scale-105 transition-transform duration-500">
                <ArrowUpRight
                  size={32}
                  strokeWidth={3}
                  className="group-hover:rotate-45 transition-transform duration-500"
                />
                <span className="font-black text-[8px] sm:text-[10px] uppercase tracking-widest mt-1 sm:mt-2">
                  Get in touch
                </span>
              </button>

              <div className="pointer-events-none absolute -inset-1 sm:-inset-2 rounded-full border border-orange-500/0 group-hover:border-orange-500/20 group-hover:scale-110 transition-all duration-700"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 hidden md:block text-left cta-reveal">
          <p className="dark:text-gray-500  text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            Global HQ
          </p>
          <p className="dark:text-white  text-gray-700 text-xs font-semibold">
            421 Allen St, Suite 400
            <br />
            San Francisco, CA
          </p>
        </div>

        <div className="absolute bottom-12 right-12 hidden md:block text-right cta-reveal">
          <p className="dark:text-gray-500  text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            Contact
          </p>
          <p className="dark:text-white  text-gray-700 text-xs font-semibold">
            hello@heptagon.ai
            <br />
            +1 123 456 7890
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
