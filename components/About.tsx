import React from "react";
import { ArrowUpRight } from "lucide-react";

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
    <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto" id="about-us">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            WHO WE ARE
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight dark:text-white  text-gray-900">
            We are passionate team of{" "}
            <span className="opacity-40">
              developers, designers & strategists
            </span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed dark:text-gray-400  text-gray-600">
            Committed to delivering smart, scalable, and reliable software
            solutions. With an deep understanding of technology and focus on
            innovation, we help businesses solve complex problems.
          </p>
          <button
            type="button"
            onClick={handleSeeOurWorksClick}
            className="bg-white/5 border border-white/10 dark:text-white  text-gray-900 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-all px-8 py-4 rounded-full flex items-center space-x-3 font-bold group"
          >
            <span>See Our Works</span>
            <ArrowUpRight size={20} />
          </button>

          <div className="mt-16 flex items-center space-x-12">
            <div className="flex flex-col">
              <span className="text-5xl font-black text-orange-gradient">
                25+
              </span>
              <span className="uppercase tracking-tighter text-sm font-bold mt-2 dark:text-gray-500  text-gray-400">
                Years of Experience
              </span>
            </div>
            <div className="h-16 w-px bg-white/10 dark:bg-white/10  bg-gray-200"></div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full border border-orange-500/50 flex items-center justify-center animate-pulse">
                <div className="w-10 h-10 rounded-full bg-orange-gradient flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </div>
              <span className="font-medium leading-tight dark:text-gray-400  text-gray-600">
                Build A <br /> Success Brand
              </span>
            </div>
          </div>
        </div>

        <div className="relative reveal">
          <div className="grid grid-cols-2 gap-6">
            <img
              src="https://picsum.photos/seed/abt1/600/800"
              className="rounded-[2.5rem] w-full aspect-[3/4] object-cover border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 dark:border-white/5  border-black/5"
              alt="meeting"
            />
            <div className="flex flex-col gap-6 pt-12">
              <img
                src="https://picsum.photos/seed/abt2/600/600"
                className="rounded-[2.5rem] w-full aspect-square object-cover border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 dark:border-white/5  border-black/5"
                alt="team"
              />
              <div className="bg-orange-gradient p-1 rounded-[2rem]">
                <div className="dark:bg-[#0a0a0a]  bg-white rounded-[1.8rem] p-8 h-full flex flex-col justify-center">
                  <span className="text-3xl font-black dark:text-white  text-gray-900">
                    99%
                  </span>
                  <span className="text-sm font-bold uppercase mt-2 dark:text-gray-500  text-gray-400">
                    Success Rate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
