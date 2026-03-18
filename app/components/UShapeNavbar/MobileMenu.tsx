"use client";

import React from "react";

type MobileButtonProps = {
  onClick: () => void;
};

/**
 * Mobile-only hamburger button shown in the top-right of the navbar.
 */
export function MobileHamburgerButton({ onClick }: MobileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-white/10 lg:hidden"
      aria-label="Open menu"
      aria-expanded={false}
    >
      <span className="flex flex-col gap-1">
        <span className="block h-0.5 w-5 bg-white rounded-full" />
        <span className="block h-0.5 w-5 bg-white rounded-full" />
        <span className="block h-0.5 w-5 bg-white rounded-full" />
      </span>
    </button>
  );
}

/**
 * Mobile-only X close button shown inside the full-screen curtain.
 */
export function MobileCloseButton({ onClick }: MobileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full p-2 text-white hover:bg-white/10 lg:hidden"
      aria-label="Close menu"
    >
      <span className="relative block h-4 w-4">
        <span className="absolute inset-1 block h-0.5 w-full bg-white rounded-full rotate-45" />
        <span className="absolute inset-1 block h-0.5 w-full bg-white rounded-full -rotate-45" />
      </span>
    </button>
  );
}