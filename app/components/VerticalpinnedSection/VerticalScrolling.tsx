"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PinnedProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const right = rightRef.current;

    if (!section || !grid || !right) return;

    const setupScroll = () => {
      // Kill only triggers related to this section
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });

      const isMobile = window.innerWidth <= 1024;
      if (isMobile) {
        gsap.set(grid, { y: 0 });
        return;
      }

      const distance = grid.scrollHeight - right.clientHeight;
      if (distance <= 0) return;

      // Animate vertical scroll of right-side images
      gsap.to(grid, {
        y: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${distance + right.clientHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: true, // set false in production
        },
      });
    };

    setupScroll();
    window.addEventListener("resize", setupScroll);

    // Refresh ScrollTrigger after images load
    const imgs = grid.querySelectorAll("img");
    let loaded = 0;
    imgs.forEach((img) => {
      if (img.complete) loaded++;
      else
        img.onload = () => {
          loaded++;
          if (loaded === imgs.length) ScrollTrigger.refresh();
        };
    });

    return () => window.removeEventListener("resize", setupScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex w-full bg-gray-50 overflow-hidden"
    >
      {/* LEFT SIDE */}
      <div className="project-left w-2/5 h-screen flex flex-col justify-center px-16 sticky top-0">
        <h2 className="project-title text-5xl mb-6 text-gray-900">
          Crafting spaces that inspire living.
        </h2>
        <p className="project-description text-gray-600 max-w-xs mb-6">
          Explore our curated selection of residential and commercial architectural projects.
          Crafting spaces that inspire living.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div
        ref={rightRef}
        className="project-right w-3/5 h-screen overflow-hidden relative"
      >
        <div
          ref={gridRef}
          className="cards-grid grid grid-cols-2 gap-6 p-8"
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="project-card flex flex-col gap-2 cursor-pointer overflow-hidden rounded-2xl"
            >
              <div className="img-wrapper w-full h-[600px] overflow-hidden bg-gray-200">
                <img
                  src="/demo.jpg"
                  alt={`Project ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="card-meta flex justify-between items-start border-t border-gray-200 pt-2">
                <div className="meta-left">
                  <h3 className="font-serif text-lg">Project {i + 1}</h3>
                  <p className="text-gray-500 text-sm">Residential</p>
                </div>
                <div className="meta-right text-gray-900 font-medium text-sm">
                  2023
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}