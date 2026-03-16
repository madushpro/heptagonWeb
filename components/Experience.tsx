import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import expImg from "../assets/testimonial_1.png";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "UI/UX Design", val: "98%" },
  { label: "Software Development", val: "99%" },
  { label: "System Architecture", val: "97%" },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circular Progress Animation
      gsap.utils.toArray(".stat-circle").forEach((circle: any) => {
        const target = parseFloat(circle.getAttribute("data-target"));
        const circum = parseFloat(circle.getAttribute("data-circumference"));
        const offset = circum * (1 - target / 100);

        gsap.to(circle, {
          strokeDashoffset: offset,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: circle,
            start: "top 90%",
          },
        });
      });

      // Counter numbers animation
      gsap.utils.toArray(".stat-number").forEach((num: any) => {
        const target = parseFloat(num.getAttribute("data-target"));
        gsap.to(num, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: num,
            start: "top 90%",
          },
          onUpdate: function () {
            num.innerHTML = Math.ceil(this.targets()[0].innerText) + "%";
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-24 px-4 md:px-12 max-w-7xl mx-auto dark:bg-black bg-white dark:border-y dark:border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative reveal">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-orange-gradient rounded-full opacity-10 animate-pulse"></div>
            <img
              src={expImg}
              className="w-full h-full object-cover rounded-full border-[10px] dark:border-white/5  border-black/5 grayscale hover:grayscale-0 transition-all duration-700"
              alt="Heptagon excellence"
            />
            <div className="absolute -bottom-4 sm:-bottom-10 right-0 sm:-right-10 dark:bg-[#111] bg-white border dark:border-white/10 border-black/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl reveal">
              <p className="text-orange-500 font-bold text-2xl sm:text-4xl mb-1">
                10+
              </p>
              <p className="dark:text-gray-400  text-gray-500 text-xs uppercase font-bold tracking-widest">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>

        <div className="reveal">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            A Decade of Trust
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight dark:text-white text-gray-900">
            Pioneering the Future of{" "}
            <span className="text-orange-gradient">Digital Solutions</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 text-base md:text-lg mb-10 md:mb-12 leading-relaxed">
            Since 2014, Heptagon has empowered businesses with tailored,
            high-impact software. We combine deep technical expertise with
            creative innovation to solve complex challenges and drive lasting
            growth for clients across the globe.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-12">
            {stats.map((s, i) => {
              const numVal = parseInt(s.val);
              const circumference = 251.3;

              return (
                <div key={i} className="text-center group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full border-4 dark:border-orange-500/10 border-orange-500/5 flex items-center justify-center relative shadow-sm transition-all duration-500 group-hover:scale-105">
                    {/* Animated Number */}
                    <span className="stat-number text-xl font-black dark:text-white text-gray-900" data-target={numVal}>
                      0%
                    </span>

                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                      {/* Background Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-orange-500 opacity-10"
                      />
                      {/* Animated Progress Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="stat-circle text-orange-500"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference} // Start empty
                        strokeLinecap="round"
                        data-circumference={circumference}
                        data-target={numVal}
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] sm:text-xs font-bold dark:text-gray-500 text-gray-400 uppercase tracking-widest">
                    {s.label}
                  </p>
                </div>
              );
            })}
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
