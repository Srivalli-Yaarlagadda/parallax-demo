// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useCallback, useEffect, useId, useState } from "react";
// import { cn } from "@/lib/utils";
// import Typography from "@/lib/typography";
// import type { MuseumSlideNavbarProps } from "./types";

// const DEFAULT_BAR_BG = "#eeeeee";
// const DEFAULT_MENU_BG = "#e4410f";
// const DEFAULT_LOGO_SRC = "/logoeg.jpg";

// function DefaultLogoMark({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       width={40}
//       height={40}
//       viewBox="0 0 40 40"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden
//     >
//       <rect x="4" y="4" width="14" height="14" rx="2" fill="currentColor" />
//       <rect x="22" y="4" width="14" height="14" rx="2" fill="currentColor" />
//       <rect x="4" y="22" width="14" height="14" rx="2" fill="currentColor" />
//       <rect x="22" y="22" width="14" height="14" rx="2" fill="currentColor" />
//     </svg>
//   );
// }

// function AnimatedHamburger({ open }: { open: boolean }) {
//   return (
//     <span className="relative inline-flex h-5 w-6 flex-col justify-center gap-[5px]">
//       <span className={cn("block h-px w-full bg-current transition", open && "translate-y-[6px] rotate-45")} />
//       <span className={cn("block h-px w-full bg-current transition", open && "opacity-0")} />
//       <span className={cn("block h-px w-full bg-current transition", open && "-translate-y-[6px] -rotate-45")} />
//     </span>
//   );
// }

// export function MuseumSlideNavbar({
//   links,
//   logo,
//   logoSrc: logoSrcProp,
//   logoAlt = "",
//   logoWidth = 40,
//   logoHeight = 40,
//   brandHref = "/",
//   brandLine1 = "MUSEUM",
//   brandLine2 = "STUDIO",
//   barBackground = DEFAULT_BAR_BG,
//   menuBackground = DEFAULT_MENU_BG,
//   onOpenChange,
// }: MuseumSlideNavbarProps) {
//   const panelId = useId();
//   const [open, setOpen] = useState(false);

//   const handleToggle = useCallback(() => {
//     setOpen((prev) => {
//       const next = !prev;
//       onOpenChange?.(next);
//       return next;
//     });
//   }, [onOpenChange]);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//   }, [open]);

//   const logoSrc = logoSrcProp ?? DEFAULT_LOGO_SRC;

//   const logoMark = logo ?? (
//     <Image
//       src={logoSrc}
//       alt={logoAlt}
//       width={logoWidth}
//       height={logoHeight}
//       className="h-10 w-auto object-contain"
//     />
//   );

//   return (
//     <header className="fixed inset-x-0 top-0 z-50">
//       {/* NAVBAR */}
//       <div
//         className="flex items-center justify-between px-6 md:px-14 lg:px-20 min-h-[4.25rem] transition-colors duration-300"
//         style={{
//           backgroundColor: open ? menuBackground : barBackground,
//         }}
//       >
//         <Link href={brandHref} className="flex items-center gap-3">
//           {logoMark}

//           <div className="flex flex-col leading-none">
//             <Typography variant="h2" className="font-semibold">
//               {brandLine1}
//             </Typography>
//             <Typography variant="h2" className="font-semibold">
//               {brandLine2}
//             </Typography>
//           </div>
//         </Link>

//         <button onClick={handleToggle}>
//           <AnimatedHamburger open={open} />
//         </button>
//       </div>

//       {/* MENU */}
//       <div
//         id={panelId}
//         className={cn(
//           "w-full transition-all duration-300 overflow-hidden",

//           // ✅ MOBILE FIX ONLY
//           open
//             ? "h-[calc(100vh-4.25rem)] opacity-100"
//             : "h-0 opacity-0",

//           // ✅ KEEP YOUR ORIGINAL BEHAVIOR FOR md+
//           "md:max-h-[80vh] md:h-auto"
//         )}
//         style={{ backgroundColor: menuBackground }}
//       >
//         <div
//           className={cn(
//             "px-6 md:px-14 lg:px-20 py-10",

//             // ✅ MOBILE FIX ONLY
//             "grid grid-cols-1 place-items-center text-center h-full",

//             // ❌ UNCHANGED (as you asked)
//             "md:grid-cols-4 md:gap-8 md:text-left md:place-items-center md:min-h-[50vh]",
//             "lg:grid-cols-8 lg:gap-6 lg:place-items-center lg:min-h-[40vh]"
//           )}
//         >
//           {links.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               onClick={() => setOpen(false)}
//               className="no-underline flex justify-center"
//             >
//               <Typography
//                 variant="h2"
//                 className="font-medium tracking-wide"
//               >
//                 {item.label}
//               </Typography>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import Typography from "@/lib/typography";
import type { MuseumSlideNavbarProps } from "./types";

const DEFAULT_BAR_BG = "#eeeeee";
const DEFAULT_MENU_BG = "#e4410f";
const DEFAULT_LOGO_SRC = "/logoeg.jpg";

function DefaultLogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="4" y="4" width="14" height="14" rx="2" fill="currentColor" />
      <rect x="22" y="4" width="14" height="14" rx="2" fill="currentColor" />
      <rect x="4" y="22" width="14" height="14" rx="2" fill="currentColor" />
      <rect x="22" y="22" width="14" height="14" rx="2" fill="currentColor" />
    </svg>
  );
}

function AnimatedHamburger({ open }: { open: boolean }) {
  return (
    <span className="relative inline-flex h-5 w-6 flex-col justify-center gap-[5px]">
      <span className={cn("block h-px w-full bg-current transition", open && "translate-y-[6px] rotate-45")} />
      <span className={cn("block h-px w-full bg-current transition", open && "opacity-0")} />
      <span className={cn("block h-px w-full bg-current transition", open && "-translate-y-[6px] -rotate-45")} />
    </span>
  );
}

export function MuseumSlideNavbar({
  links,
  logo,
  logoSrc: logoSrcProp,
  logoAlt = "",
  logoWidth = 40,
  logoHeight = 40,
  brandHref = "/",
  brandLine1 = "MUSEUM",
  brandLine2 = "STUDIO",
  barBackground = DEFAULT_BAR_BG,
  menuBackground = DEFAULT_MENU_BG,
  onOpenChange,
}: MuseumSlideNavbarProps) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  }, [onOpenChange]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const logoSrc = logoSrcProp ?? DEFAULT_LOGO_SRC;

  const logoMark = logo ?? (
    <Image
      src={logoSrc}
      alt={logoAlt}
      width={logoWidth}
      height={logoHeight}
      className="h-10 w-auto object-contain"
    />
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* NAVBAR */}
      <div
        className="flex items-center justify-between px-6 md:px-14 lg:px-20 min-h-[4.25rem] transition-colors duration-300"
        style={{
          backgroundColor: open ? menuBackground : barBackground,
        }}
      >
        <Link href={brandHref} className="flex items-center gap-3">
          {logoMark}

          <div className="flex flex-col leading-none">
            <Typography variant="h2" className="font-semibold">
              {brandLine1}
            </Typography>
            <Typography variant="h2" className="font-semibold">
              {brandLine2}
            </Typography>
          </div>
        </Link>

        <button onClick={handleToggle}>
          <AnimatedHamburger open={open} />
        </button>
      </div>

      {/* MENU */}
      <div
        id={panelId}
        className={cn(
          "w-full transition-all duration-300 overflow-hidden",

          // ✅ MOBILE FIX ONLY
          open
            ? "h-[calc(100vh-4.25rem)] opacity-100"
            : "h-0 opacity-0",

          // ✅ KEEP YOUR ORIGINAL BEHAVIOR FOR md+
          "md:max-h-[80vh] md:h-auto"
        )}
        style={{ backgroundColor: menuBackground }}
      >
        <div
          className={cn(
            "px-6 md:px-14 lg:px-20 py-10",

            // ✅ MOBILE FIX ONLY
            "grid grid-cols-1 place-items-center text-center h-full",

            // ❌ UNCHANGED (as you asked)
            "md:grid-cols-4 md:gap-8 md:text-left md:place-items-center md:min-h-[50vh]",
            "lg:grid-cols-8 lg:gap-6 lg:place-items-center lg:min-h-[40vh]"
          )}
        >
         {links.map((item) => (
  <Link
    key={item.href}
    href={item.href}
    onClick={() => setOpen(false)}
    className="group no-underline flex justify-center overflow-hidden"
  >
    <span className="relative h-[2em] overflow-hidden">
      
      {/* TOP TEXT (goes up on hover) */}
      <Typography
        variant="h2"
        className="
          block font-medium tracking-wide
          transition-transform duration-300 ease-in-out
          group-hover:-translate-y-full
        "
      >
        {item.label}
      </Typography>

      {/* BOTTOM TEXT (comes from bottom) */}
      <Typography
        variant="h2"
        className="
          absolute left-0 top-full
          font-medium tracking-wide
          transition-transform duration-300 ease-in-out
          group-hover:-translate-y-full
        "
      >
        {item.label}
      </Typography>

    </span>
  </Link>
))}
        </div>
      </div>
    </header>
  );
}
