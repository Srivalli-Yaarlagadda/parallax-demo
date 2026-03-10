// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function HeroSection() {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   // 🔥 Background zoom effect
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
//   const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);

//   // Content fade + move on scroll
//   const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
//   const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

//   return (
//     <section
//       ref={ref}
//       className="relative h-screen overflow-hidden flex items-center justify-center"
//     >
//       {/* Zooming Background */}
//       <motion.div
//         style={{ scale, y: bgY }}
//         className="absolute inset-0"
//       >
//         <div
//           className="w-full h-full bg-cover bg-center will-change-transform"
//           style={{ backgroundImage: "url('/demo.jpg')" }}
//         />
//       </motion.div>

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60" />

//       {/* Minimal Content */}
//       <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center justify-center">
//         {/* Heading comes from top, fully off-screen */}
//         <motion.h1
//           initial={{ opacity: 0, y: "-100vh" }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white"
//         >
//           Building Modern Digital Experiences
//         </motion.h1>

//         {/* Description comes from bottom, fully off-screen */}
//         <motion.p
//           initial={{ opacity: 0, y: "100vh" }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
//           className="text-lg md:text-xl text-white/80 leading-relaxed"
//         >
//           We create scalable, high-performance digital solutions that
//           elevate brands and drive meaningful growth.
//         </motion.p>
//       </div>
//     </section>
//   );
// }

// mountain code....


// "use client";

// import { motion, useScroll, useTransform, useSpring } from "framer-motion";
// import { useRef } from "react";

// export default function HeroSection() {
//   const sectionRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end start"],
//   });

//   // Mountain rises from 50% to 0%
//   const rawMountainY = useTransform(
//     scrollYProgress,
//     [0, 1],
//     ["40%", "0%"]
//   );

//   // Add smooth spring effect
//   const mountainY = useSpring(rawMountainY, {
//     stiffness: 80,
//     damping: 20,
//     mass: 0.5,
//   });

//   return (
//     <section ref={sectionRef} className="relative h-[200vh]">
      
//       {/* Sticky Hero */}
//       <div className="sticky top-0 h-screen overflow-hidden">

//         {/* SKY (completely fixed) */}
//         <img
//           src="/sky.avif"
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />

//         {/* HEADING */}
//         <div className="absolute inset-0 flex items-center justify-center z-10">
//           <h1 className="text-white text-6xl md:text-8xl font-bold -translate-y-10">
//             Welcome folks
//           </h1>
//         </div>

//         {/* MOUNTAIN (smooth rise) */}
//         <motion.img
//           src="/mountain.png"
//           style={{ y: mountainY }}
//           className="absolute bottom-0 left-0 
//                      w-full h-auto
//                      object-bottom
//                      z-20"
//         />

//       </div>
//     </section>
//   );
// }

// original code.....

// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function HeroSection() {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   /*Scroll Animations (UNCHANGED)*/

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
//   const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);

//   const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
//   const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

//   return (
//     <section
//       ref={ref}
//       className="relative h-screen overflow-hidden flex items-center justify-center bg-white"
//     >
//       {/* 🔥 VERTICAL 3-PANEL BG */}

//       <motion.div style={{ scale, y: bgY }} className="absolute inset-0">

//         {/* LEFT PANEL */}
//         <motion.div
//           initial={{ y: "120%" }}
//           animate={{ y: 0 }}
//           transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
//           className="absolute left-0 top-0 h-full w-1/3 overflow-hidden"
//         >
//           <div
//             className="w-[300%] h-full bg-cover bg-left"
//             style={{ backgroundImage: "url('/demo.jpg')" }}
//           />
//         </motion.div>

//         {/* CENTER PANEL */}
//         <motion.div
//           initial={{ y: "140%" }}
//           animate={{ y: 0 }}
//           transition={{ 
//             duration: 1.2,
//             delay: 0.6,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//           className="absolute left-1/3 top-0 h-full w-1/3 overflow-hidden"
//         >
//           <div
//             className="w-[300%] h-full bg-cover bg-center -translate-x-1/3"
//             style={{ backgroundImage: "url('/demo.jpg')" }}
//           />
//         </motion.div>

//         {/* RIGHT PANEL */}
//         <motion.div
//           initial={{ y: "160%" }}
//           animate={{ y: 0 }}
//           transition={{
//             duration: 1.2,
//             delay: 1.2,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//           className="absolute right-0 top-0 h-full w-1/3 overflow-hidden"
//         >
//           <div
//             className="w-[300%] h-full bg-cover bg-right -translate-x-2/3"
//             style={{ backgroundImage: "url('/demo.jpg')" }}
//           />
//         </motion.div>
//       </motion.div>

//       {/* ✅ Overlay appears AFTER panels land */}
//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{
//           delay: 0.8,
//           duration: 0.8,
//           ease: "easeOut",
//         }}
//         className="absolute inset-0 bg-black/60"
//       /> */}

//       {/* hero content */}

//       <motion.div
//         style={{ opacity, y: contentY }}
//         className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center justify-center"
//       >
//         <motion.h1
//           initial={{ opacity: 0, y: "-100vh" }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white"
//         >
//           Building Modern Digital Experiences
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: "100vh" }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
//           className="text-lg md:text-xl text-white/80 leading-relaxed"
//         >
//           We create scalable, high-performance digital solutions that
//           elevate brands and drive meaningful growth.
//         </motion.p>
//       </motion.div>
//     </section>
//   );
// }


"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scaleOnScroll = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

  const duration = 1.4;

  return (
    <section
      ref={ref}
      className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-white"
    >
      {/* BACKGROUND IMAGE */}
      <motion.div
        style={{ y: bgY, scale: scaleOnScroll }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/livingroom.avif')" }}
        />
      </motion.div>

      {/* WHITE CURTAIN PANELS */}

      {/* PANEL 1 */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          duration,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute left-0 bottom-0 h-full w-1/3 bg-white z-20"
      />

      {/* PANEL 2 (starts at 30% of panel 1) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          duration,
          delay: duration * 0.3, // 30%
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute left-1/3 bottom-0 h-full w-1/3 bg-white z-20"
      />

      {/* PANEL 3 (starts at 20% of panel 2) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          duration,
          delay: duration * 0.3 + duration * 0.2, // 30% + 20%
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute right-0 bottom-0 h-full w-1/3 bg-white z-20"
      />

      {/* HERO CONTENT */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-30 text-center px-6 max-w-3xl flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: "-100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white"
        >
          Building Modern Digital Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          className="text-lg md:text-xl text-white/80 leading-relaxed"
        >
          We create scalable, high-performance digital solutions that
          elevate brands and drive meaningful growth.
        </motion.p>
      </motion.div>
    </section>
  );
}