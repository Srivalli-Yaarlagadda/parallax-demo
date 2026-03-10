// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function HoverFillText({ text }: { text: string }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="relative inline-block cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Outline Text */}
//       <span
//         className="text-[80px] font-bold tracking-tight text-transparent select-none"
//         style={{ WebkitTextStroke: "1px white" }}
//       >
//         {text}
//       </span>

//       {/* Natural Fill Layer */}
//       <motion.span
//         initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
//         animate={{
//           clipPath: hovered
//             ? "inset(0% 0% 0% 0%)"
//             : "inset(100% 0% 0% 0%)",
//         }}
//         transition={{
//           duration: 1.6,
//           ease: [0.25, 1, 0.5, 1],
//         }}
//         className="absolute inset-0 text-white pointer-events-none"
//       >
//         <span className="text-[80px] font-bold tracking-tight block">
//           {text}
//         </span>
//       </motion.span>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface HoverFillTextProps {
  text: string;
  href: string;
  closeMenu: () => void;  // menu close callback
  exitDuration?: number;  // duration of curtain exit
}

export default function HoverFillText({
  text,
  href,
  closeMenu,
  exitDuration = 0.8,
}: HoverFillTextProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const fillDuration = 0.4; // fill animation duration

  const handleClick = () => {
    setHovered(true); // start fill animation

    // Step 1: after fill completes, close the menu
    setTimeout(() => {
      closeMenu?.();

      // Step 2: after menu exit completes, redirect
      setTimeout(() => {
        if (window.location.pathname === href) {
          window.location.reload();
        } else {
          router.push(href);
        }
      }, exitDuration * 1000);
    }, fillDuration * 1000);
  };

  return (
    <div
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Outline Text */}
      <span
        className="text-4xl md:text-[80px] font-bold tracking-tight text-transparent select-none"
        style={{ WebkitTextStroke: "1px white" }}
      >
        {text}
      </span>

      {/* Fill Layer */}
      <motion.span
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: hovered ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: fillDuration, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 text-white pointer-events-none"
      >
        <span className="text-4xl md:text-[80px] font-bold tracking-tight block">
          {text}
        </span>
      </motion.span>
    </div>
  );
}