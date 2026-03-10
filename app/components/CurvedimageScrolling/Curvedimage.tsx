//one image curved scroll.....

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function GallerySection() {
//   const images = Array(12).fill("/demo.jpg");

//   const [index, setIndex] = useState(0);

//   const next = () =>
//     setIndex((prev) => (prev + 1) % images.length);

//   const prev = () =>
//     setIndex((prev) =>
//       prev === 0 ? images.length - 1 : prev - 1
//     );

//   return (
//     <section className="w-full bg-[#0d0d0d] py-20 border-t border-white/10 px-6">

//       <div className="mx-auto max-w-[1200px] flex items-center gap-6">

//         {/* LEFT ARROW */}
//         <button
//           onClick={prev}
//           className="bg-[#090d12] text-2xl tracking-wide text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition"
//         >
//           &lt;
//         </button>

//         {/* CURVED VIEWPORT */}
//         <div className="flex-1 relative overflow-hidden">

//           {/* CURVED SHAPE */}
//           <svg width="0" height="0">
//             <defs>
//               <clipPath id="galleryCurve" clipPathUnits="objectBoundingBox">
//                 <path
//                   d="
//                     M0,0
//                     Q0.5,0.08 1,0
//                     L1,1
//                     Q0.5,0.92 0,1
//                     Z
//                   "
//                 />
//               </clipPath>
//             </defs>
//           </svg>

//           <div
//             className="w-full h-[450px] bg-[#090d12] overflow-hidden"
//             style={{ clipPath: "url(#galleryCurve)" }}
//           >
//             {/* SLIDING TRACK */}
//             <motion.div
//               animate={{ x: `-${index * 100}%` }}
//               transition={{
//                 duration: 0.7,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="flex h-full"
//             >
//               {images.map((src, i) => (
//                 <div
//                   key={i}
//                   className="min-w-full flex items-center justify-center"
//                 >
//                   <img
//                     src={src}
//                     draggable={false}
//                     className="w-full h-full object-contain select-none"
//                     alt="gallery"
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* RIGHT ARROW */}
//         <button
//           onClick={next}
//           className="bg-[#090d12] text-2xl tracking-wide text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition"
//         >
//           &gt;
//         </button>

//       </div>

//     </section>
//   );
// }


// //three images curved scroll....

// "use client";

// import { useRef, useEffect, useState } from "react";

// export default function GallerySection() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   const images = Array(12).fill("/demo.jpg");

//   const IMAGE_WIDTH = 420; // width of one image
//   const GAP = 32; // gap-8 = 32px

//   const isDragging = useRef(false);
//   const lastX = useRef(0);

//   const updateScrollState = () => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const { scrollLeft, scrollWidth, clientWidth } = el;

//     setCanScrollLeft(scrollLeft > 0);
//     setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
//   };

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;

//     scrollRef.current.scrollBy({
//       left: direction === "left"
//         ? -(IMAGE_WIDTH + GAP)
//         : IMAGE_WIDTH + GAP,
//       behavior: "smooth",
//     });
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     isDragging.current = true;
//     lastX.current = e.clientX;
//     document.body.style.userSelect = "none";
//   };

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isDragging.current || !scrollRef.current) return;

//       const delta = e.clientX - lastX.current;
//       scrollRef.current.scrollLeft -= delta;
//       lastX.current = e.clientX;
//       updateScrollState();
//     };

//     const handleMouseUp = () => {
//       isDragging.current = false;
//       document.body.style.userSelect = "auto";
//     };

//     const el = scrollRef.current;
//     el?.addEventListener("scroll", updateScrollState);

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     updateScrollState();

//     return () => {
//       el?.removeEventListener("scroll", updateScrollState);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   return (
//     <section className="w-full bg-[#0d0d0d] py-20 border-t border-white/10 px-6">

//       <div className="mx-auto max-w-[1400px]">
//         <div className="flex items-center gap-6">

//           {/* LEFT ARROW */}
//           {canScrollLeft && (
//             <button
//               onClick={() => scroll("left")}
//               className="bg-[#090d12] text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition"
//             >
//               ←
//             </button>
//           )}

//           {/* CURVED GALLERY */}
//           <div className="flex-1 overflow-hidden relative">

//             {/* CURVE SHAPE */}
//             <svg width="0" height="0">
//               <defs>
//                 <clipPath id="galleryCurve" clipPathUnits="objectBoundingBox">
//                   <path
//                     d="
//                       M0,0
//                       Q0.5,0.08 1,0
//                       L1,1
//                       Q0.5,0.92 0,1
//                       Z
//                     "
//                   />
//                 </clipPath>
//               </defs>
//             </svg>

//             <div
//               ref={scrollRef}
//               onMouseDown={handleMouseDown}
//               className="
//                 flex gap-8
//                 overflow-x-auto
//                 no-scrollbar
//                 h-[400px]
//               "
//               style={{
//                 clipPath: "url(#galleryCurve)",
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {images.map((src, index) => (
//                 <img
//                   key={index}
//                   src={src}
//                   draggable={false}
//                   alt={`Gallery ${index}`}
//                   className="
//                     flex-shrink-0
//                     w-[420px]
//                     h-full
//                     object-cover
//                     select-none
//                   "
//                 />
//               ))}
//             </div>

//           </div>

//           {/* RIGHT ARROW */}
//           {canScrollRight && (
//             <button
//               onClick={() => scroll("right")}
//               className="bg-[#090d12] text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition"
//             >
//               →
//             </button>
//           )}

//         </div>
//       </div>

//     </section>
//   );
// }

// "use client";

// import { useRef, useEffect, useState } from "react";

// export default function GallerySection() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   /* ✅ ADDED — popup state */
//   const [activeImage, setActiveImage] = useState<number | null>(null);

//   const images = Array(12).fill("/demo.jpg");

//   const IMAGE_WIDTH = 420;
//   const GAP = 32;

//   const isDragging = useRef(false);
//   const lastX = useRef(0);

//   const updateScrollState = () => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const { scrollLeft, scrollWidth, clientWidth } = el;

//     setCanScrollLeft(scrollLeft > 0);
//     setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
//   };

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollRef.current) return;

//     scrollRef.current.scrollBy({
//       left:
//         direction === "left"
//           ? -(IMAGE_WIDTH + GAP)
//           : IMAGE_WIDTH + GAP,
//       behavior: "smooth",
//     });
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     isDragging.current = true;
//     lastX.current = e.clientX;
//     document.body.style.userSelect = "none";
//   };

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isDragging.current || !scrollRef.current) return;

//       const delta = e.clientX - lastX.current;
//       scrollRef.current.scrollLeft -= delta;
//       lastX.current = e.clientX;
//       updateScrollState();
//     };

//     const handleMouseUp = () => {
//       isDragging.current = false;
//       document.body.style.userSelect = "auto";
//     };

//     const el = scrollRef.current;
//     el?.addEventListener("scroll", updateScrollState);

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     updateScrollState();

//     return () => {
//       el?.removeEventListener("scroll", updateScrollState);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   return (
//     <section className="w-full bg-[#0d0d0d] py-20 border-t border-white/10 px-6">

//       <div className="mx-auto max-w-[1400px]">
//         <div className="flex items-center gap-6">

//           {/* LEFT ARROW */}
//           {canScrollLeft && (
//             <button
//               onClick={() => scroll("left")}
//               className="bg-[#090d12] text-2xl tracking-wide text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition"
//             >
//               &lt;
//             </button>
//           )}

//           {/* CURVED GALLERY */}
//           <div className="flex-1 overflow-hidden relative">

//             <svg width="0" height="0">
//               <defs>
//                 <clipPath id="galleryCurve" clipPathUnits="objectBoundingBox">
//                   <path
//                     d="
//                       M0,0
//                       Q0.5,0.08 1,0
//                       L1,1
//                       Q0.5,0.92 0,1
//                       Z
//                     "
//                   />
//                 </clipPath>
//               </defs>
//             </svg>

//             <div
//               ref={scrollRef}
//               onMouseDown={handleMouseDown}
//               className="
//                 flex gap-8
//                 overflow-x-auto
//                 no-scrollbar
//                 h-[400px]
//               "
//               style={{
//                 clipPath: "url(#galleryCurve)",
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {images.map((src, index) => (
//                 <img
//                   key={index}
//                   src={src}
//                   draggable={false}
//                   alt={`Gallery ${index}`}
//                   onClick={() => setActiveImage(index)}  
//                   className="
//                     flex-shrink-0
//                     w-[420px]
//                     h-full
//                     object-cover
//                     select-none
//                     cursor-pointer
//                   "
//                 />
//               ))}
//             </div>

//           </div>

//           {/* RIGHT ARROW */}
//           {canScrollRight && (
//             <button
//               onClick={() => scroll("right")}
//               className="bg-[#090d12] text-2xl tracking-wide text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition"
//             >
//               &gt;
//             </button>
//           )}

//         </div>
//       </div>

//       {/* ✅ ADDED — POPUP CURVED IMAGE */}
//       {activeImage !== null && (
//         <div
//           className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
//           onClick={() => setActiveImage(null)}
//         >
//           <div
//             className="w-full max-w-[900px] h-[500px]"
//             style={{ clipPath: "url(#galleryCurve)" }}
//           >
//             <img
//               src={images[activeImage]}
//               className="w-full h-full object-contain"
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

"use client";

import { useRef, useEffect, useState } from "react";

export default function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [activeImage, setActiveImage] = useState<number | null>(null);

  const images = Array(12).fill("/demo.jpg");

  const GAP = 32;

  const isDragging = useRef(false);
  const lastX = useRef(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const isDesktop = window.innerWidth >= 1024;

    const imageWidth = isDesktop
      ? (el.clientWidth - GAP * 2) / 3
      : el.clientWidth;

    el.scrollBy({
      left:
        direction === "left"
          ? -(imageWidth + GAP)
          : imageWidth + GAP,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;

      const delta = e.clientX - lastX.current;
      scrollRef.current.scrollLeft -= delta;
      lastX.current = e.clientX;
      updateScrollState();
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "auto";
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", updateScrollState);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    updateScrollState();

    return () => {
      el?.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <section className="w-full bg-[#0d0d0d] py-20 border-t border-white/10 px-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-6">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`bg-[#090d12] text-2xl tracking-wide text-white rounded-full w-12 h-12 flex items-center justify-center transition ${
              !canScrollLeft
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white hover:text-black"
            }`}
          >
            &lt;
          </button>

          {/* CURVED GALLERY */}
          <div className="flex-1 overflow-hidden relative">

            <svg width="0" height="0">
              <defs>
                <clipPath id="galleryCurve" clipPathUnits="objectBoundingBox">
                  <path
                    d="
                      M0,0
                      Q0.5,0.08 1,0
                      L1,1
                      Q0.5,0.92 0,1
                      Z
                    "
                  />
                </clipPath>
              </defs>
            </svg>

            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              className="
                flex gap-8
                overflow-x-auto
                snap-x snap-mandatory
                no-scrollbar
                h-[300px] sm:h-[400px]
              "
              style={{
                clipPath: "url(#galleryCurve)",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  draggable={false}
                  alt={`Gallery ${index}`}
                  onClick={() => setActiveImage(index)}
                  className="
                    flex-shrink-0
                    snap-center
                    w-full
                    lg:w-[calc((100%-64px)/3)]
                    h-full
                    object-cover
                    select-none
                    cursor-pointer
                  "
                />
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`bg-[#090d12] text-2xl tracking-wide text-white rounded-full w-12 h-12 flex items-center justify-center transition ${
              !canScrollRight
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white hover:text-black"
            }`}
          >
            &gt;
          </button>

        </div>
      </div>

      {/* POPUP */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="w-full max-w-[900px] h-[500px]"
            style={{ clipPath: "url(#galleryCurve)" }}
          >
            <img
              src={images[activeImage]}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}