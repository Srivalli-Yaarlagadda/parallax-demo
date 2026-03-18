import HeroSection from "../components/HeroSection";
import { StackedMenuNavbar } from "../components/StackedMenuNavbar/StackedMenuNavbar";
import type { StackedMenuLink, StackedMenuSocialLink, StackedMenuLeftPanel, StackedMenuHeader, StackedMenuContact } from "../components/StackedMenuNavbar/types";

const links: StackedMenuLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Articles", href: "#articles" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const socialLinks: StackedMenuSocialLink[] = [
  { label: "X / TWITTER", href: "https://twitter.com" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "YOUTUBE", href: "https://youtube.com" },
];

const leftPanel: StackedMenuLeftPanel = {
  imageSrc: "/livingroom.avif",
  imageAlt: "Living room",
  imageOverlay: { overline: "Featured space", title: "Modern living" },
  metrics: [
    { value: "87%", caption: "Time saved on support" },
    { value: "3X", caption: "Ticket resolution speed" },
  ],
  caseStudy: {
    overline: "Featured case study",
    title: "How we help companies scale operations with AI.",
  },
  leftBarTopLabel: "DEC 1, 2025",
  leftBarBottomLabel: "ENTERPRISE SOFTWARE",
};

const header: StackedMenuHeader = {
  logoSrc: "/logoeg.png",
  logoAlt: "Logo",
  logoHref: "/",
  centerLabel: "AI automation specialists",
  menuLabel: "MENU",
};

const contact: StackedMenuContact = {
  phone: "[510] 895-6500",
  email: "sales@kyma.ai",
  emailLabel: "SALES@KYMA.AI",
};

export default function StackedNavbarPage() {
  return (
    <>
      <StackedMenuNavbar
        links={links}
        socialLinks={socialLinks}
        leftPanel={leftPanel}
        header={header}
        contact={contact}
        socialsLabel="[SOCIALS]"
        closeLabel="Close"
      />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
      </main>
    </>
  );
}
