"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  "How it works",
  "Solutions",
  "Partners",
  "Security",
  "Pricing",
  "Resources",
  "Contact",
  "About",
];

const easeOpen = [0.22, 0.61, 0.36, 1] as const; // smooth ease-out
const easeClose = [0.33, 1, 0.68, 1] as const;

export default function BlobNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [pillStyle, setPillStyle] = useState({
    width: 0,
    left: 0,
  });

  const currentIndex = hoverIndex ?? activeIndex;

  useEffect(() => {
    const el = itemRefs.current[currentIndex];
    const container = containerRef.current;

    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setPillStyle({
        width: elRect.width,
        left: elRect.left - containerRect.left,
      });
    }
  }, [currentIndex]);

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    setMenuOpen(false);
  };

  return (
    <div className="w-full pt-8 pb-8 bg-black/50">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:justify-center lg:gap-12 lg:px-8">

        {/* Logo */}
        <a href="/" className="flex shrink-0" aria-label="Home">
          <Image
            src="/logoeg.png"
            alt="logo"
            width={65}
            height={22}
            className="object-contain"
          />
        </a>

        {/* Desktop Navbar (lg and up) */}
        <nav className="hidden lg:flex rounded-full bg-white/40 backdrop-blur-xl border border-white/40 px-1 py-1 shadow-[0_18px_40px_rgba(15,23,42,0.35)]">

          <div
            ref={containerRef}
            className="relative flex items-center"
          >

            {/* Blob */}
            <div
              className="absolute h-full rounded-full bg-white/60 shadow-[0_8px_22px_rgba(15,23,42,0.45)] transition-all duration-300 ease-out"
              style={{
                width: pillStyle.width,
                left: pillStyle.left,
              }}
            />

            {navItems.map((item, index) => {
              const isActive = currentIndex === index;

              return (
                <button
                  key={item}
                  ref={(el) => { (itemRefs.current[index] = el) }}
                  onClick={() => handleNavClick(index)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="relative z-10 px-6 py-2.5 text-base font-medium rounded-full whitespace-nowrap"
                >
                  <span
                    className={
                      isActive
                        ? "text-slate-900 font-semibold"
                        : "text-white"
                    }
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

        </nav>

        {/* Hamburger / X – visible on small screens only */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:hidden text-white hover:opacity-90 transition-opacity ${menuOpen ? "bg-white/20" : ""}`}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-light leading-none"
                aria-hidden
              >
                ×
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-1.5"
                aria-hidden
              >
                <span className="block h-[2px] w-5 rounded-full bg-current" />
                <span className="block h-[2px] w-5 rounded-full bg-current" />
                <span className="block h-[2px] w-5 rounded-full bg-current" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu – overlay + cone-shaped blob (quarter circle) from top-right to bottom-left */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeOpen }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            {/* Cone shape: quarter-circle curve growing from top-right toward bottom-left */}
            <motion.div
              initial={{ clipPath: "circle(0% at 100% 0%)" }}
              animate={{
                clipPath: "circle(200% at 100% 0%)",
                transition: { type: "tween", duration: 0.9, ease: easeOpen },
              }}
              exit={{
                clipPath: "circle(0% at 100% 0%)",
                transition: { type: "tween", duration: 0.5, ease: easeClose },
              }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden"
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl font-light text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                ×
              </button>
              <motion.nav
                className="flex flex-col items-center justify-center px-6 pb-8 text-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
                  },
                  exit: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
              >
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 } }}
                  transition={{ duration: 0.22 }}
                  className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  Menu
                </motion.p>
                <ul className="flex flex-col gap-0.5 list-none p-0 m-0 items-center w-full max-w-xs">
                  {navItems.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <motion.li
                        key={item}
                        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }}
                        transition={{ duration: 0.25 }}
                        className="w-full"
                      >
                        <button
                          onClick={() => handleNavClick(index)}
                          className={`w-full rounded-full px-4 py-3 text-center text-base font-medium transition-colors ${isActive ? "text-slate-900 font-semibold bg-slate-100" : "text-slate-700 hover:bg-slate-50"}`}
                        >
                          {item}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}