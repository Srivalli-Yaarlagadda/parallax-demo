import Link from "next/link";
import { CascadeLayerNavbar } from "../components/CascadeLayerNavbar";
import type { CascadeNavLink } from "../components/CascadeLayerNavbar";
import HeroSection from "../components/HeroSection";

const socialLinks: CascadeNavLink[] = [
  { label: "Fly Blade", href: "#fly-blade" },
  { label: "Joby Shop", href: "#joby-shop" },
  { label: "YouTube", href: "#youtube" },
  { label: "Instagram", href: "#instagram" },
  { label: "LinkedIn", href: "#linkedin" },
  { label: "X", href: "#x" },
];

const legalLinks: CascadeNavLink[] = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Use", href: "#terms" },
  { label: "Impact Reporting", href: "#impact" },
  { label: "Health Plan Transparency", href: "#health" },
  { label: "Safety Policy", href: "#safety" },
];

export default function CascadeLayerNavbarPage() {
  return (
    <>
      <CascadeLayerNavbar
        logoSrc="/logoeg.png"
        logoAlt="Joby"
        brandName="Joby"
        brandHref="/"
        investors={{ label: "Investors", href: "#investors" }}
        socialLinks={socialLinks}
        legalLinks={legalLinks}
        menuContent={
          <div>
            <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/55 sm:mb-5">
              Discover
            </p>
            <ul className="space-y-1.5 text-[clamp(1.5rem,3.6vw,2.65rem)] font-bold leading-[1.08] tracking-tight sm:space-y-2">
              <li>
                <Link href="#experience" className="block text-white no-underline hover:opacity-85">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#technology" className="block text-white no-underline hover:opacity-85">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="#company" className="block text-white no-underline hover:opacity-85">
                  Company
                </Link>
              </li>
              <li>
                <Link href="#news" className="block text-white no-underline hover:opacity-85">
                  News
                </Link>
              </li>
              <li>
                <Link href="#careers" className="block text-white no-underline hover:opacity-85">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        }
      />
      <div className="h-12 shrink-0 sm:h-14" aria-hidden />
      <HeroSection />
    </>
  );
}
