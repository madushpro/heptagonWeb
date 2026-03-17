import React, { useState, useRef, useEffect } from "react";
import { Code2, Smartphone, Monitor, Settings, ArrowRight } from "lucide-react";
import servicesMobile from "../assets/services_mobile.png";
import LogoLoopComponent from "./LogoLoopComponent";

const services = [
  {
    icon: <Code2 size={32} />,
    title: "Software Development",
    desc: "We build tailored software solutions to match unique business needs from concept to deployment.",
    color: "from-[#f97316] to-[#ea580c]",
  },
  {
    icon: <Monitor size={32} />,
    title: "Application Development",
    desc: "Deliver seamless web experiences with expertly crafted applications built for performance.",
    color: "from-[#f97316] to-[#ea580c]",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile App Development",
    desc: "High-quality performance mobile apps for iOS and Android. From startup ideas to enterprise.",
    color: "from-[#f97316] to-[#ea580c]",
  },
  {
    icon: <Settings size={32} />,
    title: "Project Maintenance",
    desc: "Ensuring your software stays up to date and secure with our reliable support and optimization.",
    color: "from-[#f97316] to-[#ea580c]",
  },
];

const Services: React.FC = () => {
  return (
    <section
      className="py-24 md:py-40 dark:bg-[#050505] bg-neutral-100 transition-colors relative overflow-hidden"
      id="our-service"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 md:mb-32 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-500 font-bold tracking-widest uppercase text-[10px]">
              Our Expertise
            </span>
          </div>
          <h2 className="text- md:text-8xl font-black dark:text-white text-zinc-950 tracking-tight leading-[0.9]">
            Architecting <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              Next-Gen Growth
            </span>
          </h2>
          <p className="mt-8 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            We bridge the gap between complex technology and intuitive business
            solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            {services.slice(0, 2).map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>

          {/* Middle Column - Enhanced Mockup */}
          <div className="flex items-center justify-center reveal py-10 lg:py-0">
            <div className="relative group">
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-linear-to-tr from-[#f97316]/20 to-[#ea580c]/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative w-72 h-136 md:w-80 md:h-152 dark:bg-zinc-900 bg-white border-12 dark:border-zinc-800 border-zinc-200 rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
                <img
                  src={servicesMobile}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
                  alt="Software application UI mockup"
                />

                {/* Dynamic Content Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/20 to-black/80 flex flex-col justify-end p-8">
                  <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="w-12 h-1 bg-orange-500 rounded-full" />
                    <h3 className="text-white font-bold text-2xl leading-tight">
                      Experience <br />
                      Precision <br />
                      Engineering
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating Elements (Abstract) */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-xl animate-bounce-slow max-md:hidden">
                <Code2 className="text-orange-500" size={24} />
              </div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-xl animate-float max-md:hidden">
                <Smartphone className="text-blue-500" size={20} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {services.slice(2, 4).map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  desc,
  color,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        relative group overflow-hidden
        p-8 md:p-10
        min-h-[300px]
        flex flex-col
        rounded-[2.5rem]
        transition-all duration-500
        reveal
        
        bg-white/50 dark:bg-zinc-900/40
        backdrop-blur-xl
        border border-black/5 dark:border-white/5
        hover:border-orange-500/30
        
        shadow-sm hover:shadow-2xl hover:shadow-orange-500/10
        hover:-translate-y-2
      "
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.1), transparent 40%)`,
        }}
      />

      <div
        className={`
          mb-8 w-16 h-16 
          rounded-2xl
          flex items-center justify-center
          transition-all duration-500
          text-zinc-700 dark:text-zinc-300
          group-hover:scale-110 group-hover:rotate-3
          relative
        `}
      >
        <div
          className={`absolute inset-0 rounded-2xl bg-linear-to-br ${color} opacity-10 group-hover:opacity-100 transition-opacity duration-500`}
        />
        <div className="relative z-10 group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-zinc-950 dark:text-white tracking-tight group-hover:text-orange-500 transition-colors">
        {title}
      </h3>

      <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed flex-1">
        {desc}
      </p>

      <div className="mt-6 flex items-center gap-2 text-orange-500 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
        Learn More <ArrowRight size={16} />
      </div>
    </div>
  );
};

export default Services;
