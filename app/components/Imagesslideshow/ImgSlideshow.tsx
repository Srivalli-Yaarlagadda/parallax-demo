// "use client";

// import { motion, useAnimation, useInView, Variants } from "framer-motion";
// import { useEffect, useRef } from "react";

// const sections = [
//   { title: "Strategy & Planning", desc: "We begin with deep research and understanding of your business goals." },
//   { title: "Design & Experience", desc: "Crafting visually stunning and high-performing interfaces." },
//   { title: "Development & Build", desc: "Engineering scalable and optimized digital solutions." },
//   { title: "Launch & Growth", desc: "Continuous monitoring, testing and improvement for long-term success." },
// ];

// function ZigZagItem({ item, index }: any) {
//   const ref = useRef(null);
//   const controls = useAnimation();
//   const isInView = useInView(ref, { amount: 0.4 });

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [isInView, controls]);

//   const isImageLeft = index % 2 === 0;

//   // ✅ Type-safe variants
//   const variants: Variants = {
//     hidden: (custom: "left" | "right") => ({
//       opacity: 0,
//       x: custom === "left" ? -200 : 200,
//     }),
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-16 ${index !== 0 ? "mt-40" : ""}`}
//     >
//       {/* IMAGE */}
//       <motion.div
//         custom={isImageLeft ? "left" : "right"}
//         initial="hidden"
//         animate={controls}
//         variants={variants}
//         className={`relative overflow-hidden aspect-[4/3] ${isImageLeft ? "order-1" : "order-2"}`}
//       >
//         <img
//           src="/demo.jpg"
//           alt=""
//           className="w-full h-full object-cover rounded-2xl shadow-xl will-change-transform"
//           draggable={false}
//         />
//       </motion.div>

//       {/* CONTENT */}
//       <motion.div
//         custom={isImageLeft ? "right" : "left"}
//         initial="hidden"
//         animate={controls}
//         variants={variants}
//         className={`space-y-6 ${isImageLeft ? "order-2" : "order-1"}`}
//       >
//         <h2 className="text-4xl font-bold">{item.title}</h2>
//         <p className="text-lg text-gray-600">{item.desc}</p>
//         <p className="text-gray-500">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           Quisque at eros sed urna fermentum vulputate.
//           Integer nec libero sed nulla facilisis interdum.
//         </p>
//         <ul className="space-y-3 text-gray-700">
//           <li>✔ Research & Analysis</li>
//           <li>✔ Custom Strategy Creation</li>
//           <li>✔ User Experience Optimization</li>
//           <li>✔ Performance Tracking</li>
//         </ul>
//         <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
//           Learn More
//         </button>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default function ZigZagSection() {
//   return (
//     <section className="px-6 py-20 bg-white">
//       <div className="max-w-7xl mx-auto">
//         {sections.map((item, index) => (
//           <ZigZagItem key={index} item={item} index={index} />
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";

export default function GallerySection() {
  const images = Array(12).fill("/demo.jpg");

  const [scrollIndex, setScrollIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [imageWidth, setImageWidth] = useState(380);
  const [imageHeight, setImageHeight] = useState(340);
  const [gap, setGap] = useState(40);

  useEffect(() => {
    const updateLayout = () => {
      const containerMaxWidth = 1400;
      const sidePadding = 48; // px-6 left + right
      const arrowSpace = 96; // two arrows approx

      if (window.innerWidth >= 1024) {
        // Always 3 images
        setVisibleCount(3);
        setGap(40);
        setImageHeight(340);

        // Calculate dynamic width so 3 images fit perfectly
        const availableWidth =
          Math.min(window.innerWidth, containerMaxWidth) -
          sidePadding -
          arrowSpace;

        const calculatedWidth =
          (availableWidth - gap * 2) / 3;

        setImageWidth(calculatedWidth);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(1);
        setGap(24);
        setImageWidth(window.innerWidth - 160);
        setImageHeight(340);
      } else {
        setVisibleCount(1);
        setGap(20);
        setImageWidth(window.innerWidth - 80);
        setImageHeight(280);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [gap]);

  const maxIndex = images.length - visibleCount;
  const activeIndex =
    visibleCount === 3 ? scrollIndex + 1 : scrollIndex;

  const handleScroll = (dir: "left" | "right") => {
    if (dir === "left") {
      setScrollIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setScrollIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  return (
    <section className="w-full bg-[#0d0d0d] py-24 px-6">
      <div className="max-w-[1400px] mx-auto">

        {/* Title */}
        <div className="mb-16 text-white max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-6">
            Our Latest Projects
          </h2>
          <p className="text-white/70">
            Click arrows to scroll horizontally.
          </p>
        </div>

        <div className="flex items-center justify-center gap-8">

          {/* LEFT */}
          <button
            onClick={() => handleScroll("left")}
            disabled={scrollIndex === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition ${
              scrollIndex === 0
                ? "bg-[#090d12] text-white opacity-30 cursor-not-allowed"
                : "bg-[#090d12] text-white hover:bg-white hover:text-black"
            }`}
          >
            &lt;
          </button>

          {/* VIEWPORT */}
          <div
            className="overflow-hidden"
            style={{
              width:
                imageWidth * visibleCount +
                gap * (visibleCount - 1),
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                gap: `${gap}px`,
                transform: `translateX(-${
                  scrollIndex * (imageWidth + gap)
                }px)`,
              }}
            >
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`
                    flex-shrink-0 transition-all duration-500 ease-out
                    ${
                      index === activeIndex
                        ? "scale-125 -translate-y-6 z-20"
                        : "scale-90 opacity-50"
                    }
                  `}
                  style={{ width: `${imageWidth}px` }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{ height: `${imageHeight}px` }}
                    className="w-full object-cover shadow-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <button
            onClick={() => handleScroll("right")}
            disabled={scrollIndex === maxIndex}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition ${
              scrollIndex === maxIndex
                ? "bg-[#090d12] text-white opacity-30 cursor-not-allowed"
                : "bg-[#090d12] text-white hover:bg-white hover:text-black"
            }`}
          >
            &gt;
          </button>

        </div>
      </div>
    </section>
  );
}