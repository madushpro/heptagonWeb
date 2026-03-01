import React from "react";
import { Code2, Smartphone, Monitor, Settings, ArrowRight } from "lucide-react";
import servicesMobile from "../assets/services_mobile.png";

const services = [
  {
    icon: (
      <Code2 className="text-orange-500 group-hover:text-white" size={32} />
    ),
    title: "Software Development",
    desc: "We build tailored software solutions to match unique business needs from concept to deployment.",
  },
  {
    icon: (
      <Monitor className="text-orange-500 group-hover:text-white" size={32} />
    ),
    title: "Application Development",
    desc: "Deliver seamless web experiences with expertly crafted applications built for performance.",
  },
  {
    icon: (
      <Smartphone
        className="text-orange-500 group-hover:text-white"
        size={32}
      />
    ),
    title: "Mobile App Development",
    desc: "High-quality performance mobile apps for iOS and Android. From startup ideas to enterprise.",
  },
  {
    icon: (
      <Settings className="text-orange-500 group-hover:text-white" size={32} />
    ),
    title: "Software Maintenance",
    desc: "Ensuring your software stays up to date and secure with our reliable bug-fixed support.",
  },
];

const Services: React.FC = () => {
  return (
    <section
      className="py-20 md:py-32 px-4 md:px-12 dark:bg-zinc-900 bg-zinc-50 transition-colors"
      id="our-service"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-24 reveal">
          <span className="text-orange-500 font-black tracking-[0.4em] uppercase text-xs mb-6 block">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-7xl font-black dark:text-white text-zinc-950">
            Architecting <span className="text-orange-gradient">Growth</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <div className="space-y-10 flex flex-col justify-center">
            {services.slice(0, 2).map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-center reveal">
            <div className="relative w-80 h-[38rem] dark:bg-[#111] bg-white border-[14px] dark:border-zinc-800  border-zinc-200 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-black/10">
              <img
                src={servicesMobile}
                className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Software application UI mockup"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 flex items-end p-10">
                <div>
                  <div className="w-14 h-1.5 bg-orange-500 rounded-full mb-5"></div>
                  <p className="text-white font-black text-2xl uppercase tracking-tighter leading-none">
                    Modern UI Frameworks
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10 flex flex-col justify-center">
            {services.slice(2, 4).map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-24 p-6 md:p-12 glass-card rounded-[2rem] md:rounded-[3rem] reveal flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 dark:bg-zinc-900/40 bg-white shadow-2xl shadow-zinc-200/50 dark:shadow-black">
          Stack Logos here
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
}> = ({ icon, title, desc }) => (
  <div
    className="
    relative overflow-hidden
    p-6 md:p-10
    min-h-[320px] md:min-h-[360px]
    flex flex-col
    rounded-[2rem] md:rounded-[2.5rem]
    transition-all duration-500 ease-out
    group reveal
    
    /* Glass Base */
    bg-white/40 dark:bg-zinc-900/40
    backdrop-blur-2xl
    border border-white/30 dark:border-white/10
    
    /* Soft Gradient Border Glow */
    before:absolute before:inset-0 before:rounded-[2.5rem]
    before:p-[1px]
    before:bg-gradient-to-br 
    before:from-orange-400/40 
    before:via-white/20 
    before:to-orange-600/40
    before:opacity-0
    before:transition-opacity before:duration-500
    before:-z-10
    
    /* Shadow */
    shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)]
    dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]
    
    hover:scale-[1.03]
    hover:shadow-[0_25px_80px_-10px_rgba(249,115,22,0.35)]
    
    hover:before:opacity-100
  "
  >
    <div
      className="mb-8 p-5 w-20 h-20 
      bg-white/50 dark:bg-white/5 
      backdrop-blur-lg
      rounded-2xl
      flex items-center justify-center
      transition-all duration-500
      group-hover:bg-orange-500
      group-hover:text-white
      group-hover:shadow-lg group-hover:shadow-orange-500/40"
    >
      {icon}
    </div>

    <h3
      className="text-xl md:text-2xl font-black mb-5 
      text-zinc-950 dark:text-white 
      uppercase tracking-tight
      transition-colors duration-300
      group-hover:text-orange-500"
    >
      {title}
    </h3>

    <p
      className="text-sm leading-relaxed mb-8 
      text-zinc-600 dark:text-zinc-400 
      font-medium
      transition-colors duration-300 flex-1"
    >
      {desc}
    </p>
  </div>
);

export default Services;
