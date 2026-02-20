import React, { useEffect } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "./projectsData";

const HEADER_OFFSET = 110;

const Projects = () => {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      const y =
        target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const timer = window.setTimeout(scrollToHash, 0);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="pt-24 md:pt-28 pb-16 md:pb-24 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Back */}
      <a
        href="/"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-orange-500 mb-12 hover:opacity-70 transition"
      >
        <ArrowLeft size={16} />
        Back to Home
      </a>

      <h1 className="text-3xl md:text-6xl font-black tracking-tight mb-10 md:mb-16">
        Selected Projects
      </h1>

      <div className="space-y-14 md:space-y-24">
        {projects.map((project, index) => (
          <section key={project.id} id={project.id} className="scroll-mt-32">
            {/* Project Number */}
            <p className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-4">
              Project {String(index + 1).padStart(2, "0")}
            </p>

            {/* Title + Category */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-10 gap-5 md:gap-6">
              <div>
                <h2 className="text-2xl md:text-5xl font-black tracking-tight mb-3">
                  {project.title}
                </h2>
                <p className="uppercase tracking-[0.2em] text-xs font-bold text-gray-500">
                  {project.cat}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition"
                  >
                    View Live <ExternalLink size={14} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-gray-300 dark:border-white/20 px-5 py-2 rounded-full text-sm font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                  >
                    Code <Github size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="rounded-[1.25rem] md:rounded-[2rem] overflow-hidden mb-8 md:mb-12 shadow-xl">
              <img
                src={project.img}
                alt={project.title}
                className="w-full object-cover"
              />
            </div>

            {/* Case Study Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-10">
              {/* Problem */}
              <div>
                <h3 className="font-black mb-3 text-lg">The Problem</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.problem ||
                    "Describe the business challenge here. What was broken? What needed improvement?"}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="font-black mb-3 text-lg">The Solution</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.solution ||
                    "Explain your technical solution. Architecture decisions, performance improvements, automation, etc."}
                </p>
              </div>

              {/* Impact */}
              <div>
                <h3 className="font-black mb-3 text-lg">Impact</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.impact ||
                    "Show measurable impact: revenue increase, time saved, performance boost, etc."}
                </p>
              </div>
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 dark:bg-white/5 rounded-xl p-6 text-center"
                  >
                    <p className="text-2xl font-black text-orange-500">
                      {metric.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] mt-2 text-gray-500">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            {project.stack && (
              <div className="flex flex-wrap gap-3 mt-10">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-xs font-bold rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Projects;
