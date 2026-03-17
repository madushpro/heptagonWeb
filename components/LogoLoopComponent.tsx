import React from "react";
import LogoLoop from "./LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFramer,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiFirebase,
  SiSupabase,
  SiPython,
  SiVercel,
} from "react-icons/si";

const techLogos = [
  {
    node: (
      <span className="hover:text-[#61DAFB] transition-colors">
        <SiReact />
      </span>
    ),
    title: "React",
    href: "https://react.dev",
  },
  {
    node: (
      <span className="hover:text-[#000000] transition-colors">
        <SiNextdotjs />
      </span>
    ),
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: (
      <span className="hover:text-[#3178C6] transition-colors">
        <SiTypescript />
      </span>
    ),
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: (
      <span className="hover:text-[#06B6D4] transition-colors">
        <SiTailwindcss />
      </span>
    ),
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: (
      <span className="hover:text-[#339933] transition-colors">
        <SiNodedotjs />
      </span>
    ),
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: (
      <span className="hover:text-[#0055FF] transition-colors">
        <SiFramer />
      </span>
    ),
    title: "Framer Motion",
    href: "https://www.framer.com/motion/",
  },
  {
    node: (
      <span className="hover:text-[#47A248] transition-colors">
        <SiMongodb />
      </span>
    ),
    title: "MongoDB",
    href: "https://www.mongodb.com",
  },
  {
    node: (
      <span className="hover:text-[#4169E1] transition-colors">
        <SiPostgresql />
      </span>
    ),
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    node: (
      <span className="hover:text-[#2496ED] transition-colors">
        <SiDocker />
      </span>
    ),
    title: "Docker",
    href: "https://www.docker.com",
  },
  {
    node: (
      <span className="hover:text-[#FFCA28] transition-colors">
        <SiFirebase />
      </span>
    ),
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  {
    node: (
      <span className="hover:text-[#3ECF8E] transition-colors">
        <SiSupabase />
      </span>
    ),
    title: "Supabase",
    href: "https://supabase.com",
  },
  {
    node: (
      <span className="hover:text-[#3776AB] transition-colors">
        <SiPython />
      </span>
    ),
    title: "Python",
    href: "https://www.python.org",
  },
  {
    node: (
      <span className="hover:text-[#000000] transition-colors">
        <SiVercel />
      </span>
    ),
    title: "Vercel",
    href: "https://vercel.com",
  },
];

const LogoLoopComponent = () => {
  return (
    <section className="py-12 md:py-6 px-4 md:px-12 dark:bg-[#050505] bg-neutral-100 relative overflow-hidden">
      {/* Decorative background glow */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[120px] pointer-events-none" /> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* <div className="text-center mb-12 reveal">
          <h4 className="text-zinc-500 dark:text-zinc-500 text-xs font-black uppercase tracking-[0.4em] mb-4">
            The Stack We Trust
          </h4>
          <div className="h-px w-12 bg-orange-500 mx-auto" />
        </div> */}

        <div className="py-12">
          <LogoLoop
            logos={techLogos}
            speed={25}
            gap={100}
            logoHeight={64}
            hoverSpeed={5}
            scaleOnHover
            ariaLabel="Technology partners"
            className="opacity-40 hover:opacity-100 transition-opacity duration-1000"
          />
        </div>
      </div>
    </section>
  );
};

export default LogoLoopComponent;
