import type { ReactNode } from "react";

/** Solid menu background after cascade (Joby-style blue) */
export const CASCADE_MENU_FINAL_BLUE = "#3273dc";

/** Default wipe sequence ending on `CASCADE_MENU_FINAL_BLUE` */
export const DEFAULT_CASCADE_LAYER_COLORS: readonly string[] = [
  "#efe3d0",
  "#f08a22",
  "#6BB3F0",
  CASCADE_MENU_FINAL_BLUE,
];

/** Any text + URL pair (social, legal, etc.) */
export interface CascadeNavLink {
  label: string;
  href: string;
}

export interface CascadeInvestorsCta {
  label: string;
  href: string;
}

export interface CascadeNavbarProps {
  /** Custom logo node; if omitted, `logoSrc` is used when provided */
  logo?: ReactNode;
  /** Image URL for default logo (e.g. "/logoeg.png") */
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;

  brandName: string;
  /** Home / logo link target */
  brandHref?: string;

  investors: CascadeInvestorsCta;

  /**
   * Open menu — left column (e.g. social / shop links).
   * Omit or pass [] if you only use `menuContent`.
   */
  socialLinks?: CascadeNavLink[];

  /** Optional smaller links under social (e.g. legal). */
  legalLinks?: CascadeNavLink[];

  /** Optional label above `socialLinks` (e.g. "Connect") */
  socialSectionLabel?: string;
  /** Optional label above `legalLinks` (e.g. "Legal") */
  legalSectionLabel?: string;

  /**
   * Open menu — right column: any React content (copy, CTA, illustration).
   */
  menuContent?: ReactNode;

  /** Cascade panel colors (top → bottom wipes); default → Joby-style blue */
  layerColors?: readonly string[];

  className?: string;
}
