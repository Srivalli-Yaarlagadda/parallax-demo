

// "use client";

// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import Typography from "@/lib/typography";
// import type { SidebarNavbarProps } from "./types";

// export function SidebarNavbar({
//   trigger,
//   mainLinks = [],
//   secondaryTitle,
//   secondaryLinks = [],
//   socialTitle,
//   socialItems = [],
//   closeButton,
//   children,
//   className,
// }: SidebarNavbarProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative">
//       {/* NAVBAR */}
//       <nav
//         className={cn(
//           "fixed top-0 left-0 w-full z-[100] flex items-center px-6 py-4 bg-transparent",
//           className
//         )}
//       >
//         <div onClick={() => setIsOpen(true)} className="cursor-pointer">
//           {trigger}
//         </div>
//       </nav>

//       {/* OVERLAY */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-[90]"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <div
//         className={cn(
//           "fixed top-0 left-0 h-full z-[110] bg-blue-100 shadow-xl transition-transform duration-500 w-full md:w-1/2 lg:w-[40%]",
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         <div className="h-full overflow-y-auto p-6 flex flex-col">
//           {/* CLOSE */}
//           {closeButton && (
//             <div className="mb-6 w-fit">
//               {closeButton(() => setIsOpen(false))}
//             </div>
//           )}

//           {/* ===== MAIN LINKS ===== */}
//           {mainLinks.length > 0 && (
//             <div className="bg-blue-900 rounded-2xl p-5 flex flex-col gap-3">
//               {mainLinks.map((item, i) => (
//                 <div key={i} className="group flex items-center gap-4">
                  
//                   {/* CARD */}
//                   <div className="bg-blue-100 rounded-xl px-4 py-3 shadow-sm h-[80px] w-full xl:w-1/2 flex items-center transition-all duration-300 ease-in-out hover:bg-pink-200">
//                     <Typography
//                       variant="body-xl"
//                       className="!text-blue-900 !font-semibold flex items-center gap-3"
//                     >
//                      <span className="relative w-5 h-5 flex items-center justify-center">
  
//   {/* BULLET (default) */}
//   <span className="absolute transition-all duration-300 opacity-100 group-hover:opacity-0">
//     •
//   </span>

//   {/* ARROW (hover) */}
//   <span className="absolute transition-all duration-300 opacity-0 group-hover:opacity-100">
//     <span className="relative w-4 h-4 flex items-center justify-center">
      
//       {/* line */}
//       <span className="absolute left-0 top-1/2 w-3 h-[2px] bg-blue-900 -translate-y-1/2"></span>

//       {/* arrow head */}
//       <span className="absolute right-0 top-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-900 rotate-45 -translate-y-1/2"></span>

//     </span>
//   </span>

// </span>

//                       {item.label}
//                     </Typography>
//                   </div>

//                   {/* RIGHT PREVIEW */}
//                   <div className="hidden xl:block min-w-[160px]">
//                     <div className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
//                       <Typography
//                         variant="body-xl"
//                         className="!text-white !font-semibold"
//                       >
//                         {item.preview}
//                       </Typography>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ===== SECONDARY ===== */}
//           {secondaryLinks.length > 0 && (
//             <div className="mt-8">
//               {secondaryTitle && (
//                 <Typography
//                   variant="body-xl"
//                   className="mb-3 !text-blue-900"
//                 >
//                   {secondaryTitle}
//                 </Typography>
//               )}

//               <div className="bg-blue-900 rounded-2xl p-5 flex flex-col gap-3">
//                 {secondaryLinks.map((item, i) => (
//                   <div key={i} className="group flex items-center gap-4">
                    
//                     <div className="bg-blue-100 rounded-xl px-4 py-3 shadow-sm h-[80px] w-full xl:w-1/2 flex items-center transition-all duration-300 ease-in-out hover:bg-pink-200">
//                       <Typography
//                         variant="body-xl"
//                         className="!text-blue-900 !font-semibold flex items-center gap-3"
//                       >
//                        <span className="relative w-5 h-5 flex items-center justify-center">
  
//   {/* BULLET (default) */}
//   <span className="absolute transition-all duration-300 opacity-100 group-hover:opacity-0">
//     •
//   </span>

//   {/* ARROW (hover) */}
//   <span className="absolute transition-all duration-300 opacity-0 group-hover:opacity-100">
//     <span className="relative w-4 h-4 flex items-center justify-center">
      
//       {/* line */}
//       <span className="absolute left-0 top-1/2 w-3 h-[2px] bg-blue-900 -translate-y-1/2"></span>

//       {/* arrow head */}
//       <span className="absolute right-0 top-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-900 rotate-45 -translate-y-1/2"></span>

//     </span>
//   </span>

// </span>

//                         {item.label}
//                       </Typography>
//                     </div>

//                     {/* RIGHT PREVIEW */}
//                     <div className="hidden xl:block min-w-[160px]">
//                       <div className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out">
//                         <Typography
//                           variant="body-xl"
//                           className="!text-white !font-semibold"
//                         >
//                           {item.preview}
//                         </Typography>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//     {/* ===== SOCIAL ===== */}
// {socialItems.length > 0 && (
//   <div className="mt-8">
//     {socialTitle && (
//       <Typography
//         variant="body-xl"
//         className="mb-3 !text-blue-900"
//       >
//         {socialTitle}
//       </Typography>
//     )}

//     {/* GRID */}
//     <div className="bg-blue-900 rounded-2xl p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[2px]">
//       {socialItems.map((item, i) => (
//         <div
//           key={i}
//           className="group relative bg-blue-100 rounded-xl aspect-square transition-all duration-300 hover:bg-pink-200 flex items-center justify-center"
//         >
//           {/* DOT → ARROW */}
//           <div className="absolute top-2 right-2 text-blue-900 font-bold">
//             <span className="block group-hover:hidden text-sm">•</span>
//             <span className="hidden group-hover:block text-sm text-black">
//               ↗
//             </span>
//           </div>

//           {/* CENTER ICON */}
//           <div className="flex items-center justify-center">
//             <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center transition-all duration-300 group-hover:bg-black">
//               <div className="text-white text-sm">
//                 {item.icon}
//               </div>
//             </div>
//           </div>

//           {/* 🔥 LABEL INSIDE (BOTTOM LEFT) */}
//           <div className="absolute bottom-2 left-2">
//             <Typography
//               variant="body-sm"
//               className="!text-blue-900 !font-semibold text-sm"
//             >
//               {item.label}
//             </Typography>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
//         </div>
//       </div>

//       {/* PAGE CONTENT */}
//       <div>{children}</div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Typography from "@/lib/typography";
import type { SidebarNavbarProps } from "./types";

export function SidebarNavbar({
  trigger,
  mainLinks = [],
  secondaryTitle,
  secondaryLinks = [],
  socialTitle,
  socialItems = [],
  closeButton,
  children,
  className,
}: SidebarNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* ================= NAVBAR ================= */}
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[100] flex items-center px-6 py-4 bg-transparent",
          className
        )}
      >
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      </nav>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[90]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full z-[110] bg-blue-100 shadow-xl transition-transform duration-500 w-full md:w-1/2 lg:w-[40%]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full overflow-y-auto p-6 flex flex-col">
          
          {/* CLOSE */}
          {closeButton && (
            <div className="mb-6 w-fit">
              {closeButton(() => setIsOpen(false))}
            </div>
          )}

          {/* ===== MAIN LINKS ===== */}
          {mainLinks.length > 0 && (
            <div className="bg-blue-900 rounded-2xl p-5 flex flex-col gap-3">
              {mainLinks.map((item, i) => (
                <div key={i} className=" group flex items-center gap-4">
                  
                  {/* CARD */}
                  <div className="group bg-blue-100 rounded-xl px-4 py-3 shadow-sm h-[80px] w-full xl:w-1/2 flex items-center transition-all duration-300 hover:bg-pink-200">
                    
                    <Typography
                      variant="body-xl"
                      className="!text-blue-900 !font-semibold flex items-center gap-3"
                    >
                      {/* BULLET → ARROW */}
                      <span className="relative w-5 h-5 flex items-center justify-center">
                        
                        <span className="absolute transition-all duration-300 opacity-100 group-hover:opacity-0">
                          •
                        </span>

                        <span className="absolute transition-all duration-300 opacity-0 group-hover:opacity-100">
                          <span className="relative w-4 h-4 flex items-center justify-center">
                            <span className="absolute left-0 top-1/2 w-3 h-[2px] bg-blue-900 -translate-y-1/2"></span>
                            <span className="absolute right-0 top-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-900 rotate-45 -translate-y-1/2"></span>
                          </span>
                        </span>

                      </span>

                      {item.label}
                    </Typography>
                  </div>

                  {/* PREVIEW */}
                  <div className="hidden xl:block min-w-[160px]">
                    <div className="opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <Typography
                        variant="body-xl"
                        className="!text-white !font-semibold"
                      >
                        {item.preview}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== SECONDARY ===== */}
          {secondaryLinks.length > 0 && (
            <div className="mt-8">
              {secondaryTitle && (
                <Typography
                  variant="body-xl"
                  className="mb-3 !text-blue-900"
                >
                  {secondaryTitle}
                </Typography>
              )}

              <div className="bg-blue-900 rounded-2xl p-5 flex flex-col gap-3">
                {secondaryLinks.map((item, i) => (
                  <div key={i} className="group flex items-center gap-4">
                    
                    <div className="group bg-blue-100 rounded-xl px-4 py-3 shadow-sm h-[80px] w-full xl:w-1/2 flex items-center transition-all duration-300 hover:bg-pink-200">
                      
                      <Typography
                        variant="body-xl"
                        className="!text-blue-900 !font-semibold flex items-center gap-3"
                      >
                        {/* BULLET → ARROW */}
                        <span className="relative w-5 h-5 flex items-center justify-center">
                          
                          <span className="absolute transition-all duration-300 opacity-100 group-hover:opacity-0">
                            •
                          </span>

                          <span className="absolute transition-all duration-300 opacity-0 group-hover:opacity-100">
                            <span className="relative w-4 h-4 flex items-center justify-center">
                              <span className="absolute left-0 top-1/2 w-3 h-[2px] bg-blue-900 -translate-y-1/2"></span>
                              <span className="absolute right-0 top-1/2 w-2 h-2 border-t-2 border-r-2 border-blue-900 rotate-45 -translate-y-1/2"></span>
                            </span>
                          </span>

                        </span>

                        {item.label}
                      </Typography>
                    </div>

                    {/* PREVIEW */}
                    <div className="hidden xl:block min-w-[160px]">
                      <div className="opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <Typography
                          variant="body-xl"
                          className="!text-white !font-semibold"
                        >
                          {item.preview}
                        </Typography>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== SOCIAL ===== */}
          {socialItems.length > 0 && (
            <div className="mt-8">
              {socialTitle && (
                <Typography
                  variant="body-xl"
                  className="mb-3 !text-blue-900"
                >
                  {socialTitle}
                </Typography>
              )}

              <div className="bg-blue-900 rounded-2xl p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[2px]">
                {socialItems.map((item, i) => (
                  <div
                    key={i}
                    className="group relative bg-blue-100 rounded-xl aspect-square transition-all duration-300 hover:bg-pink-200 flex items-center justify-center"
                  >
                    {/* DOT → ARROW */}
                    <div className="absolute top-2 right-2 text-blue-900 font-bold">
                      <span className="block group-hover:hidden text-sm">•</span>
                      <span className="hidden group-hover:block text-sm text-black">
                        ↗
                      </span>
                    </div>

                    {/* ICON */}
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center transition-all duration-300 group-hover:bg-black">
                        <div className="text-white text-sm">
                          {item.icon}
                        </div>
                      </div>
                    </div>

                    {/* LABEL */}
                    <div className="absolute bottom-2 left-2">
                      <Typography
                        variant="body-sm"
                        className="!text-blue-900 !font-semibold"
                      >
                        {item.label}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <div>{children}</div>
    </div>
  );
}