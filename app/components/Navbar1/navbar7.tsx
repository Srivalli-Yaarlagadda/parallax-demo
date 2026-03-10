"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "About", "Services", "Projects", "Contact"];

export default function Navbar8() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  const pathLength = 100;
  const bottomPart =
    box.w && box.h ? (pathLength * box.w) / (2 * box.w + 2 * box.h) : pathLength * 0.25;

  const handleEnter = (index: number, e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBox({ w: rect.width, h: rect.height });
    setHoverIndex(index);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 w-full bg-black backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto flex min-h-16 min-[1024px]:min-h-[4.5rem] min-[1024px]:py-4 max-w-6xl items-center justify-between gap-4 pl-2 pr-4 min-[1024px]:pl-4 min-[1024px]:pr-8">
          {/* Logo – left side */}
          <a href="/" className="flex shrink-0 items-center -my-1" aria-label="Home">
            <img src="/logoeg.png" alt="" className="h-12 w-auto object-contain block" />
          </a>
          {/* Spacer on mobile so hamburger is on the right; desktop shows links */}
          <div className="min-[1024px]:hidden flex-1" aria-hidden />

          {/* DESKTOP LINKS (≥1024px) */}
          <ul className="hidden min-[1024px]:flex gap-10 text-lg font-semibold text-white flex-wrap justify-end">
          {navItems.map((item, index) => {
            const isHovered = hoverIndex === index;

            return (
              <li key={item} className="relative cursor-pointer select-none">
                <span
                  className="relative z-10 inline-block px-3 py-1.5"
                  onMouseEnter={(e) => handleEnter(index, e)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {item}

                  <AnimatePresence>
                    {isHovered && box.w > 0 && box.h > 0 && (
                      <motion.svg
                        key="border-flow"
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        viewBox={`0 0 ${box.w} ${box.h}`}
                        preserveAspectRatio="none"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <defs>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="1" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        {/* Path: bottom → right → top → left. Offset 100→0 = dash travels anti-clockwise back to bottom */}
                        <motion.path
                          d={`M 0 ${box.h} L ${box.w} ${box.h} L ${box.w} 0 L 0 0 L 0 ${box.h}`}
                          fill="none"
                          stroke="rgb(173, 22, 98)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pathLength={pathLength}
                          filter="url(#glow)"
                          strokeDasharray={`${bottomPart} ${pathLength}`}
                          initial={{ strokeDashoffset: pathLength }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.9, ease: "easeInOut" }}
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </span>
              </li>
            );
          })}
        </ul>

          {/* MOBILE HAMBURGER (<1024px) – same as navbar5 */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 min-[1024px]:hidden"
          >
          {menuOpen ? (
            <span className="text-xl font-light leading-none">×</span>
          ) : (
            <div className="relative h-4 w-5">
              <span className="absolute left-0 top-0 h-px w-5 rounded-full bg-white" />
              <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rounded-full bg-white" />
              <span className="absolute left-0 bottom-0 h-px w-5 rounded-full bg-white" />
            </div>
          )}
        </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (<1024px): full-screen like navbar5 – only rendered when lg so it doesn't block on desktop */}
      <div
        className={`fixed inset-0 z-50 transition-[opacity,visibility] duration-300 min-[1024px]:hidden ${
          menuOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white shadow-lg transition-all duration-200 hover:bg-white/20 hover:border-white/25"
        >
          <span className="text-xl font-light leading-none">×</span>
        </button>
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
          <nav className="flex flex-col items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setMenuOpen(false)}
                className="py-4 px-8 text-[1.25rem] font-medium text-white/80 transition-colors hover:text-white"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}