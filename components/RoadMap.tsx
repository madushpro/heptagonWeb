import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Zap, Mountain, Binary, Crown, Orbit } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const rawChapters = [
  {
    id: "chapter-1",
    chapter: "Chapter 1",
    label: "The Spark",
    year: "2020",
    title: "Inception",
    desc: "Heptagon was born from the need for uncompromising digital foundations.",
    icon: <Sparkles className="w-6 h-6 text-orange-500" />,
    color: "from-orange-500/20 to-transparent",
  },
  {
    id: "chapter-2",
    chapter: "Chapter 2",
    label: "The Ascent",
    year: "2021",
    title: "Scaling",
    desc: "Architecture turned into action. We expanded across continents.",
    icon: <Mountain className="w-6 h-6 text-orange-500" />,
    color: "from-orange-500/20 to-transparent",
  },
  {
    id: "chapter-4",
    chapter: "Chapter 4",
    label: "The Dominion",
    year: "2024",
    title: "Reliability",
    desc: "Reaching 99.9% global uptime. Definitive silent partner behind stable ecosystems.",
    icon: <Crown className="w-6 h-6 text-orange-500" />,
    color: "from-orange-500/20 to-transparent",
  },
  {
    id: "chapter-3",
    chapter: "Chapter 3",
    label: "The Singularity",
    year: "2023",
    title: "AI Evolution",
    desc: "Transition from automation to intelligence. Our AI engine redefined scalability.",
    icon: <Binary className="w-6 h-6 text-orange-500" />,
    color: "from-orange-500/20 to-transparent",
  },
  {
    id: "chapter-5",
    chapter: "Chapter 5",
    label: "The Horizon",
    year: "2025+",
    title: "Beyond Reality",
    desc: "Pioneering sustainable, next-gen technologies blurring the line between design and reality.",
    icon: <Orbit className="w-6 h-6 text-orange-500" />,
    color: "from-orange-500/20 to-transparent",
  },
];

const Roadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const storyLineRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // 1. Sort chapters chronologically
  const chapters = useMemo(() => {
    return [...rawChapters].sort((a, b) => parseInt(a.year) - parseInt(b.year));
  }, []);

  // 2. Dynamic dimensions
  const chapterWidth = 400; // px
  const introWidth = 600; // px
  const totalRoadWidth = introWidth + chapters.length * chapterWidth + 200;

  // Generate dynamic SVG path
  const generatePath = () => {
    let d = `M 0 100`;
    let currentX = 0;

    // Smooth start
    d += ` C 100 100, 200 150, 300 150`;
    currentX = 300;

    chapters.forEach((_, i) => {
      const nextX = currentX + chapterWidth;
      const y = i % 2 === 0 ? 50 : 150;
      const prevY = i % 2 === 0 ? 150 : 50;

      d += ` C
    ${currentX + chapterWidth / 2} ${prevY},
    ${currentX + chapterWidth / 2} ${y},
    ${nextX} ${y}`;

      currentX = nextX;
    });

    // Final stretch
    d += ` L ${totalRoadWidth} ${currentX % 300 === 0 ? 100 : 100}`;
    return d;
  };

  const pathData = useMemo(() => generatePath(), [chapters]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!horizontalRef.current || !containerRef.current) return;

      const totalScrollWidth = horizontalRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalScrollWidth - viewportWidth;

      // Pin and Side-scroll
      gsap.to(horizontalRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Path Drawing
      if (storyLineRef.current) {
        const pathLength = storyLineRef.current.getTotalLength();

        gsap.set(storyLineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(storyLineRef.current, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
          },
        });

        // Energy Ball
        const glowProxy = { distance: 0 };
        gsap.to(glowProxy, {
          distance: pathLength,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            onUpdate: (self) => {
              if (glowRef.current && storyLineRef.current) {
                const point = storyLineRef.current.getPointAtLength(
                  self.progress * pathLength,
                );
                gsap.set(glowRef.current, {
                  xPercent: -50,
                  yPercent: -50,
                  left: point.x,
                  top: point.y,
                  opacity: self.progress > 0.01 && self.progress < 0.99 ? 1 : 0,
                });
              }
            },
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [totalRoadWidth]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-transparent z-10"
    >
      <div
        ref={horizontalRef}
        className="flex items-center min-w-max h-screen px-[5vw] relative"
        style={{ width: `${totalRoadWidth}px` }}
      >
        {/* Intro */}
        <div
          className="flex flex-col justify-center pr-20"
          style={{ width: `${introWidth}px` }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6 w-fit">
            <Zap size={12} className="text-orange-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500">
              The Journey
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-6 leading-[0.85] tracking-tighter uppercase dark:text-white text-gray-900">
            A Legacy <br />
            <span className="text-orange-gradient">Unfolding.</span>
          </h2>
          <p className="max-w-sm text-base font-medium dark:text-zinc-400 text-zinc-500 leading-relaxed capitalize">
            Witness our uncompromising evolution from code to digital empire.
          </p>
        </div>

        {/* Path Container */}
        <div
          className="absolute top-1/2 left-0 h-[200px] -translate-y-1/2 pointer-events-none"
          style={{ width: `${totalRoadWidth}px` }}
        >
          <svg
            viewBox={`0 0 ${totalRoadWidth} 200`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
          >
            <path
              d={pathData}
              stroke="rgba(255, 107, 0, 0.05)"
              strokeWidth="60"
              strokeLinecap="round"
            />
            <path
              ref={storyLineRef}
              d={pathData}
              stroke="url(#storyGradientSorted)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="100" // Will be overridden by gsap
              className="filter drop-shadow-[0_0_10px_rgba(255,107,0,0.4)]"
            />
            <defs>
              <linearGradient
                id="storyGradientSorted"
                x1="0"
                y1="100"
                x2={totalRoadWidth}
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF6B00" />
                <stop offset="1" stopColor="#FF8300" />
              </linearGradient>
            </defs>
          </svg>
          <div
            ref={glowRef}
            className="absolute w-8 h-8 rounded-full bg-orange-500 shadow-[0_0_30px_#FF6B00] blur-sm opacity-0 z-30"
          />
        </div>

        {/* Chapters */}
        <div className="flex items-center">
          {chapters.map((ch, i) => (
            <div
              key={ch.id}
              className="flex flex-col justify-center px-10 relative z-20"
              style={{
                width: `${chapterWidth}px`,
                transform: `translateY(${i % 2 === 0 ? "-80px" : "80px"})`,
              }}
            >
              <div className="chapter-card glass-card relative p-0.5 rounded-[2rem] group hover:scale-[1.03] transition-transform duration-500 shadow-xl w-full">
                <div className="bg-zinc-950 dark:bg-[#080808] rounded-[1.9rem] p-6 h-full border border-white/5 relative overflow-hidden">
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-orange-500 font-black text-[9px] uppercase tracking-[0.2em] mb-0.5">
                        {ch.chapter}
                      </span>
                      <h3 className="text-sm font-black text-white tracking-tight uppercase">
                        {ch.label}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-gradient/10 flex items-center justify-center border border-orange-500/20 group-hover:rotate-6 transition-transform">
                      {ch.icon}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="text-2xl font-black text-orange-gradient mb-2">
                      {ch.year}
                    </div>
                    <h4 className="text-xs font-bold text-white mb-2 leading-tight group-hover:text-orange-500 transition-colors">
                      {ch.title}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed text-[10px]">
                      {ch.desc}
                    </p>
                  </div>

                  <div
                    className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${ch.color} blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ending Spacer */}
        <div className="min-w-[200px]" />
      </div>

      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-orange-gradient blur-[150px] opacity-10 rounded-full animate-pulse pointer-events-none" />
    </section>
  );
};

export default Roadmap;
