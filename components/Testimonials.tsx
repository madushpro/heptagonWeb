import React from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-12 dark:bg-[#0a0a0a]  bg-gray-50 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            WHAT OUR CLIENTS SAY
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-8 dark:text-white  text-gray-900">
            What Our Clients Say Results{" "}
            <span className="text-orange-gradient">From Clients</span>
          </h2>

          <div className="relative group max-w-md">
            <div className="absolute inset-0 bg-orange-gradient blur-[80px] opacity-10 -z-1"></div>
            <div className="rounded-full overflow-hidden aspect-square border-[8px] dark:border-white/5  border-black/5 relative shadow-xl">
              <img
                src="https://picsum.photos/seed/client1/800/800"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt="client"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-orange-gradient rounded-full flex items-center justify-center text-white">
                <Quote size={40} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <div className="reveal">
          <div className="flex space-x-1 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={18}
                fill="#FF6B00"
                className="text-orange-500"
              />
            ))}
          </div>
          <p className="text-2xl md:text-3xl font-medium leading-snug dark:text-gray-300  text-gray-600 italic mb-10">
            "Partnering with this team has been a game changer for our business.
            From the very first meeting, they demonstrated deep understanding of
            our industry and delivered custom solution that not only met but
            exceeded our expectation"
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://picsum.photos/seed/user12/100/100"
                className="w-16 h-16 rounded-full border-2 border-orange-500/20"
                alt="Amanda"
              />
              <div>
                <h4 className="text-xl font-bold dark:text-white  text-gray-900">
                  Amanda Reyes
                </h4>
                <p className="dark:text-gray-500  text-gray-400 text-sm font-semibold">
                  Owner FeaterDev
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="w-12 h-12 rounded-full border dark:border-white/20  border-black/10 flex items-center justify-center dark:text-white  text-gray-900 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all">
                <ChevronLeft size={24} />
              </button>
              <button className="w-12 h-12 rounded-full bg-orange-gradient flex items-center justify-center hover:opacity-90 transition-all text-white">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
