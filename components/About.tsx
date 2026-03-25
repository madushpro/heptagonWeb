import React from "react";
import { ArrowUpRight, Code2, Users2, Shield, Rocket } from "lucide-react";
import aboutTeam from "../assets/about_team.png";
import aboutDev from "../assets/about_developer.png";

const About: React.FC = () => {
  const handleSeeOurWorksClick = () => {
    const target = document.getElementById("our-work");
    if (!target) return;

    const nav = document.querySelector("nav");
    const navOffset = nav instanceof HTMLElement ? nav.offsetHeight + 16 : 96;
    const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      className="py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden dark:bg-black bg-white"
      id="about-us"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column: Content */}
        <div className="lg:col-span-7 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Who We Are
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.05] dark:text-white text-gray-900 tracking-tight">
            Engineering digital <br />
            <span className="text-orange-gradient">superiority</span> with{" "}
            <br />
            human precision.
          </h2>

          {/* <p className="text-lg md:text-xl mb-12 leading-relaxed dark:text-gray-400 text-gray-600 max-w-2xl">
            We are a multidisciplinary team of{" "}
            <span className="dark:text-white text-gray-900 font-bold underline decoration-orange-500/30">
              developers, designers & strategists
            </span>
            . We solve complex business problems through innovation, delivering
            smart, scalable software solutions that stand the test of time.
          </p> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Code2 size={20} />
                </div>
                <h3 className="font-bold text-lg dark:text-white text-gray-900 tracking-tight">
                  Technical Excellence
                </h3>
              </div>
              {/* <p className="text-sm dark:text-gray-500 text-gray-400 leading-relaxed">
                Clean code and scalable architecture are at the heart of everything we build.
              </p> */}
            </div>

            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Shield size={20} />
                </div>
                <h3 className="font-bold text-lg dark:text-white text-gray-900 tracking-tight">
                  Reliable Strategy
                </h3>
              </div>
              {/* <p className="text-sm dark:text-gray-500 text-gray-400 leading-relaxed">
                We align technology with your business goals to ensure long-term
                growth.
              </p> */}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <button
              type="button"
              onClick={handleSeeOurWorksClick}
              className="bg-orange-500 text-white hover:bg-orange-600 transition-all px-8 py-4 rounded-2xl flex items-center space-x-3 font-bold group shadow-xl shadow-orange-500/20 active:scale-95"
            >
              <span>Explore Works</span>
              <ArrowUpRight
                size={20}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-gray-200 overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="team member"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs">
                <p className="font-bold text-orange-500">25+ Expert Talents</p>
                <p className="dark:text-gray-500 text-gray-400">
                  Collaborating globally
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Montage */}
        <div className="lg:col-span-5 relative reveal mt-12 lg:mt-0">
          <div className="relative">
            {/* Background Decorative Rings */}
            <div className="absolute -inset-10 border border-orange-500/5 rounded-full pointer-events-none" />
            <div className="absolute -inset-20 border border-orange-500/5 rounded-full pointer-events-none" />

            {/* Main Team Image */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl skew-y-1 group hover:skew-y-0 transition-transform duration-700">
              <img
                src={aboutTeam}
                className="w-full aspect-[4/5] object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                alt="Software development team at work"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Overlapping Dev Image */}
            <div className="absolute -top-12 -right-12 w-3/5 z-20 hidden md:block group">
              <div className="rounded-[2rem] overflow-hidden border-4 border-white dark:border-black shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src={aboutDev}
                  className="w-full aspect-square object-cover"
                  alt="Developer coding"
                />
              </div>
            </div>

            {/* Performance Card */}
            <div className="absolute -bottom-10 -left-10 z-30 bg-white dark:bg-[#0a0a0a] p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl animate-float max-w-[200px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-gradient flex items-center justify-center shadow-lg shadow-orange-500/40">
                  <Rocket className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-black text-orange-gradient">
                    99%
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest dark:text-gray-500 text-gray-400 leading-tight">
                Success rate in <br /> enterprise delivery
              </p>
            </div>

            {/* Experience Badge */}
            <div className="absolute top-1/2 -right-6 z-30 bg-orange-500 text-white p-4 rounded-2xl shadow-xl rotate-12 flex flex-col items-center">
              <span className="text-2xl font-black leading-none">25+</span>
              <span className="text-[8px] font-bold uppercase tracking-tighter">
                Years Exp
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
