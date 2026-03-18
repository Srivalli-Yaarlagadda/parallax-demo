"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import Typography from "@/lib/typography";
import type { FrostedNavLink, FrostedNavCta } from "./types";

const STAGGER_MS = 45;

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: FrostedNavLink[];
  cta: FrostedNavCta;
  linkVisible: boolean;
  mounted: boolean;
}

export function MobileMenu({
  open,
  onClose,
  links,
  cta,
  linkVisible,
  mounted,
}: MobileMenuProps) {
  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed left-0 right-0 bottom-0 z-[60] md:hidden overflow-hidden"
      style={{
        top: "4.25rem",
        visibility: open ? "visible" : "hidden",
        opacity: open ? 1 : 0,
        transition: "opacity 0.3s ease-out, visibility 0.3s ease-out",
        pointerEvents: open ? "auto" : "none",
      }}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 bg-transparent"
        aria-label="Close menu"
        onClick={onClose}
      />
      {/* Sliding block: connection layer at top (just under nav), then menu */}
      <div
        className="absolute left-3 right-3 top-0 bottom-4 flex max-h-[calc(100%-2rem)] flex-col sm:left-4 sm:right-4"
        style={{
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Connection layer: narrow width, responsive */}
        <div
          className="min-h-[10px] shrink-0 border border-neutral-300/40 border-t-0 bg-[#f5f2eb] mx-16 h-2.5 sm:mx-30 sm:h-3 md:mx-42 md:min-h-[14px]"
          aria-hidden
        />
        {/* Cream panel: rounded-t-xl to attach to connection layer bottom */}
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-4xl rounded-t-4xl bg-[#f5f2eb]">
          <div
            className="absolute inset-0 z-10 flex flex-col overflow-hidden"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 0.25s ease-out 0.15s",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-4 sm:gap-3 sm:px-6 sm:py-6">
              {links.map((item, index) => {
                const staggerDelay = open ? index * STAGGER_MS : 0;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block w-full max-w-sm shrink-0 rounded-xl py-2.5 text-center text-neutral-900 no-underline transition-colors hover:bg-white/80 hover:text-neutral-900 sm:py-3"
                    style={{
                      transition: `opacity 0.25s ease-out ${staggerDelay}ms`,
                      opacity: linkVisible ? 1 : 0,
                    }}
                    onClick={onClose}
                  >
                    <Typography variant="display-2xl" className="font-semibold">
                      {item.label}
                    </Typography>
                  </Link>
                );
              })}
            </nav>
            <div className="shrink-0 px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6">
              <Link
                href={cta.href}
                className="block w-full max-w-sm mx-auto rounded-full bg-neutral-900 px-5 py-3 text-center text-white no-underline transition-opacity hover:opacity-90 sm:px-6 sm:py-3.5"
                style={{
                  transition: `opacity 0.25s ease-out ${links.length * STAGGER_MS}ms`,
                  opacity: linkVisible ? 1 : 0,
                }}
                onClick={onClose}
              >
                <Typography variant="body-xl" className="font-medium text-inherit text-base sm:text-lg">
                  {cta.label}
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}