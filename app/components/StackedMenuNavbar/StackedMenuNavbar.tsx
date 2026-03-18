"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/lib/typography";
import type { StackedMenuNavbarProps } from "./types";
import { FullScreenMenu } from "./FullScreenMenu";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GROUP_DELAY_MS = 280;
const DURATION = 1.4; // for overlay visibility delay when closing

function getScrambleGroups(len: number): { group1: number[]; group2: number[] } {
  const mid = Math.ceil(len / 2);
  return {
    group1: Array.from({ length: mid }, (_, i) => i),
    group2: Array.from({ length: len - mid }, (_, i) => i + mid),
  };
}

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function StackedMenuNavbar({
  links,
  socialLinks = [],
  leftPanel,
  header = {},
  contact = {},
  socialsLabel = "[SOCIALS]",
  closeLabel = "Close",
}: StackedMenuNavbarProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const menuLabel = header?.menuLabel ?? "MENU";
  const [menuHovered, setMenuHovered] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(menuLabel);
  const [menuScrambling, setMenuScrambling] = useState(false);
  const [menuScrambleIndices, setMenuScrambleIndices] = useState<number[]>([]);
  const menuScrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const menuScrambleStopRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuGroup2TimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuActiveIndicesRef = useRef<number[]>([]);

  // Keep overlay visible until open; when closing, wait for curtain panels to come down
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    if (open) {
      setVisible(true);
    } else if (visible) {
      t = setTimeout(() => setVisible(false), DURATION * 1000 + 200);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [open, visible]);

  // Menu scramble: first 2 letters, then other 2 (same two-phase as socials)
  useEffect(() => {
    if (!menuHovered) return;
    const original = menuLabel;
    const len = original.length;
    const { group1, group2 } = getScrambleGroups(len);
    menuActiveIndicesRef.current = [...group1];
    setMenuScrambleIndices(group1);
    setMenuScrambling(true);
    menuGroup2TimeoutRef.current = setTimeout(() => {
      const all = [...group1, ...group2];
      menuActiveIndicesRef.current = all;
      setMenuScrambleIndices(all);
      menuGroup2TimeoutRef.current = null;
    }, GROUP_DELAY_MS);
    menuScrambleRef.current = setInterval(() => {
      const indices = menuActiveIndicesRef.current;
      let s = "";
      for (let i = 0; i < len; i++) s += indices.includes(i) ? randomChar() : original[i];
      setMenuDisplay(s);
    }, 35);
    menuScrambleStopRef.current = setTimeout(() => {
      if (menuScrambleRef.current) clearInterval(menuScrambleRef.current);
      menuScrambleRef.current = null;
      setMenuDisplay(original);
      setMenuScrambling(false);
      setMenuScrambleIndices([]);
      menuScrambleStopRef.current = null;
    }, 1000);
    return () => {
      if (menuGroup2TimeoutRef.current) clearTimeout(menuGroup2TimeoutRef.current);
      menuGroup2TimeoutRef.current = null;
      if (menuScrambleRef.current) clearInterval(menuScrambleRef.current);
      menuScrambleRef.current = null;
      if (menuScrambleStopRef.current) clearTimeout(menuScrambleStopRef.current);
      menuScrambleStopRef.current = null;
      setMenuDisplay(original);
      setMenuScrambling(false);
      setMenuScrambleIndices([]);
    };
  }, [menuHovered, menuLabel]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Top bar (overlays hero, transparent grayish) */}
      <div
        className="flex items-center justify-between px-4 py-3 md:px-8"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <Link href={header.logoHref ?? "/"} className="flex items-center gap-2 text-white no-underline">
          <Image src={header.logoSrc ?? "/logoeg.png"} alt={header.logoAlt ?? "Logo"} width={80} height={24} className="h-6 w-auto" />
        </Link>

        {header.centerLabel != null && header.centerLabel !== "" && (
          <Typography
            variant="body-sm"
            className="hidden md:block tracking-[0.2em] uppercase text-neutral-300"
          >
            {header.centerLabel}
          </Typography>
        )}

        <button
          type="button"
          onClick={() => setOpen(true)}
          onMouseEnter={() => setMenuHovered(true)}
          onMouseLeave={() => {
            setMenuHovered(false);
            if (menuGroup2TimeoutRef.current) clearTimeout(menuGroup2TimeoutRef.current);
            menuGroup2TimeoutRef.current = null;
            if (menuScrambleRef.current) clearInterval(menuScrambleRef.current);
            menuScrambleRef.current = null;
            if (menuScrambleStopRef.current) clearTimeout(menuScrambleStopRef.current);
            menuScrambleStopRef.current = null;
            setMenuDisplay(menuLabel);
            setMenuScrambling(false);
            setMenuScrambleIndices([]);
          }}
          className="inline-flex items-center gap-3 tracking-[0.25em] uppercase text-neutral-100 no-underline bg-black rounded-md py-2 px-3 sm:pl-3 sm:pr-4 overflow-hidden w-[3.5rem] sm:w-[8rem] flex-shrink-0 box-border"
        >
          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
            <span className="flex flex-col gap-[3px] items-center">
              <motion.span
                className="block h-[2px] bg-neutral-100 shrink-0"
                initial={false}
                animate={{ width: menuHovered ? 8 : 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
              <span className="block h-[2px] w-5 bg-neutral-100" />
              <motion.span
                className="block h-[2px] bg-neutral-100 shrink-0"
                initial={false}
                animate={{ width: menuHovered ? 8 : 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </span>
          </span>
          <Typography variant="body-sm" className="hidden sm:inline-flex w-[5.25rem] min-w-0 overflow-hidden uppercase text-neutral-100" style={{ letterSpacing: "0.25em" }}>
            {[...menuDisplay].map((char, i) => (
              <span
                key={i}
                className={menuHovered && menuScrambling && menuScrambleIndices.includes(i) ? "text-[#c8ff6a]" : ""}
              >
                {char}
              </span>
            ))}
          </Typography>
        </button>
      </div>

      <FullScreenMenu
        open={open}
        setOpen={setOpen}
        visible={visible}
        links={links}
        socialLinks={socialLinks}
        leftPanel={leftPanel}
        contact={contact}
        socialsLabel={socialsLabel}
        closeLabel={closeLabel}
      />
    </header>
  );
}
