import type { ReactNode } from "react";

export interface NavItem {
  label: string;
   preview?: string;
}

export interface SocialItem {
  icon: ReactNode;
  label: string;
}

export interface SidebarNavbarProps {
  trigger?: ReactNode;

  mainLinks?: NavItem[];

  secondaryTitle?: string;
  secondaryLinks?: NavItem[];

  socialTitle?: string;
  socialItems?: SocialItem[];

  /** ✅ Render prop (fixes all TS issues) */
  closeButton?: (close: () => void) => ReactNode;

  children: ReactNode;

  width?: string;
  className?: string;
}