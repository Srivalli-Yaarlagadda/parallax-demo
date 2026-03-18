"use client";

import { FreshmanNavbar } from "@/app/components/FreshmanNavbar";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Directors", href: "/#directors" },
  { label: "About", href: "/#about" },
  { label: "News", href: "/#news" },
  { label: "Contact", href: "/#contact" },
];

const LINK_SUPERSCRIPTS: Record<string, string> = {
  WORK: "(39)",
  DIRECTORS: "(12)",
  NEWS: "(11)",
};

export default function FreshmanNavbarPage() {
  return (
    <>
      <FreshmanNavbar
        logo={{
          logoImageUrl: "/logoeg.png",
          brandName: "Real Always Wins",
          href: "/",
        }}
        links={LINKS}
        menuButtonLabel="+ MENU"
        closeButtonLabel="X CLOSE"
        menuBrandName="freshman"
        linkSuperscripts={LINK_SUPERSCRIPTS}
        footer={{
          privacyLabel: "Privacy Policy",
          copyrightText: "2026 Real Always Wins",
          termsLabel: "Terms & Conditions",
        }}
      />
      <main className="min-h-screen bg-[#f5f1dc]" />
    </>
  );
}
