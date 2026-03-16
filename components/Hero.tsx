import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import v1 from "../assets/v1.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", // Slightly longer end for smoother pacing
          scrub: 1.2,
          pin: true,
          anticipatePin: 1, // Prevents a slight jump when pinning starts
        },
        // CRITICAL: Linear easing inside scrub timelines creates the smoothest feel
        defaults: { ease: "none" },
      });

      // Phase 1: Video slightly scales and rounds corners
      tl.fromTo(
        videoWrapperRef.current,
        { scale: 1, borderRadius: "0px", opacity: 0.5 },
        { scale: 0.85, borderRadius: "24px", duration: 1, opacity: 1 },
      );

      // Phase 2: Text fade + subtle vertical move
      tl.fromTo(
        contentRef.current,
        { opacity: 1, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        "<0.2", // Starts just after the video scaling begins
      );

      // Phase 3: Split layout using vw units for reliable screen-relative movement
      tl.to(
        videoWrapperRef.current,
        { x: "20vw", scale: 0.85, duration: 1.5 },
        ">", // Wait for previous phases to mostly finish
      );

      tl.to(
        contentRef.current,
        { x: "-25vw", duration: 1.5 }, // Pushes text much further left
        "<", // Sync with video movement
      );

      // Phase 4: Subtle parallax hold at the end
      tl.to(videoWrapperRef.current, { y: "-2%", duration: 0.5 }, ">");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-white dark:bg-zinc-900 pt-24"
    >
      {/* REMOVED: "sticky top-0" - ScrollTrigger handles the pinning natively */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Video Wrapper */}
        {/* ADDED: will-change-transform to force GPU acceleration */}
        <div
          ref={videoWrapperRef}
          className="absolute w-full h-full overflow-hidden rounded-lg will-change-transform"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={v1} type="video/mp4" />
          </video>
        </div>

        {/* Content Wrapper */}
        <div
          ref={contentRef}
          className="absolute max-w-2xl px-6 opacity-0 md:text-left will-change-transform z-10"
        >
          <h1 className="text-6xl sm:text-7xl md:text-5xl font-extrabold tracking-tight leading-[0.9] text-black dark:text-white">
            heptagon
          </h1>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] mt-2">
            <span className="text-orange-500 uppercase">We Make</span>{" "}
            <span className="text-black dark:text-white uppercase">
              It Happen
            </span>
          </h2>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">
              Start Your Project
            </button>

            <button className="px-6 py-3 border border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 dark:hover:bg-zinc-800 transition">
              View Our Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import v1 from "../assets/v1.mp4";

// gsap.registerPlugin(ScrollTrigger);

// const Hero: React.FC = () => {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLDivElement>(null);
//   const videoContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!heroRef.current) return;

//     const ctx = gsap.context(() => {
//       // 1. Clean, snappy load animation for the text
//       gsap.fromTo(
//         textRef.current?.children ? Array.from(textRef.current.children) : [],
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           stagger: 0.1,
//           ease: "power3.out",
//         },
//       );

//       // 2. The Video Scale-Up Effect (No pinning, no scroll-jacking)
//       // As you scroll down, the video container simply expands to fill the view
//       gsap.fromTo(
//         videoContainerRef.current,
//         {
//           scale: 0,
//           borderRadius: "32px",
//           y: 70, // Starts slightly lower
//         },
//         {
//           scale: 2,
//           borderRadius: "0px", // Expands to sharp corners
//           y: 0,
//           ease: "none",
//           scrollTrigger: {
//             trigger: videoContainerRef.current,
//             start: "top bottom", // Starts animating when the top of the video hits the bottom of the screen
//             end: "top 20%", // Finishes when the video is near the top
//             scrub: true,
//           },
//         },
//       );
//     }, heroRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={heroRef}
//       className="relative w-full bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center"
//     >
//       {/* TEXT SECTION: Centered, highly readable, no overlapping elements */}
//       <div
//         ref={textRef}
//         className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mb-16"
//       >
//         <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-3 py-1.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-8">
//           <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
//           Enterprise-Grade Software
//         </div>

//         <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
//           Build better software, <br />
//           <span className="text-orange-500">faster.</span>
//         </h1>

//         <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10">
//           We engineer scalable, secure, and beautiful digital solutions that
//           help ambitious companies modernize and grow.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//           <button className="rounded-lg bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 shadow-lg shadow-orange-500/30 w-full sm:w-auto">
//             Book a Consultation
//           </button>
//           <button className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-8 py-4 text-base font-semibold text-zinc-900 dark:text-white transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full sm:w-auto">
//             Explore Services
//           </button>
//         </div>
//       </div>

//       {/* VIDEO SECTION: Sits below the text, expands naturally on scroll */}

//       <div className="w-full max-w-6xl px-4 md:px-8">
//         <div
//           ref={videoContainerRef}
//           className="relative w-full aspect-video overflow-hidden shadow-2xl bg-zinc-900"
//         >
//           {/* Subtle overlay to make the video look like a sleek product presentation */}
//           <div className="absolute inset-0 border border-white/10 z-10 rounded-inherit pointer-events-none"></div>

//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//           >
//             <source src={v1} type="video/mp4" />
//           </video>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
