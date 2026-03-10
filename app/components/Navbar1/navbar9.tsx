"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "About", "Services", "Projects", "Contact"];

const easeSmooth = [0.33, 1, 0.68, 1] as const; // very soft ease-in-out
const overlayTransition = { duration: 0.9, ease: easeSmooth };
const panelSlide = { type: "tween" as const, duration: 1.6, ease: easeSmooth };
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};
const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.25 },
  },
};

export default function Navbar9() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar: light background, logo left, MENU + hamburger right (or CLOSE + X when open) */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-slate-300 backdrop-blur-sm border-b border-slate-200/80 pl-2 pr-5 lg:pl-4 lg:pr-10 py-3">
        <a href="/" className="flex shrink-0 items-center -my-1 ml-12" aria-label="Home">
          <img src="/logoeg.png" alt="" className="h-12 w-auto object-contain block" />
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex shrink-0 items-center gap-3 text-slate-800 font-normal tracking-wide hover:text-slate-600 transition-colors"
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3"
              >
                <span className="text-lg uppercase tracking-widest font-normal">Close</span>
                <span className="text-3xl font-normal leading-none">×</span>
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3"
              >
                <span className="text-lg uppercase tracking-widest font-normal">Menu</span>
                <span className="text-slate-800 text-2xl leading-none" aria-hidden="true">☰</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </header>

      {/* Black overlay – full screen; fades in immediately on open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Panel – below 768px: full width; 768px and above: 40% with black overlay; ultra-smooth right-to-left slide */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: "120%" }} // fully off-screen to the right
            animate={{
              x: "0%",
              transition: {
                ...panelSlide,
                delay: 0.25,
              },
            }}
            exit={{
              x: "100%",
              transition: { duration: 0.4, ease: easeSmooth },
            }}
            className="fixed top-0 right-0 z-50 h-full w-full md:w-[40%] md:min-w-[300px] md:max-w-[480px] bg-stone-50 border-l border-slate-200/80 shadow-2xl flex flex-col"
          >
            {/* CLOSE X – top right of panel */}
            <div className="flex justify-end p-5 pt-6 shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-slate-800 font-normal tracking-wide hover:text-slate-600 transition-colors"
              >
                <span className="text-lg uppercase tracking-widest font-normal">Close</span>
                <span className="text-3xl font-normal leading-none">×</span>
              </button>
            </div>

            {/* Menu heading + nav links – staggered reveal (atuin-style) */}
            <nav className="flex flex-1 flex-col justify-center items-center md:justify-start md:items-stretch px-6 md:px-8 pb-10 md:pb-10">
              <motion.ul
                className="flex flex-col items-center md:items-stretch w-full max-w-[200px] md:max-w-none [&>li:first-child>a]:pt-0 list-none p-0 m-0"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.li key="menu-heading" variants={staggerItem} className="w-full mb-4">
                  <span className="text-md uppercase tracking-[0.2em] text-slate-500 font-normal block text-center md:text-left">Menu</span>
                </motion.li>
                {navItems.map((item) => (
                  <motion.li key={item} variants={staggerItem} className="w-full md:w-auto">
                    <a
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-xl font-normal text-slate-800 tracking-tight border-b border-slate-200/60 hover:text-slate-600 transition-colors text-center md:text-left"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
