import React from "react";
import { Code2, Smartphone, Monitor, Settings, ArrowRight } from "lucide-react";

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
      className="py-20 md:py-32 px-4 md:px-12 dark:bg-[#0d0d0d] bg-zinc-50 transition-colors"
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
                src="https://picsum.photos/seed/phoneapp/600/1200"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                alt="mockup"
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
  <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] glass-card transition-all group reveal hover:border-orange-500/50 hover:shadow-2xl dark:hover:bg-zinc-900/50 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/40 dark:shadow-black/20">
    <div className="mb-8 p-5 w-20 h-20 dark:bg-white/5  bg-zinc-50 rounded-2xl  flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <h3 className="text-xl md:text-2xl font-black mb-5 dark:text-white text-zinc-950 uppercase tracking-tight">
      {title}
    </h3>
    <p className="text-sm leading-relaxed mb-8 dark:text-zinc-400  text-zinc-500 font-medium">
      {desc}
    </p>
    {/* <button className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 hover:text-orange-400 transition-colors">
      <span>Read Specification</span>
      <ArrowRight size={14} />
    </button> */}
  </div>
);

export default Services;
