import { ReactNode } from "react";

export interface NavbarItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface NavbarProps {
  width?: string; // sidebar width
  backgroundColor?: string;
  menuItems: NavbarItem[];
  logo?: string;
  logoCaption?: string; // added caption
  buttonText?: string;
  buttonOnClick?: () => void;
  onClose?: () => void;
}