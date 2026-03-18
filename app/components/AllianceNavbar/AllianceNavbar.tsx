"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/lib/typography";

const BAR_BG = "#1e3a8a";
const ORANGE = "#ea580c";

/** Same rolling animation as navbar3: top goes up, bottom slides up into view. Parent must have "group". */
function RollText({ top, bottom }: { top: string; bottom: string }) {
  return (
    <span className="block overflow-hidden leading-[1.15]" style={{ height: "1.15em" }}>
      {/* Use normal flow (not absolute) so width fits the longest line */}
      <span className="flex flex-col transition-transform duration-500 group-hover:translate-y-[-50%]">
        <span className="block whitespace-nowrap">{top}</span>
        <span className="block whitespace-nowrap">{bottom}</span>
      </span>
    </span>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function AllianceNavbar({
  logo,
  serviceButton,
  email,
  links,
  footer,
  className = "",
}: import("./types").AllianceNavbarProps) {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [ctaHover, setCtaHover] = useState(false);
  const lastScroll = useRef(0);
  const logoHref = logo.href ?? "/";

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const current = window.scrollY || window.pageYOffset;
      const delta = current - lastScroll.current;
      if (Math.abs(delta) < 4) return;
      if (current > 80 && delta > 0) {
        setShowBar(false);
      } else if (delta < 0) {
        setShowBar(true);
      }
      lastScroll.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LeftBlock = ({ showEmail = true }: { showEmail?: boolean }) => (
    <div className="flex items-center gap-3 sm:gap-4">
      {serviceButton.href ? (
        <Link
          href={serviceButton.href}
          className="group inline-flex items-center justify-center gap-0 rounded border border-white/80 px-3 py-2 text-sm font-medium text-white transition-all duration-300 ease-out hover:px-6 hover:py-2.5"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{ background: ORANGE }}
        >
          <Typography variant="body-lg" className="text-white whitespace-nowrap uppercase tracking-[0.15em]">
            <RollText top={serviceButton.label} bottom={serviceButton.hoverLabel ?? serviceButton.label} />
          </Typography>
          <PhoneIcon className="ml-1.5 h-4 w-4" />
        </Link>
      ) : (
        <span
          className="group inline-flex items-center justify-center gap-0 rounded border border-white/80 px-3 py-2 text-sm font-medium text-white transition-all duration-300 ease-out hover:px-6 hover:py-2.5"
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{ background: ORANGE }}
        >
          <Typography variant="body-lg" className="text-white whitespace-nowrap uppercase tracking-[0.15em]">
            <RollText top={serviceButton.label} bottom={serviceButton.hoverLabel ?? serviceButton.label} />
          </Typography>
          <PhoneIcon className="ml-1.5 h-4 w-4" />
        </span>
      )}
      {showEmail && (
        <a href={`mailto:${email}`} className="group text-sm text-white no-underline">
          <Typography variant="body-lg" className="text-white">
            <RollText top={email} bottom={email} />
          </Typography>
        </a>
      )}
    </div>
  );

  const LogoBlock = () => (
    <Link href={logoHref} className="flex items-center gap-2 text-white no-underline">
      {logo.imageUrl ? (
        <Image src={logo.imageUrl} alt="" width={32} height={32} className="h-8 w-auto" />
      ) : null}
      <Typography variant="body-lg" className="text-white font-semibold tracking-tight">
        {logo.brandName}
      </Typography>
    </Link>
  );

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${className}`}
      style={{ transform: showBar ? "translateY(0)" : "translateY(-120%)" }}
    >
      <div className="mx-3 mt-3 sm:mx-6 md:mx-10 pointer-events-auto">
        {/* TOP BAR: desktop -> left block + centered logo + hamburger; mobile/tablet -> logo left, hamburger right */}
        <div
          className="relative rounded-md px-4 py-4 sm:px-6 sm:py-4 shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out"
          style={{ background: BAR_BG }}
        >
          <div
            className={`flex items-center justify-between transition-transform duration-300 ease-out ${
              ctaHover ? "translate-x-[6px]" : ""
            }`}
          >
            {/* Left: service + email (desktop only) or logo (below lg) */}
            <div className="flex flex-1 items-center">
              <div className="hidden lg:block">
                <LeftBlock />
              </div>
              <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                <LogoBlock />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="relative z-10 flex h-10 w-10 items-center justify-center text-white hover:opacity-80"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-5 w-6">
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-white transition-transform duration-300 ${
                    open ? "top-2.5 rotate-45" : "top-1"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2.5 h-0.5 w-full rounded-full bg-white transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-white transition-transform duration-300 ${
                    open ? "top-2.5 -rotate-45" : "top-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* DROPDOWN MENU PANEL: slides up from bottom to top */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-2 overflow-hidden rounded-md bg-[color:var(--alliance-panel-bg,#1e3a8a)] shadow-[0_18px_30px_rgba(0,0,0,0.35)]"
            >
            <nav className="px-6 py-6 md:px-8 md:py-7">
              <ul className="flex flex-col gap-3 md:gap-4">
                {links.map((link) => {
                  const isActive = hoveredNav === link.href;
                  const colorClasses = !hoveredNav
                    ? "text-white"
                    : isActive
                    ? "text-white"
                    : "text-white/40";
                  return (
                    <li
                      key={link.href}
                      className="relative overflow-hidden group cursor-pointer"
                      onMouseEnter={() => setHoveredNav(link.href)}
                      onMouseLeave={() => setHoveredNav(null)}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block no-underline"
                      >
                        <Typography
                          variant="h4"
                          className={`${colorClasses} inline-block text-lg md:text-2xl font-semibold tracking-[0.12em]`}
                        >
                          <RollText top={link.label} bottom={link.label} />
                        </Typography>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-white/20 px-6 py-3 md:px-8 md:py-4">
              <div className="flex flex-col items-start justify-between gap-2 text-xs text-white/90 md:flex-row md:items-center md:text-sm">
                <Typography variant="caption" className="text-white/80 w-full md:w-auto">
                  {footer.copyrightText}
                </Typography>
                <Link
                  href={footer.privacyHref ?? "#"}
                  className="text-white/90 no-underline hover:underline w-full md:w-auto"
                >
                  <Typography variant="caption" className="text-white/90 text-left w-full md:w-auto md:text-right">
                    {footer.privacyLabel}
                  </Typography>
                </Link>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}