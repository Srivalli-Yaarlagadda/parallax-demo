"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/lib/typography";

const links = [
  { label: "Explore", href: "#explore" },
  { label: "Your Journey", href: "#journey" },
  { label: "Our Purpose", href: "#purpose" },
  { label: "Journal", href: "#journal" },
];

const curtainTransition = { type: "tween" as const, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };
const curtainDuration = 0.5;
const linksFadeOutDuration = 0.3;

export default function Navbar12() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHighlighted = (i: number) => hoveredIndex === i || activeIndex === i;
  const shouldDimOthers = hoveredIndex !== null || activeIndex !== null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex h-16 md:h-20 items-center justify-between px-4 md:px-8 bg-black border-b border-white/10"
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.98)" : "rgba(0,0,0,0.95)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <a href="/" className="flex shrink-0 items-center" aria-label="Home">
          <img src="/logoeg.png" alt="" className="h-8 w-auto md:h-9" />
        </a>

        {/* Desktop nav: visible from 1024px */}
        <nav className="hidden lg:flex items-center gap-8 lg:gap-10" onMouseLeave={() => setHoveredIndex(null)}>
          {links.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative flex items-center justify-center py-3 px-4 rounded-lg overflow-visible"
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
              animate={{
                opacity: shouldDimOthers ? (isHighlighted(i) ? 1 : 0.35) : 1,
                y: isHighlighted(i) ? -6 : 0,
                scale: isHighlighted(i) ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <motion.span
                className="absolute inset-0 rounded-lg backdrop-blur-xl"
                style={{
                  background: "rgba(255,255,255,0.28)",
                  transformOrigin: "bottom",
                }}
                animate={{
                  scaleY: isHighlighted(i) ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
              <Typography variant="body-xl" className="relative z-10 whitespace-nowrap text-[#7ED957] font-bold uppercase tracking-wider">
                {item.label}
              </Typography>
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.a
            href="#contact"
            className="hidden lg:inline-flex items-center px-4 py-2 rounded-full bg-[#7ED957] hover:opacity-90"
            whileHover={{ y: -6, scale: 1.15 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <Typography variant="body-xl" className="text-black">Contact Us</Typography>
          </motion.a>
          {/* Hamburger: visible below 1024px; morphs to X when open */}
          <motion.button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="overflow-visible">
              <motion.line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                initial={false}
                animate={
                  menuOpen
                    ? { x1: 6, y1: 6, x2: 18, y2: 18 }
                    : { x1: 4, y1: 6, x2: 20, y2: 6 }
                }
                transition={curtainTransition}
              />
              <motion.line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                initial={false}
                animate={{
                  opacity: menuOpen ? 0 : 1,
                  x1: 4,
                  y1: 12,
                  x2: 20,
                  y2: 12,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                initial={false}
                animate={
                  menuOpen
                    ? { x1: 6, y1: 18, x2: 18, y2: 6 }
                    : { x1: 4, y1: 18, x2: 20, y2: 18 }
                }
                transition={curtainTransition}
              />
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Curtain menu: below 1024px */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] lg:hidden bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            {/* Left curtain: open first; on close waits for links fade then slides */}
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-1/2 z-[61] lg:hidden bg-black/98 backdrop-blur-xl border-r border-white/10"
              variants={{
                open: { x: 0, transition: curtainTransition },
                closed: { x: "-100%", transition: { delay: linksFadeOutDuration, duration: curtainDuration, ease: [0.32, 0.72, 0, 1] } },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            />
            {/* Right curtain: same */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-1/2 z-[61] lg:hidden bg-black/98 backdrop-blur-xl border-l border-white/10"
              variants={{
                open: { x: 0, transition: curtainTransition },
                closed: { x: "100%", transition: { delay: linksFadeOutDuration, duration: curtainDuration, ease: [0.32, 0.72, 0, 1] } },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            />
            {/* Content: appears after curtains, one-by-one; on close fades out first */}
            <motion.div
              className="fixed inset-0 z-[62] lg:hidden pointer-events-none"
              variants={{
                visible: { opacity: 1, transition: { delay: curtainDuration, duration: 0.2 } },
                hidden: { opacity: 0, transition: { duration: linksFadeOutDuration } },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      delayChildren: curtainDuration + 0.1,
                      staggerChildren: 0.07,
                    },
                  },
                  exit: {
                    transition: {
                      staggerChildren: 0.03,
                      staggerDirection: -1,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <nav className="flex flex-col items-center gap-3 py-8">
                  {links.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="py-2 px-4 text-[#7ED957] hover:text-[#9ae06b]"
                      variants={{
                        hidden: { opacity: 0, x: i % 2 === 0 ? -48 : 48 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                        exit: { opacity: 0, x: i % 2 === 0 ? -32 : 32, transition: { duration: 0.2 } },
                      }}
                    >
                      <Typography variant="body-xl" className="text-[#7ED957] hover:text-[#9ae06b] font-semibold uppercase tracking-wider">
                        {item.label}
                      </Typography>
                    </motion.a>
                  ))}
                  <motion.a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-[#7ED957] px-6 py-3 text-black"
                    variants={{
                      hidden: { opacity: 0, y: 56 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                      exit: { opacity: 0, y: 56, transition: { duration: 0.2 } },
                    }}
                  >
                    <Typography variant="body-xl" className="text-black font-semibold">Contact Us</Typography>
                  </motion.a>
                </nav>
              </motion.div>
              {/* Close X button – appears with content */}
              <motion.button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 lg:hidden flex h-12 w-12 items-center justify-center rounded-xl text-white/90 hover:bg-white/10 pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: curtainDuration + 0.15 }}
                exit={{ opacity: 0 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
