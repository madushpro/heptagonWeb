import React from "react";
import { Search, PenTool, Layout } from "lucide-react";

const steps = [
  {
    icon: <Search className="text-orange-500" />,
    title: "Discover And Define",
    desc: "We start by analyzing your current website performance and identifying technical issues.",
  },
  {
    icon: <PenTool className="text-orange-500" />,
    title: "Planning And Design",
    desc: "Based on your goal and audit results, we build custom SEO roadmaps from keywords.",
  },
  {
    icon: <Layout className="text-orange-500" />,
    title: "Build And Development",
    desc: "Strategies and report transparent ensuring you see real improvements in traffic.",
  },
];

const Process: React.FC = () => {
  return (
    <section className="py-20 md:py-24 px-4 md:px-12  mx-auto overflow-hidden dark:bg-[#07090d] bg-white dark:border-y dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center ">
          <div className="reveal">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
              BUILT TO WORK FOR YOU
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-10 md:mb-12 dark:text-white text-gray-900">
              Our Process Your{" "}
              <span className="text-orange-gradient">Solution</span>
            </h2>

            <div className="space-y-10">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 md:gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl dark:bg-white/5  bg-black/5 flex items-center justify-center border dark:border-white/10  border-black/5 group-hover:border-orange-500/50 transition-colors">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 dark:text-white text-gray-900">
                      {step.title}
                    </h3>
                    <p className="dark:text-gray-400  text-gray-500 text-sm leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal">
            <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden border dark:border-white/10 border-black/5 shadow-3xl">
              <img
                src="https://picsum.photos/seed/process/800/800"
                className="w-full grayscale hover:grayscale-0 transition-all duration-1000"
                alt="process"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 -right-12 w-48 h-48 bg-orange-gradient blur-[80px] opacity-20 -z-1"></div>
          </div>
        </div>

        {/* Scrollable tech badges */}
        <div className="mt-24 overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide">
          <div className="flex items-center space-x-8 animate-marquee">
            {[
              "AI-Powered Insight",
              "Expense Tracking",
              "Automated Workflows",
              "API Integration",
              "File Sharing",
              "Resource Allocation",
            ].map((tag) => (
              <div
                key={tag}
                className="px-8 py-3 rounded-full border dark:border-white/10  border-black/10 dark:text-gray-400  text-gray-500 text-sm font-bold hover:border-orange-500 hover:text-orange-500 transition-all cursor-default uppercase"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
