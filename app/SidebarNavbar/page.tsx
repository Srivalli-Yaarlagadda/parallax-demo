// "use client";

// import { SidebarNavbar } from "../components/SidebarNavbar";
// import HeroSection from "../components/HeroSection";
// export default function Page() {
//   return (
//     <SidebarNavbar
//       width="50%"
//       trigger={
//         <div className="bg-blue-700 text-white px-5 py-2 rounded-full">
//           ☰ Menu
//         </div>
//       }
//       sidebarContent={
//         <div className="bg-[#e6eef7] h-full p-6 flex flex-col justify-between">
//           {/* TOP */}
//           <div>
//             {/* CLOSE */}
//             <button className="bg-blue-700 text-white px-4 py-2 rounded-full mb-6">
//               ✕ Close
//             </button>

//             {/* MAIN LINKS */}
//             <div className="space-y-3">
//               {["Home", "About us", "Log book", "Contact"].map((item) => (
//                 <div
//                   key={item}
//                   className="bg-blue-200 rounded-xl px-4 py-3 text-blue-900"
//                 >
//                   • {item}
//                 </div>
//               ))}
//             </div>

//             {/* SECONDARY */}
//             <div className="mt-8">
//               <p className="mb-3 text-sm text-blue-900/70">Our Things</p>

//               <div className="space-y-3">
//                 {["Rooms", "A Bunch of Things"].map((item) => (
//                   <div
//                     key={item}
//                     className="bg-blue-300 rounded-xl px-4 py-3 text-blue-900"
//                   >
//                     • {item}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* BOTTOM (SOCIAL) */}
//           <div className="grid grid-cols-6 gap-2 mt-10">
//             {["D", "T", "I", "X", "Y", "Th"].map((icon, i) => (
//               <div
//                 key={i}
//                 className="bg-blue-200 rounded-lg h-14 flex items-center justify-center"
//               >
//                 {icon}
//               </div>
//             ))}
//           </div>
//         </div>
//       }
//     >
     
//     </SidebarNavbar>
//   );
// }

"use client";

import { SidebarNavbar } from "../components/SidebarNavbar";
import HeroSection from "../components/HeroSection";
import { FaDiscord, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { SiTiktok, SiThreads } from "react-icons/si";

export default function Page() {
  return (
    <SidebarNavbar
      trigger={
        <div className="bg-blue-700 text-white px-5 py-2 rounded-full">
          ☰ Menu
        </div>
      }

      mainLinks={[
        { label: "Home", preview: "Welcome Home 🏠" },
        { label: "About us", preview: "Know about us" },
        { label: "Log book", preview: "View logs" },
        { label: "Contact", preview: "Say hii 👋" },
      ]}

      secondaryTitle="Our Things"

      secondaryLinks={[
        { label: "Rooms", preview: "Explore rooms 🛏️" },
        { label: "A Bunch of Things", preview: "Discover more ✨" },
      ]}

      socialTitle="Follow us"

      socialItems={[
        { label: "Discord", icon: <FaDiscord size={22} /> },
        { label: "TikTok", icon: <SiTiktok size={22} /> },
        { label: "Instagram", icon: <FaInstagram size={22} /> },
        { label: "Twitter", icon: <FaTwitter size={22} /> },
        { label: "YouTube", icon: <FaYoutube size={22} /> },
        { label: "Threads", icon: <SiThreads size={22} /> },
      ]}

      closeButton={(close) => (
        <button
          onClick={close}
          className="bg-blue-900 text-white px-5 py-2 rounded-full"
        >
          ✕ Close
        </button>
      )}
    >
      <HeroSection />
    </SidebarNavbar>
  );
}