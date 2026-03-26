"use client";

import HeroSection from "../components/HeroSection";
import { MuseumSlideNavbar } from "../components/MuseumSlideNavbar";
import type { MuseumSlideNavLink } from "../components/MuseumSlideNavbar";

const links: MuseumSlideNavLink[] = [
  { label: "Services", href: "/frosted-navbar" },
  { label: "Projects", href: "/partner-navbar" },
  { label: "Network", href: "/alliance-navbar" },
  { label: "Clients", href: "/u-shape-navbar" },
  { label: "Awards", href: "/stacked-navbar" },
  { label: "Stories", href: "/freshman-navbar" },
  { label: "Contact", href: "/cascade-layer-navbar" },
  { label: "Career", href: "/layer-navbar" },
];

export default function MuseumSlideNavbarPage() {
  return (
    <>
      <MuseumSlideNavbar links={links} logoSrc="/logoeg1.png" />
      <HeroSection />
    </>
  );
}
