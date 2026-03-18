"use client";

import { LayerNavbar } from "../components/LayerNavbar";
import HeroSection from "../components/HeroSection";
import type {
  LayerHeroContent,
  LayerNavCta,
  LayerNavLink,
  LayerNavLogo,
} from "../components/LayerNavbar/types";

const logo: LayerNavLogo = {
  line1: "N",
  line2: "L",
  squareLetter: "C",
  href: "/layer-navbar",
};

const links: LayerNavLink[] = [
  { label: "Home", sectionId: "home", href: "/layer-navbar" },
  { label: "Ethos", sectionId: "ethos", href: "/layer-navbar/ethos" },
  { label: "About", sectionId: "about", href: "/layer-navbar/about" },
  { label: "Investors", sectionId: "investors", href: "/layer-navbar/investors" },
];

const cta: LayerNavCta = {
  label: "Contact Us",
  href: "#contact",
};

const hero: LayerHeroContent = {
  titleLines: ["New", "Layer", "Capital"],
  subtitleLine: "NLC © 2025",
  whoWeAreLabel: "Who We Are:",
  description:
    "Investment firm propelling groundbreaking tech companies building on Bitcoin.",
  investCta: { label: "Invest With Us", href: "#invest" },
};

export default function LayerNavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayerNavbar
        logo={logo}
        links={links}
        cta={cta}
        hero={hero}
        sectionContent={{ home: <HeroSection /> }}
        defaultSectionId="home"
      />
      {/* Keep route pages mounted for URL/metadata; UI is inside LayerNavbar */}
      <div className="sr-only">{children}</div>
    </>
  );
}
