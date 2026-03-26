"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { CascadeLayerNavbar } from "../components/CascadeLayerNavbar";
import type { CascadeNavLink } from "../components/CascadeLayerNavbar";
import HeroSection from "../components/HeroSection";
import Typography from "@/lib/typography";

interface AnimatedMenuLinkProps {
  href: string;
  children: ReactNode;
}

function AnimatedMenuLink({ href, children }: AnimatedMenuLinkProps) {
  const [underlinePhase, setUnderlinePhase] = useState<"hidden-left" | "visible" | "hidden-right">(
    "hidden-left",
  );

  const showUnderline = () => {
    setUnderlinePhase((current) => {
      if (current === "hidden-right") return "hidden-left";
      return current;
    });
    requestAnimationFrame(() => setUnderlinePhase("visible"));
  };

  return (
    <Link
      href={href}
      className="group relative block w-fit text-white no-underline"
      onMouseEnter={showUnderline}
      onMouseLeave={() => setUnderlinePhase("hidden-right")}
      onFocus={showUnderline}
      onBlur={() => setUnderlinePhase("hidden-right")}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-current transition-[clip-path] duration-300 ease-out"
        style={{
          clipPath:
            underlinePhase === "visible"
              ? "inset(0 0 0 0)"
              : underlinePhase === "hidden-right"
                ? "inset(0 0 0 100%)"
                : "inset(0 100% 0 0)",
        }}
        onTransitionEnd={() => {
          if (underlinePhase === "hidden-right") {
            setUnderlinePhase("hidden-left");
          }
        }}
      />
    </Link>
  );
}

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

      
        socialSectionLabel="Connect"
        legalSectionLabel="Legal"

        menuContent={
          <div className="mx-auto w-fit text-center sm:text-left">
            <ul className="space-y-1.5 sm:space-y-3">
              <li>
                <AnimatedMenuLink href="#experience">
                  <Typography
                    variant="display-2xl"
                    className="!text-white normal-case !font-semibold leading-[0.95] tracking-[-0.04em] !text-[clamp(1.6rem,10vw,5.4rem)] sm:!text-[clamp(2.8rem,6vw,5.4rem)]"
                  >
                    Experience
                  </Typography>
                </AnimatedMenuLink>
              </li>

              <li>
                <AnimatedMenuLink href="#technology">
                  <Typography className="!text-white normal-case !font-semibold leading-[0.95] tracking-[-0.04em] !text-[clamp(1.6rem,10vw,5.4rem)] sm:!text-[clamp(2.8rem,6vw,5.4rem)]">
                    Technology
                  </Typography>
                </AnimatedMenuLink>
              </li>

              <li>
                <AnimatedMenuLink href="#company">
                  <Typography className="!text-white normal-case !font-semibold leading-[0.95] tracking-[-0.04em] !text-[clamp(1.6rem,10vw,5.4rem)] sm:!text-[clamp(2.8rem,6vw,5.4rem)]">
                    Company
                  </Typography>
                </AnimatedMenuLink>
              </li>

              <li>
                <AnimatedMenuLink href="#news">
                  <Typography className="!text-white normal-case !font-semibold leading-[0.95] tracking-[-0.04em] !text-[clamp(1.6rem,10vw,5.4rem)] sm:!text-[clamp(2.8rem,6vw,5.4rem)]">
                    News
                  </Typography>
                </AnimatedMenuLink>
              </li>

              <li>
                <AnimatedMenuLink href="#careers">
                  <Typography className="!text-white normal-case !font-semibold leading-[0.95] tracking-[-0.04em] !text-[clamp(1.6rem,10vw,5.4rem)] sm:!text-[clamp(2.8rem,6vw,5.4rem)]">
                    Careers
                  </Typography>
                </AnimatedMenuLink>
              </li>
            </ul>
          </div>
        }
      />

      <HeroSection />
    </>
  );
}