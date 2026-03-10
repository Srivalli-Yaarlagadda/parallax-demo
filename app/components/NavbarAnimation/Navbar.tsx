"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FullscreenMenu from "./FullscreenMenu";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR CONTAINER */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-18 py-4 z-[9999] bg-white">
        
        {/* LEFT SIDE - LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={20}
            priority
          />
        </Link>

        {/* RIGHT SIDE - HOME + HAMBURGER */}
        <div className="flex items-center gap-22 text-black">
          
          {/* HOME LINK */}
          <Link href="/" className="text-lg tracking-wide hover:opacity-70 transition">
            HOME
          </Link>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-3xl pointer-events-auto"
          >
            {open ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* MENU */}
      <AnimatePresence>
        {open && <FullscreenMenu close={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}