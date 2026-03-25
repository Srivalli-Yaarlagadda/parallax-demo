import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { TypographyProps } from "@/lib/typography";

export interface MuseumSlideNavLink {
  label: string;
  href: string;
}

export interface MuseumSlideNavbarProps extends ComponentPropsWithoutRef<"header"> {
  /** In-panel navigation; rendered as Next.js `Link`s */
  links: MuseumSlideNavLink[];
  /** Mark or image shown before the brand name (overrides `logoSrc` when set) */
  logo?: ReactNode;
  /** Public URL for the logo image (default `/logoeg.jpg`). Pass `""` to use the built-in grid mark instead. */
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoClassName?: string;
  /** Passed to `next/image` for the mark (default `true` for faster LCP) */
  logoPriority?: boolean;
  /** Destination when the logo is clicked */
  brandHref?: string;
  /** Used for the default logo when `logo` is not provided */
  brandLine1?: string;
  brandLine2?: string;

  barBackground?: string;
  menuBackground?: string;
  /** Panel height (e.g. `50vh`, `min(50vh, 420px)`) */
  menuHeight?: string;

  menuClassName?: string;
  /** Extra attributes for the sliding menu backdrop layer (not the `<header>`) */
  menuProps?: Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

  barRowClassName?: string;
  linksNavClassName?: string;
  linkClassName?: string;
  brandTextVariant?: TypographyProps["variant"];
  linkTextVariant?: TypographyProps["variant"];
  brandTextClassName?: string;
  linkTextClassName?: string;

  hamburgerClassName?: string;
  hamburgerOpenLabel?: string;
  hamburgerClosedLabel?: string;

  /** Optional content below the link row inside the open panel */
  menuFooter?: ReactNode;

  /** Controlled menu visibility */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
