import React, { useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import testimonialImg1 from "../assets/testimonial_1.png";
import testimonialImg2 from "../assets/testimonial_2.png";
import testimonialImg3 from "../assets/testimonial_3.png";
import testimonialImg4 from "../assets/testimonial_2.png"; // reuse POS for City Lounge (business tech)

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  mainImage: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Viraj Amarathunga",
    role: "IT Manager / Software Engineer",
    company: "Crescent",
    text: "They are a team of young and energetic engineers; we will not hesitate to purchase their products and services for our future expansion. Their products possess a unique quality. From a customer support perspective, they are number one. Keep It Up!",
    avatar: "",
    mainImage: testimonialImg1,
  },
  {
    id: 2,
    name: "Rizan",
    role: "Operation Manager / Accountant",
    company: "Wonderfulmom",
    text: "We are using the Heptagon POS system and have found it very professional and user-friendly. Their after-sales service is excellent and prompt in addressing any issues. We recommend their services to everyone.",
    avatar: "",
    mainImage: testimonialImg2,
  },
  {
    id: 3,
    name: "Nalaka Aluthge",
    role: "Chairman",
    company: "CFC Healthcare",
    text: "We have had a strong bond of trust with them since 2014; they are the finest software provider for our entire CFC Healthcare pharmaceutical chain. I must say they are the top software provider in the pharmaceutical industry.",
    avatar: "",
    mainImage: testimonialImg3,
  },
  {
    id: 4,
    name: "Rajkumar",
    role: "Chairman",
    company: "City Lounge",
    text: "We were frustrated with several companies that were unable to meet our requirements. During this period, Heptagon came into the picture and provided us with an outstanding solution. Thank you, Heptagon; we highly appreciate your dedication and support.",
    avatar: "",
    mainImage: testimonialImg4,
  },
  {
    id: 5,
    name: "J.D.S.P Wickramarathne",
    role: "Director",
    company: "CFC Healthcare",
    text: "We have had a strong bond of trust with them since 2014; they are the finest software provider for our entire CFC Healthcare pharmaceutical chain. I must say they are the top software provider in the pharmaceutical industry.",
    avatar: "",
    mainImage: testimonialImg3,
  },
];

const AUTO_SCROLL_INTERVAL = 5000;

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback(
    (index: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 350);
    },
    [animating]
  );

  const next = useCallback(() => {
    const nextIndex = (current + 1) % testimonials.length;
    goTo(nextIndex, "right");
  }, [current, goTo]);

  const prev = useCallback(() => {
    const prevIndex = (current - 1 + testimonials.length) % testimonials.length;
    goTo(prevIndex, "left");
  }, [current, goTo]);

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = testimonials[current];

  return (
    <section className="py-20 md:py-24 px-4 md:px-12 dark:bg-zinc-900 bg-gray-50 relative overflow-hidden transition-colors duration-500 dark:border-y dark:border-white/5">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: Image + Label */}
        <div className="reveal">
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            WHAT OUR CLIENTS SAY
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-8 dark:text-white text-gray-900">
            Real Results{" "}
            <span className="text-orange-gradient">From Clients</span>
          </h2>

          {/* Client main image */}
          <div className="relative group max-w-xs sm:max-w-md">
            <div className="absolute inset-0 bg-orange-gradient blur-[80px] opacity-10 -z-1" />
            <div
              className="rounded-full overflow-hidden aspect-square border-[8px] dark:border-white/5 border-black/5 relative shadow-xl"
              style={{
                transition: "opacity 0.35s ease",
                opacity: animating ? 0 : 1,
              }}
            >
              <img
                key={testimonial.id}
                src={testimonial.mainImage}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt={testimonial.name}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-orange-gradient rounded-full flex items-center justify-center text-white">
                <Quote size={28} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex space-x-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "right" : "left")}
                className={`transition-all duration-300 rounded-full ${i === current
                  ? "w-8 h-3 bg-orange-500"
                  : "w-3 h-3 bg-gray-300 dark:bg-white/20 hover:bg-orange-400"
                  }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Testimonial content */}
        <div className="reveal">
          {/* Stars */}
          <div className="flex space-x-1 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={18} fill="#FF6B00" className="text-orange-500" />
            ))}
          </div>

          {/* Quote text */}
          <div
            style={{
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity: animating ? 0 : 1,
              transform: animating
                ? direction === "right"
                  ? "translateX(30px)"
                  : "translateX(-30px)"
                : "translateX(0)",
            }}
          >
            <p className="text-xl md:text-2xl font-medium leading-snug dark:text-gray-300 text-gray-600 italic mb-8 md:mb-10">
              "{testimonial.text}"
            </p>

            {/* Client info + nav */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                {/* Initials avatar — professional & authentic for real clients */}
                <div className="w-16 h-16 rounded-full border-2 border-orange-500/40 bg-orange-gradient flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                  {testimonial.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h4 className="text-xl font-bold dark:text-white text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="dark:text-gray-500 text-gray-400 text-sm font-semibold">
                    {testimonial.role},{" "}
                    <span className="text-orange-500">{testimonial.company}</span>
                  </p>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex space-x-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border dark:border-white/20 border-black/10 flex items-center justify-center dark:text-white text-gray-900 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full bg-orange-gradient flex items-center justify-center hover:opacity-90 transition-all text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>


    </section>
  );
};

export default Testimonials;
