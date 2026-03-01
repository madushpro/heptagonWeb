import React from "react";
import { ArrowUpRight } from "lucide-react";
import expImg from "../assets/testimonial_1.png";

const stats = [
  { label: "UI/UX Design", val: "96%" },
  { label: "Software Develop", val: "96%" },
  { label: "IT Solution", val: "96%" },
];

const Experience: React.FC = () => {
  return (
    <section className="py-20 md:py-24 px-4 md:px-12 max-w-7xl mx-auto dark:bg-black bg-white dark:border-y dark:border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative reveal">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-orange-gradient rounded-full opacity-10 animate-pulse"></div>
            <img
              src={expImg}
              className="w-full h-full object-cover rounded-full border-[10px] dark:border-white/5  border-black/5 grayscale hover:grayscale-0 transition-all duration-700"
              alt="Software engineering team"
            />
            <div className="absolute -bottom-4 sm:-bottom-10 right-0 sm:-right-10 dark:bg-[#111] bg-white border dark:border-white/10 border-black/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl reveal">
              <p className="text-orange-500 font-bold text-2xl sm:text-4xl mb-1">
                10k+
              </p>
              <p className="dark:text-gray-400  text-gray-500 text-xs uppercase font-bold tracking-widest">
                Active Users
              </p>
            </div>
          </div>
        </div>

        <div className="reveal">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            BACKED BY REAL SKILLS
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight dark:text-white text-gray-900">
            Deep Expertise In Cutting Edge{" "}
            <span className="text-orange-gradient">Software Solutions</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-base md:text-lg mb-10 md:mb-12 leading-relaxed">
            With years of hands on experience and passion for innovation we
            specialize in delivering advanced software best solutions for global
            clients.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-12">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full border-4 dark:border-orange-500/20 border-orange-500/10 flex items-center justify-center relative">
                  <span className="text-xl font-black dark:text-white  text-gray-900">
                    {s.val}
                  </span>
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-orange-500 opacity-20"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-orange-500"
                      strokeDasharray="276"
                      strokeDashoffset="27.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-xs font-bold dark:text-gray-500  text-gray-400 uppercase tracking-tighter">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <button className="bg-orange-gradient px-8 py-4 rounded-full flex items-center space-x-3 text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-orange-600/30 text-white">
            <span>See How We Work</span>
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
