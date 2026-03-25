import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
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

/* ─── Tour section config ─── */
const HOME_TOUR_SECTIONS = [
  { id: "home", label: "Hero" },
  { id: "about-us", label: "About Us" },
  { id: "roadmap", label: "Roadmap" },
  { id: "our-service", label: "Capabilities" },
  { id: "process", label: "Our Process" },
  { id: "our-work", label: "Portfolio" },
  { id: "experience", label: "Excellence" },
  { id: "testimonials", label: "Feedback" },
  { id: "contact", label: "Get in Touch" },
];

/* ─── Tour indicator pill ─── */
const TourPill: React.FC<{ label: string; step: number; total: number; onSkip: () => void }> = ({
  label,
  step,
  total,
  onSkip,
}) => (
  <div
    style={{
      position: "fixed",
      bottom: "2rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.8rem 1.4rem",
      borderRadius: "9999px",
      background: "rgba(5,5,5,0.92)",
      border: "1px solid rgba(249,115,22,0.5)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(249,115,22,0.15)",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
      fontSize: "0.75rem",
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      pointerEvents: "auto",
    }}
  >
    <div className="flex items-center gap-2 mr-1">
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#f97316",
          boxShadow: "0 0 10px #f97316",
          animation: "tour-blink 1s ease-in-out infinite",
        }}
      />
      <span style={{ color: "#f97316" }}>AUTOPILOT</span>
    </div>
    <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
    <span className="min-w-[120px] text-center font-bold">{label}</span>
    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem" }}>
      {step} / {total}
    </span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSkip();
      }}
      style={{
        marginLeft: "0.5rem",
        padding: "0.3rem 0.8rem",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff",
        fontSize: "0.65rem",
        fontWeight: 900,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#f97316";
        e.currentTarget.style.boxShadow = "0 0 15px rgba(249,115,22,0.4)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      EXIT
    </button>
  </div>
);

/* ─── Main App component ─── */
interface AppProps {
  autoTour?: boolean;
  onTourEnd?: () => void;
}

const App: React.FC<AppProps> = ({ autoTour = false, onTourEnd }) => {
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

  /* ── Tour state ── */
  const [tourActive, setTourActive] = useState(false);
  const [tourLabel, setTourLabel] = useState("");
  const [tourStep, setTourStep] = useState(1);
  const tourTween = useRef<gsap.core.Tween | null>(null);
  const tourSequenceId = useRef<number | null>(null);

  const endTour = () => {
    if (tourTween.current) tourTween.current.kill();
    if (tourSequenceId.current) clearTimeout(tourSequenceId.current);
    gsap.killTweensOf(window);
    setTourActive(false);
    onTourEnd?.();
  };

  const navigateTo = (path: string) => {
    // Kill EVERYTHING GSAP related to prevent "ghost" updates on unmounted elements
    if (tourTween.current) tourTween.current.kill();
    gsap.killTweensOf(window);
    ScrollTrigger.getAll().forEach(st => st.kill());

    // Immediate scroll reset
    window.scrollTo(0, 0);

    // Small delay to let the JS thread breathe before heavy React re-render
    setTimeout(() => {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));

      // Refresh after mount
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, 50);
  };

  /* ── Master Tour Controller ── */
  useEffect(() => {
    if (!autoTour) return;

    // Small delay for initial render
    const startTimeout = setTimeout(() => {
      setTourActive(true);

      // Phase 1: Home Page Continuous Scroll
      if (window.location.pathname === "/") {
        window.scrollTo(0, 0);

        // Final measure after layout is theoretically settled
        ScrollTrigger.refresh();

        const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
        const scrollDuration = Math.max(25, scrollMax / 175);

        const initiateSubPageTour = (path: string, label: string, step: number, isLast: boolean) => {
          navigateTo(path);
          setTourLabel(label);
          setTourStep(step);

          // Wait for mount then scroll
          tourSequenceId.current = window.setTimeout(() => {
            const subScrollMax = document.documentElement.scrollHeight - window.innerHeight;
            tourTween.current = gsap.to(window, {
              scrollTo: { y: subScrollMax, autoKill: false },
              duration: Math.max(8, subScrollMax / 250),
              ease: "none",
              onComplete: () => {
                tourSequenceId.current = window.setTimeout(() => {
                  if (isLast) {
                    endTour();
                    navigateTo("/");
                  } else {
                    initiateSubPageTour("/careers", "Join the Team", HOME_TOUR_SECTIONS.length + 2, true);
                  }
                }, 2000);
              }
            });
          }, 1500);
        };

        tourTween.current = gsap.to(window, {
          scrollTo: { y: scrollMax, autoKill: false },
          duration: scrollDuration,
          ease: "none",
          onUpdate: () => {
            if (window.location.pathname !== "/") return;
            const viewportHalf = window.innerHeight / 2;
            let activeIdx = -1;
            HOME_TOUR_SECTIONS.forEach((section, idx) => {
              const el = document.getElementById(section.id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= viewportHalf) activeIdx = idx;
              }
            });
            if (activeIdx !== -1) {
              setTourLabel(HOME_TOUR_SECTIONS[activeIdx].label);
              setTourStep(activeIdx + 1);
            }
          },
          onComplete: () => {
            tourSequenceId.current = window.setTimeout(() => {
              initiateSubPageTour("/meet-the-crew", "Our Crew", HOME_TOUR_SECTIONS.length + 1, false);
            }, 2500);
          }
        });
      }
    }, 800);

    return () => {
      clearTimeout(startTimeout);
      if (tourTween.current) tourTween.current.kill();
      if (tourSequenceId.current) clearTimeout(tourSequenceId.current);
    };
  }, [autoTour]);

  /* ── Interrupt tour if user scrolls manually ── */
  useEffect(() => {
    if (!tourActive) return;
    const handleInterrupt = (e: any) => {
      // Check if it's a real user interaction
      if (e.type === "wheel" || e.type === "touchstart") {
        endTour();
      }
    };
    window.addEventListener("wheel", handleInterrupt, { passive: true });
    window.addEventListener("touchstart", handleInterrupt, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleInterrupt);
      window.removeEventListener("touchstart", handleInterrupt);
    };
  }, [tourActive]);

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
          scrub: 0.1,
        },
      });

      gsap.to(".bg-dimmer", {
        opacity: 0.85,
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
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

  const tourTotalSteps = HOME_TOUR_SECTIONS.length + 2;

  return (
    <>
      <style>{`
        @keyframes tour-blink {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.4; }
        }
      `}</style>

      {tourActive && (
        <TourPill
          label={tourLabel}
          step={tourStep}
          total={tourTotalSteps}
          onSkip={endTour}
        />
      )}

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
              <Brands />
              <About />
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
