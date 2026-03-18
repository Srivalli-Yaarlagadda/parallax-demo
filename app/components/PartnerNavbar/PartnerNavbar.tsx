"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Typography from "@/lib/typography";
import type { PartnerNavbarProps } from "./types";

const MENU_ICON_SIZE = 24;

export function PartnerNavbar({
  logo,
  links,
  menuLabel = "MENU",
  menuIconUrl,
  closeLabel = "CLOSE",
  partnerText = "PARTNER",
  className = "",
}: PartnerNavbarProps) {
  const [open, setOpen] = useState(false);
  const logoHref = logo.href ?? "/";

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black backdrop-blur-sm ${className}`}
      >
        <div className="mx-auto flex min-h-14 items-center justify-between px-4 py-3 sm:px-6 md:px-2">
          {/* Left: desktop = bus animation; below lg = only MENU+png (larger) */}
          <div className="flex items-center gap-6 sm:gap-4">
            <div
              className={`hidden overflow-hidden transition-[max-width] duration-500 lg:block ${
                open ? "max-w-[70vw] ease-in" : "max-w-0 ease-out"
              }`}
            >
              <div className="flex items-center gap-6 sm:gap-4 pr-0">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group relative shrink-0 text-sm font-medium uppercase tracking-[0.2em] text-white no-underline transition-opacity hover:opacity-80"
                  >
                    <Typography variant="caption" className="text-white">
                      {link.label}
                    </Typography>
                    <span className="navlink-bus-track pointer-events-none absolute left-0 -bottom-px z-10 w-full overflow-hidden" style={{ height: 2 }}>
                      <span className="navlink-bus-line block w-full bg-white" style={{ height: 2 }} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="inline-flex shrink-0 items-center gap-2 text-left font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80 text-base sm:text-lg lg:text-sm"
            >
              <Typography variant="body-sm" className="text-white leading-none text-inherit">
                {open ? closeLabel : menuLabel}
              </Typography>
              {menuIconUrl ? (
                <span
                  className={`inline-flex shrink-0 items-center justify-center transition-transform duration-300 ease-in-out w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 ${open ? "rotate-180" : "rotate-0"}`}
                  aria-hidden
                >
                  <Image
                    src={menuIconUrl}
                    alt=""
                    width={MENU_ICON_SIZE}
                    height={MENU_ICON_SIZE}
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : (
                <span className="text-white">{open ? "←" : "→"}</span>
              )}
            </button>
          </div>

          <Link
            href={logoHref}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 no-underline"
          >
            <Typography
              variant="h3"
              className="text-center font-semibold uppercase tracking-[0.25em] text-white"
            >
              {logo.mainText}
            </Typography>
          </Link>

          <div className="flex flex-1 justify-end">
            <Typography
              variant="body-sm"
              className="text-sm font-medium uppercase tracking-[0.2em] text-white"
            >
              [{partnerText}]
            </Typography>
          </div>
        </div>
      </header>

      {/* Below 1024px: nav links panel below main nav, slides in from right to left; close via CLOSE+png in navbar */}
      <div
        className={`fixed left-0 right-0 top-14 z-40 h-[calc(100vh-3.5rem)] bg-black lg:hidden ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-out`}
        aria-hidden={!open}
      >
        <nav className="flex h-full w-full items-center justify-center p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 text-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group relative text-4xl font-medium uppercase tracking-[0.2em] text-white no-underline transition-opacity hover:opacity-80 sm:text-5xl md:text-6xl"
              >
                <Typography variant="h3" className="text-white text-center">
                  {link.label}
                </Typography>
                <span className="navlink-bus-track pointer-events-none absolute left-0 -bottom-0.5 z-10 w-full overflow-hidden" style={{ height: 4 }}>
                  <span className="navlink-bus-line block w-full bg-white" style={{ height: 4 }} />
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .navlink-bus-line {
          transform: translateX(-100%);
          opacity: 0;
        }
        .group:hover .navlink-bus-line {
          animation: navlink-bus 1.2s ease-out forwards;
        }
        @keyframes navlink-bus {
          0% { transform: translateX(-100%); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      ` }} />
    </>
  );
}