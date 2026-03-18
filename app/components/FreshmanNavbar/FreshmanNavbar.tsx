"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/lib/typography";
import type { FreshmanNavbarProps } from "./types";

const BG = "#b7b7ae";

const MENU_LAYOUT = {
  HOME: { colStart: 1, colSpan: 5, align: "left", fontSize: "clamp(2.6rem, 4vw, 6rem)" },
  WORK: { colStart: 3, colSpan: 5, align: "left", fontSize: "clamp(2.6rem, 4vw, 6rem)" },
  DIRECTORS: { colStart: 5, colSpan: 5, align: "center", fontSize: "clamp(2.6rem, 4vw, 6rem)" },
  ABOUT: { colStart: 8, colSpan: 4, align: "right", fontSize: "clamp(2.6rem, 4vw, 6rem)" },
  NEWS: { colStart: 1, colSpan: 5, align: "left", fontSize: "clamp(2.6rem, 4vw, 6rem)" },
  CONTACT: { colStart: 4, colSpan: 6, align: "center", fontSize: "clamp(2.6rem, 4vw, 6rem)" },
};

const MOBILE_MENU_LAYOUT = {
  HOME: { colStart: 1, colSpan: 5, align: "left", fontSize: "clamp(2rem, 7vw, 4rem)" },
  WORK: { colStart: 3, colSpan: 5, align: "left", fontSize: "clamp(2rem, 7vw, 4rem)" },
  DIRECTORS: { colStart: 5, colSpan: 5, align: "center", fontSize: "clamp(2rem, 7vw, 4rem)" },
  ABOUT: { colStart: 8, colSpan: 4, align: "right", fontSize: "clamp(2rem, 7vw, 4rem)" },
  NEWS: { colStart: 1, colSpan: 5, align: "left", fontSize: "clamp(2rem, 7vw, 4rem)" },
  CONTACT: { colStart: 4, colSpan: 6, align: "center", fontSize: "clamp(2rem, 7vw, 4rem)" },
};


function getLayout(label: string, isMobile: boolean) {
  const key = label.trim().toUpperCase();
  const layout = isMobile ? MOBILE_MENU_LAYOUT : MENU_LAYOUT;

  return (
    layout[key as keyof typeof layout] ?? {
      colStart: 1,
      colSpan: isMobile ? 6 : 12,
      align: "center",
      fontSize: isMobile ? "clamp(2rem, 8vw, 4rem)" : "clamp(3.5rem, 6vw, 8rem)",
    }
  );
}

export function FreshmanNavbar({
  logo,
  links,
  menuButtonLabel = "+ MENU",
  closeButtonLabel = "X CLOSE",
  menuBrandName = "freshman",
  linkSuperscripts: linkSuperscriptsProp,
  footer: footerProp,
  className,
}: FreshmanNavbarProps) {
  const linkSuperscripts = linkSuperscriptsProp ?? {};
  const footer = {
    privacyLabel: footerProp?.privacyLabel ?? "Privacy Policy",
    copyrightText: footerProp?.copyrightText ?? "2026 Real Always Wins",
    termsLabel: footerProp?.termsLabel ?? "Terms & Conditions",
  };
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredMenuButton, setHoveredMenuButton] = useState(false);
  const [hoveredCloseButton, setHoveredCloseButton] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const logoHref = logo?.href ?? "/";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${className ?? ""}`}>

      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-black text-white">

        {/* LOGO */}
        <Link href={logoHref} className="flex items-center gap-3">
          {logo?.logoImageUrl ? (
            <Image
              src={logo.logoImageUrl}
              alt={logo.brandName ?? "Logo"}
              width={100}
              height={28}
              className="h-7 w-auto"
            />
          ) : (
            <span className="text-lg font-semibold">{logo?.brandName}</span>
          )}
        </Link>

        {/* MENU BUTTON + scratch on hover */}
        <button
          onClick={() => setOpen(true)}
          onMouseEnter={() => setHoveredMenuButton(true)}
          onMouseLeave={() => setHoveredMenuButton(false)}
          className="relative uppercase tracking-[0.25em] text-sm"
        >
          <span className="relative inline-block w-fit">
            {menuButtonLabel}
            <AnimatePresence>
              {hoveredMenuButton && (
                <motion.svg
                  key="menu-scratch"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[140%] pointer-events-none"
                  viewBox="0 0 300 80"
                  preserveAspectRatio="none"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Array.from({ length: 2 }).map((_, i) => {
                    const y = 40 + Math.random() * 10 - 5;
                    const path = `M5 ${y} C80 ${y - 20 + Math.random() * 40}, 160 ${y + 20 - Math.random() * 40}, 295 ${y}`;
                    return (
                      <motion.path
                        key={i}
                        d={path}
                        stroke="#e54343"
                        strokeWidth={6}
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="350"
                        strokeDashoffset="350"
                        initial={{ strokeDashoffset: 350 }}
                        animate={{ strokeDashoffset: 0, opacity: [1, 1, 0] }}
                        transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                      />
                    );
                  })}
                </motion.svg>
              )}
            </AnimatePresence>
          </span>
        </button>

      </div>

      {/* FULL MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: BG }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >

            {/* TOP BAR */}
            <div className="relative py-6 md:py-10">

              {/* LANGUAGES */}
              <div className="absolute left-4 md:left-10 top-0 pt-4 md:pt-6">
                <div className="rounded-full border border-black/40 px-2 md:px-3 py-1 flex items-center gap-2 text-xs tracking-widest">
                  <button className="uppercase">FR</button>
                  <span className="opacity-40">/</span>
                  <button className="uppercase">EN</button>
                </div>
              </div>

              {/* CLOSE + scratch on hover */}
              <div className="absolute right-4 md:right-10 top-0 pt-4 md:pt-6">
                <button
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoveredCloseButton(true)}
                  onMouseLeave={() => setHoveredCloseButton(false)}
                  className="relative uppercase tracking-[0.2em] text-sm"
                >
                  <span className="relative inline-block w-fit">
                    {closeButtonLabel}
                    <AnimatePresence>
                      {hoveredCloseButton && (
                        <motion.svg
                          key="close-scratch"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[140%] pointer-events-none"
                          viewBox="0 0 300 80"
                          preserveAspectRatio="none"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {Array.from({ length: 2 }).map((_, i) => {
                            const y = 40 + Math.random() * 10 - 5;
                            const path = `M5 ${y} C80 ${y - 20 + Math.random() * 40}, 160 ${y + 20 - Math.random() * 40}, 295 ${y}`;
                            return (
                              <motion.path
                                key={i}
                                d={path}
                                stroke="#e54343"
                                strokeWidth={6}
                                strokeLinecap="round"
                                fill="none"
                                strokeDasharray="350"
                                strokeDashoffset="350"
                                initial={{ strokeDashoffset: 350 }}
                                animate={{ strokeDashoffset: 0, opacity: [1, 1, 0] }}
                                transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                              />
                            );
                          })}
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </div>

            </div>

            {/* MENU */}
            <div className="flex-1 flex flex-col justify-center items-center text-black">

              {/* BRAND */}
              <div className="mb-10 text-center font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
                {menuBrandName}
              </div>

              {links.map((link) => {
                const { colStart, colSpan, align, fontSize } = getLayout(link.label, isMobile);
                const sup = linkSuperscripts[link.label.trim().toUpperCase()];

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="freshman-row relative overflow-hidden grid grid-cols-12 items-center h-20 md:h-1/6 border-b border-dashed border-black/30 w-full px-6 md:px-10"
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >

                    {/* BLACK HOVER BACKGROUND */}
                    <motion.span
                      className="absolute inset-0 bg-black"
                      initial={{ y: "100%" }}
                      animate={{ y: hoveredLink === link.label ? "0%" : "100%" }}
                      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                    />
                    {/* TEXT + SCRATCH: wrapper so scratch is only over the nav link text */}
                    <div
                      style={{ gridColumn: `${colStart} / span ${colSpan}` }}
                      className={`inline-block ${align === "right"
                        ? "text-right"
                        : align === "center"
                          ? "text-center"
                          : "text-left"
                        }`}
                    >
                      <span className="relative inline-block w-fit">
                        {/* NAV TEXT */}
                        <Typography
                          className={`relative z-10 font-cinzel leading-none ${hoveredLink === link.label ? "text-[#b7b7ae]" : "text-black"
                            }`}
                          style={{ fontSize }}
                        >
                          {link.label.toUpperCase()}
                          {sup && (
                            <sup className="ml-2 align-super text-xs font-light tracking-widest">
                              {sup}
                            </sup>
                          )}
                        </Typography>

                        {/* SCRATCH: only over this nav link text, slower animation */}
                        <AnimatePresence>
                          {hoveredLink === link.label && (
                            <motion.svg
                              key={link.label}
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[120%] pointer-events-none"
                              viewBox="0 0 300 80"
                              preserveAspectRatio="none"
                              initial={{ opacity: 1 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              {Array.from({ length: 2 }).map((_, i) => {
                                const y = 40 + Math.random() * 10 - 5;

                                const path = `
          M5 ${y}
          C80 ${y - 20 + Math.random() * 40},
          160 ${y + 20 - Math.random() * 40},
          295 ${y}
        `;

                                return (
                                  <motion.path
                                    key={i}
                                    d={path}
                                    stroke="#e54343"
                                    strokeWidth={3 + Math.random() * 2}
                                    strokeLinecap="round"
                                    fill="none"
                                    strokeDasharray="350"
                                    strokeDashoffset="350"
                                    initial={{ strokeDashoffset: 350 }}
                                    animate={{
                                      strokeDashoffset: 0,
                                      opacity: [1, 1, 0],
                                    }}
                                    transition={{
                                      duration: 1,
                                      delay: i * 0.08,
                                      ease: "easeOut",
                                    }}
                                  />
                                );
                              })}
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </span>
                    </div>
                  </Link>
                );
              })}

            </div>

            {/* FOOTER BAR */}
            <div className="px-6 md:px-10 py-3 flex flex-col items-center justify-center gap-2 text-center text-[10px] md:text-xs tracking-[0.25em] uppercase text-black/60 md:grid md:grid-cols-3 md:items-center md:gap-4">
              <Typography variant="caption" className="text-black/60 md:text-left md:justify-self-start">
                {footer.privacyLabel}
              </Typography>
              <Typography variant="caption" className="text-black/60 md:text-center md:justify-self-center">
                {footer.copyrightText}
              </Typography>
              <Typography variant="caption" className="text-black/60 md:text-right md:justify-self-end">
                {footer.termsLabel}
              </Typography>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}