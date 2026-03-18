"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Typography from "@/lib/typography";
import { MobileHamburgerButton, MobileCloseButton } from "./MobileMenu";

const GREEN_U = "#2d5a47";
const BAR_BG = "#1a3c2e";
const PANEL_BG = "#1a3c2e";
const PANEL_BOTTOM_BG = "#152d23";
const CTA_BG = "#e8b923";
const STAGGER_MS = 70;

export function UShapeNavbar({
  brandName,
  logoUrl,
  logoHref = "/",
  logoAlt,
  links,
  linksLeft,
  linksRight,
  ctaLabel = "Contact us",
  ctaHref = "#contact",
  openMenuLabel = "MENU",
  closeButtonLabel = "CLOSE",
  openMenuAriaLabel = "Open menu",
  closeMenuAriaLabel = "Close menu",
  className = "",
}: import("./types").UShapeNavbarProps) {
  const menuLinks = links ?? [...(linksLeft ?? []), ...(linksRight ?? [])];
  const [hoverBubble, setHoverBubble] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearTimer();
    leaveTimer.current = setTimeout(() => setHoverBubble(false), 150);
  };

  useEffect(() => {
    let closeTimeout: ReturnType<typeof setTimeout> | null = null;

    if (menuOpen) {
      // Ensure panel is visible before we play the open animation
      setPanelVisible(true);
    } else {
      // Keep panel visible long enough for the close (curtain-up) animation to play
      closeTimeout = setTimeout(() => {
        setPanelVisible(false);
      }, 500); // match transition duration
    }

    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  useEffect(() => () => clearTimer(), []);

  const handleClose = () => setMenuOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${className}`}>
      {/* 1. Top bar overlays hero: logo | U-shaped hamburger (desktop) / simple hamburger (mobile) | Contact us (desktop only) */}
      <nav
        className="relative flex items-center justify-between px-4 py-3 md:px-6 md:py-4"
        style={{ background: menuOpen || panelVisible ? BAR_BG : "transparent" }}
      >
        <Link
          href={logoHref ?? "/"}
          className="flex items-center gap-2 text-white no-underline font-semibold tracking-wide hover:opacity-90"
        >
          {logoUrl ? (
            <Image src={logoUrl} alt={logoAlt ?? brandName} width={32} height={32} className="h-8 w-auto object-contain" />
          ) : (
            <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white/80 text-sm font-bold" aria-hidden>
              {brandName.slice(0, 1)}
            </span>
          )}
          <span>{brandName}</span>
        </Link>

        {/* Top U with hamburger only on desktop when menu is fully closed; when panel is animating or open, only bottom Close curve is visible */}
        {!menuOpen && !panelVisible && (
          <div
            className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 flex-col items-center"
            style={{ width: "8rem" }}
            onMouseEnter={() => {
              clearTimer();
              setHoverBubble(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <div
              className="relative flex flex-col items-center justify-center w-full cursor-pointer select-none transition-transform duration-200 ease-out"
              style={{
                background: GREEN_U,
                minHeight: "4.5rem",
                padding: "0.4rem 0.75rem 1.25rem",
                borderRadius: "0 0 4rem 4rem",
                transform: hoverBubble ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)",
                boxShadow: hoverBubble ? "0 8px 20px rgba(0,0,0,0.25)" : "0 4px 12px rgba(0,0,0,0.15)",
              }}
              onClick={() => setMenuOpen(true)}
              role="button"
              tabIndex={0}
              aria-label={openMenuAriaLabel}
              aria-expanded={menuOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMenuOpen(true);
                }
              }}
            >
              {hoverBubble ? (
                <span className="text-white font-semibold text-sm tracking-wide">{openMenuLabel}</span>
              ) : (
                <span className="flex flex-col gap-1" aria-hidden>
                  <span className="block h-0.5 w-5 bg-white rounded-full" />
                  <span className="block h-0.5 w-5 bg-white rounded-full" />
                  <span className="block h-0.5 w-5 bg-white rounded-full" />
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Mobile: simple hamburger on the right (hidden when menu is open, X is shown inside overlay) */}
          {!menuOpen && <MobileHamburgerButton onClick={() => setMenuOpen(true)} />}

          {/* Desktop: Contact CTA on the right */}
          <Link
            href={ctaHref}
            className="hidden lg:inline-flex rounded-full px-4 py-2.5 text-[#1a1a1a] no-underline font-medium transition-opacity hover:opacity-90"
            style={{ background: CTA_BG }}
          >
            {ctaLabel}
          </Link>
        </div>
      </nav>

      {/* 2. Curtain slide: 
          - Mobile/tablet (<1024px): full-screen (behind navbar)
          - Desktop (>=1024px): starts below navbar, like original design */}
      <div
        className="fixed left-0 right-0 z-40 top-0 bottom-0 lg:top-16 lg:bottom-auto lg:h-[calc(80vh-4rem)]"
        style={{
          visibility: menuOpen || panelVisible ? "visible" : "hidden",
          pointerEvents: menuOpen ? "auto" : "none",
          overflow: "visible",
        }}
      >
        <div
          className="w-full h-full flex flex-col relative"
          style={{
            background: PANEL_BG,
            transformOrigin: "top center",
            transition: "transform 0.5s ease-in-out",
            transform: menuOpen ? "scaleY(1)" : "scaleY(0)",
            overflow: "visible",
          }}
        >
          {/* Mobile X close inside full-screen curtain */}
          {menuOpen && <MobileCloseButton onClick={handleClose} />}
          {/* Nav links + Contact us (stacked on mobile, side‑by‑side on desktop, all staggered in one by one) */}
          <div className="flex flex-col lg:flex-row lg:flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 py-6 flex-1 min-h-0">
            {menuLinks.map((item, index) => {
              const delay = menuOpen ? index * STAGGER_MS : 0;
              return (
              <Link
                key={item.label}
                href={item.href}
                className="no-underline hover:opacity-90 text-center"
                onClick={handleClose}
                style={{
                  transition: `opacity 0.3s ease-out ${delay}ms, transform 0.3s ease-out ${delay}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                }}
              >
                <Typography variant="display-2xl" className="text-white hover:text-[#f3eacb] transition-colors">
                  {item.label}
                </Typography>
              </Link>
              );
            })}
            <Link
              href={ctaHref}
              className="rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-[#1a1a1a] no-underline font-bold text-base sm:text-lg md:text-xl transition-opacity hover:opacity-90"
              style={{
                background: CTA_BG,
                transition: `opacity 0.3s ease-out ${menuLinks.length * STAGGER_MS}ms, transform 0.3s ease-out ${menuLinks.length * STAGGER_MS}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(10px)",
              }}
              onClick={handleClose}
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Bottom: U-shaped Close curve matching top menu curve (same shape, centered at end). Shown only on desktop; on mobile, users close with the X icon. */}
          <div
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 justify-center"
            style={{ bottom: "-3.25rem" }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="font-semibold text-lg text-white cursor-pointer"
              style={{
                background: PANEL_BG,
                color: "#fff",
                width: "8rem",
                minHeight: "4.5rem",
                padding: "0.4rem 0.75rem 1.25rem",
                borderRadius: "0 0 4rem 4rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
              aria-label={closeMenuAriaLabel}
            >
              {closeButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}