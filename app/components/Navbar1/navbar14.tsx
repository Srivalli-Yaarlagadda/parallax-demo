"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/lib/typography";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
  { label: "Partners", href: "#partners" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
];

const spring = { type: "spring" as const, stiffness: 380, damping: 26 };
const ease = [0.22, 1, 0.36, 1] as const;
const MOBILE_LINKS_EXIT_MS = 550;
const MOBILE_BG_EXIT_MS = 350;

const quadrants = [
  { class: "top-0 left-0 w-1/2 h-1/2 origin-top-left bg-gradient-to-br from-orange-500/35 via-orange-400/20 to-transparent backdrop-blur-md", delay: 0.02 },
  { class: "top-0 right-0 w-1/2 h-1/2 origin-top-right bg-gradient-to-bl from-orange-500/35 via-orange-400/20 to-transparent backdrop-blur-md", delay: 0.06 },
  { class: "bottom-0 left-0 w-1/2 h-1/2 origin-bottom-left bg-gradient-to-tr from-orange-500/35 via-orange-400/20 to-transparent backdrop-blur-md", delay: 0.1 },
  { class: "bottom-0 right-0 w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tl from-orange-500/35 via-orange-400/20 to-transparent backdrop-blur-md", delay: 0.14 },
];

const contactBtnBg = "linear-gradient(135deg, rgba(249,115,22,0.35), rgba(248,113,113,0.25))";

export default function Navbar14() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [mobileClosingPhase, setMobileClosingPhase] = useState<null | "links" | "bg">(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuVisible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuVisible]);

  const closeMobileMenu = (targetHref?: string) => {
    if (mobileClosingPhase) return;
    setMenuOpen(false);
    setMobileClosingPhase("links");
    setTimeout(() => setMobileClosingPhase("bg"), MOBILE_LINKS_EXIT_MS);
    setTimeout(() => {
      setMobileClosingPhase(null);
      setMobileMenuVisible(false);
      if (targetHref) window.location.href = targetHref;
    }, MOBILE_LINKS_EXIT_MS + MOBILE_BG_EXIT_MS);
  };

  const openMobileMenu = () => {
    setMenuOpen(true);
    setMobileMenuVisible(true);
    setMobileClosingPhase(null);
  };

  const bgAnim = mobileClosingPhase === "bg" ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex h-14 sm:h-16 lg:h-20 items-center justify-between px-4 sm:px-6 lg:px-8 bg-black"
        initial={false}
        animate={{ backgroundColor: "rgba(0,0,0,1)", backdropFilter: scrolled ? "blur(20px)" : "blur(12px)" }}
        transition={{ duration: 0.35 }}
      >

        <a href="/" className="relative z-10 flex shrink-0 items-center" aria-label="Home">
          <motion.img src="/logoeg.png" alt="" className="h-7 w-auto sm:h-8 lg:h-9" whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }} transition={{ type: "spring", stiffness: 400, damping: 20 }} />
        </a>

        <nav className="hidden lg:flex items-center gap-2 xl:gap-3" onMouseLeave={() => setHoveredIndex(null)}>
          {links.map((item, i) => {
            const isOn = hoveredIndex === i || activeIndex === i;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative flex items-center py-3 px-4 rounded-lg overflow-hidden"
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.04 * i }}
              >
                <span className="relative inline-block">
                  <motion.span
                    className="absolute left-0 right-0 top-1/2 z-10 h-0.5 -translate-y-1/2 rounded-full bg-white origin-left pointer-events-none"
                    initial={false}
                    animate={{ scaleX: isOn ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                  <Typography variant="body-xl" className="relative font-semibold uppercase tracking-wider">
                    {item.label.split("").map((char, j) => {
                      const ch = char === " " ? "\u00A0" : char;
                      const gradientDelay = isOn ? j * 0.06 : 0;
                      const tiltDelay = isOn ? 0.04 : 0;
                      return (
                        <motion.span key={`${i}-${j}`} className="inline-block origin-bottom relative" animate={{ rotate: isOn ? 8 : 0 }} transition={{ duration: 0.35, ease, delay: tiltDelay }}>
                          <motion.span className="inline-block text-white/95" initial={false} animate={{ opacity: isOn ? 0 : 1 }} transition={{ duration: 0.2, delay: isOn ? gradientDelay : 0 }}>{ch}</motion.span>
                          <motion.span className="absolute left-0 top-0 inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500" initial={false} animate={{ opacity: isOn ? 1 : 0 }} transition={{ duration: 0.25, delay: gradientDelay }}>{ch}</motion.span>
                        </motion.span>
                      );
                    })}
                  </Typography>
                </span>
              </motion.a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4 relative z-10">
          <motion.a
            href="#contact"
            className="hidden lg:inline-flex items-center relative overflow-hidden px-6 py-2.5 rounded-full font-semibold uppercase tracking-wider border border-orange-400/80 bg-orange-500/10 backdrop-blur-md"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, ...spring }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: contactBtnBg }} animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }} />
            <motion.span className="absolute left-6 right-6 top-1/2 z-10 h-0.5 -translate-y-1/2 rounded-full bg-white origin-left pointer-events-none" initial={false} whileHover={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            <span className="relative z-10 inline-block">
              {"Contact".split("").map((char, j) => {
                const ch = char === " " ? "\u00A0" : char;
                const delay = j * 0.06;
                return (
                  <motion.span key={j} className="inline-block origin-bottom relative" whileHover={{ rotate: 8 }} transition={{ duration: 0.35, ease, delay: 0.04 }}>
                    <motion.span className="inline-block text-white/95" initial={false} whileHover={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay }}>{ch}</motion.span>
                    <motion.span className="absolute left-0 top-0 inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500" initial={false} whileHover={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.25, delay }}>{ch}</motion.span>
                  </motion.span>
                );
              })}
            </span>
          </motion.a>

          <motion.button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => (!menuOpen && !mobileMenuVisible ? openMobileMenu() : mobileMenuVisible && !mobileClosingPhase && closeMobileMenu())}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl text-white/90 hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.92 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="overflow-visible">
              <motion.g initial={false} animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.4, ease }}>
                <motion.line stroke="currentColor" initial={false} animate={menuOpen ? { x1: 12, y1: 12, x2: 12, y2: 12, opacity: 0 } : { x1: 4, y1: 6, x2: 20, y2: 6, opacity: 1 }} transition={{ duration: 0.25 }} />
                <motion.line stroke="currentColor" initial={false} animate={menuOpen ? { x1: 6, y1: 6, x2: 18, y2: 18 } : { x1: 4, y1: 12, x2: 20, y2: 12 }} transition={{ duration: 0.35, ease }} />
                <motion.line stroke="currentColor" initial={false} animate={menuOpen ? { x1: 18, y1: 6, x2: 6, y2: 18 } : { x1: 4, y1: 18, x2: 20, y2: 18 }} transition={{ duration: 0.35, ease }} />
              </motion.g>
            </svg>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuVisible && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] lg:hidden bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => closeMobileMenu()}
              aria-hidden
            />
            <motion.div className="fixed inset-0 z-[61] lg:hidden flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="absolute inset-0 overflow-hidden backdrop-blur-2xl bg-black/30">
                {quadrants.map((q, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${q.class}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={bgAnim}
                    transition={{ duration: 0.45, ease, delay: q.delay }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24">
                <motion.nav
                  className="flex flex-col items-center gap-2 sm:gap-3"
                  variants={{
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
                    exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                  }}
                  initial="hidden"
                  animate={mobileClosingPhase === "links" ? "exit" : "visible"}
                >
                  {links.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        closeMobileMenu(item.href);
                      }}
                      className="relative py-3 px-6 rounded-2xl w-full max-w-xs text-center group"
                      variants={{
                        hidden: { opacity: 0, y: 24, scale: 0.92 },
                        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 30 } },
                        exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
                      }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="absolute inset-0 rounded-2xl bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                      <Typography variant="body-xl" className="relative z-10 text-white/95 group-hover:text-white font-semibold uppercase tracking-wider">{item.label}</Typography>
                    </motion.a>
                  ))}
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMobileMenu("#contact");
                    }}
                    className="mt-6 relative overflow-hidden inline-flex items-center justify-center rounded-full px-8 py-4 min-w-[200px] border border-orange-400/80 bg-orange-500/10 backdrop-blur-md"
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.9 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 30, delay: 0.4 } },
                      exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: contactBtnBg }} />
                    <Typography variant="body-xl" className="relative z-10 text-white font-bold uppercase tracking-wider">Contact</Typography>
                  </motion.a>
                </motion.nav>
              </div>

              <motion.button
                type="button"
                aria-label="Close menu"
                onClick={() => closeMobileMenu()}
                className="absolute top-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl text-white/90 hover:bg-white/10 border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}