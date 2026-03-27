import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import { useTheme } from "./components/theme-provider";
import Roadmap from "./components/RoadMap";
import MeetTheCrew from "./components/MeetTheCrew";
import Careers from "./components/Careers";
import LogoLoopComponent from "./components/LogoLoopComponent";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



/* ─── Main App component ─── */
const App: React.FC = () => {
  const { theme } = useTheme();
  const [pathname, setPathname] = useState(window.location.pathname);
  const mainRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Keep pathname in sync
  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const isProjectsPage = pathname === "/projects";
  const isCrewPage = pathname === "/meet-the-crew";
  const isCareersPage = pathname === "/careers";

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);



  /* ── Refresh ScrollTriggers on each page change ── */
  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("portfolio-scroll-ready"));
    };

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((elem: any) => {
        gsap.from(elem, {
          y: 80,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      gsap.to(".bg-dimmer", {
        opacity: 0.85,
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
    }, mainRef);

    const timer = window.setTimeout(refresh, 200);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);
  return (
    <>
      <div
        ref={mainRef}
        className={`relative w-full selection:bg-orange-500 selection:text-white ${theme === "light" ? "bg-white text-gray-900" : "bg-[#050505] text-white"
          }`}
      >
        <div
          ref={progressBarRef}
          className="fixed top-0 left-0 h-1 bg-orange-gradient z-[100] w-full origin-left scale-x-0"
        />

        <div
          className={`bg-dimmer fixed inset-0 pointer-events-none z-0 opacity-0 ${theme === "light" ? "bg-white" : "bg-black"
            }`}
        />

        <Navbar />

        <main className="relative z-10">
          {isCrewPage ? (
            <MeetTheCrew />
          ) : isProjectsPage ? (
            <Projects />
          ) : isCareersPage ? (
            <Careers />
          ) : (
            <>
              <Hero />
              <About />
              <Brands />
              <Roadmap />
              <Services />
              <Process />
              <LogoLoopComponent />
              <Portfolio />
              <Experience />
              <Testimonials />
              <ContactCTA />
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
