"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const journeyItems = [
  { label: "Your buying journey", href: "#buying-journey" },
  { label: "Making it easier", href: "#easier" },
  { label: "Communities we've built", href: "#communities" },
];

const purposeItems = [
  { label: "Our story", href: "#story" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Careers", href: "#careers" },
];

const navLinks: Array<
  | { label: string; href: string }
  | { label: string; href: string; hasDropdown: true; items: typeof journeyItems }
> = [
  { label: "Explore", href: "#explore" },
  { label: "Your Journey", href: "#journey", hasDropdown: true, items: journeyItems },
  { label: "Our Purpose", href: "#purpose", hasDropdown: true, items: purposeItems },
  { label: "Journal", href: "#journal" },
];

export default function Navbar11() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const closeDropdown = () => {
    clearCloseTimeout();
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    clearCloseTimeout();
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const openDropdownOnHover = (label: string) => {
    clearCloseTimeout();
    setOpenDropdown(label);
  };

  useEffect(() => () => clearCloseTimeout(), []);

  return (
    <>
      {openDropdown && (
        <button
          type="button"
          className="fixed inset-0 z-20 md:block hidden"
          aria-label="Close dropdown"
          onClick={closeDropdown}
        />
      )}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 md:h-16 items-center justify-between bg-stone-900/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8">
        {/* Left: Logo */}
        <a href="/" className="flex shrink-0 items-center" aria-label="Home">
          <img
            src="/logoeg.png"
            alt=""
            className="h-8 w-auto object-contain md:h-9"
          />
        </a>

        {/* Center-right: Nav links */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => "hasDropdown" in link && link.hasDropdown && openDropdownOnHover(link.label)}
            >
              {"hasDropdown" in link && link.hasDropdown ? (
                <button
                  type="button"
                  onClick={() => toggleDropdown(link.label)}
                  className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-white/95 hover:text-white transition-colors"
                >
                  {link.label}
                  <motion.svg
                    className="w-3.5 h-3.5 text-white/80 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    initial={false}
                    animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
              ) : (
                <a
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-widest text-white/95 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Heart + Hamburger */}
        <div className="flex shrink-0 items-center gap-4 md:gap-6">
          <a
            href="#favorites"
            aria-label="Favorites"
            className="text-white/90 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-6 w-6 shrink-0 items-center justify-center overflow-visible text-white/95 hover:text-white transition-colors"
          >
            {/* Two lines morph from horizontal (=) to diagonal (X) by animating line coordinates */}
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="overflow-visible text-current">
              <motion.line
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={false}
                animate={
                  menuOpen
                    ? { x1: 5, y1: 5, x2: 15, y2: 15 }
                    : { x1: 0, y1: 6, x2: 20, y2: 6 }
                }
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              />
              <motion.line
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={false}
                animate={
                  menuOpen
                    ? { x1: 5, y1: 15, x2: 15, y2: 5 }
                    : { x1: 0, y1: 14, x2: 20, y2: 14 }
                }
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Full-width dropdown (fixed below header, spans viewport) */}
      <AnimatePresence>
        {openDropdown && (() => {
          const link = navLinks.find((l) => "hasDropdown" in l && l.label === openDropdown);
          if (!link || !("hasDropdown" in link) || !link.hasDropdown) return null;
          return (
            <motion.div
              key={openDropdown}
              className="fixed left-0 right-0 top-14 md:top-16 z-30 bg-stone-800/95 backdrop-blur border-t border-white/10 shadow-xl"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onMouseLeave={closeDropdown}
            >
              <div className="w-full py-4 px-4 md:px-8">
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                  {link.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block py-2 text-xs font-medium tracking-wide text-white/90 hover:bg-white/10 hover:text-white px-2 rounded"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Menu panel: 40% from right, all nav links, open on hamburger click */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-50 w-full bg-stone-900/98 backdrop-blur-md border-l border-white/10 shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:w-[40%] md:min-w-[280px] md:max-w-[480px]"
            >
              <div className="flex h-full flex-col items-center justify-center px-6 overflow-y-auto pt-16 pb-8 md:items-stretch md:justify-start md:pt-16">
                <nav className="flex flex-col gap-0 w-full max-w-[200px] text-center md:max-w-none md:text-left">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      {"hasDropdown" in link && link.hasDropdown ? (
                        <>
                          <div className="py-3 text-sm font-medium uppercase tracking-widest text-white/95 border-b border-white/10">
                            {link.label}
                          </div>
                          {link.items.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="block py-2.5 pl-4 text-sm font-medium tracking-wide text-white/80 hover:text-white border-b border-white/5 text-center md:pl-4 md:text-left"
                            >
                              {item.label}
                            </a>
                          ))}
                        </>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-3 text-sm font-medium uppercase tracking-widest text-white/95 hover:text-white border-b border-white/10"
                        >
                          {link.label}
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}