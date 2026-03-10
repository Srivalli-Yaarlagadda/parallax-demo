"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Gallery", path: "/gallery" },
    { name: "Brands", path: "/brands" },
];

export default function NavbarWithArrow() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Lock scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        setTimeout(() => {
            router.push(path);
        }, 300); // wait for close animation
    };

    return (
        <nav className="w-full border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-sm fixed top-0 z-50">
            <div className="flex justify-between items-center px-6 py-5">
                <a href="/" className="flex shrink-0 items-center" aria-label="Home">
                    <img src="/logoeg.png" alt="" className="h-12 w-auto object-contain" />
                </a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {navItems.map((item, index) => {
                        const isHovered = hoveredIndex === index;

                        return (
                            <button
                                key={item.name}
                                onClick={() => handleNavigation(item.path)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative group flex items-center gap-1 px-5 py-2 text-lg font-medium text-slate-200 rounded-lg transition-colors duration-200 hover:text-white"
                            >
                                <span className="relative">
                                    {item.name}

                                    {/* Center expanding underline */}
                                    <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                </span>

                                <span
                                    className={`inline-block transition-all duration-200 ease-out ${hoveredIndex === index
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-1"
                                        }`}
                                >
                                    <svg
                                        width="30"
                                        height="6"
                                        viewBox="0 0 20 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="rotate-[-48deg]"
                                    >
                                        <path
                                            d="M0 4H18M14 0L18 4L14 8"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Hamburger */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-300"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Animated Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden fixed inset-0 w-screen h-screen bg-slate-950 flex flex-col items-center justify-center gap-10 text-2xl font-medium text-slate-300 z-40"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-white"
                        >
                            <X size={32} />
                        </button>

                        {navItems.map((item, i) => (
                            <motion.button
                                key={item.name}
                                onClick={() => handleNavigation(item.path)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: i * 0.05 }}
                                className="hover:text-white transition-colors duration-200"
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}