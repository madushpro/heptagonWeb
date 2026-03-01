import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import News from "./components/News";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import ThreeBackground from "./components/ThreeBackground";
import Projects from "./components/Projects";
import { useTheme } from "./components/theme-provider";
import Roadmap from "./components/RoadMap";
import MeetTheCrew from "./components/MeetTheCrew";
import Careers from "./components/Careers";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const { theme } = useTheme();
  const isProjectsPage = window.location.pathname === "/projects";
  const isCrewPage = window.location.pathname === "/meet-the-crew";
  const isCareersPage = window.location.pathname === "/careers";
  const mainRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refreshScrollTriggers = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((elem: any) => {
        gsap.set(elem, { autoAlpha: 1, y: 0 });

        gsap.from(elem, {
          y: 100,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power4.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: elem,
            start: "top 90%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      gsap.to(".bg-dimmer", {
        opacity: 0.8,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, mainRef);

    const timer = window.setTimeout(refreshScrollTriggers, 120);
    window.addEventListener("load", refreshScrollTriggers);
    window.addEventListener("portfolio-scroll-ready", refreshScrollTriggers);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refreshScrollTriggers);
      window.removeEventListener(
        "portfolio-scroll-ready",
        refreshScrollTriggers,
      );
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className={`relative w-full selection:bg-orange-500 selection:text-white ${theme === "light" ? "bg-white text-gray-900" : "bg-[#050505] text-white"}`}
    >
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 bg-orange-gradient z-[100] w-full origin-left scale-x-0"
      />

      {/* <ThreeBackground /> */}

      <div
        className={`bg-dimmer fixed inset-0 pointer-events-none z-0 opacity-0 ${theme === "light" ? "bg-white" : "bg-black"}`}
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
            <Brands />
            <About />
            <Services />
            <Process />
            <Roadmap />
            <Portfolio />
            <Experience />
            <Testimonials />
            <News />
            <ContactCTA />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
