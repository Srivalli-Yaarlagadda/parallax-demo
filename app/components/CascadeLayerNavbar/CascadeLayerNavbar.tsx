// "use client";

// import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { DEFAULT_CASCADE_LAYER_COLORS, type CascadeNavbarProps } from "./types";
// import Typography from "@/lib/typography";

// const LAYER_START_DELAY_MS = 80;
// const LAYER_DURATION_MS = 280;
// const LAYER_GAP_BETWEEN_MS = -48;
// const LAYER_FINAL_BLUE_EXTRA_DELAY_MS = 120;
// const LAYER_EASE_IN = "cubic-bezier(0.7, 0, 0.9, 0.3)";
// const LAYER_EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";
// const HAMBURGER_TRAVEL_MS = 280;
// const HAMBURGER_STAGGER_MS = 140;

// interface AnimatedUnderlineLinkProps {
//   href: string;
//   children: ReactNode;
//   className?: string;
//   underlineClassName?: string;
//   onClick?: () => void;
// }

// function AnimatedUnderlineLink({
//   href,
//   children,
//   className = "",
//   underlineClassName = "",
//   onClick,
// }: AnimatedUnderlineLinkProps) {
//   const [underlinePhase, setUnderlinePhase] = useState<"hidden-left" | "visible" | "hidden-right">(
//     "hidden-left",
//   );

//   const showUnderline = () => {
//     setUnderlinePhase((current) => {
//       if (current === "hidden-right") return "hidden-left";
//       return current;
//     });
//     requestAnimationFrame(() => setUnderlinePhase("visible"));
//   };

//   return (
//     <Link
//       href={href}
//       className={`group relative inline-block no-underline ${className}`}
//       onMouseEnter={showUnderline}
//       onMouseLeave={() => setUnderlinePhase("hidden-right")}
//       onFocus={showUnderline}
//       onBlur={() => setUnderlinePhase("hidden-right")}
//       onClick={onClick}
//     >
//       {children}
//       <span
//         aria-hidden
//         className={`pointer-events-none absolute bottom-0 left-0 h-px w-full bg-current transition-[clip-path] duration-300 ease-out ${underlineClassName}`}
//         style={{
//           clipPath:
//             underlinePhase === "visible"
//               ? "inset(0 0 0 0)"
//               : underlinePhase === "hidden-right"
//                 ? "inset(0 0 0 100%)"
//                 : "inset(0 100% 0 0)",
//         }}
//         onTransitionEnd={() => {
//           if (underlinePhase === "hidden-right") {
//             setUnderlinePhase("hidden-left");
//           }
//         }}
//       />
//     </Link>
//   );
// }

// function useLayerTimings(layerColors: readonly string[]) {
//   return useMemo(() => {
//     const n = layerColors.length;
//     const layerStepMs = Math.max(80, LAYER_DURATION_MS + LAYER_GAP_BETWEEN_MS);
//     const getExtraDelay = (index: number) => (index === n - 1 ? LAYER_FINAL_BLUE_EXTRA_DELAY_MS : 0);
//     const openDelay = (index: number) =>
//       LAYER_START_DELAY_MS + index * layerStepMs + getExtraDelay(index);
//     const openSequenceEndMs =
//       Math.max(...layerColors.map((_, index) => openDelay(index) + LAYER_DURATION_MS));
//     const contentDelayMs = openSequenceEndMs + 40;
//     const closeDelay = (index: number) =>
//       Math.max(0, n - 1 - index) * layerStepMs;
//     const closeSequenceEndMs = Math.max(...layerColors.map((_, index) => closeDelay(index) + LAYER_DURATION_MS)) + 50;
//     return {
//       n,
//       openDelay,
//       closeDelay,
//       contentDelayMs,
//       closeSequenceEndMs,
//     };
//   }, [layerColors]);
// }

// export function CascadeLayerNavbar({
//   logo,
//   logoSrc,
//   logoAlt = "",
//   logoWidth = 28,
//   logoHeight = 16,
//   brandName,
//   brandHref = "/",
//   investors,
//   socialLinks = [],
//   legalLinks = [],
//   socialSectionLabel,
//   legalSectionLabel,
//   menuContent,
//   layerColors: layerColorsProp,
//   className = "",
// }: CascadeNavbarProps) {
//   const layerColors = layerColorsProp ?? DEFAULT_CASCADE_LAYER_COLORS;
//   const { openDelay, closeDelay, contentDelayMs, closeSequenceEndMs } = useLayerTimings(layerColors);

//   const [menuVisible, setMenuVisible] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [hamburgerHovered, setHamburgerHovered] = useState(false);
//   const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const contentDelay = useMemo(() => ({ animationDelay: `${contentDelayMs}ms` }), [contentDelayMs]);

//   const logoNode =
//     logo ??
//     (logoSrc != null && logoSrc !== "" ? (
//       <Image
//         src={logoSrc}
//         alt={logoAlt || brandName}
//         width={logoWidth}
//         height={logoHeight}
//         className="h-4 w-7 object-contain sm:h-[1.15rem] sm:w-8"
//         priority
//       />
//     ) : null);

//   const openMenu = useCallback(() => {
//     if (closeTimerRef.current) {
//       clearTimeout(closeTimerRef.current);
//       closeTimerRef.current = null;
//     }
//     setIsClosing(false);
//     setMenuVisible(true);
//   }, []);

//   const closeMenu = useCallback(() => {
//     if (!menuVisible || isClosing) return;
//     setIsClosing(true);
//   }, [menuVisible, isClosing]);

//   useEffect(() => {
//     if (!isClosing) return;
//     closeTimerRef.current = setTimeout(() => {
//       setMenuVisible(false);
//       setIsClosing(false);
//       closeTimerRef.current = null;
//     }, closeSequenceEndMs);
//     return () => {
//       if (closeTimerRef.current) {
//         clearTimeout(closeTimerRef.current);
//         closeTimerRef.current = null;
//       }
//     };
//   }, [isClosing, closeSequenceEndMs]);

//   const navOpen = menuVisible && !isClosing;

//   const renderMenuTrigger = (className: string) => (
//     <div className={className}>
//       <button
//         type="button"
//         aria-label={menuVisible ? "Close menu" : "Open menu"}
//         aria-expanded={navOpen}
//         disabled={isClosing}
//         onClick={() => {
//           if (isClosing) return;
//           if (menuVisible) closeMenu();
//           else openMenu();
//         }}
//         onMouseEnter={() => {
//           if (!navOpen) setHamburgerHovered(true);
//         }}
//         onMouseLeave={() => setHamburgerHovered(false)}
//         onFocus={() => {
//           if (!navOpen) setHamburgerHovered(true);
//         }}
//         onBlur={() => setHamburgerHovered(false)}
//         className="group inline-flex items-center gap-2 py-1.5 pr-2 text-white disabled:opacity-60"
//       >
//         <span className="relative h-4 w-6 sm:w-7" aria-hidden>
//           <span
//             className="hamburger-line-track absolute left-0 h-0.5 w-6 overflow-hidden transition-[top,transform] duration-300 ease-out sm:w-7"
//             style={{
//               top: navOpen ? "50%" : "2px",
//               transform: navOpen ? "translateY(-50%)" : "translateY(0)",
//             }}
//           >
//             <span
//               className="absolute inset-y-0 left-0 w-full bg-current transition-transform ease-out"
//               style={{
//                 transform: hamburgerHovered && !navOpen ? "translateX(100%)" : "translateX(0)",
//                 transitionDelay: "0ms",
//                 transitionDuration: `${HAMBURGER_TRAVEL_MS}ms`,
//                 willChange: "transform",
//               }}
//             />
//             <span
//               className="absolute inset-y-0 left-0 w-full bg-current transition-transform ease-out"
//               style={{
//                 transform: hamburgerHovered && !navOpen ? "translateX(0)" : "translateX(-100%)",
//                 transitionDelay: hamburgerHovered && !navOpen ? `${HAMBURGER_STAGGER_MS}ms` : "0ms",
//                 transitionDuration: `${HAMBURGER_TRAVEL_MS}ms`,
//                 willChange: "transform",
//               }}
//             />
//           </span>
//           <span
//             className="hamburger-line-track-delayed absolute left-0 h-0.5 w-6 overflow-hidden transition-[top,transform,opacity] duration-300 ease-out sm:w-7"
//             style={{
//               top: navOpen ? "50%" : "10px",
//               transform: navOpen ? "translateY(-50%)" : "translateY(0)",
//               opacity: navOpen ? 0 : 1,
//             }}
//           >
//             <span
//               className="absolute inset-y-0 left-0 w-full bg-current transition-transform ease-out"
//               style={{
//                 transform: hamburgerHovered && !navOpen ? "translateX(100%)" : "translateX(0)",
//                 transitionDelay: hamburgerHovered && !navOpen ? `${HAMBURGER_STAGGER_MS}ms` : "0ms",
//                 transitionDuration: `${HAMBURGER_TRAVEL_MS}ms`,
//                 willChange: "transform",
//               }}
//             />
//             <span
//               className="absolute inset-y-0 left-0 w-full bg-current transition-transform ease-out"
//               style={{
//                 transform: hamburgerHovered && !navOpen ? "translateX(0)" : "translateX(-100%)",
//                 transitionDelay: hamburgerHovered && !navOpen ? `${HAMBURGER_STAGGER_MS * 2}ms` : "0ms",
//                 transitionDuration: `${HAMBURGER_TRAVEL_MS}ms`,
//                 willChange: "transform",
//               }}
//             />
//           </span>
//         </span>
//         <span
//           className={`overflow-hidden transition-[max-width,opacity] duration-300 ease-out ${
//             navOpen ? "max-w-24 opacity-100" : "max-w-0 opacity-0"
//           }`}
//         >
//           <Typography variant="body-lg" className="!text-white !font-medium leading-none">
//             Close
//           </Typography>
//         </span>
//       </button>
//     </div>
//   );

//   /** Tight bar: hamburger flush left, logo centered, investors flush right */
//   const headerInner = (
//     <div className="relative flex h-[3.35rem] w-full items-center px-6 sm:h-[3.7rem] sm:px-10 lg:px-[2.25rem]">
//       {renderMenuTrigger("z-10 hidden shrink-0 items-center justify-start md:flex")}

//       <div className="z-10 flex shrink-0 items-center justify-start md:hidden">
//         <Link
//           href={brandHref}
//           className="inline-flex items-center py-1 text-white no-underline"
//           onClick={() => {
//             if (menuVisible && !isClosing) closeMenu();
//           }}
//         >
//           {logoNode}
//         </Link>
//       </div>

//       <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
//         <Link
//           href={brandHref}
//           className="pointer-events-auto inline-flex items-center gap-1.5 py-1 text-white no-underline sm:gap-2"
//           onClick={() => {
//             if (menuVisible && !isClosing) closeMenu();
//           }}
//         >
//           {logoNode}
//           <Typography
//             variant="display-xl"
//             className="truncate !text-white normal-case !font-semibold leading-[1.05] tracking-tight !text-[1.4rem] sm:!text-[1.9rem]"
//           >
//             {brandName}
//           </Typography>
//         </Link>
//       </div>

//       {renderMenuTrigger("z-10 ml-auto flex shrink-0 items-center justify-end md:hidden")}

//       <div className="z-10 ml-auto hidden shrink-0 items-center justify-end md:flex">
//         <Link
//           href={investors.href}
//           className="inline-flex items-center gap-1.5 py-1.5 pl-1 text-xs font-medium tracking-wide text-white no-underline transition-opacity hover:opacity-80 sm:text-base"
//           onClick={() => {
//             if (menuVisible && !isClosing) closeMenu();
//           }}
//         >
//           <Typography variant="body-lg" className="truncate !text-white !font-medium leading-none">
//             {investors.label}
//           </Typography>
//           <span aria-hidden className="shrink-0 text-sm leading-none sm:text-base">
//             ↗
//           </span>
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className={`relative w-full bg-[#080808] text-white ${className}`}>
//       {menuVisible && (
//         <div
//           className="absolute left-0 right-0 top-0 z-[70] overflow-hidden"
//         >
//           <div className="pointer-events-none absolute inset-0" aria-hidden>
//             {layerColors.map((color, index) => (
//               <div
//                 key={`${color}-${isClosing ? "out" : "in"}-${index}`}
//                 className={`layer-panel absolute inset-x-0 top-0 h-full ${
//                   isClosing ? "layer-wipe-close" : "layer-wipe-open"
//                 }`}
//                 style={{
//                   backgroundColor: color,
//                   animationDelay: `${isClosing ? closeDelay(index) : openDelay(index)}ms`,
//                   zIndex: 1 + index,
//                 }}
//               />
//             ))}
//             {/* Thin divider like Joby (menu vs page below) */}
//             <div
//               className="absolute bottom-0 left-0 right-0 z-[20] h-px bg-[#0a1f3d]/80"
//               aria-hidden
//             />
//           </div>

//           <nav
//             className={`relative z-[75] mx-auto mt-[3.35rem] min-h-[calc(100dvh-3.35rem)] w-full max-w-[1600px] overflow-visible px-5 pb-6 pt-6 sm:mt-[3.7rem] sm:min-h-[calc(50vh-3.7rem)] sm:px-12 sm:pb-8 sm:pt-14 md:px-16 md:pt-[4.75rem] lg:px-20 lg:pt-24 ${
//               isClosing ? "layer-content-exit pointer-events-none" : "layer-content pointer-events-auto"
//             }`}
//             style={isClosing ? undefined : contentDelay}
//             aria-label="Menu"
//           >
//             <div className="mx-auto grid min-h-0 max-w-[72rem] grid-cols-1 items-center gap-6 px-0 text-center sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-start sm:gap-x-12 sm:gap-y-8 sm:text-left md:grid-cols-[16rem_minmax(0,1fr)] md:gap-x-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-x-20">
//               <div className="min-w-0 pt-0 text-white sm:pt-8 md:pt-10">
//                 {socialLinks.length > 0 && (
//                   <div className={legalLinks.length > 0 ? "mb-6 sm:mb-10" : ""}>
//                     {socialSectionLabel != null && socialSectionLabel.trim() !== "" && (
//                       <Typography variant="overline" className="mb-2.5 !text-white/55">
//                         {socialSectionLabel}
//                       </Typography>
//                     )}
//                     <ul className="space-y-0.5 sm:space-y-1">
//                       {socialLinks.map((item) => (
//                         <li key={`${item.label}-${item.href}`}>
//                           <AnimatedUnderlineLink
//                             href={item.href}
//                             className="mx-auto block w-fit py-0.5 text-white sm:mx-0"
//                             onClick={() => closeMenu()}
//                           >
//                             <Typography
//                               variant="body-xl"
//                               className="!text-white !font-semibold leading-[1.15] tracking-tight"
//                             >
//                               {item.label}
//                             </Typography>
//                           </AnimatedUnderlineLink>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 {legalLinks.length > 0 && (
//                   <div className="mt-auto">
//                     {legalSectionLabel != null && legalSectionLabel.trim() !== "" && (
//                       <Typography variant="overline" className="mb-2 !text-white/45">
//                         {legalSectionLabel}
//                       </Typography>
//                     )}
//                     <ul className="mx-auto max-w-[14rem] space-y-0.5 sm:mx-0 sm:space-y-1">
//                       {legalLinks.map((item) => (
//                         <li key={`${item.label}-${item.href}`}>
//                           <AnimatedUnderlineLink
//                             href={item.href}
//                             className="mx-auto block w-fit py-0.5 text-inherit sm:mx-0"
//                             onClick={() => closeMenu()}
//                           >
//                             <Typography variant="body-sm" className="!text-white/80 leading-snug">
//                               {item.label}
//                             </Typography>
//                           </AnimatedUnderlineLink>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               {menuContent != null && (
//                 <div className="flex min-w-0 justify-center sm:justify-start">
//                   <div className="w-full max-w-lg pt-0 text-white sm:pt-2 lg:max-w-[42rem]">
//                     {menuContent}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </nav>
//         </div>
//       )}

//       <header
//         className={`fixed inset-x-0 top-0 z-[80] border-b ${
//           menuVisible ? "border-white/20 bg-transparent" : "border-white/10 bg-transparent"
//         }`}
//       >
//         {headerInner}
//       </header>

//       <style jsx>{`
//         .layer-panel {
//           transform-origin: top center;
//           backface-visibility: hidden;
//         }

//         .layer-wipe-open {
//           transform: scaleY(0);
//           animation: layer-wipe-in ${LAYER_DURATION_MS}ms ${LAYER_EASE_IN} forwards;
//           will-change: transform;
//         }

//         .layer-wipe-close {
//           transform: scaleY(1);
//           animation: layer-wipe-out ${LAYER_DURATION_MS}ms ${LAYER_EASE_OUT} forwards;
//           will-change: transform;
//         }

//         .layer-content {
//           opacity: 0;
//           transform: translateY(6px);
//           animation: content-in 160ms ${LAYER_EASE_IN} forwards;
//         }

//         .layer-content-exit {
//           opacity: 0;
//           transition: opacity 120ms ease-out;
//         }

//         @keyframes layer-wipe-in {
//           0% {
//             transform: scaleY(0);
//           }
//           100% {
//             transform: scaleY(1);
//           }
//         }

//         @keyframes layer-wipe-out {
//           0% {
//             transform: scaleY(1);
//           }
//           100% {
//             transform: scaleY(0);
//           }
//         }

//         @keyframes content-in {
//           from {
//             opacity: 0;
//             transform: translateY(6px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//       `}</style>
//     </div>
//   );
// }


"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_CASCADE_LAYER_COLORS, type CascadeNavbarProps } from "./types";
import Typography from "@/lib/typography";

const LAYER_START_DELAY_MS = 80;
const LAYER_DURATION_MS = 280;
const LAYER_GAP_BETWEEN_MS = -48;
const LAYER_FINAL_BLUE_EXTRA_DELAY_MS = 120;
const LAYER_EASE_IN = "cubic-bezier(0.7, 0, 0.9, 0.3)";
const LAYER_EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const HAMBURGER_TRAVEL_MS = 280;
const HAMBURGER_STAGGER_MS = 140;

interface AnimatedUnderlineLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  underlineClassName?: string;
  onClick?: () => void;
}

function AnimatedUnderlineLink({
  href,
  children,
  className = "",
  underlineClassName = "",
  onClick,
}: AnimatedUnderlineLinkProps) {
  const [underlinePhase, setUnderlinePhase] = useState<"hidden-left" | "visible" | "hidden-right">(
    "hidden-left",
  );

  const showUnderline = () => {
    setUnderlinePhase((current) => {
      if (current === "hidden-right") return "hidden-left";
      return current;
    });
    requestAnimationFrame(() => setUnderlinePhase("visible"));
  };

  return (
    <Link
      href={href}
      className={`group relative inline-block no-underline ${className}`}
      onMouseEnter={showUnderline}
      onMouseLeave={() => setUnderlinePhase("hidden-right")}
      onFocus={showUnderline}
      onBlur={() => setUnderlinePhase("hidden-right")}
      onClick={onClick}
    >
      {children}
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 left-0 h-px w-full bg-current transition-[clip-path] duration-300 ease-out ${underlineClassName}`}
        style={{
          clipPath:
            underlinePhase === "visible"
              ? "inset(0 0 0 0)"
              : underlinePhase === "hidden-right"
                ? "inset(0 0 0 100%)"
                : "inset(0 100% 0 0)",
        }}
        onTransitionEnd={() => {
          if (underlinePhase === "hidden-right") {
            setUnderlinePhase("hidden-left");
          }
        }}
      />
    </Link>
  );
}

function useLayerTimings(layerColors: readonly string[]) {
  return useMemo(() => {
    const n = layerColors.length;
    const layerStepMs = Math.max(80, LAYER_DURATION_MS + LAYER_GAP_BETWEEN_MS);
    const getExtraDelay = (index: number) => (index === n - 1 ? LAYER_FINAL_BLUE_EXTRA_DELAY_MS : 0);
    const openDelay = (index: number) =>
      LAYER_START_DELAY_MS + index * layerStepMs + getExtraDelay(index);
    const openSequenceEndMs =
      Math.max(...layerColors.map((_, index) => openDelay(index) + LAYER_DURATION_MS));
    const contentDelayMs = openSequenceEndMs + 40;
    const closeDelay = (index: number) =>
      Math.max(0, n - 1 - index) * layerStepMs;
    const closeSequenceEndMs = Math.max(...layerColors.map((_, index) => closeDelay(index) + LAYER_DURATION_MS)) + 50;
    return {
      n,
      openDelay,
      closeDelay,
      contentDelayMs,
      closeSequenceEndMs,
    };
  }, [layerColors]);
}

export function CascadeLayerNavbar({
  logo,
  logoSrc,
  logoAlt = "",
  logoWidth = 28,
  logoHeight = 16,
  brandName,
  brandHref = "/",
  investors,
  socialLinks = [],
  legalLinks = [],
  socialSectionLabel,
  legalSectionLabel,
  menuContent,
  layerColors: layerColorsProp,
  className = "",
}: CascadeNavbarProps) {
  const layerColors = layerColorsProp ?? DEFAULT_CASCADE_LAYER_COLORS;
  const { openDelay, closeDelay, contentDelayMs, closeSequenceEndMs } = useLayerTimings(layerColors);

  const [menuVisible, setMenuVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hamburgerHovered, setHamburgerHovered] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const contentDelay = useMemo(() => ({ animationDelay: `${contentDelayMs}ms` }), [contentDelayMs]);

  const logoNode =
    logo ??
    (logoSrc != null && logoSrc !== "" ? (
      <Image
        src={logoSrc}
        alt={logoAlt || brandName}
        width={logoWidth}
        height={logoHeight}
        className="h-4 w-7 object-contain sm:h-[1.15rem] sm:w-8"
        priority
      />
    ) : null);

  const openMenu = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsClosing(false);
    setMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!menuVisible || isClosing) return;
    setIsClosing(true);
  }, [menuVisible, isClosing]);

  useEffect(() => {
    if (!isClosing) return;
    closeTimerRef.current = setTimeout(() => {
      setMenuVisible(false);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, closeSequenceEndMs);
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isClosing, closeSequenceEndMs]);

  const navOpen = menuVisible && !isClosing;

  const renderMenuTrigger = (className: string) => (
    <div className={className}>
      <button
        type="button"
        aria-label={menuVisible ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        disabled={isClosing}
        onClick={() => {
          if (isClosing) return;
          if (menuVisible) closeMenu();
          else openMenu();
        }}
        onMouseEnter={() => {
          if (!navOpen) setHamburgerHovered(true);
        }}
        onMouseLeave={() => setHamburgerHovered(false)}
        onFocus={() => {
          if (!navOpen) setHamburgerHovered(true);
        }}
        onBlur={() => setHamburgerHovered(false)}
        className="group inline-flex items-center gap-2 py-1.5 pr-2 text-white disabled:opacity-60"
      >
        <span className="relative h-4 w-6 sm:w-7" aria-hidden>
          <span
            className="hamburger-line-track absolute left-0 h-0.5 w-6 overflow-hidden transition-[top,transform] duration-300 ease-out sm:w-7"
            style={{
              top: navOpen ? "50%" : "2px",
              transform: navOpen ? "translateY(-50%)" : "translateY(0)",
            }}
          >
            <span
              className="absolute inset-y-0 left-0 w-full bg-current transition-transform ease-out"
              style={{
                transform: hamburgerHovered && !navOpen ? "translateX(100%)" : "translateX(0)",
                transitionDelay: "0ms",
                transitionDuration: `${HAMBURGER_TRAVEL_MS}ms`,
                willChange: "transform",
              }}
            />
            <span
              className="absolute inset-y-0 left-0 w-full bg-current transition-transform ease-out"
              style={{
                transform: hamburgerHovered && !navOpen ? "translateX(0)" : "translateX(-100%)",
                transitionDelay: hamburgerHovered && !navOpen ? `${HAMBURGER_STAGGER_MS}ms` : "0ms",
                transitionDuration: `${HAMBURGER_TRAVEL_MS}ms`,
                willChange: "transform",
              }}
            />
          </span>
          <span
            className="hamburger-line-track-delayed absolute left-0 h-0.5 w-6 overflow-hidden transition-[top,transform,opacity] duration-300 ease-out sm:w-7"
            style={{
              top: navOpen ? "50%" : "10px",
              transform: navOpen ? "translateY(-50%)" : "translateY(0)",
              opacity: navOpen ? 0 : 1,
            }}
          >
            <span
              className="absolute inset-y-0 left-0 w-full bg-current transition-transform ease-out"
              style={{
                transform: hamburgerHovered && !navOpen ? "translateX(100%)" : "translateX(0)",
                transitionDelay: hamburgerHovered && !navOpen ? `${HAMBURGER_STAGGER_MS}ms` : "0ms",
                transitionDuration: `${HAMBURGER_TRAVEL_MS}ms`,
                willChange: "transform",
              }}
            />
            <span
              className="absolute inset-y-0 left-0 w-full bg-current transition-transform ease-out"
              style={{
                transform: hamburgerHovered && !navOpen ? "translateX(0)" : "translateX(-100%)",
                transitionDelay: hamburgerHovered && !navOpen ? `${HAMBURGER_STAGGER_MS * 2}ms` : "0ms",
                transitionDuration: `${HAMBURGER_TRAVEL_MS}ms`,
                willChange: "transform",
              }}
            />
          </span>
        </span>
        <span
          className={`overflow-hidden transition-[max-width,opacity] duration-300 ease-out ${navOpen ? "max-w-24 opacity-100" : "max-w-0 opacity-0"
            }`}
        >
          <Typography variant="body-lg" className="!text-white !font-medium leading-none">
            Close
          </Typography>
        </span>
      </button>
    </div>
  );

  /** Tight bar: hamburger flush left, logo centered, investors flush right */
  const headerInner = (
    <div className="relative flex h-[3.35rem] w-full items-center px-6 sm:h-[3.7rem] sm:px-10 lg:px-[2.25rem]">
      {renderMenuTrigger("z-10 hidden shrink-0 items-center justify-start md:flex")}

      <div className="z-10 flex shrink-0 items-center justify-start md:hidden">
        <Link
          href={brandHref}
          className="inline-flex items-center py-1 text-white no-underline"
          onClick={() => {
            if (menuVisible && !isClosing) closeMenu();
          }}
        >
          {logoNode}
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
        <Link
          href={brandHref}
          className="pointer-events-auto inline-flex items-center gap-1.5 py-1 text-white no-underline sm:gap-2"
          onClick={() => {
            if (menuVisible && !isClosing) closeMenu();
          }}
        >
          {logoNode}
          <Typography
            variant="display-xl"
            className="truncate !text-white normal-case !font-semibold leading-[1.05] tracking-tight !text-[1.4rem] sm:!text-[1.9rem]"
          >
            {brandName}
          </Typography>
        </Link>
      </div>

      {renderMenuTrigger("z-10 ml-auto flex shrink-0 items-center justify-end md:hidden")}

      <div className="z-10 ml-auto hidden shrink-0 items-center justify-end md:flex">
        <Link
          href={investors.href}
          className="inline-flex items-center gap-1.5 py-1.5 pl-1 text-xs font-medium tracking-wide text-white no-underline transition-opacity hover:opacity-80 sm:text-base"
          onClick={() => {
            if (menuVisible && !isClosing) closeMenu();
          }}
        >
          <Typography variant="body-lg" className="truncate !text-white !font-medium leading-none">
            {investors.label}
          </Typography>
          <span aria-hidden className="shrink-0 text-sm leading-none sm:text-base">
            ↗
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className={`relative w-full bg-[#080808] text-white ${className}`}>
      {menuVisible && (
        <div
          className="absolute left-0 right-0 top-0 z-[70] overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {layerColors.map((color, index) => (
              <div
                key={`${color}-${isClosing ? "out" : "in"}-${index}`}
                className={`layer-panel absolute inset-x-0 top-0 h-full ${isClosing ? "layer-wipe-close" : "layer-wipe-open"
                  }`}
                style={{
                  backgroundColor: color,
                  animationDelay: `${isClosing ? closeDelay(index) : openDelay(index)}ms`,
                  zIndex: 1 + index,
                }}
              />
            ))}
            {/* Thin divider like Joby (menu vs page below) */}
            <div
              className="absolute bottom-0 left-0 right-0 z-[20] h-px bg-[#0a1f3d]/80"
              aria-hidden
            />
          </div>

          <nav
            className={`relative z-[75] mx-auto mt-[3.35rem] min-h-[calc(100dvh-3.35rem)] w-full max-w-[1600px] overflow-visible px-5 pb-6 pt-6 sm:mt-[3.7rem] sm:min-h-[calc(50vh-3.7rem)] sm:px-12 sm:pb-8 sm:pt-14 md:px-16 md:pt-[4.75rem] lg:px-20 lg:pt-24 ${isClosing ? "layer-content-exit pointer-events-none" : "layer-content pointer-events-auto"
              }`}
            style={isClosing ? undefined : contentDelay}
            aria-label="Menu"
          >
            <div className="mx-auto grid min-h-0 max-w-[72rem] grid-cols-1 items-center gap-6 px-0 text-center sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-start sm:gap-x-12 sm:gap-y-8 sm:text-left md:grid-cols-[16rem_minmax(0,1fr)] md:gap-x-16 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-x-20">
              <div className="relative min-w-0 pt-0 text-white sm:pt-8 md:pt-10">
                {socialLinks.length > 0 && (
                  <div className={legalLinks.length > 0 ? "mb-6 sm:mb-10" : ""}>
                    {socialSectionLabel != null && socialSectionLabel.trim() !== "" && (
                      <Typography
                        variant="overline"
                        className="absolute left-0 top-0 !text-white/55 sm:hidden"
                      >
                        {socialSectionLabel}
                      </Typography>
                    )}
                    <ul className="space-y-0.5 sm:space-y-1">
                      {socialLinks.map((item) => (
                        <li key={`${item.label}-${item.href}`}>
                          <AnimatedUnderlineLink
                            href={item.href}
                            className="mx-auto block w-fit py-0.5 text-white sm:mx-0"
                            onClick={() => closeMenu()}
                          >
                            <Typography
                              variant="body-xl"
                              className="!text-white !font-semibold leading-[1.15] tracking-tight"
                            >
                              {item.label}
                            </Typography>
                          </AnimatedUnderlineLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {legalLinks.length > 0 && (
                  <div className="hidden sm:block mt-auto">
                    {legalSectionLabel != null && legalSectionLabel.trim() !== "" && (
                      <Typography
                        variant="overline"
                        className="absolute left-0 bottom-0 !text-white/45 sm:hidden"
                      >
                        {legalSectionLabel}
                      </Typography>
                    )}
                    <ul className="mx-auto max-w-[14rem] space-y-0.5 sm:mx-0 sm:space-y-1">
                      {legalLinks.map((item) => (
                        <li key={`${item.label}-${item.href}`}>
                          <AnimatedUnderlineLink
                            href={item.href}
                            className="mx-auto block w-fit py-0.5 text-inherit sm:mx-0"
                            onClick={() => closeMenu()}
                          >
                            <Typography variant="body-sm" className="!text-white/80 leading-snug">
                              {item.label}
                            </Typography>
                          </AnimatedUnderlineLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {menuContent != null && (
                <div className="flex min-w-0 justify-center sm:justify-start">
                  <div className="w-full max-w-lg pt-0 text-white sm:pt-2 lg:max-w-[42rem]">
                    {menuContent}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      <header
        className={`fixed inset-x-0 top-0 z-[80] border-b ${menuVisible ? "border-white/20 bg-transparent" : "border-white/10 bg-transparent"
          }`}
      >
        {headerInner}
      </header>

      <style jsx>{`
        .layer-panel {
          transform-origin: top center;
          backface-visibility: hidden;
        }

        .layer-wipe-open {
          transform: scaleY(0);
          animation: layer-wipe-in ${LAYER_DURATION_MS}ms ${LAYER_EASE_IN} forwards;
          will-change: transform;
        }

        .layer-wipe-close {
          transform: scaleY(1);
          animation: layer-wipe-out ${LAYER_DURATION_MS}ms ${LAYER_EASE_OUT} forwards;
          will-change: transform;
        }

        .layer-content {
          opacity: 0;
          transform: translateY(6px);
          animation: content-in 160ms ${LAYER_EASE_IN} forwards;
        }

        .layer-content-exit {
          opacity: 0;
          transition: opacity 120ms ease-out;
        }

        @keyframes layer-wipe-in {
          0% {
            transform: scaleY(0);
          }
          100% {
            transform: scaleY(1);
          }
        }

        @keyframes layer-wipe-out {
          0% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(0);
          }
        }

        @keyframes content-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>
    </div>
  );
}


