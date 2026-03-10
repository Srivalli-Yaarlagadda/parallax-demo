"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "About", "Contact", "Gallery", "Brands", "How we work"];
const t = { duration: 0.5 };

export default function ScrollableNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const currentIndex = hoverIndex ?? activeIndex;

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= 10);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const setActive = (index: number) => {
    setActiveIndex(index);
    setMenuOpen(false);
  };

  const headerPad = isDesktop
    ? atTop
      ? { paddingTop: 0, paddingBottom: 16, paddingLeft: 0, paddingRight: 0 }
      : { paddingTop: 20, paddingBottom: 20, paddingLeft: 28, paddingRight: 28 }
    : { paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16 };

  return (
    <>
      <motion.header
        initial={false}
        animate={headerPad}
        transition={t}
        className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center"
      >
        {isDesktop && (
          <motion.nav
            initial={false}
            animate={{ borderRadius: atTop ? 0 : 9999, boxShadow: atTop ? "0 1px 0 rgba(255,255,255,0.08)" : "0 24px 48px rgba(0,0,0,0.4)" }}
            transition={t}
            className={`flex bg-white/40 backdrop-blur-xl px-1 py-1 border border-white/40 ${atTop ? "w-full justify-center" : "inline-flex"}`}
          >
            <div className="relative flex">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  whileHover={{ boxShadow: "0 0 12px 4px rgba(197, 119, 30, 0.6)" }}
                  className="px-6 py-2.5 text-base font-medium rounded-full"
                >
                  <span className={currentIndex === index ? "text-slate-900 font-semibold" : "text-slate-700"}>{item}</span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}

        <div className="flex w-full min-[1024px]:hidden items-center justify-end px-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="relative h-8 w-8 z-50 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!menuOpen ? (
                <motion.div key="hamburger" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="flex flex-col justify-between h-5 w-6">
                  <span className="block h-[2px] w-full bg-white rounded" />
                  <span className="block h-[2px] w-full bg-white rounded" />
                  <span className="block h-[2px] w-full bg-white rounded" />
                </motion.div>
              ) : (
                <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }} className="text-white text-3xl leading-none">×</motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ ...t, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl min-[1024px]:hidden flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => setActive(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="text-2xl font-medium"
                >
                  <span className={currentIndex === index ? "text-white font-semibold" : "text-white/70"}>{item}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}