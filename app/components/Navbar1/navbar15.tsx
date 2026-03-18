"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 1024;

const links = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#solutions" },
  { label: "Partners", href: "#partners" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
];

type SelectorState = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const NAV_LINK_STAGGER_MS = 45;

export default function Navbar15() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [selector, setSelector] = useState<SelectorState | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const updateSelectorToIndex = (index: number) => {
    const li = itemRefs.current[index];
    const container = containerRef.current;
    if (!li || !container) return;

    const liRect = li.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    setSelector({
      top: liRect.top - cRect.top,
      left: liRect.left - cRect.left,
      width: liRect.width,
      height: liRect.height,
    });
  };

  useLayoutEffect(() => {
    updateSelectorToIndex(activeIndex);
    const handleResize = () => updateSelectorToIndex(activeIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    updateSelectorToIndex(index);
    if (open) setOpen(false);
  };

  return (
    <nav className="w-full bg-[#5161ce]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <div className="py-3 text-white font-medium">Navbar</div>

        {/* Hamburger → X (visible below 1024px) */}
        <button
          type="button"
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="absolute flex h-5 w-5 flex-col justify-center gap-1">
            <span
              className="block h-[2px] w-5 origin-center bg-white transition-all duration-300 ease-out"
              style={{
                transform: open
                  ? "translateY(5px) rotate(45deg)"
                  : "translateY(0) rotate(0)",
              }}
            />
            <span
              className="block h-[2px] w-5 bg-white transition-all duration-200 ease-out"
              style={{
                opacity: open ? 0 : 1,
                transform: open ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block h-[2px] w-5 origin-center bg-white transition-all duration-300 ease-out"
              style={{
                transform: open
                  ? "translateY(-5px) rotate(-45deg)"
                  : "translateY(0) rotate(0)",
              }}
            />
          </span>
        </button>

        {/* Menu: desktop always visible from 1024px; mobile collapsible with animation */}
        <div
          className={`
            w-full overflow-hidden transition-all duration-300 ease-out
            lg:block lg:w-auto lg:overflow-visible lg:flex lg:items-center
            ${open ? "max-lg:max-h-[80vh] max-lg:opacity-100" : "max-lg:max-h-0 max-lg:opacity-0"}
          `}
        >
          <div
            id="navbarSupportedContent"
            ref={containerRef}
            className="relative overflow-visible z-0 max-lg:px-4 max-lg:pb-4"
          >
            {/* Moving white selector (desktop only below 1024px to avoid layout issues) */}
            {selector && (
              <div
                className="hori-selector pointer-events-none absolute hidden lg:inline-block bg-white transition-all duration-[600ms]"
                style={{
                  top: selector.top + 10,
                  left: selector.left,
                  width: selector.width,
                  height: selector.height,
                  transitionTimingFunction:
                    "cubic-bezier(0.68,-0.55,0.265,1.55)",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              >
                <div
                  className="absolute bottom-[10px] bg-white"
                  style={{ left: -25, width: 25, height: 25 }}
                >
                  <div
                    className="absolute rounded-full bg-[#5161ce]"
                    style={{
                      bottom: 0,
                      left: -25,
                      width: 50,
                      height: 50,
                    }}
                  />
                </div>
                <div
                  className="absolute bottom-[10px] bg-white"
                  style={{ right: -25, width: 25, height: 25 }}
                >
                  <div
                    className="absolute rounded-full bg-[#5161ce]"
                    style={{
                      bottom: 0,
                      right: -25,
                      width: 50,
                      height: 50,
                    }}
                  />
                </div>
              </div>
            )}

            <ul className="flex flex-col lg:flex-row lg:ml-auto px-[30px] max-lg:px-2">
              {links.map((item, index) => {
                const isActive = index === activeIndex;
                const isHovered = index === hoveredIndex;
                const staggerDelay = open
                  ? index * NAV_LINK_STAGGER_MS
                  : (links.length - 1 - index) * NAV_LINK_STAGGER_MS;
                const linkVisible = isDesktop || open;
                return (
                  <li
                    key={item.label}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className="list-none float-left max-lg:border-b max-lg:border-white/20"
                    style={{
                      transition: `opacity 0.25s ease-out ${staggerDelay}ms, transform 0.25s ease-out ${staggerDelay}ms`,
                      opacity: linkVisible ? 1 : 0,
                      transform: linkVisible
                        ? "translateY(0)"
                        : "translateY(-8px)",
                    }}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      updateSelectorToIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex((prev) =>
                        prev === index ? null : prev
                      );
                      updateSelectorToIndex(activeIndex);
                    }}
                  >
                    <button
                      type="button"
                      className="relative z-10 block w-full text-left px-5 py-5 lg:px-5 lg:py-5 transition-all duration-[600ms]"
                      style={{
                        color:
                          isActive || isHovered ? "#000000" : "#ffffff",
                        transitionTimingFunction:
                          "cubic-bezier(0.68,-0.55,0.265,1.55)",
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}