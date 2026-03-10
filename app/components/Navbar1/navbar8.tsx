"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const navItems = ["Home", "About", "Services", "Projects", "Contact"];
const spring = { type: "spring" as const, stiffness: 300, damping: 30 };
const springSlow = { type: "spring" as const, stiffness: 100, damping: 22 };
const ease = [0.22, 1, 0.36, 1] as const;
const NEON_SHADOW = "0 0 8px rgba(192,132,252,0.95), 0 0 20px rgba(192,132,252,0.8), 0 0 40px rgba(217,70,239,0.6), 0 0 80px rgba(217,70,239,0.4)";

const container = { hidden: { opacity: 0 }, visible: () => ({ opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }) };
const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

function NavLink({ label, isHovered, onHover }: { label: string; index: number; isHovered: boolean; onHover: (v: boolean) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const style = { x: useSpring(x, { stiffness: 380, damping: 26 }), y: useSpring(y, { stiffness: 380, damping: 26 }) };

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };
  const onLeave = () => { x.set(0); y.set(0); onHover(false); };

  return (
    <motion.li variants={item} className="relative" onMouseEnter={() => onHover(true)} onMouseLeave={onLeave}>
      <motion.a ref={ref} href="#" style={style} onMouseMove={onMove}
        className="group/link relative z-10 block px-5 py-3 text-xl font-bold text-white/80 transition-colors duration-300 hover:text-white rounded-xl overflow-visible">
        <AnimatePresence>
          {isHovered && (
            <motion.span layoutId="nav-spotlight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="absolute inset-0 -z-10 rounded-xl bg-white/[0.07] shadow-[0_0_28px_-4px_rgba(139,92,246,0.35)]" />
          )}
        </AnimatePresence>
        <span className="relative inline-block">
          <span className="block" aria-hidden="true">{label}</span>
          <motion.span className="absolute inset-0 block text-transparent bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" style={{ textShadow: NEON_SHADOW }}>{label}</motion.span>
        </span>
        <motion.span className="absolute left-5 right-5 bottom-2 h-[2px] rounded-full bg-gradient-to-r from-violet-400/80 via-fuchsia-400/80 to-violet-400/80 origin-left"
          initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }} transition={{ duration: 0.35, ease }} />
      </motion.a>
    </motion.li>
  );
}

const curtainStyle = { backgroundSize: "200% 200%" };
const curtainBg = (color: string) => ({ backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 50%, ${color}, transparent)` });

export default function Navbar8() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tCurtain = { duration: 0.55, ease };
  const tItem = (i: number) => ({ duration: 0.5, delay: 0.22 + i * 0.08, ease });

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 z-30 h-px pointer-events-none overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
        <motion.div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" animate={{ x: ["-50%", "0%"] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
      </motion.div>

      <motion.header initial={false} animate={{ paddingTop: 0, paddingBottom: 0 }} transition={spring} className="fixed inset-x-0 top-0 z-40 flex w-full justify-center">
        <motion.div initial={false} animate={{
          boxShadow: atTop ? "0 1px 0 rgba(255,255,255,0.06)" : "0 28px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px -16px rgba(139,92,246,0.2)",
          backgroundColor: atTop ? "rgba(8,8,14,0.85)" : "rgba(8,8,14,0.94)",
        }} transition={springSlow} className="relative flex h-16 min-[1024px]:h-[4.5rem] w-full items-center justify-between overflow-hidden backdrop-blur-2xl border-b border-white/[0.08] pl-2 pr-4 min-[1024px]:pl-4 min-[1024px]:pr-8 rounded-none">
          <motion.div className="absolute inset-[-1px] rounded-none pointer-events-none opacity-60" style={{
            background: "conic-gradient(from 0deg, transparent, rgba(139,92,246,0.5), rgba(217,70,239,0.5), transparent, rgba(139,92,246,0.5))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor", padding: "1px",
          }} animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
          <a href="/" className="flex shrink-0 items-center -my-1" aria-label="Home">
            <img src="/logoeg.png" alt="" className="h-12 w-auto object-contain block" />
          </a>
          <div className="flex-1 min-[1024px]:hidden" aria-hidden />
          <div className="hidden min-[1024px]:block flex-1" aria-hidden />
          <motion.ul variants={container} initial="hidden" animate="visible" className="hidden min-[1024px]:flex items-center gap-0.5 shrink-0">
            {navItems.map((label, index) => (
              <NavLink key={label} label={label} index={index} isHovered={hoveredIndex === index} onHover={(v) => setHoveredIndex(v ? index : null)} />
            ))}
          </motion.ul>
          <div className="flex-1 flex justify-end min-[1024px]:flex-none">
            <motion.button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((o) => !o)}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white min-[1024px]:hidden"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.95 }} transition={spring}>
              <div className="relative h-5 w-6">
                <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} transition={spring} className="absolute left-0 top-0 h-[2px] w-6 rounded-full bg-white origin-center" />
                <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.18 }} className="absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 rounded-full bg-white origin-center" />
                <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} transition={spring} className="absolute left-0 bottom-0 h-[2px] w-6 rounded-full bg-white origin-center" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            {[{ x: "-100%", className: "left-0 w-1/2 bg-gradient-to-br from-violet-950/98 to-black/98 border-r border-white/10", bg: "rgba(139,92,246,0.15)" }, { x: "100%", className: "right-0 w-1/2 bg-gradient-to-bl from-fuchsia-950/98 to-black/98 border-l border-white/10", bg: "rgba(217,70,239,0.15)" }].map((panel, pi) => (
              <motion.div key={panel.x} initial={{ x: panel.x }} animate={{ x: 0 }} exit={{ x: panel.x }} transition={tCurtain}
                className={`fixed inset-y-0 z-50 min-[1024px]:hidden backdrop-blur-2xl ${panel.className}`}>
                <motion.div className="absolute inset-0 opacity-30" animate={{ backgroundPosition: pi === 0 ? ["0% 0%", "100% 100%"] : ["100% 100%", "0% 0%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ ...curtainStyle, ...curtainBg(panel.bg) }} />
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.12, duration: 0.35 }} className="fixed inset-0 z-[55] min-[1024px]:hidden flex flex-col items-center justify-center px-6 pointer-events-none">
              <div className="pointer-events-auto flex flex-col items-center w-full max-w-sm">
                <nav className="flex flex-col w-full gap-0">
                  {navItems.map((label, index) => (
                    <motion.a key={label} href="#" initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={tItem(index)}
                      onClick={() => setMenuOpen(false)} className="group relative py-5 px-6 flex items-center gap-4 text-[1.65rem] font-bold text-white/90 hover:text-white border-b border-white/5 last:border-0" whileTap={{ scale: 0.98 }}>
                      <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }} className="text-sm font-mono tabular-nums text-violet-400/80 min-w-[2ch]">{String(index + 1).padStart(2, "0")}</motion.span>
                      <motion.span className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-400/60 to-transparent origin-top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.4, delay: 0.35 + index * 0.08, ease }} />
                      <span className="relative inline-block">
                        <span className="block">{label}</span>
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-transparent bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text" style={{ textShadow: NEON_SHADOW }}>{label}</span>
                      </span>
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
            <motion.button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ delay: 0.2, ...spring }}
              className="fixed top-6 right-6 z-[60] flex h-12 w-12 min-[1024px]:hidden items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
              <span className="text-2xl font-light leading-none">×</span>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}