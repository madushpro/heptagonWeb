import React from "react";
import logo1 from "../assets/Frame 2.png";
import logo2 from "../assets/Frame 3.png";
import logo3 from "../assets/Frame 5.png";
import logo4 from "../assets/Frame 6.png";
import logo5 from "../assets/Frame 1.jpg";

const Brands: React.FC = () => {
  const brands = [
    { name: "CeylonLifecare", src: logo1 },
    { name: "Caresoul Ceylon", src: logo2 },
    { name: "Vitaglow", src: logo3 },
    { name: "CFC Pharmacy", src: logo4 },
    { name: "Chandra Furniture", src: logo5 },
  ];

  return (
    <section className="py-14 md:py-10 px-4 md:px-12 border-y dark:border-white/5 border-black/5 dark:bg-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-x-16 md:gap-x-20 gap-y-12 transition-all duration-700">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group relative flex items-center justify-center"
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
