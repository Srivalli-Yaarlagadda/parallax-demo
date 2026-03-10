"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Home", "About", "Work", "Gallery", "Contact"];

export default function EditorialNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 pl-4 pr-10 py-5 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/10">
        <a href="/" className="flex shrink-0 items-center -my-1" aria-label="Home">
          <img src="/logoeg.png" alt="" className="h-12 w-auto object-contain block" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-16">
          {navItems.map((item) => (
            <div
              key={item}
              className="relative overflow-hidden group cursor-pointer"
            >
              {/* Top Text */}
              <span className="block text-white text-xl tracking-[0.25em] font-light transition-transform duration-500 group-hover:-translate-y-full">
                {item}
              </span>

              {/* Bottom Text */}
              <span className="absolute left-0 top-full block text-white text-xl tracking-[0.25em] font-light transition-transform duration-500 group-hover:-translate-y-full">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="text-white"
          >
            <Menu size={30} />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center gap-12"          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white"
            >
              <X size={32} />
            </button>

            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                className="text-white text-4xl tracking-[0.25em] font-light"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}