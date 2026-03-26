// "use client";

// import { useState, useEffect } from "react";
// import { NavbarProps } from "./types";
// import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
// import Image from "next/image";
// import Typography from "@/lib/typography";

// const Navbar: React.FC<NavbarProps> = ({
//   width = "300px",
//   backgroundColor = "#111111",
//   menuItems,
//   logo,
//   logoCaption,
//   buttonText,
//   buttonOnClick,
//   onClose,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const handleToggle = () => setOpen(!open);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth <= 640);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   // full screen on mobile OR when sidebar width equals viewport (passed as 100vw)
//   const isFullScreen = isMobile;

//   return (
//     <>
//       {/* ===== TOP NAVBAR ===== */}
//       <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/50">
//         <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

//           {/* LOGO + CAPTION */}
//           <div className="flex flex-col items-start leading-tight">
//             {logo && <Image src={logo} alt="Logo" width={40} height={40} />}
//             {logoCaption && (
//               <Typography variant="body-lg" className="text-white opacity-80">
//                 {logoCaption}
//               </Typography>
//             )}
//           </div>

//           {/* ICONS */}
//           <div className="flex items-center gap-2 sm:gap-3">

//             {/* SEARCH */}
//             <button className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-white bg-transparent hover:bg-white transition-colors duration-300 group">
//               <AiOutlineSearch size={18} className="text-white group-hover:text-black transition-colors duration-300" />
//             </button>

//             {/* LETS TALK BUTTON — hidden below md (768px) */}
//             <button
//               onClick={buttonOnClick}
//               className="hidden md:flex group px-4 py-1.5 rounded-full border-2 border-white bg-transparent hover:bg-white transition-colors duration-300 items-center gap-1.5"
//             >
//               <span className="text-white group-hover:text-black transition-colors duration-300 font-medium text-sm">
//                 {buttonText}
//               </span>
//               <span className="text-white group-hover:text-black transition-colors duration-300 font-semibold text-xl leading-none">
//                 ›
//               </span>
//             </button>

//             {/* MENU */}
//             <button
//               onClick={handleToggle}
//               className="w-9 h-9 flex items-center justify-center text-white hover:text-orange-500 transition-colors duration-300"
//             >
//               <AiOutlineMenu size={22} />
//             </button>

//           </div>
//         </div>
//       </header>

//       {/* ===== OVERLAY ===== */}
//       {open && (
//         <div onClick={handleToggle} className="fixed inset-0 bg-black/50 z-40" />
//       )}

//       {/* ===== SIDEBAR ===== */}
//       <div
//         className="sidebar-panel fixed top-0 right-0 h-full z-50 flex flex-col text-white"
//         style={{
//           "--sidebar-width": width,
//           backgroundColor,
//           transform: open ? "translateX(0)" : "translateX(100%)",
//           transition: "transform 0.3s ease-in-out",
//         } as React.CSSProperties}
//       >
//         {/* TOP SECTION */}
//         <div className="flex items-center justify-between px-5 sm:px-6 py-5 sm:py-6">

//           {/* CLOSE BUTTON — always left */}
//           <button
//             onClick={() => {
//               handleToggle();
//               onClose?.();
//             }}
//             className="hover:text-orange-500 transition leading-none font-semibold"
//           >
//             <span style={{ fontSize: "1.25rem", lineHeight: 1, color: "inherit" }}>✕</span>
//           </button>

//           {/* LOGO + CAPTION — always right */}
//           <div className="flex flex-col items-end leading-tight">
//             {logo && <Image src={logo} alt="Logo" width={34} height={34} />}
//             {logoCaption && (
//               <Typography variant="body-lg" className="text-white opacity-80">
//                 {logoCaption}
//               </Typography>
//             )}
//           </div>
//         </div>

//         {/* NAV LINKS */}
//         <nav className={`
//           flex-1 flex flex-col overflow-y-auto
//           gap-6 sm:gap-8
//           px-6 sm:px-8
//           pt-8 sm:pt-10
//           ${isFullScreen ? "items-center" : "items-end"}
//         `}>
//           {menuItems?.map((item, idx) => (
//             <a key={idx} href={item.href || "#"} className="nav-link w-fit">
//               <div className="relative inline-block">
//                 <Typography
//                   variant="h3"
//                   className={`nav-link-text text-white font-semibold ${isFullScreen ? "text-center" : "text-right"}`}
//                 >
//                   {item.label}
//                 </Typography>
//                 <span className="nav-underline" />
//               </div>
//             </a>
//           ))}

//           {/* CTA BUTTON */}
//           {buttonText && (
//             <button
//               onClick={buttonOnClick}
//               className="nav-cta mt-4 sm:mt-6 px-6 py-2 border-2 border-white rounded-full transition-colors duration-300"
//             >
//               <Typography
//                 variant="h3"
//                 className={`nav-cta-text font-semibold ${isFullScreen ? "text-center" : "text-right"}`}
//               >
//                 {buttonText}
//               </Typography>
//             </button>
//           )}
//         </nav>
//       </div>

//       {/* ===== ANIMATION + RESPONSIVE STYLES ===== */}
//       <style>{`
//         /* ── SIDEBAR WIDTH ── */
//         .sidebar-panel {
//           width: 100vw;
//         }

//         @media (min-width: 641px) {
//           .sidebar-panel {
//             width: var(--sidebar-width, 300px);
//           }
//         }

//         /* ── NAV LINK ── */
//         .nav-link {
//           display: inline-block;
//           width: fit-content;
//         }

//         /* ── UNDERLINE ── */
//         .nav-underline {
//           display: block;
//           position: absolute;
//           bottom: -3px;
//           left: 0;
//           width: 100%;
//           height: 2px;
//           background-color: #f97316;
//           transform: scaleX(0);
//           transform-origin: right;
//           transition: transform 0.35s ease-in-out;
//         }

//         .nav-link:hover .nav-underline {
//           transform: scaleX(1);
//           transform-origin: left;
//         }

//         /* ── FONT COLOR ── */
//         .nav-link-text,
//         .nav-link-text * {
//           transition: color 0.3s ease-in-out;
//         }

//         .nav-link:hover .nav-link-text,
//         .nav-link:hover .nav-link-text * {
//           color: #f97316 !important;
//         }

//         /* ── CTA BUTTON ── */
//         .nav-cta {
//           background-color: transparent;
//         }

//         .nav-cta-text,
//         .nav-cta-text * {
//           color: #ffffff;
//           transition: color 0.3s ease-in-out;
//         }

//         .nav-cta:hover {
//           background-color: #ffffff;
//         }

//         .nav-cta:hover .nav-cta-text,
//         .nav-cta:hover .nav-cta-text * {
//           color: #000000 !important;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;

"use client";

import { useState, useEffect, useRef } from "react";
import { NavbarProps } from "./types";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Typography from "@/lib/typography";

const Navbar: React.FC<NavbarProps> = ({
  width = "320px",
  backgroundColor = "#111111",
  menuItems,
  logo,
  logoCaption,
  buttonText,
  buttonOnClick,
  onClose,
}) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const clipRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number | null>(null);
  const sidebarWidthRef = useRef(320);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 640);
      sidebarWidthRef.current =
        window.innerWidth <= 640 ? window.innerWidth : 320;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const buildPath = (lx: number, cx: number) => {
    const W = sidebarWidthRef.current;
    const H = 9999; // tall enough for any viewport
    return `M ${lx},0 L ${W},0 L ${W},${H} L ${lx},${H} C ${cx},${H} ${cx},${H / 2} ${lx},0 Z`;
  };

  const easeOutExpo = (t: number) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const easeInExpo = (t: number) =>
    t === 0 ? 0 : Math.pow(2, 10 * t - 10);

  const animateOpen = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setVisible(true);
    setOpen(true);
    const W = sidebarWidthRef.current;
    const DURATION = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = easeOutExpo(t);
      const lx = W * (1 - eased);

      let bulge = 0;
      if (t < 0.55) {
        const bt = t / 0.55;
        bulge = Math.sin(bt * Math.PI) * 130;
      } else {
        const bt = (t - 0.55) / 0.45;
        bulge = (1 - easeOutExpo(bt)) * 25;
      }
      const cx = lx + bulge;

      clipRef.current?.setAttribute("d", buildPath(lx, cx));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        clipRef.current?.setAttribute("d", buildPath(0, 0));
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const animateClose = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setOpen(false);
    onClose?.();
    const W = sidebarWidthRef.current;
    const DURATION = 500;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = easeInExpo(t);
      const lx = W * eased;
      const cx = lx - Math.sin(t * Math.PI) * 60;

      clipRef.current?.setAttribute("d", buildPath(lx, cx));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        clipRef.current?.setAttribute("d", buildPath(W, W));
        setVisible(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const isFullScreen = isMobile;

  return (
    <>
      {/* ===== TOP NAVBAR ===== */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/50">
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

          <div className="flex flex-col items-start leading-tight">
            {logo && <Image src={logo} alt="Logo" width={40} height={40} />}
            {logoCaption && (
              <Typography variant="body-lg" className="text-white opacity-80">
                {logoCaption}
              </Typography>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-white bg-transparent hover:bg-white transition-colors duration-300 group">
              <AiOutlineSearch
                size={18}
                className="text-white group-hover:text-black transition-colors duration-300"
              />
            </button>

            <button
              onClick={buttonOnClick}
              className="hidden md:flex group px-4 py-1.5 rounded-full border-2 border-white bg-transparent hover:bg-white transition-colors duration-300 items-center gap-1.5"
            >
              <span className="text-white group-hover:text-black transition-colors duration-300 font-medium text-sm">
                {buttonText}
              </span>
              <span className="text-white group-hover:text-black transition-colors duration-300 font-semibold text-xl leading-none">
                ›
              </span>
            </button>

            <button
              onClick={animateOpen}
              className="w-9 h-9 flex items-center justify-center text-white hover:text-orange-500 transition-colors duration-300"
            >
              <AiOutlineMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ===== OVERLAY ===== */}
      {visible && (
        <div
          onClick={animateClose}
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      {visible && (
        <div
          className="sidebar-wrap fixed top-0 right-0 h-full z-50"
          style={{ width: isMobile ? "100vw" : width }}
        >
          {/* SVG ClipPath definition */}
          <svg
            className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none"
            style={{ position: "absolute" }}
          >
            <defs>
              <clipPath id="menuClip" clipPathUnits="userSpaceOnUse">
                <path ref={clipRef} d="" />
              </clipPath>
            </defs>
          </svg>

          {/* Clipped panel */}
          <div
            className="absolute inset-0 flex flex-col text-white"
            style={{
              backgroundColor,
              clipPath: "url(#menuClip)",
            }}
          >
            {/* TOP */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-5 sm:py-6">
              <button
                onClick={animateClose}
                className="hover:text-orange-500 transition leading-none font-semibold"
                style={{ fontSize: "1.25rem", lineHeight: 1 }}
              >
                ✕
              </button>
              <div className="flex flex-col items-end leading-tight">
                {logo && (
                  <Image src={logo} alt="Logo" width={34} height={34} />
                )}
                {logoCaption && (
                  <Typography variant="body-lg" className="text-white opacity-80">
                    {logoCaption}
                  </Typography>
                )}
              </div>
            </div>

            {/* NAV */}
            <nav
              className={`flex-1 flex flex-col overflow-y-auto gap-6 sm:gap-8 px-6 sm:px-8 pt-8 sm:pt-10 ${
                isFullScreen ? "items-center" : "items-end"
              }`}
            >
              {menuItems?.map((item, idx) => (
                <a key={idx} href={item.href || "#"} className="nav-link w-fit">
                  <div className="relative inline-block">
                    <Typography
                      variant="h3"
                      className={`nav-link-text text-white font-semibold ${
                        isFullScreen ? "text-center" : "text-right"
                      }`}
                    >
                      {item.label}
                    </Typography>
                    <span className="nav-underline" />
                  </div>
                </a>
              ))}

              {buttonText && (
                <button
                  onClick={buttonOnClick}
                  className="nav-cta mt-4 sm:mt-6 px-6 py-2 border-2 border-white rounded-full transition-colors duration-300"
                >
                  <Typography
                    variant="h3"
                    className={`nav-cta-text font-semibold ${
                      isFullScreen ? "text-center" : "text-right"
                    }`}
                  >
                    {buttonText}
                  </Typography>
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* ===== STYLES ===== */}
      <style>{`
        .nav-link { display: inline-block; width: fit-content; }

        .nav-underline {
          display: block;
          position: absolute;
          bottom: -3px; left: 0;
          width: 100%; height: 2px;
          background-color: #f97316;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.35s ease-in-out;
        }
        .nav-link:hover .nav-underline {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-link-text, .nav-link-text * {
          transition: color 0.3s ease-in-out;
        }
        .nav-link:hover .nav-link-text,
        .nav-link:hover .nav-link-text * {
          color: #f97316 !important;
        }

        .nav-cta { background-color: transparent; }
        .nav-cta-text, .nav-cta-text * {
          color: #ffffff;
          transition: color 0.3s ease-in-out;
        }
        .nav-cta:hover { background-color: #ffffff; }
        .nav-cta:hover .nav-cta-text,
        .nav-cta:hover .nav-cta-text * {
          color: #000000 !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;