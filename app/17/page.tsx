"use client";

import { AllianceNavbar } from "@/app/components/AllianceNavbar";
import HeroSection from "@/app/components/HeroSection";

const LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Our Brands", href: "/#brands" },
  { label: "Our Services", href: "/#services" },
  { label: "Terms And Conditions", href: "/#terms" },
  { label: "Contact Us", href: "/#contact" },
];

export default function AllianceNavbarPage() {
  return (
    <>
      <AllianceNavbar
        logo={{
          imageUrl: "/logoeg.png",
          brandName: "Alliance Nav",
          href: "/",
        }}
        serviceButton={{
          label: "24/7 Service",
          hoverLabel: "+1 (234) 567-890",
          href: "+1 (234) 567-890",
        }}
        email="info@alliancenav.com"
        links={LINKS}
        footer={{
          copyrightText: "ALLIANCE NAV © 2024",
          privacyLabel: "Privacy Policy",
          privacyHref: "#privacy",
        }}
      />
      <div id="hero">
        <HeroSection />
      </div>
    </>
  );
}
