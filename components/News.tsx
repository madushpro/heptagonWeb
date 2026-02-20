import React from "react";
import { MessageSquare, User, ArrowRight } from "lucide-react";

const articles = [
  {
    date: "13 MAR",
    year: "2025",
    author: "RHONDA RHODES",
    comments: "3 COMMENT",
    title:
      "How Our Latest Software Update The Helping Businesses Automate Faster",
    img: "https://picsum.photos/seed/news1/800/500",
  },
  {
    date: "13 MAR",
    year: "2025",
    author: "RHONDA RHODES",
    comments: "3 COMMENT",
    title:
      "Updates From Our Team As We Build To Smarter Software An Shape The Future",
    img: "https://picsum.photos/seed/news2/800/500",
  },
];

const News: React.FC = () => {
  return (
    <section
      className="py-20 md:py-24 px-4 md:px-12 max-w-7xl mx-auto dark:bg-[#0a0d12] bg-white dark:border-y dark:border-white/5"
      id="our-blog"
    >
      <div className="text-center mb-12 md:mb-16 reveal">
        <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
          INSIGHTS THAT DRIVE INNOVATION
        </span>
        <h2 className="text-3xl md:text-5xl font-black dark:text-white text-gray-900">
          News Updates And{" "}
          <span className="text-orange-gradient">Expert Advice</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {articles.map((art, i) => (
          <div key={i} className="group reveal">
            <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-8 aspect-video border dark:border-white/5 border-black/5 shadow-sm">
              <img
                src={art.img}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                alt="news"
              />
              <div className="absolute top-6 left-6 bg-orange-gradient rounded-2xl px-4 py-3 flex flex-col items-center shadow-lg text-white">
                <span className="text-2xl font-black leading-none">
                  {art.date.split(" ")[0]}
                </span>
                <span className="text-xs font-bold uppercase">
                  {art.date.split(" ")[1]}
                </span>
                <div className="w-full h-px bg-white/20 my-1"></div>
                <span className="text-[10px] font-bold">{art.year}</span>
              </div>
            </div>
            <div className="px-4">
              <div className="flex items-center space-x-6 dark:text-gray-500  text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                <div className="flex items-center space-x-2">
                  <User size={14} className="text-orange-500" />
                  <span>{art.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare size={14} className="text-orange-500" />
                  <span>{art.comments}</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-5 md:mb-6 leading-tight group-hover:text-orange-500 transition-colors dark:text-white text-gray-900">
                {art.title}
              </h3>
              <button className="flex items-center space-x-2 text-sm font-bold text-orange-500 uppercase tracking-widest group">
                <span>Read More</span>
                <div className="w-8 h-8 rounded-full border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
