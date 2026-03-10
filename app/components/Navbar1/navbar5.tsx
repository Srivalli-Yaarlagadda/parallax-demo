"use client";

import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Brands", href: "#" },
  
];

const SCROLL_THRESHOLD = 60;

export default function PremiumAnimatedNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > SCROLL_THRESHOLD) {
        if (y > lastScrollY.current) setNavbarVisible(false);
        else setNavbarVisible(true);
      } else {
        setNavbarVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes menu-item-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes panel-in {
          0% { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full border-b border-white/[0.08] bg-indigo-950/85 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)] transition-transform duration-300 ${
          navbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 pl-4 pr-6 py-4 lg:px-8">
          <a href="/" className="flex shrink-0 items-center -my-0.5" aria-label="Home">
            <img src="/logoeg.png" alt="" className="h-11 w-auto object-contain block" />
          </a>

          {/* Desktop nav (≥1024px): hover = box + color, active = dot below */}
          <nav className="hidden lg:flex items-center gap-2 flex-wrap justify-end">
            {navItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(index);
                  }}
                  className="group relative px-4 pt-3 pb-4 text-[15px] font-bold tracking-[0.12em] uppercase text-slate-300 transition-all duration-300 hover:text-blue-400"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-blue-400" : "group-hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                  </span>
                  {/* Hover/active box: semi-transparent dark with soft glow */}
                  <span
                    className={`absolute inset-0 -z-10 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-slate-600/60 shadow-[0_0_24px_rgba(30,58,138,0.3)]"
                        : "bg-transparent shadow-none group-hover:bg-slate-600/50 group-hover:shadow-[0_0_20px_rgba(30,58,138,0.25)]"
                    }`}
                  />
                  {/* Active page dot below */}
                  {isActive && (
                    <span
                      className="absolute left-1/2 bottom-1.5 -translate-x-1/2 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]"
                      aria-hidden
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile: hamburger / X (<1024px) */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? (
              <span className="text-xl font-light leading-none">×</span>
            ) : (
              <div className="relative h-4 w-5">
                <span className="absolute left-0 top-0 h-px w-5 rounded-full bg-white" />
                <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 rounded-full bg-white" />
                <span className="absolute left-0 bottom-0 h-px w-5 rounded-full bg-white" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay (<1024px): same hover box + color, dot for active */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-[opacity,visibility] duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-indigo-950/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white shadow-lg transition-all duration-200 hover:bg-white/20 hover:border-white/25"
        >
          <span className="text-xl font-light leading-none">×</span>
        </button>
        <div
          className="relative flex h-full w-full flex-col items-center justify-center px-6"
          style={{
            animation: menuOpen ? "panel-in 0.35s cubic-bezier(0.4, 0, 0.2, 1) both" : "none",
          }}
        >
          <nav className="flex flex-col items-center gap-3">
            {navItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(index);
                    setMenuOpen(false);
                  }}
                  className="group relative py-4 px-8 pb-5 text-[1.5rem] font-bold tracking-[0.2em] uppercase text-white/70 transition-all duration-200 hover:text-blue-400"
                  style={{
                    animation: menuOpen ? `menu-item-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s both` : "none",
                  }}
                >
                  <span className={`relative z-10 ${isActive ? "text-blue-400" : "group-hover:text-blue-400"}`}>
                    {item.label}
                  </span>
                  {/* Hover/active box + dot (same as desktop) */}
                  <span
                    className={`absolute inset-0 -z-10 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-slate-600/60 shadow-[0_0_24px_rgba(30,58,138,0.3)]"
                        : "bg-transparent group-hover:bg-slate-600/50 group-hover:shadow-[0_0_20px_rgba(30,58,138,0.25)]"
                    }`}
                  />
                  {isActive && (
                    <span
                      className="absolute left-1/2 bottom-2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]"
                      aria-hidden
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}