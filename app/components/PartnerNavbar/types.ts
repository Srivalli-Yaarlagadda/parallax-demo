export interface PartnerNavLink {
  label: string;
  href: string;
}

export interface PartnerNavbarLogo {
  /** Main logo text, e.g. "DAVIN" or "NOIDAN" */
  mainText: string;
  /** Optional mirrored/reflected text below, e.g. "CANVAS" */
  mirroredText?: string;
  /** Href when clicking logo (default "/") */
  href?: string;
}

export interface PartnerNavbarProps {
  /** Logo: main text + optional mirrored text */
  logo: PartnerNavbarLogo;
  /** Nav links shown when menu is open (e.g. HOME, EXPLORE, CONTACT) */
  links: PartnerNavLink[];
  /** Left trigger when closed, e.g. "MENU" */
  menuLabel?: string;
  /** Icon image after menu label when closed, e.g. "/menuplus.png" */
  menuIconUrl?: string;
  /** Left trigger when open to close, e.g. "CLOSE" */
  closeLabel?: string;
  /** Right-side text, e.g. "PARTNER" (displayed as [PARTNER]) */
  partnerText?: string;
  /** Optional class for the header */
  className?: string;
}
