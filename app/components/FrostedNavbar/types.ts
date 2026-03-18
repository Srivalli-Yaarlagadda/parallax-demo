import type { ReactNode } from "react";

/**
 * Public types for FrostedNavbar. Use these when passing props from your app.
 */

export interface FrostedNavLink {
  label: string;
  href: string;
}

export interface FrostedNavLogo {
  /** Optional brand text next to the logo. Omit or leave empty to show only the logo. */
  brandName?: string;
  /** Optional: logo/home link; default "/" */
  href?: string;
  /** Optional: URL for logo image (e.g. "/logoeg.png"). Rendered on the left when provided. */
  logoImageUrl?: string;
  /** Optional: custom React node instead of default 4-dot icon. If not set and no logoImageUrl, default dots are used. */
  icon?: ReactNode;
}

export interface FrostedNavCta {
  label: string;
  href: string;
  /** Optional: override CTA button className (e.g. for custom background) */
  className?: string;
}

export interface FrostedNavbarProps {
  logo: FrostedNavLogo;
  links: FrostedNavLink[];
  cta: FrostedNavCta;
  /** Optional: override nav container className (e.g. max-width, margin) */
  className?: string;
  /** Optional: blur strength in px for frosted glass; default 12 */
  blur?: number;
  /** Optional: breakpoint in px below which mobile menu shows; default 768 */
  mobileBreakpoint?: number;
}
