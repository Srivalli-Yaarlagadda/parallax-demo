export type StackedMenuLink = {
  label: string;
  href: string;
};

export type StackedMenuSocialLink = {
  label: string;
  href: string;
};

export type StackedMenuMetric = {
  value: string;
  caption: string;
};

export type StackedMenuCaseStudy = {
  overline?: string;
  title: string;
};

export type StackedMenuLeftPanel = {
  /** Image URL for the top of the left panel (Panel 1) */
  imageSrc?: string;
  imageAlt?: string;
  /** Hover overlay text above image */
  imageOverlay?: { overline?: string; title: string };
  /** Stats shown in the black bar below the image */
  metrics?: StackedMenuMetric[];
  /** Case study block below the dark panel */
  caseStudy?: StackedMenuCaseStudy;
  /** Left edge vertical bar: top label (e.g. date) */
  leftBarTopLabel?: string;
  /** Left edge vertical bar: bottom label (e.g. "ENTERPRISE SOFTWARE") */
  leftBarBottomLabel?: string;
};

export type StackedMenuHeader = {
  /** Logo image URL */
  logoSrc?: string;
  logoAlt?: string;
  /** Logo link href (default "/") */
  logoHref?: string;
  /** Center label in the top bar (e.g. "AI automation specialists") */
  centerLabel?: string;
  /** Menu button label (e.g. "MENU") — shown next to hamburger on larger screens */
  menuLabel?: string;
};

export type StackedMenuContact = {
  phone?: string;
  email?: string;
  emailLabel?: string;
};

export interface StackedMenuNavbarProps {
  /** Main navigation links (Panel 3) */
  links: StackedMenuLink[];
  /** Social links: first two in Panel 3, last two in Panel 4. Pass 4 items: [Twitter, LinkedIn, Instagram, YouTube]. */
  socialLinks?: StackedMenuSocialLink[];
  /** Left panel (Panel 1) content — image, metrics, case study. Only used above 1024px when panel is visible. */
  leftPanel?: StackedMenuLeftPanel;
  /** Header bar content — logo, center label */
  header?: StackedMenuHeader;
  /** Contact block in Panel 3 — phone and email */
  contact?: StackedMenuContact;
  /** Optional: [SOCIALS] section label */
  socialsLabel?: string;
  /** Optional: close button text (e.g. "Close") */
  closeLabel?: string;
}
