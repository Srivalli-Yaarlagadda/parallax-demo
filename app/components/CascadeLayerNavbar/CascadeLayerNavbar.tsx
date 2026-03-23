"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_CASCADE_LAYER_COLORS, type CascadeNavbarProps } from "./types";

const LAYER_START_DELAY_MS = 80;
const LAYER_DURATION_MS = 200;
const LAYER_GAP_BETWEEN_MS = 24;
const LAYER_EASE_IN = "cubic-bezier(0.22, 1, 0.32, 1)";
const LAYER_EASE_OUT = "cubic-bezier(0.55, 0.08, 0.68, 0.53)";

function useLayerTimings(layerColors: readonly string[]) {
  return useMemo(() => {
    const n = layerColors.length;
    const openDelay = (index: number) =>
      LAYER_START_DELAY_MS + index * (LAYER_DURATION_MS + LAYER_GAP_BETWEEN_MS);
    const openSequenceEndMs =
      LAYER_START_DELAY_MS + n * LAYER_DURATION_MS + Math.max(0, n - 1) * LAYER_GAP_BETWEEN_MS;
    const contentDelayMs = openSequenceEndMs + 40;
    const closeDelay = (index: number) =>
      Math.max(0, n - 1 - index) * (LAYER_DURATION_MS + LAYER_GAP_BETWEEN_MS);
    const closeSequenceEndMs =
      n * LAYER_DURATION_MS + Math.max(0, n - 1) * LAYER_GAP_BETWEEN_MS + 50;
    return {
      n,
      openDelay,
      closeDelay,
      contentDelayMs,
      closeSequenceEndMs,
    };
  }, [layerColors]);
}

export function CascadeLayerNavbar({
  logo,
  logoSrc,
  logoAlt = "",
  logoWidth = 28,
  logoHeight = 16,
  brandName,
  brandHref = "/",
  investors,
  socialLinks = [],
  legalLinks = [],
  socialSectionLabel,
  legalSectionLabel,
  menuContent,
  layerColors: layerColorsProp,
  className = "",
}: CascadeNavbarProps) {
  const layerColors = layerColorsProp ?? DEFAULT_CASCADE_LAYER_COLORS;
  const { openDelay, closeDelay, contentDelayMs, closeSequenceEndMs } = useLayerTimings(layerColors);

  const [menuVisible, setMenuVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const contentDelay = useMemo(() => ({ animationDelay: `${contentDelayMs}ms` }), [contentDelayMs]);

  const logoNode =
    logo ??
    (logoSrc != null && logoSrc !== "" ? (
      <Image
        src={logoSrc}
        alt={logoAlt || brandName}
        width={logoWidth}
        height={logoHeight}
        className="h-4 w-7 object-contain sm:h-[1.15rem] sm:w-8"
        priority
      />
    ) : null);

  const openMenu = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsClosing(false);
    setMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    if (!menuVisible || isClosing) return;
    setIsClosing(true);
  }, [menuVisible, isClosing]);

  useEffect(() => {
    if (!isClosing) return;
    closeTimerRef.current = setTimeout(() => {
      setMenuVisible(false);
      setIsClosing(false);
      closeTimerRef.current = null;
    }, closeSequenceEndMs);
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isClosing, closeSequenceEndMs]);

  const navOpen = menuVisible && !isClosing;

  /** Tight bar: hamburger flush left, logo centered, investors flush right */
  const headerInner = (
    <div className="relative mx-auto flex h-12 w-full max-w-[1400px] items-center px-2 sm:h-14 sm:px-4">
      <div className="z-10 flex shrink-0 items-center justify-start pl-0.5">
        {menuVisible ? (
          <button
            type="button"
            aria-label="Close menu"
            aria-expanded={navOpen}
            disabled={isClosing}
            className="inline-flex items-center gap-2 py-1.5 pr-2 text-xs font-medium tracking-wide text-white disabled:opacity-60 sm:text-sm"
            onClick={closeMenu}
          >
            <span className="block h-px w-4 bg-current sm:w-5" aria-hidden />
            <span>Close</span>
          </button>
        ) : (
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={false}
            onClick={openMenu}
            className="group inline-flex h-9 w-9 items-center justify-center text-white sm:h-10 sm:w-10"
          >
            <span className="flex flex-col gap-0.5" aria-hidden>
              <span className="block h-0.5 w-[1.125rem] bg-current transition-transform duration-300 group-hover:scale-x-90 sm:w-5" />
              <span className="block h-0.5 w-[1.125rem] bg-current transition-transform duration-300 group-hover:scale-x-75 sm:w-5" />
            </span>
          </button>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-14 sm:px-20">
        <Link
          href={brandHref}
          className="pointer-events-auto inline-flex max-w-[min(100%,12rem)] items-center gap-1.5 truncate text-white no-underline sm:max-w-none sm:gap-2"
          onClick={() => {
            if (menuVisible && !isClosing) closeMenu();
          }}
        >
          {logoNode}
          <span className="truncate text-[1.35rem] font-semibold leading-none tracking-tight sm:text-[1.65rem]">
            {brandName}
          </span>
        </Link>
      </div>

      <div className="z-10 ml-auto flex shrink-0 justify-end pr-0.5">
        <Link
          href={investors.href}
          className="inline-flex items-center gap-1 py-1.5 pl-1 text-xs font-medium tracking-wide text-white no-underline transition-opacity hover:opacity-80 sm:gap-1.5 sm:text-sm"
          onClick={() => {
            if (menuVisible && !isClosing) closeMenu();
          }}
        >
          <span className="max-w-[5.5rem] truncate sm:max-w-none">{investors.label}</span>
          <span aria-hidden className="shrink-0 text-sm leading-none sm:text-base">
            ↗
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className={`relative w-full bg-[#080808] text-white ${className}`}>
      {menuVisible && (
        <div
          className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-[50vh] overflow-hidden"
          aria-hidden
        >
          {layerColors.map((color, index) => (
            <div
              key={`${color}-${isClosing ? "out" : "in"}-${index}`}
              className={`layer-panel absolute inset-x-0 top-0 h-full ${
                isClosing ? "layer-wipe-close" : "layer-wipe-open"
              }`}
              style={{
                backgroundColor: color,
                animationDelay: `${isClosing ? closeDelay(index) : openDelay(index)}ms`,
                zIndex: 1 + index,
              }}
            />
          ))}
          {/* Thin divider like Joby (menu vs page below) */}
          <div
            className="absolute bottom-0 left-0 right-0 z-[20] h-px bg-[#0a1f3d]/80"
            aria-hidden
          />
        </div>
      )}

      <header
        className={`fixed inset-x-0 top-0 z-[80] border-b ${
          menuVisible ? "border-white/20 bg-transparent" : "border-white/10 bg-black/35 backdrop-blur-md"
        }`}
      >
        {headerInner}
      </header>

      {menuVisible && (
        <nav
          className={`fixed left-0 right-0 top-12 z-[75] mx-auto h-[calc(50vh-3rem)] w-full max-w-[1600px] overflow-y-auto overflow-x-hidden px-5 pb-4 pt-2 sm:top-14 sm:h-[calc(50vh-3.5rem)] sm:px-10 sm:pb-5 sm:pt-3 md:px-12 lg:px-16 ${
            isClosing ? "layer-content-exit pointer-events-none" : "layer-content pointer-events-auto"
          }`}
          style={isClosing ? undefined : contentDelay}
          aria-label="Menu"
        >
          {/* Joby-like: narrow left column (social + legal), primary block center-right */}
          <div className="grid min-h-0 grid-cols-1 gap-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-14 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-20">
            <div className="min-w-0 text-white">
              {socialLinks.length > 0 && (
                <div className={legalLinks.length > 0 ? "mb-8 sm:mb-10" : ""}>
                  {socialSectionLabel != null && socialSectionLabel.trim() !== "" && (
                    <p className="mb-2.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/55">
                      {socialSectionLabel}
                    </p>
                  )}
                  <ul className="space-y-1 text-[0.9375rem] font-medium leading-snug tracking-tight sm:text-base">
                    {socialLinks.map((item) => (
                      <li key={`${item.label}-${item.href}`}>
                        <Link
                          href={item.href}
                          className="block py-0.5 text-white no-underline transition-opacity hover:opacity-80"
                          onClick={() => closeMenu()}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {legalLinks.length > 0 && (
                <div className="mt-auto">
                  {legalSectionLabel != null && legalSectionLabel.trim() !== "" && (
                    <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/45">
                      {legalSectionLabel}
                    </p>
                  )}
                  <ul className="max-w-[14rem] space-y-1 text-[11px] font-normal leading-snug text-white/80 sm:text-xs">
                    {legalLinks.map((item) => (
                      <li key={`${item.label}-${item.href}`}>
                        <Link
                          href={item.href}
                          className="block py-0.5 text-inherit no-underline transition-opacity hover:opacity-100"
                          onClick={() => closeMenu()}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {menuContent != null && (
              <div className="flex min-w-0 justify-start sm:justify-center lg:justify-end lg:pr-2 xl:pr-6">
                <div className="w-full max-w-lg text-white lg:max-w-xl">{menuContent}</div>
              </div>
            )}
          </div>
        </nav>
      )}

      <style jsx>{`
        .layer-panel {
          transform-origin: top center;
          backface-visibility: hidden;
        }

        .layer-wipe-open {
          transform: scaleY(0);
          animation: layer-wipe-in ${LAYER_DURATION_MS}ms ${LAYER_EASE_IN} forwards;
          will-change: transform;
        }

        .layer-wipe-close {
          transform: scaleY(1);
          animation: layer-wipe-out ${LAYER_DURATION_MS}ms ${LAYER_EASE_OUT} forwards;
          will-change: transform;
        }

        .layer-content {
          opacity: 0;
          transform: translateY(6px);
          animation: content-in 160ms ${LAYER_EASE_IN} forwards;
        }

        .layer-content-exit {
          opacity: 0;
          transition: opacity 120ms ease-out;
        }

        @keyframes layer-wipe-in {
          0% {
            transform: scaleY(0);
          }
          100% {
            transform: scaleY(1);
          }
        }

        @keyframes layer-wipe-out {
          0% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(0);
          }
        }

        @keyframes content-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
