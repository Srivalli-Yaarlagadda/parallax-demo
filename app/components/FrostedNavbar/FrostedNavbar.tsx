"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Typography from "@/lib/typography";
import type { FrostedNavbarProps } from "./types";
import { MobileMenu } from "./MobileMenu";

const SCROLL_THRESHOLD = 60;
/** Expanded navbar max width (grows with more links, up to this cap) */
const NAV_EXPANDED_MAX_WIDTH = 1600;
/** Collapsed navbar width (logo + CTA only, still long) */
const NAV_COLLAPSED_WIDTH = 540;

function DefaultLogoIcon({ className }: { className?: string }) {
  return (
    <span className={`flex items-end gap-0.5 ${className ?? ""}`} aria-hidden>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span className="ml-0.5 h-2 w-2 rounded-full bg-current" />
    </span>
  );
}

export function FrostedNavbar({
  logo,
  links,
  cta,
  className = "",
  blur = 12,
  mobileBreakpoint = 768,
}: FrostedNavbarProps) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= mobileBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mobileBreakpoint]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > SCROLL_THRESHOLD) {
        setCollapsed(true);
      } else if (y < lastScrollY.current) {
        setCollapsed(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setOpen(false);

  const linkVisible = isDesktop || open;
  const showNavLinks = isDesktop && !collapsed;

  const logoContent =
    logo.logoImageUrl != null ? (
      <Image
        src={logo.logoImageUrl}
        alt=""
        width={32}
        height={32}
        className="h-8 w-auto object-contain"
      />
    ) : logo.icon != null ? (
      logo.icon
    ) : (
      <DefaultLogoIcon />
    );

  const navWidth =
    !isDesktop ? "100%" : collapsed ? `${NAV_COLLAPSED_WIDTH}px` : "100%";
  const wrapperMaxWidth =
    !isDesktop ? "100%" : collapsed ? `${NAV_COLLAPSED_WIDTH}px` : `${NAV_EXPANDED_MAX_WIDTH}px`;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full bg-transparent pt-4 ${className}`}
      style={{ paddingTop: "clamp(0.75rem, 2vw, 1rem)", pointerEvents: "none" }}
    >
      {/* Wrapper: centered; smooth width transition when compressing */}
      <div
        className="mx-auto flex justify-center bg-transparent px-4 sm:px-6"
        style={{
          maxWidth: wrapperMaxWidth,
          width: "100%",
          pointerEvents: "auto",
          transition: "max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav
          className={`flex flex-col shadow-lg md:flex-row md:items-center md:justify-between md:px-6 md:py-2 md:rounded-full md:border md:border-white/10 ${
            !isDesktop && open ? "rounded-full border border-white/10 text-neutral-900" : "rounded-full border border-white/10 text-white"
          }`}
          style={{
            background: !isDesktop && open ? "#f5f2eb" : "rgba(120, 130, 100, 0.25)",
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            width: navWidth,
            maxWidth: "100%",
            minWidth: !isDesktop ? undefined : collapsed ? NAV_COLLAPSED_WIDTH : undefined,
            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.35s ease-out, color 0.2s ease-out",
          }}
        >
        {/* Row: Logo (left) | Contact Us (center) | Hamburger (right) on mobile; Logo | Links | CTA on desktop — z-[70] so it stays above overlay when overlay is in same context */}
        <div className="relative z-[70] flex w-full min-w-0 items-center justify-between gap-2 px-4 py-2 md:px-4 md:py-0">
          {/* Left: logo */}
          <div className="flex min-w-0 flex-1 justify-start md:flex-none">
            <Link
              href={logo.href ?? "/"}
              className={`flex items-center gap-2 no-underline transition-opacity hover:opacity-90 ${!isDesktop && open ? "text-neutral-900" : "text-white"}`}
              onClick={handleLinkClick}
            >
              {logoContent}
              {logo.brandName != null && logo.brandName.trim() !== "" && (
                <Typography
                  variant="body-xl"
                  className={`font-medium lowercase tracking-wide ${!isDesktop && open ? "text-neutral-900" : "text-white"}`}
                  style={{ opacity: collapsed && isDesktop ? 0 : 1, transition: "opacity 0.3s ease-out" }}
                >
                  {logo.brandName}
                </Typography>
              )}
            </Link>
          </div>

          {/* Center: Contact Us (mobile only); when nav is beige (menu open) → black bg, beige text */}
          <div className="flex flex-1 justify-center md:hidden">
            <Link
              href={cta.href}
              className={`inline-flex items-center rounded-full px-5 py-1.5 no-underline transition-colors hover:opacity-90 ${
                !isDesktop && open
                  ? "bg-neutral-900 text-[#f5f2eb]"
                  : "bg-[#f5f2eb] text-neutral-900"
              }`}
              onClick={handleLinkClick}
            >
              <Typography variant="body-xl" className="font-medium text-inherit">
                {cta.label}
              </Typography>
            </Link>
          </div>

          {/* Right: hamburger / X (mobile) */}
          <div className="flex min-w-0 flex-1 justify-end md:flex-none">
            <button
              type="button"
              className={`relative z-10 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors md:hidden ${!isDesktop && open ? "text-neutral-900 hover:bg-neutral-200/80" : "text-white hover:bg-white/10"}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen((o) => !o);
              }}
            >
              {/* Hamburger: 3 bars (visible when closed) */}
              <span
                className="absolute flex h-5 w-5 flex-col justify-center gap-1 transition-opacity duration-200"
                style={{ opacity: open ? 0 : 1, pointerEvents: open ? "none" : "auto" }}
                aria-hidden={open}
              >
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-5 bg-current" />
              </span>
              {/* X: 2 crossed lines (visible when open) */}
              <span
                className="absolute flex h-5 w-5 items-center justify-center transition-opacity duration-200"
                style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
                aria-hidden={!open}
              >
                <span className="absolute h-[2px] w-5 rotate-45 bg-current" />
                <span className="absolute h-[2px] w-5 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          {/* Desktop: center links (grows with link count; smoothly collapse when scrolling down) */}
          <div
            className="hidden flex-1 items-center justify-center gap-8 overflow-hidden md:flex min-w-0"
            style={{
              maxWidth: showNavLinks ? 2000 : 0,
              opacity: showNavLinks ? 1 : 0,
              transition: "max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out",
            }}
          >
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="shrink-0 text-white/95 no-underline transition-colors hover:text-neutral-900"
              >
                <Typography variant="body-xl" className="font-medium text-inherit">
                  {item.label}
                </Typography>
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <Link
              href={cta.href}
              className={
                cta.className ??
                "inline-flex items-center rounded-full bg-[#f5f2eb] px-5 py-2.5 text-neutral-900 no-underline transition-opacity hover:opacity-90"
              }
            >
              <Typography variant="body-xl" className="font-medium text-inherit">
                {cta.label}
              </Typography>
            </Link>
          </div>
        </div>

        <MobileMenu
          open={open}
          onClose={() => setOpen(false)}
          links={links}
          cta={cta}
          linkVisible={linkVisible}
          mounted={mounted}
        />
      </nav>
      </div>
    </header>
  );
}