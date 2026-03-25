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
  const blurRef1 = useRef<HTMLDivElement>(null);
  const blurRef2 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia(sectionRef);

    mm.add(
      {
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, mobile, reduce } = context.conditions as {
          desktop: boolean;
          mobile: boolean;
          reduce: boolean;
        };

        if (reduce) return;

        // const tl = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: sectionRef.current,
        //     start: "top top",
        //     end: "+=100%", // Controlled scroll distance
        //     scrub: 1,
        //     pin: true,
        //     anticipatePin: 1,
        //   },
        // });

        // // 1. Text & Content Animation (Staggered exit)
        // tl.to(
        //   contentRef.current,
        //   {
        //     y: -100,
        //     autoAlpha: 0,
        //     scale: 0.95,
        //     duration: 0.6,
        //     ease: "power2.inOut",
        //   },
        //   0,
        // );

        // 2. Video Scaling & Radius (The core transition)
        // tl.to(
        //   videoWrapperRef.current,
        //   {
        //     scale: desktop ? 0.9 : 0.95,
        //     borderRadius: desktop ? 64 : 32,
        //     duration: 1,
        //     ease: "power2.inOut",
        //   },
        //   0,
        // );

        // 3. Parallax Background Blurs
        // if (blurRef1.current && blurRef2.current) {
        //   tl.to(
        //     blurRef1.current,
        //     {
        //       y: 200,
        //       x: 100,
        //       scale: 1.2,
        //       duration: 1,
        //       ease: "none",
        //     },
        //     0,
        //   ).to(
        //     blurRef2.current,
        //     {
        //       y: -150,
        //       x: -50,
        //       scale: 1.1,
        //       duration: 1,
        //       ease: "none",
        //     },
        //     0,
        //   );
        // }

        // 4. Subtle video zoom (inside the wrapper)
        // const videoElement = videoWrapperRef.current?.querySelector("video");
        // if (videoElement) {
        //   tl.to(
        //     videoElement,
        //     {
        //       scale: 1.1,
        //       duration: 1,
        //       ease: "power1.inOut",
        //     },
        //     0,
        //   );
        // }
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
        <div
          ref={blurRef1}
          className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]"
        />
        <div
          ref={blurRef2}
          className="absolute -bottom-24 right-1/4 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[160px]"
        />
      </div>

      <div className="relative h-[100svh] min-h-[640px] w-full pt-24">
        {/* Media */}
        <div
          ref={videoWrapperRef}
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
