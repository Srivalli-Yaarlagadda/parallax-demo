"use client";

import { PartnerNavbar } from "@/app/components/PartnerNavbar";
import HeroSection from "@/app/components/HeroSection";

const LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Explore", href: "/#explore" },
  { label: "Essence", href: "/#essence" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/#contact" },
];

export default function PartnerNavbarPage() {
  return (
    <>
      <PartnerNavbar
        logo={{
          mainText: "DAVIN",
          mirroredText: "CANVAS",
          href: "/",
        }}
        links={LINKS}
        menuLabel="MENU"
        menuIconUrl="/menuplus.png"
        closeLabel="CLOSE"
        partnerText="PARTNER"
      />
      <div id="home">
        <HeroSection />
      </div>
    </>
  );
}
