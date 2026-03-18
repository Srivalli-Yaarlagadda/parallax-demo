export interface NavLinkItem {
  label: string;
  href: string;
}

export interface UShapeNavbarProps {
  /** Brand text shown next to logo */
  brandName: string;
  /** Logo image URL (if not set, first letter of brandName is shown in a circle) */
  logoUrl?: string;
  /** Link URL when clicking logo/brand */
  logoHref?: string;
  /** Alt text for logo image */
  logoAlt?: string;
  /** Nav links shown in the dropdown menu (and used for layout). If not set, linksLeft + linksRight are combined. */
  links?: NavLinkItem[];
  linksLeft?: NavLinkItem[];
  linksRight?: NavLinkItem[];
  /** Main CTA button label (e.g. "Contact us") */
  ctaLabel?: string;
  /** Main CTA button href */
  ctaHref?: string;
  /** Label on the top U when hovered (desktop), e.g. "MENU" */
  openMenuLabel?: string;
  /** Label on the bottom U close button (desktop), e.g. "CLOSE" */
  closeButtonLabel?: string;
  /** Aria label for open menu button */
  openMenuAriaLabel?: string;
  /** Aria label for close menu button */
  closeMenuAriaLabel?: string;
  searchPlaceholder?: string;
  footerLinks?: NavLinkItem[];
  supportCardTitle?: string;
  supportCardDescription?: string;
  className?: string;
}
