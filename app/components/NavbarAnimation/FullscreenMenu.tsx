// // "use client";

// // import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// // import HoverFillText from "../components/HoverFillText";

// // const links = ["Home", "About", "Collection", "Brands", "Gallery", "Blog", "ContactUs"];

// // export default function FullscreenMenu({ close }: { close: () => void }) {
// //   const mouseX = useMotionValue(0);

// //   // Smooth cursor movement
// //   const springX = useSpring(mouseX, {
// //     stiffness: 80,
// //     damping: 20,
// //   });

// //   // Map cursor position to horizontal shift
// //   const moveX = useTransform(springX, [0, 1920], [120, -120]);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       onMouseMove={(e) => mouseX.set(e.clientX)}
// //       className="fixed inset-0 bg-black flex items-center justify-center z-40"
// //     >
// //       {/* Close Button */}
// //       <button
// //         onClick={close}
// //         className="absolute top-6 right-6 text-white text-3xl"
// //       >
// //         ✕
// //       </button>

// //       <div className="flex gap-20">
// //         {links.map((link, i) => (
// //           <motion.div key={i} style={{ x: moveX }}>
// //             <HoverFillText text={link} />
// //           </motion.div>
// //         ))}
// //       </div>
// //     </motion.div>
// //   );
// // }

// "use client";

// import {
//   motion,
//   useMotionValue,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { useRef, useEffect, useState } from "react";
// import HoverFillText from "../components/HoverFillText";

// const links = [
//   "Home",
//   "About",
//   "Collection",
//   "Brands",
//   "Gallery",
//   "Blog",
//   "ContactUs",
// ];

// export default function FullscreenMenu({
//   close,
// }: {
//   close: () => void;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const navRef = useRef<HTMLDivElement>(null);

//   /* =============================
//      CURSOR MOVEMENT
//   ============================= */

//   const mouseX = useMotionValue(0);

//   const springX = useSpring(mouseX, {
//     stiffness: 200,
//     damping: 35,
//   });

//   const [maxMove, setMaxMove] = useState(0);

//   useEffect(() => {
//     const updateWidth = () => {
//       if (!containerRef.current || !navRef.current) return;

//       const containerWidth =
//         containerRef.current.offsetWidth;

//       const navWidth = navRef.current.scrollWidth;

//       const overflow = navWidth - containerWidth;

//       setMaxMove(overflow > 0 ? overflow : 0);
//     };

//     updateWidth();
//     window.addEventListener("resize", updateWidth);

//     return () =>
//       window.removeEventListener("resize", updateWidth);
//   }, []);

//   const moveX = useTransform(
//     springX,
//     [0, window.innerWidth],
//     [maxMove / 2, -maxMove / 2]
//   );

//   //  CURTAIN ANIMATION
//   return (
//     <motion.div
//       initial={{ y: "-100%" }}
//       animate={{
//         y: "0%",
//         transition: {
//           duration: 0.9,
//           ease: [0.77, 0, 0.175, 1],
//         },
//       }}
//       exit={{
//         y: "-100%",
//         transition: {
//           duration: 0.8,
//           ease: [0.77, 0, 0.175, 1],
//         },
//       }}
//       onMouseMove={(e) => mouseX.set(e.clientX)}
//       className="fixed inset-0 bg-black z-50 flex items-center justify-center"
//     >

//       {/* VIEWPORT */}
//       <div
//         ref={containerRef}
//         className="w-full overflow-hidden flex justify-center"
//       >
//         {/* MOVING NAV LINKS */}
//         <motion.div
//           ref={navRef}
//           style={{ x: moveX }}
//           className="flex gap-20 px-[20vw] whitespace-nowrap"
//         >
//           {links.map((link, i) => (
//             <HoverFillText key={i} text={link} />
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import HoverFillText from "./HoverFillText";

const links = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Collection", href: "/collection" },
  { text: "Brands", href: "/brands" },
  { text: "Gallery", href: "/gallery" },
  { text: "Blog", href: "/blog" },
  { text: "ContactUs", href: "/contact" },
];

export default function FullscreenMenu({ close }: { close: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 35 });
  const [maxMove, setMaxMove] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* Check screen size and update widths */
  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current || !navRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const navWidth = navRef.current.scrollWidth;
      const overflow = navWidth - containerWidth;
      setMaxMove(overflow > 0 ? overflow : 0);
      setIsMobile(window.innerWidth < 768);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const moveX = useTransform(springX, [0, window.innerWidth], [maxMove / 2, -maxMove / 2]);

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: "0%", transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } }}
      onMouseMove={(e) => !isMobile && mouseX.set(e.clientX)}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div
        ref={containerRef}
        className={`w-full h-full flex justify-center items-center overflow-hidden`}
      >
        {/* Nav Links */}
        <motion.div
          ref={navRef}
          style={{ x: !isMobile ? moveX : 0 }}
          className={`flex whitespace-nowrap ${
            isMobile
              ? "flex-col gap-6 items-center justify-center text-center"
              : "flex-row gap-20 px-[20vw]"
          }`}
        >
          {links.map((link) => (
            <HoverFillText key={link.text} text={link.text} href={link.href} closeMenu={close}/>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}