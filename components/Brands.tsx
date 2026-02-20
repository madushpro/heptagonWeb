import React from "react";

const Brands: React.FC = () => {
  const brands = ["Airbnb", "Amazon", "FedEx", "Google", "Microsoft"];
  return (
    <section className="py-20 px-12 border-y dark:border-white/5  border-black/5 dark:bg-black/30  bg-zinc-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
        {brands.map((brand) => (
          <div
            key={brand}
            className="text-3xl font-bold tracking-tight dark:text-white/40  text-gray-400 hover:text-orange-500 cursor-default transition-colors"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
