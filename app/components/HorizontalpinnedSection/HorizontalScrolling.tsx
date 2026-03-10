"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stripItems = [
  { title: "Innovation", desc: "Ideas that shape the future", img: "/demo.jpg" },
  { title: "Design", desc: "Beautiful and functional interfaces", img: "/demo.jpg" },
  { title: "Development", desc: "High-quality, scalable code", img: "/demo.jpg" },
  { title: "Launch", desc: "Delivering impact at scale", img: "/demo.jpg" },
  { title: "Growth", desc: "Optimizing for long-term success", img: "/demo.jpg" },
  { title: "Strategy", desc: "Planning for results", img: "/demo.jpg" },
  { title: "Marketing", desc: "Reaching your audience effectively", img: "/demo.jpg" },
  { title: "Support", desc: "Helping clients achieve success", img: "/demo.jpg" },
];

export default function GSAPPinnedHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !stripRef.current) return;

    const stripWidth = stripRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    gsap.to(stripRef.current, {
      x: -(stripWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${stripWidth - viewportWidth}`,
        scrub: true,
        pin: true,           // Pin the section while horizontal scroll happens
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-gray-100 overflow-hidden py-32 px-6">
      {/* Sticky heading */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Process in Motion</h2>
        <p className="text-gray-700">
          The heading stays pinned until the horizontal scroll completes.
        </p>
      </div>

      {/* Horizontal strip */}
      <div className="overflow-hidden">
        <div ref={stripRef} className="flex gap-6">
          {stripItems.map((item, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-[400px] object-cover rounded-2xl"
                draggable={false}
              />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <h3 className="text-2xl font-semibold mb-1">{item.title}</h3>
                <p className="text-sm opacity-90">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}