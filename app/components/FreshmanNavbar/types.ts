import type { ReactNode } from "react";

export interface FreshmanNavLink {
  label: string;
  href: string;
}

export interface FreshmanNavLogo {
  /** Logo image path, e.g. "/logoeg.png" */
  logoImageUrl?: string;
  /** Brand text (used if no logo image, or as alt/fallback) */
  brandName?: string;
  /** Href when clicking the logo (defaults to "/") */
  href?: string;
}

export interface FreshmanNavbarFooter {
  /** Left footer text, e.g. "Privacy Policy" */
  privacyLabel?: string;
  /** Center footer text, e.g. "2026 Real Always Wins" */
  copyrightText?: string;
  /** Right footer text, e.g. "Terms & Conditions" */
  termsLabel?: string;
}

/** Content for one language (used for EN and FR) */
export interface FreshmanNavbarContent {
  links: FreshmanNavLink[];
  menuButtonLabel?: string;
  closeButtonLabel?: string;
  menuBrandName?: string;
  linkSuperscripts?: Record<string, string>;
  footer?: FreshmanNavbarFooter;
}

export interface FreshmanNavbarProps {
  logo?: FreshmanNavLogo;
  links: FreshmanNavLink[];
  /** Top bar: menu trigger button text, e.g. "+ MENU" */
  menuButtonLabel?: string;
  /** Overlay: close button text, e.g. "X CLOSE" */
  closeButtonLabel?: string;
  /** Overlay: large brand wordmark in the menu, e.g. "freshman" */
  menuBrandName?: string;
  /** Optional superscript per link (key = label uppercase), e.g. { WORK: "(39)" } */
  linkSuperscripts?: Record<string, string>;
  /** Footer row: privacy, copyright, terms */
  footer?: FreshmanNavbarFooter;
  /** French content; when provided, FR/EN switcher toggles between this and the default (English) props */
  contentFr?: FreshmanNavbarContent;
  /** Optional extra className for the header */
  className?: string;
  /** Optional React node to render in the center (e.g. wordmark) */
  centerBrand?: ReactNode;
}

