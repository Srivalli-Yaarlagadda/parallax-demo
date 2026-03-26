"use client";

import { Navbar } from "../components/Picoplay";
import HeroSection from "../components/HeroSection";

export default function Page() {
  const menuItems = [
    { label: "Home", href: "/"},
    { label: "Our Services", href: "/services" },
    { label: "Our Work", href: "/work" },
    { label: "Our People", href: "/people" },
    { label: "Careers", href: "/careers" },
    { label: "Corporate Presentations", href: "/corporate" },
    { label: "News", href: "/news" },
  ];

  return (
    <div>
      <Navbar
        width="300px"
        backgroundColor="#111111"
        menuItems={menuItems}
        logo="/logoeg.png"           // Logo path
        logoCaption="We Create Fun!"       // Caption text passed here
        buttonText="Let's talk"
        buttonOnClick={() => alert("Let's talk clicked!")}
        onClose={() => console.log("Menu closed")}
      />
      
      {/* Render HeroSection below the Navbar */}
      <HeroSection />
    </div>
  );
}