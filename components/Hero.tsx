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
          end: "+=200%", // Slightly longer end for smoother pacing
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
        { scale: 1, borderRadius: "0px" },
        { scale: 0.85, borderRadius: "24px", duration: 1 },
      );

      // Phase 2: Text fade + subtle vertical move
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        "<0.2", // Starts just after the video scaling begins
      );

      // Phase 3: Split layout using vw units for reliable screen-relative movement
      tl.to(
        videoWrapperRef.current,
        { x: "20vw", scale: 0.8, duration: 1.5 },
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
      className="relative h-screen w-full overflow-hidden bg-white dark:bg-zinc-900"
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
          className="absolute max-w-xl px-6 opacity-0 md:text-left will-change-transform z-10"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[0.9] text-black dark:text-white drop-shadow-md">
            We Make It
            <span className="block text-orange-500 uppercase ">Happen</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-300 drop-shadow-sm">
            Scalable, secure and beautifully engineered digital solutions for
            ambitious businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
