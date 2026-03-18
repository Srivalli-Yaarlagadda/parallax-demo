import type { ReactNode } from "react";

export interface LayerNavLink {
  label: string;
  /** Switches pink-layer content when chosen from the menu */
  sectionId: string;
  /** URL for the section (e.g. /layer-navbar/about) */
  href: string;
}

/** Left strip: stacked initials + optional square mark */
export interface LayerNavLogo {
  line1?: string;
  line2?: string;
  squareLetter?: string;
  href?: string;
}

export interface LayerNavCta {
  label: string;
  href: string;
}

/** Hero copy (layer 3) */
export interface LayerHeroContent {
  titleLines: [string, string, string];
  subtitleLine?: string;
  whoWeAreLabel?: string;
  description: string;
  investCta?: { label: string; href: string };
  footerLeft?: string;
  footerRight?: ReactNode;
}

/** Props LayerNavbar injects into `sectionContent` elements via `cloneElement`. */
export interface LayerSectionInjectedProps {
  links: LayerNavLink[];
  activeSectionId: string;
}

export interface LayerNavbarProps {
  logo: LayerNavLogo;
  links: LayerNavLink[];
  cta: LayerNavCta;
  hero: LayerHeroContent;
  /** Content for non-home sections (e.g. about). Home uses `hero`. */
  sectionContent?: Record<string, ReactNode>;
  /** Which `sectionId` shows the hero (default: first link or "home"). */
  defaultSectionId?: string;
  className?: string;
}
