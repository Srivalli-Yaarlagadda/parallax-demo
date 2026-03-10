"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rightNav = [
  { label: "Home", href: "#Home" },
  { label: "About", href: "#About" },
  { label: "Gallery", href: "#Gallery" },
  { label: "Brands", href: "#Brands" },
];

const expandedLeftColumn = ["Home", "About", "Gallery", "Brands"];
const expandedRightColumn = ["Editorial", "Downloads", "Contact", "FAQs"];

const SM_BREAKPOINT = 640;

// Premium: blur-in reveal – panel and content sharpen into focus
const backdropTransition = { duration: 0.35 };
const panelTransition = { duration: 0.55 };
const contentStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.18 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.025, staggerDirection: -1 },
  },
};
const contentItem = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.45 } },
  exit: { opacity: 0, filter: "blur(4px)", transition: { duration: 0.2 } },
};

export default function Navbar10() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${SM_BREAKPOINT - 1}px)`);
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      {/* Header: compact (Contact | logo | hamburger) below 1024px; nav links in bar from 1024px+ */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 min-h-[44px] items-center justify-between bg-white border-b border-slate-200/80 px-3 lg:h-14 lg:px-8">
        {/* Left: Contact only */}
        <div className="flex min-w-0 w-1/3 shrink-0 items-center justify-start">
          <a
            href="#contact"
            className="rounded-md px-2 py-1.5 text-xs font-normal uppercase tracking-widest text-slate-800 transition-colors hover:bg-slate-100 lg:px-3 lg:text-sm touch-manipulation"
          >
            Contact
          </a>
        </div>

        {/* Middle: Logo */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <a href="/" className="flex items-center" aria-label="Home">
            <img
              src="/logoeg.png"
              alt=""
              className="h-9 w-auto max-h-12 object-contain object-center lg:h-14"
            />
          </a>
        </div>

        {/* Right: nav links visible from 1024px only; hamburger always */}
        <div className="flex min-w-0 w-1/3 shrink-0 items-center justify-end gap-2 lg:gap-6">
          {rightNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hidden text-xs font-normal uppercase tracking-widest text-slate-800 transition-colors hover:text-slate-500 lg:block lg:text-sm touch-manipulation"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center justify-center p-2 -m-2 text-slate-800 hover:text-slate-500 transition-colors touch-manipulation"
          >
            <span className="text-xl leading-none lg:text-2xl" aria-hidden="true">
              ☰
            </span>
          </button>
        </div>
      </header>

      {/* Expanded menu: blur-in reveal (below 640px full-screen; 640px+ top panel) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={backdropTransition}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Below 640px: full-screen panel – blur-in */}
            {isSmallScreen ? (
              <motion.div
                initial={{ opacity: 0, filter: "blur(14px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={panelTransition}
                className="fixed inset-0 z-50 flex flex-col bg-white shadow-2xl"
              >
                <motion.div
                  className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-3 pb-4"
                  variants={contentStagger}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div className="flex shrink-0 justify-end" variants={contentItem}>
                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={() => setMenuOpen(false)}
                      className="p-2 -m-2 text-sm font-normal uppercase tracking-wider text-slate-700 hover:text-slate-900 touch-manipulation"
                    >
                      [ × ]
                    </button>
                  </motion.div>
                  <motion.div className="flex shrink-0 justify-center -mt-1" variants={contentItem}>
                    <a href="/" onClick={() => setMenuOpen(false)} className="flex items-center" aria-label="Home">
                      <img src="/logoeg.png" alt="" className="h-12 w-auto object-contain" />
                    </a>
                  </motion.div>
                  <motion.nav
                    className="flex flex-1 min-h-0 items-center justify-center gap-6 pt-2"
                    variants={contentStagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <ul className="flex flex-col gap-0.5 text-center">
                      {expandedLeftColumn.map((item) => (
                        <motion.li key={item} variants={contentItem}>
                          <a
                            href={`#${item.toLowerCase().replace(/\s+|'/g, "-")}`}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 text-sm font-normal uppercase tracking-widest text-slate-800 hover:text-slate-500 transition-colors touch-manipulation"
                          >
                            {item}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                    <ul className="flex flex-col gap-0.5 text-center">
                      {expandedRightColumn.map((item) => (
                        <motion.li key={item} variants={contentItem}>
                          <a
                            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 text-sm font-normal uppercase tracking-widest text-slate-800 hover:text-slate-500 transition-colors touch-manipulation"
                          >
                            {item}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.nav>
                </motion.div>
              </motion.div>
            ) : (
              /* 640px+: panel – blur-in */
              <motion.div
                initial={{ opacity: 0, filter: "blur(14px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={panelTransition}
                className="fixed inset-x-0 top-0 z-50 flex h-[40vh] min-h-[220px] max-h-[420px] flex-col bg-white shadow-2xl lg:min-h-[280px]"
              >
                <motion.div
                  className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-3 pb-4 lg:px-10 lg:pt-4 lg:pb-6"
                  variants={contentStagger}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div className="flex shrink-0 justify-end" variants={contentItem}>
                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={() => setMenuOpen(false)}
                      className="p-2 -m-2 text-sm font-normal uppercase tracking-wider text-slate-700 hover:text-slate-900 lg:text-base touch-manipulation"
                    >
                      [ × ]
                    </button>
                  </motion.div>
                  <motion.div className="flex shrink-0 justify-center -mt-1 lg:-mt-2" variants={contentItem}>
                    <a href="/" onClick={() => setMenuOpen(false)} className="flex items-center" aria-label="Home">
                      <img src="/logoeg.png" alt="" className="h-12 w-auto object-contain lg:h-16" />
                    </a>
                  </motion.div>
                  <motion.nav
                    className="flex flex-1 min-h-0 items-center justify-center gap-6 pt-2 lg:gap-16 lg:pt-4 xl:gap-24"
                    variants={contentStagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <ul className="flex flex-col gap-0.5 text-center lg:gap-1 lg:text-left">
                      {expandedLeftColumn.map((item) => (
                        <motion.li key={item} variants={contentItem}>
                          <a
                            href={`#${item.toLowerCase().replace(/\s+|'/g, "-")}`}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 text-sm font-normal uppercase tracking-widest text-slate-800 hover:text-slate-500 transition-colors lg:py-1.5 lg:text-base touch-manipulation"
                          >
                            {item}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                    <ul className="flex flex-col gap-0.5 text-center lg:gap-1 lg:text-left">
                      {expandedRightColumn.map((item) => (
                        <motion.li key={item} variants={contentItem}>
                          <a
                            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 text-sm font-normal uppercase tracking-widest text-slate-800 hover:text-slate-500 transition-colors lg:py-1.5 lg:text-base touch-manipulation"
                          >
                            {item}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.nav>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}