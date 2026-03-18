"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/lib/typography";
import type {
  StackedMenuLink,
  StackedMenuSocialLink,
  StackedMenuLeftPanel,
  StackedMenuContact,
} from "./types";

const ACCENT = "#f5f1dc";
const DIVIDER = "border-neutral-300";
const DURATION = 1.4;
const PANEL_DELAYS = [0, DURATION * 0.3, DURATION * 0.5, DURATION * 0.7];
const CONTENT_DELAY = PANEL_DELAYS[3] + DURATION + 0.2;

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DEFAULT_SOCIAL_LABELS = ["X / TWITTER", "LINKEDIN", "INSTAGRAM", "YOUTUBE"] as const;
type SocialKey = "twitter" | "linkedin" | "instagram" | "youtube";
const SOCIAL_KEYS: SocialKey[] = ["twitter", "linkedin", "instagram", "youtube"];
const GROUP_DELAY_MS = 280;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}
function getScrambleGroups(len: number): { group1: number[]; group2: number[] } {
  const mid = Math.ceil(len / 2);
  return {
    group1: Array.from({ length: mid }, (_, i) => i),
    group2: Array.from({ length: len - mid }, (_, i) => i + mid),
  };
}

const defaultSocialLabels = {
  twitter: DEFAULT_SOCIAL_LABELS[0],
  linkedin: DEFAULT_SOCIAL_LABELS[1],
  instagram: DEFAULT_SOCIAL_LABELS[2],
  youtube: DEFAULT_SOCIAL_LABELS[3],
};

export type FullScreenMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  visible: boolean;
  links: StackedMenuLink[];
  socialLinks?: StackedMenuSocialLink[];
  leftPanel?: StackedMenuLeftPanel;
  contact?: StackedMenuContact;
  socialsLabel?: string;
  closeLabel?: string;
};

export function FullScreenMenu({
  open,
  setOpen,
  visible,
  links,
  socialLinks = [],
  leftPanel,
  contact = {},
  socialsLabel = "[SOCIALS]",
  closeLabel = "Close",
}: FullScreenMenuProps) {
  const socialLabels = SOCIAL_KEYS.reduce(
    (acc, key, i) => ({ ...acc, [key]: socialLinks[i]?.label ?? defaultSocialLabels[key] }),
    {} as Record<SocialKey, string>
  );
  const [leftPanelHovered, setLeftPanelHovered] = useState(false);
  const [socialDisplay, setSocialDisplay] = useState(() => ({ ...socialLabels }));
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [scramblingSocial, setScramblingSocial] = useState<string | null>(null);
  const [scrambleIndices, setScrambleIndices] = useState<Record<string, number[]>>({});
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const socialActiveIndicesRef = useRef<number[]>([]);

  useEffect(() => {
    setSocialDisplay(
      SOCIAL_KEYS.reduce(
        (acc, key, i) => ({ ...acc, [key]: socialLinks[i]?.label ?? defaultSocialLabels[key] }),
        {} as Record<SocialKey, string>
      )
    );
  }, [socialLinks]);

  useEffect(() => {
    if (!hoveredSocial) return;
    const key = hoveredSocial as SocialKey;
    const idx = SOCIAL_KEYS.indexOf(key);
    const original = socialLinks[idx]?.label ?? defaultSocialLabels[key];
    const len = original.length;
    const { group1, group2 } = getScrambleGroups(len);
    socialActiveIndicesRef.current = [...group1];
    setScrambleIndices((prev) => ({ ...prev, [key]: group1 }));
    setScramblingSocial(key);
    const group2Timeout = setTimeout(() => {
      const all = [...group1, ...group2];
      socialActiveIndicesRef.current = all;
      setScrambleIndices((prev) => ({ ...prev, [key]: all }));
    }, GROUP_DELAY_MS);
    scrambleRef.current = setInterval(() => {
      const indices = socialActiveIndicesRef.current;
      let s = "";
      for (let i = 0; i < len; i++) s += indices.includes(i) ? randomChar() : original[i];
      setSocialDisplay((prev) => ({ ...prev, [key]: s }));
    }, 35);
    const stop = setTimeout(() => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);
      scrambleRef.current = null;
      setSocialDisplay((prev) => ({ ...prev, [key]: original }));
      setScramblingSocial(null);
      setScrambleIndices((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 1000);
    return () => {
      clearTimeout(group2Timeout);
      if (scrambleRef.current) clearInterval(scrambleRef.current);
      scrambleRef.current = null;
      setScramblingSocial(null);
      clearTimeout(stop);
    };
  }, [hoveredSocial, socialLinks]);

  function handleSocialLeave(key: SocialKey) {
    if (scrambleRef.current) clearInterval(scrambleRef.current);
    scrambleRef.current = null;
    setSocialDisplay((prev) => ({ ...prev, [key]: socialLabels[key] }));
    setScramblingSocial(null);
    setScrambleIndices((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setHoveredSocial(null);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-hidden"
      style={{ backgroundColor: "transparent" }}
      aria-hidden={!open}
    >
      <motion.div
        className="absolute inset-0 flex z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{
          duration: 0.5,
          delay: open ? CONTENT_DELAY : 0,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        {/* Panel 1: left panel — image, metrics, case study (lg only); min-h-0 overflow-y-auto so case study isn't cropped */}
        <div className={`hidden lg:flex lg:flex-col w-1/4 min-w-0 flex-shrink-0 border-r ${DIVIDER} pt-24 min-h-0 overflow-y-auto`}>
          <div
            className="relative w-full flex-shrink-0 flex flex-col bg-black"
            onMouseEnter={() => setLeftPanelHovered(true)}
            onMouseLeave={() => setLeftPanelHovered(false)}
          >
            <div className={`absolute left-0 top-0 bottom-0 h-full w-9 flex flex-col items-center justify-between py-4 z-20 bg-black border-r ${DIVIDER}`}>
              <div className="flex flex-col items-center gap-2">
                <svg className="w-3.5 h-3.5 text-white flex-shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <Typography variant="overline" className="text-white whitespace-nowrap [writing-mode:vertical-lr] rotate-180">{leftPanel?.leftBarTopLabel ?? "DEC 1, 2025"}</Typography>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg className="w-3.5 h-3.5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
                <Typography variant="caption" className="text-white whitespace-nowrap [writing-mode:vertical-lr] rotate-180">{leftPanel?.leftBarBottomLabel ?? "ENTERPRISE SOFTWARE"}</Typography>
              </div>
            </div>
            <div
              className="absolute left-9 top-0 bottom-0 h-full w-px z-[8]"
              style={{
                background: "linear-gradient(to bottom, rgba(163, 230, 53, 0.9) 0%, rgba(163, 230, 53, 0.95) 50%, rgba(163, 230, 53, 0.9) 100%)",
                boxShadow: "0 0 6px rgba(163, 230, 53, 0.6), 0 0 12px rgba(163, 230, 53, 0.25)",
              }}
            />
            <div className="relative w-full h-[45vh] min-h-[200px] overflow-hidden flex-shrink-0">
              <div className={`absolute inset-0 transition-[filter] duration-300 ${leftPanelHovered ? "blur-md" : ""}`}>
                <Image
                  src={leftPanel?.imageSrc ?? "/livingroom.avif"}
                  alt={leftPanel?.imageAlt ?? ""}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
              <motion.div
                className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-4 pt-8 bg-gradient-to-t from-black/85 to-transparent pointer-events-none z-10"
                initial={false}
                animate={{ y: leftPanelHovered ? 0 : "100%" }}
                transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              >
                <div className="text-center">
                  {(leftPanel?.imageOverlay?.overline != null && leftPanel.imageOverlay.overline !== "") && <Typography variant="overline" className="opacity-90 text-white">{leftPanel.imageOverlay.overline}</Typography>}
                  <Typography variant="h4" className="mt-1 text-white font-semibold">{leftPanel?.imageOverlay?.title ?? "Modern living"}</Typography>
                </div>
              </motion.div>
            </div>
            <div className={`relative flex flex-shrink-0 min-h-[80px] lg:min-h-[100px] border-t ${DIVIDER} pl-8 lg:pl-10 py-2 lg:py-3`}>
              <div className="flex-1 flex items-stretch justify-between gap-2 lg:gap-4 px-3 lg:px-4 min-h-0 min-w-0">
                <div className="flex flex-col gap-1 lg:gap-2 justify-center py-2 lg:py-3 min-w-0">
                  {(leftPanel?.metrics && leftPanel.metrics.length > 0 ? leftPanel.metrics : [{ value: "87%", caption: "Time saved on support" }, { value: "3X", caption: "Ticket resolution speed" }]).map((m, idx) => (
                    <div key={idx} className={idx > 0 ? "flex flex-col gap-1 lg:gap-2" : ""}>
                      {idx > 0 && <div className="h-px w-8 lg:w-12 bg-white/40" aria-hidden />}
                      <div className="min-w-0">
                        <Typography variant="h2" className="leading-tight text-white font-bold text-xl sm:text-2xl lg:text-lg xl:text-xl">{m.value}</Typography>
                        <Typography variant="caption" className="text-white/80 mt-0.5 block text-[10px] sm:text-xs lg:text-[10px] uppercase tracking-wide">{m.caption}</Typography>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="flex-shrink-0 w-px self-stretch h-full"
                  style={{
                    background: "linear-gradient(to bottom, rgba(163, 230, 53, 0.9) 0%, rgba(163, 230, 53, 0.95) 50%, rgba(163, 230, 53, 0.9) 100%)",
                    boxShadow: "0 0 6px rgba(163, 230, 53, 0.5)",
                  }}
                />
                <div className="flex items-center justify-center w-10 h-10 bg-black relative flex-shrink-0">
                  <motion.span
                    className="absolute w-2 h-2 bg-lime-400 rounded-none"
                    style={{ borderRadius: 0 }}
                    animate={{
                      left: leftPanelHovered ? "4px" : "16px",
                      top: leftPanelHovered ? "24px" : "8px",
                    }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.span
                    className="absolute w-2 h-2 bg-lime-400 rounded-none"
                    style={{ borderRadius: 0 }}
                    animate={{
                      left: leftPanelHovered ? "24px" : "16px",
                      top: leftPanelHovered ? "8px" : "16px",
                    }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.span
                    className="absolute w-2 h-2 bg-lime-400 rounded-none"
                    style={{ borderRadius: 0 }}
                    animate={{
                      left: leftPanelHovered ? "24px" : "16px",
                      top: leftPanelHovered ? "24px" : "24px",
                    }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`flex-shrink-0 px-4 py-4 min-h-0`} style={{ backgroundColor: ACCENT }}>
            <Typography variant="overline" className="text-neutral-500">{leftPanel?.caseStudy?.overline ?? "Featured case study"}</Typography>
            <Typography variant="h3" className="mt-1 text-neutral-900 font-bold uppercase">{leftPanel?.caseStudy?.title ?? "How we help companies scale operations with AI."}</Typography>
          </div>
        </div>

        {/* Panels 2, 3, 4: nav, contact, socials */}
        <div
          className="flex-1 flex flex-row min-w-0 py-6 sm:py-8 overflow-y-auto"
          style={{ backgroundColor: ACCENT }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded bg-black px-3 py-2"
            aria-label="Close menu"
          >
            <Typography variant="caption" className="text-white tracking-[0.2em] uppercase">X</Typography>
            <Typography variant="caption" className="text-white tracking-[0.2em] uppercase">{closeLabel}</Typography>
          </button>

          <div className={`flex-1 min-w-0 min-h-0 flex flex-col border-r ${DIVIDER} order-3 lg:order-1`} aria-hidden />

          <div className={`relative flex-1 min-w-[200px] sm:min-w-[220px] min-h-0 flex flex-col px-4 sm:px-6 lg:px-8 border-r ${DIVIDER} order-1 lg:order-2`}>
            <div className="min-h-[10vh]" aria-hidden />
            <nav className="flex flex-col gap-2 sm:gap-3">
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="no-underline group inline-block"
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoveredNav(item.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Typography
                    variant="display-xl"
                    className="font-bold tracking-[0.08em] text-neutral-900 group-hover:text-black transition-colors uppercase inline-flex"
                  >
                    {[...item.label].map((letter, i) => (
                      <motion.span
                        key={`${item.label}-${i}-${letter}`}
                        className="inline-block"
                        animate={
                          hoveredNav === item.label
                            ? { y: [0, -6, 0], transition: { duration: 0.4, delay: i * 0.03, ease: "easeOut" } }
                            : { y: 0, transition: { duration: 0.2 } }
                        }
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                  </Typography>
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-6 min-w-0">
              <div className="flex flex-col gap-1 min-w-0">
                <Typography variant="body-lg" className="text-black font-semibold border-b border-neutral-900 border-solid pb-0.5 w-fit uppercase whitespace-nowrap" style={{ letterSpacing: "0.22em" }}>{contact.phone ?? "[510] 895-6500"}</Typography>
                <a href={`mailto:${contact.email ?? "sales@kyma.ai"}`} className="group inline-block px-2 py-1 bg-[#c8ff6a] hover:bg-black no-underline w-fit min-w-0 shrink-0 transition-colors duration-200">
                  <Typography variant="h4" className="text-neutral-900 font-semibold group-hover:text-white transition-colors duration-200 uppercase whitespace-nowrap" style={{ letterSpacing: "0.22em" }}>{contact.emailLabel ?? contact.email ?? "SALES@KYMA.AI"}</Typography>
                </a>
              </div>
            </div>
            <div className="absolute bottom-12 left-4 sm:left-6 lg:left-8">
              <Typography variant="caption" className="opacity-70 text-neutral-700 uppercase tracking-[0.2em]" style={{ letterSpacing: "0.22em" }}>{socialsLabel}</Typography>
              <div className="mt-1 flex flex-col gap-1">
                {(["twitter", "linkedin"] as const).map((key, idx) => {
                  const href = socialLinks[idx]?.href;
                  const label = idx === 0 ? "1.0 " : "1.1 ";
                  const content = (
                    <Typography variant="caption" className={`font-semibold whitespace-nowrap ${hoveredSocial === key ? "text-white" : "text-neutral-700"}`}><span className={hoveredSocial === key ? "text-white" : "text-neutral-500"}>{label}</span><span className={hoveredSocial === key ? "" : "text-black"}>{[...socialDisplay[key]].map((char, i) => <span key={i} className={hoveredSocial === key && scramblingSocial === key && scrambleIndices[key]?.includes(i) ? "text-[#c8ff6a]" : hoveredSocial === key ? "text-white" : ""}>{char}</span>)}</span></Typography>
                  );
                  const className = `cursor-default px-1 -mx-1 py-0.5 transition-colors duration-200 w-fit no-underline ${hoveredSocial === key ? "bg-black text-white" : ""}`;
                  return href ? (
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className} onMouseEnter={() => setHoveredSocial(key)} onMouseLeave={() => handleSocialLeave(key)}>{content}</a>
                  ) : (
                    <div key={key} role="button" tabIndex={0} className={className} onMouseEnter={() => setHoveredSocial(key)} onMouseLeave={() => handleSocialLeave(key)}>{content}</div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`relative flex-1 min-w-0 min-h-0 flex flex-col px-4 sm:px-6 lg:px-8 order-2 lg:order-3 border-r ${DIVIDER}`}>
            <div className="flex-1 min-h-0" aria-hidden />
            <div className="absolute bottom-12 left-4 sm:left-6 lg:left-8">
              <div className="flex flex-col gap-1">
                {(["instagram", "youtube"] as const).map((key, idx) => {
                  const socialIdx = idx + 2;
                  const href = socialLinks[socialIdx]?.href;
                  const label = socialIdx === 2 ? "1.2 " : "1.3 ";
                  const content = (
                    <Typography variant="caption" className={`font-semibold whitespace-nowrap ${hoveredSocial === key ? "text-white" : "text-neutral-700"}`}><span className={hoveredSocial === key ? "text-white" : "text-neutral-500"}>{label}</span><span className={hoveredSocial === key ? "" : "text-black"}>{[...socialDisplay[key]].map((char, i) => <span key={i} className={hoveredSocial === key && scramblingSocial === key && scrambleIndices[key]?.includes(i) ? "text-[#c8ff6a]" : hoveredSocial === key ? "text-white" : ""}>{char}</span>)}</span></Typography>
                  );
                  const className = `cursor-default px-1 -mx-1 py-0.5 transition-colors duration-200 w-fit no-underline ${hoveredSocial === key ? "bg-black text-white" : ""}`;
                  return href ? (
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className} onMouseEnter={() => setHoveredSocial(key)} onMouseLeave={() => handleSocialLeave(key)}>{content}</a>
                  ) : (
                    <div key={key} role="button" tabIndex={0} className={className} onMouseEnter={() => setHoveredSocial(key)} onMouseLeave={() => handleSocialLeave(key)}>{content}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Curtains */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`absolute top-0 h-full z-30 ${
            i === 0
              ? "hidden lg:block w-1/4 left-0"
              : i === 1
                ? "left-0 w-1/3 lg:left-1/4 lg:w-1/4"
                : i === 2
                  ? "left-[33.333%] lg:left-1/2 w-1/3 lg:w-1/4"
                  : "left-[66.666%] lg:left-3/4 w-1/3 lg:w-1/4"
          }`}
          style={{
            backgroundColor: ACCENT,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
            ...(i < 3 ? { borderRight: "1px solid #d4d4d4" } : {}),
          }}
          initial={{ y: "100%" }}
          animate={{ y: open ? 0 : "100%" }}
          transition={{
            duration: DURATION,
            delay: open ? PANEL_DELAYS[i] : 0,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
      ))}
    </div>
  );
}