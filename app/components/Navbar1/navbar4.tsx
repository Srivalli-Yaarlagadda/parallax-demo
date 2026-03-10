"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Home", "About", "Work", "Gallery", "Contact"];

export default function PremiumNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 pl-4 pr-12 py-5 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/10"
      >
        <a href="/" className="flex shrink-0 items-center -my-1" aria-label="Home">
          <img src="/logoeg.png" alt="" className="h-12 w-auto object-contain block" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-12">
          {navItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08 }}
              className="relative group cursor-pointer"
            >
              <span className="text-white text-xl tracking-[0.25em] font-bold transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-70 inline-block">
                {item}
              </span>

              {/* Vertical Accent Line */}
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-0 w-[2px] bg-white transition-all duration-500 group-hover:h-6" />
            </motion.div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(true)} className="text-white">
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Expanding Curtain */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
              className="fixed inset-0 origin-center bg-black z-[60]"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-14"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-white"
              >
                <X size={28} />
              </button>

              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-white text-3xl tracking-[0.3em] font-light cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}