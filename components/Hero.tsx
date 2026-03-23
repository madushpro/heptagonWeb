import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import v1 from "../assets/v1.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia(sectionRef);

    mm.add(
      {
        desktop: "(min-width: 768px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduce } = context.conditions as {
          desktop: boolean;
          reduce: boolean;
        };

        if (reduce) return;

        if (desktop) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=150%", // Increased distance so it doesn't zip past
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              snap: {
                snapTo: 1, // Snaps to the end of the animation
                duration: { min: 0.5, max: 1.2 },
                delay: 0,
                ease: "power1.inOut",
              },
            },
          });

          // Text disappears
          tl.to(
            contentRef.current,
            {
              autoAlpha: 0,
              y: -100,
              duration: 0.4,
            },
            0,
          );

          // Video animation (Scale down and round corners)
          tl.to(
            videoWrapperRef.current,
            {
              scale: 0.8,
              borderRadius: 48,
              duration: 1,
            },
            0,
          );

          // Add a small pause at the end of the timeline to "hold" the state
          tl.to({}, { duration: 0.2 });
        }
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden bg-white dark:bg-[#050505]"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />
        <div className="absolute -bottom-24 right-1/4 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      <div className="relative h-[100svh] min-h-[640px] w-full pt-24">
        {/* Media */}
        <div
          // ref={videoWrapperRef}
          className="absolute inset-0 overflow-hidden will-change-transform"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover dark:opacity-60 motion-reduce:hidden"
          >
            <source src={v1} type="video/mp4" />
          </video>

          {/* <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/35 to-black/70 dark:from-black/55 dark:via-black/55 dark:to-black/80" /> */}
        </div>

        <div
          ref={contentRef}
          className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 will-change-transform"
        >
          <div className="max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500 bg-white/20  px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-500 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 " />
              heptagon
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight leading-[0.95] text-white sm:text-6xl md:text-7xl">
              We Make <span className="text-orange-500">It</span>
              <br />
              Happen
            </h1>

            {/* <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-neutral-400 sm:text-lg">
              Strategy, design, and engineering end to end. <br /> From MVPs to
              enterprise platforms, we ship with speed and craft.
            </p> */}

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 py-3.5 text-sm font-bold 
                text-white shadow-xl shadow-orange-600/25 transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-orange-400/60 sm:w-auto"
              >
                Start your project
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#our-work"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-orange-500 bg-white/5 px-7 py-3.5 
                text-sm font-bold text-orange-500 backdrop-blur-xl transition-all duration-300  hover:shadow-xl hover:shadow-orange-500/25 active:scale-[0.98] 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:w-auto"
              >
                View our work
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400 md:justify-start">
              <span className="h-px w-10 bg-neutral-400" />
              Scroll to explore
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
