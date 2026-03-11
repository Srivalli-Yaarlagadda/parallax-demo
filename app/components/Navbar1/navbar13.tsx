"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import Typography from "@/lib/typography";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
  { label: "Partners", href: "#partners" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
];

const spring = { type: "spring" as const, stiffness: 400, damping: 24 };
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Corner/edge positions (px) – links animate from these into center
const FROM_CORNERS = [
  { x: -120, y: -80 },   // top-left
  { x: 120, y: -80 },    // top-right
  { x: -120, y: 80 },    // bottom-left
  { x: 120, y: 80 },     // bottom-right
  { x: 0, y: -100 },     // top center
  { x: 140, y: 0 },      // right
  { x: -140, y: 0 },     // left
  { x: 0, y: 100 },      // bottom center
] as const;

function fromCorner(index: number): { x: number; y: number } {
  return { ...FROM_CORNERS[index % FROM_CORNERS.length] };
}

function WaveBg({ active, onCloseComplete }: { active: boolean; onCloseComplete?: () => void }) {
  const level = useMotionValue(100);
  useEffect(() => {
    const ctrl = animate(level, active ? 0 : 100, {
      type: "tween",
      duration: 0.7,
      ease,
    });
    if (!active) ctrl.then(() => onCloseComplete?.());
    return () => ctrl.stop();
  }, [active, level, onCloseComplete]);
  const pathD = useTransform(level, (v) => {
    const y = v;
    const a = 6;
    return `M 0 100 L 0 ${y} C 12 ${y - a} 25 ${y + a} 37 ${y - a} C 37 ${y - a} 50 ${y + a} 62 ${y - a} C 62 ${y - a} 75 ${y + a} 87 ${y - a} C 87 ${y - a} 100 ${y} 100 ${y} L 100 100 Z`;
  });
  return (
    <span className="absolute inset-0 overflow-hidden">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path d={pathD} fill="rgba(10,10,14,0.97)" />
      </svg>
    </span>
  );
}

const LINKS_EXIT_DURATION_MS = 600; // stagger (8 * 0.04) + exit (0.25) ≈ 0.57s

export default function Navbar13() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [contactHovered, setContactHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closingPhase, setClosingPhase] = useState<null | "links" | "wave">(null);

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

  useEffect(() => {
    if (!menuOpen) setClosingPhase(null);
  }, [menuOpen]);

  const handleCloseMenu = () => {
    if (!menuOpen || closingPhase) return;
    setClosingPhase("links");
  };

  useEffect(() => {
    if (closingPhase !== "links") return;
    const t = setTimeout(() => setClosingPhase("wave"), LINKS_EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [closingPhase]);

  const handleWaveCloseComplete = () => {
    setMenuOpen(false);
    setClosingPhase(null);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex h-14 sm:h-16 lg:h-20 items-center justify-between px-4 sm:px-6 lg:px-8 bg-black/95 backdrop-blur-xl border-b border-white/10"
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.96)" : "rgba(0,0,0,0.92)",
        }}
        transition={{ duration: 0.3 }}
      >
        <a href="/" className="flex shrink-0 items-center" aria-label="Home">
          <img src="/logoeg.png" alt="" className="h-7 w-auto sm:h-8 lg:h-9" />
        </a>

        {/* Desktop nav: visible from 1024px */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10" onMouseLeave={() => setHoveredIndex(null)}>
          {links.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative flex items-center py-2 lg:py-3 px-1"
              onMouseEnter={() => setHoveredIndex(i)}
              transition={spring}
            >
              <Typography variant="body-xl" className="font-bold uppercase tracking-wider text-white/95">
                {item.label.split("").map((char, j) => (
                  <motion.span
                    key={`${i}-${j}`}
                    className="inline-block"
                    animate={{
                      y: hoveredIndex === i ? [0, -14, 0] : 0,
                      color: hoveredIndex === i
                        ? ["rgba(255,255,255,0.95)", "rgb(240, 42, 157)", "rgba(255,255,255,0.95)"]
                        : "rgba(255,255,255,0.95)",
                    }}
                    transition={{
                      duration: 0.4,
                      ease,
                      delay: hoveredIndex === i ? j * 0.06 : 0,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </Typography>
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4">
          <motion.a
            href="#contact"
            className="hidden lg:inline-flex items-center px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-white text-black"
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            whileTap={{ scale: 0.98 }}
            transition={spring}
          >
            <Typography variant="body-xl" className="font-bold uppercase tracking-wider text-black">
              {"Contact".split("").map((char, j) => (
                <motion.span
                  key={j}
                  className="inline-block"
                  animate={{
                    y: contactHovered ? [0, -14, 0] : 0,
                    color: contactHovered
                      ? ["rgb(0,0,0)", "rgb(240, 42, 157)", "rgb(0,0,0)"]
                      : "rgb(0,0,0)",
                  }}
                  transition={{
                    duration: 0.4,
                    ease,
                    delay: contactHovered ? j * 0.06 : 0,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </Typography>
          </motion.a>
          <motion.button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="overflow-visible">
              <motion.line
                stroke="currentColor"
                initial={false}
                animate={menuOpen ? { x1: 6, y1: 6, x2: 18, y2: 18 } : { x1: 4, y1: 6, x2: 20, y2: 6 }}
                transition={{ duration: 0.3, ease }}
              />
              <motion.line
                stroke="currentColor"
                initial={false}
                animate={{ opacity: menuOpen ? 0 : 1, x1: 4, y1: 12, x2: 20, y2: 12 }}
                transition={{ duration: 0.2 }}
              />
              <motion.line
                stroke="currentColor"
                initial={false}
                animate={menuOpen ? { x1: 6, y1: 18, x2: 18, y2: 6 } : { x1: 4, y1: 18, x2: 20, y2: 18 }}
                transition={{ duration: 0.3, ease }}
              />
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile menu: water wave bg from bottom + links from random places */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] lg:hidden bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleCloseMenu}
              aria-hidden
            />
            <motion.div
              className="fixed inset-0 z-[61] lg:hidden flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Water wave background – recedes only after links have exited */}
              <WaveBg
                active={closingPhase !== "wave"}
                onCloseComplete={handleWaveCloseComplete}
              />
              {/* Links + Contact – exit first, then wave goes */}
              <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20">
                <motion.nav
                  className="flex flex-col items-center gap-4 sm:gap-5"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.08, delayChildren: 0.35 },
                    },
                    exit: {
                      transition: { staggerChildren: 0.04, staggerDirection: -1 },
                    },
                  }}
                  initial="hidden"
                  animate={closingPhase !== null ? "exit" : "visible"}
                >
                  {links.map((item, i) => {
                    const from = fromCorner(i);
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={handleCloseMenu}
                        className="text-white/95 hover:text-white py-2 px-3"
                        variants={{
                          hidden: { opacity: 0, x: from.x, y: from.y },
                          visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.45, ease } },
                          exit: { opacity: 0, x: from.x, y: from.y, transition: { duration: 0.25 } },
                        }}
                      >
                        <Typography variant="body-xl" className="text-white/95 hover:text-white font-semibold uppercase tracking-wider">
                          {item.label}
                        </Typography>
                      </motion.a>
                    );
                  })}
                  <motion.a
                    href="#contact"
                    onClick={handleCloseMenu}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-black"
                    variants={{
                      hidden: { opacity: 0, x: fromCorner(links.length).x, y: fromCorner(links.length).y },
                      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.45, ease } },
                      exit: { opacity: 0, x: fromCorner(links.length).x, y: fromCorner(links.length).y, transition: { duration: 0.25 } },
                    }}
                  >
                    <Typography variant="body-xl" className="text-black font-semibold uppercase tracking-wider">
                      Contact
                    </Typography>
                  </motion.a>
                </motion.nav>
              </div>
              <motion.button
                type="button"
                aria-label="Close menu"
                onClick={handleCloseMenu}
                className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-xl text-white/90 hover:bg-white/10 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                exit={{ opacity: 0 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
