export interface AllianceNavLink {
  label: string;
  href: string;
}

export interface AllianceNavLogo {
  /** Optional logo image URL (e.g. stylized M) */
  imageUrl?: string;
  /** Brand text, e.g. "ML Alliance Nav" or "Alliance Nav" */
  brandName: string;
  /** Href when clicking logo (default "/") */
  href?: string;
}

export interface AllianceNavServiceButton {
  /** e.g. "24/7 Service" */
  label: string;
  /** Hover text shown on animation, e.g. "+1 (234) 567‑890" */
  hoverLabel?: string;
  /** Optional link for the button */
  href?: string;
}

export interface AllianceNavbarFooter {
  /** Bottom left, e.g. "ALLIANCE NAV © 2024" */
  copyrightText: string;
  /** Bottom right, e.g. "Privacy Policy" */
  privacyLabel: string;
  /** Href for privacy link (default "#") */
  privacyHref?: string;
}

export interface AllianceNavbarProps {
  /** Logo/brand (image + text or text only) */
  logo: AllianceNavLogo;
  /** Orange CTA button, e.g. "24/7 Service" with optional phone icon */
  serviceButton: AllianceNavServiceButton;
  /** Email shown in top bar and overlay, e.g. "info@alliancenav.com" */
  email: string;
  /** Nav links in the full-screen menu (About Us, Our Brands, etc.) */
  links: AllianceNavLink[];
  /** Footer: copyright (left), privacy (right) */
  footer: AllianceNavbarFooter;
  /** Optional class for the header */
  className?: string;
}
