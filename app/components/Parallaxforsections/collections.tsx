"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Living Room", image: "/livingroom.avif" },
  { name: "Kitchen", image: "/kitchen.jpg" },
  { name: "Dining Area", image: "/diningarea.jpg" },
  { name: "Bathrooms", image: "/bathroom.jpg" },
];

export default function CollectionSection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleClick = (image: string) => {
    if (activeImage === image) {
      setActiveImage(null); // go back to base image
    } else {
      setActiveImage(image);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Base Background */}
      <img
        src="/demo.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Animated New Image */}
      <AnimatePresence>
        {activeImage && (
          <motion.img
            key={activeImage}
            src={activeImage}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover z-20"
          />
        )}
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="relative z-30 h-full flex flex-col justify-between py-16 px-6 max-w-[1400px] mx-auto text-black">

        {/* TOP HEADING */}
        <h2 className="text-center text-4xl md:text-5xl font-serif">
          COLLECTION
        </h2>

        {/* BOTTOM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleClick(cat.image)}
              className="cursor-pointer border border-white/40 p-6 backdrop-blur-sm hover:bg-white hover:text-black transition"
            >
              <h3 className="font-serif text-lg mb-3">
                {cat.name}
              </h3>
              <p className="text-sm opacity-80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}