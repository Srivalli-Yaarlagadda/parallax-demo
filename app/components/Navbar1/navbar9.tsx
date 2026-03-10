"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "About", "Services", "Projects", "Contact"];

// Atuin.media-style: smooth ease, staggered link cascade
const ease = [0.32, 0.72, 0, 1] as const;
const easeClose = [0.4, 0, 0.2, 1] as const;

const overlay = {
  open: { duration: 0.35, ease },
  close: { duration: 0.25, ease: easeClose },
};

// First 1% of travel slowly, then rest quickly
const panel = {
  open: {
    x: ["100%", "99%", "0%"],
    transition: {
      type: "tween" as const,
      duration: 0.82,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      times: [0, 0.5, 1],
    },
  },
  close: {
    x: "102%",
    transition: {
      type: "tween" as const,
      duration: 0.32,
      ease: [0.55, 0, 0.4, 1] as const,
    },
  },
};

// Stagger: links cascade in one-by-one (atuin style)
const stagger = {
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease },
    },
    exit: {
      opacity: 0,
      y: 8,
      transition: { duration: 0.2, ease: easeClose },
    },
  },
};

export default function Navbar9() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar: logo left, MENU + hamburger right (Close is on the panel only) */}
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
          <span className="text-lg uppercase tracking-widest font-normal">Menu</span>
          <span className="text-slate-800 text-2xl leading-none" aria-hidden="true">☰</span>
        </button>
      </header>

      {/* Black overlay – full screen; fades in immediately on open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: overlay.close }}
            transition={overlay.open}
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
            initial={{ x: "100%" }}
            animate={{ x: panel.open.x, transition: panel.open.transition }}
            exit={{ x: panel.close.x, transition: panel.close.transition }}
            className="fixed top-0 right-0 z-50 h-full w-full md:w-[40%] md:min-w-[300px] md:max-w-[480px] bg-sky-50 border-l border-sky-200/80 shadow-2xl flex flex-col"
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
                variants={stagger.container}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.li key="menu-heading" variants={stagger.item} className="w-full mb-4">
                  <span className="text-md uppercase tracking-[0.2em] text-slate-500 font-normal block text-center md:text-left">Menu</span>
                </motion.li>
                {navItems.map((item) => (
                  <motion.li key={item} variants={stagger.item} className="w-full md:w-auto">
                    <a
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-xl font-normal text-slate-800 tracking-tight border-b border-slate-200/60 hover:text-slate-600 transition-colors duration-200 text-center md:text-left"
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
