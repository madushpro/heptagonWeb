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

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
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

          gsap.set(videoWrapperRef.current, {
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            borderRadius: 0,
            opacity: 1,
            transformOrigin: "50% 50%",
          });

          gsap.set(contentRef.current, {
            xPercent: 0,
            y: 0,
            autoAlpha: 1,
          });

          if (reduce) return;

          if (desktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=50%",
                scrub: 1.1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
              defaults: { ease: "none" },
            });

            tl.to(videoWrapperRef.current, {
              scale: 0.8,
              borderRadius: 32,
              duration: 1,
            });

            tl.from(contentRef.current, { y: 18, duration: 0.8 }, 0);

            // tl.to(videoWrapperRef.current, {
            //   xPercent: 18,
            //   scale: 0.86,
            //   duration: 1.3,
            // });

            // tl.to(contentRef.current, { xPercent: -28, duration: 1.3 }, "<");

            // tl.to(videoWrapperRef.current, { yPercent: -2, duration: 0.5 });

            return () => {
              tl.scrollTrigger?.kill();
              tl.kill();
            };
          }

          const intro = gsap.fromTo(
            contentRef.current,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
          );

          return () => intro.kill();
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
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
          ref={videoWrapperRef}
          className="absolute inset-0 overflow-hidden will-change-transform"
        >
          {/* <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-90 dark:opacity-75"
          /> */}

          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            // poster={heroBg}
            className="absolute inset-0 h-full w-full object-cover opacity-70 dark:opacity-60 motion-reduce:hidden"
          >
            <source src={v1} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/35 to-black/70 dark:from-black/55 dark:via-black/55 dark:to-black/80" />
        </div>

        <div
          ref={contentRef}
          className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 will-change-transform"
        >
          <div className="max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Premium software studio
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight leading-[0.95] text-white sm:text-6xl md:text-7xl">
              Heptagon builds <span className="text-orange-500">fast</span>{" "}
              products people love.
            </h1>

            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg">
              Strategy, design, and engineering—end to end. From MVPs to
              enterprise platforms, we ship with speed and craft.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-600/25 transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 sm:w-auto"
              >
                Start your project
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#our-work"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:w-auto"
              >
                View our work
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-white/50 md:justify-start">
              <span className="h-px w-10 bg-white/25" />
              Scroll to explore
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
