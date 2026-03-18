"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  isValidElement,
  cloneElement,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Typography from "@/lib/typography";
import type { LayerNavbarProps } from "./types";

const LAVENDER = "#d4c5e8";
const ORANGE = "#f07510";
const MAGENTA = "#e7108d";
const MAGENTA_MID = "#f55693";
const MAGENTA_LIGHT = "#f76795";
/** Gaps showing underlying layer at left */
/** Pink layer left edge (px) — overlay must match for top-right origin */
/** 1px gray outline on orange menu (align check vs pink layer) */
const MENU_DEBUG_GRAY = "rgb(100, 100, 100)";
const DEBUG_BORDER = 1;


export function LayerNavbar({
  logo: _logo,
  links,
  cta,
  hero,
  sectionContent = {},
  defaultSectionId: defaultSectionIdProp,
  className = "",
}: LayerNavbarProps) {
  void _logo;
  const router = useRouter();
  const pathname = usePathname();
  const homeSectionId = useMemo(
    () => defaultSectionIdProp ?? links[0]?.sectionId ?? "home",
    [defaultSectionIdProp, links],
  );
  const urlSectionId = useMemo(() => {
    // /layer-navbar           => home
    // /layer-navbar/about     => about
    const parts = (pathname ?? "").split("/").filter(Boolean);
    const idx = parts.indexOf("layer-navbar");
    const section = idx >= 0 ? parts[idx + 1] : undefined;
    return section ?? homeSectionId;
  }, [pathname, homeSectionId]);
  const activeSectionId = urlSectionId;
  const [visualSectionId, setVisualSectionId] = useState(activeSectionId);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [menuCornerVisible, setMenuCornerVisible] = useState(false);
  const [pinkPhase, setPinkPhase] = useState<"idle" | "wipeDown" | "diagonalOut">("idle");
  const [orangePhase, setOrangePhase] = useState<"idle" | "revealUp">("idle");
  const [orangeBgActive, setOrangeBgActive] = useState(false);
  const pendingSectionAfterMenuRef = useRef<string | null>(null);
  const pendingHrefAfterMenuRef = useRef<string | null>(null);
  const pendingLabelAfterMenuRef = useRef<string | null>(null);
  const [a, b, c] = hero.titleLines;

  const openMenu = useCallback(() => {
    setMenuClosing(false);
    setMenuCornerVisible(false);
    setMenuMounted(true);
  }, []);

  const closeMenuAnimated = useCallback(() => {
    if (!menuMounted || menuClosing) return;
    setMenuClosing(true);
  }, [menuMounted, menuClosing]);

  const transitionBusy =
    menuClosing || pinkPhase !== "idle" || orangePhase !== "idle";

  const onMenuAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (menuClosing) {
        setMenuMounted(false);
        setMenuClosing(false);
        setMenuCornerVisible(false);
      } else {
        setMenuCornerVisible(true);
      }
    },
    [menuClosing],
  );

  const onPinkWipeDownEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (pinkPhase !== "wipeDown") return;
      setPinkPhase("diagonalOut");
    },
    [pinkPhase],
  );

  const onPinkDiagonalOutEnd = useCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    // Guard: if we somehow already moved on, do nothing.
    if (pinkPhase !== "diagonalOut") return;
    // Lock the visuals to the destination section before orange reveal starts.
    const nextSectionId = pendingSectionAfterMenuRef.current;
    if (nextSectionId != null) setVisualSectionId(nextSectionId);
    // Start orange immediately after pink finishes (avoid any single-frame pink flash).
    setOrangePhase("revealUp");
    setPinkPhase("idle");
  }, [pinkPhase, router]);

  const onOrangeRevealUpEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (orangePhase !== "revealUp") return;
      const href = pendingHrefAfterMenuRef.current;
      pendingHrefAfterMenuRef.current = null;
      pendingSectionAfterMenuRef.current = null;
      pendingLabelAfterMenuRef.current = null;
      setOrangePhase("idle");
      setOrangeBgActive(true);
      if (href) router.push(href);
    },
    [orangePhase, router],
  );

  const selectNavSection = useCallback(
    (sectionId: string, href: string, label: string) => {
      // Prevent overlapping animations from double-clicks / rapid taps.
      if (transitionBusy) return;
      if (sectionId === activeSectionId) {
        closeMenuAnimated();
        return;
      }
      pendingSectionAfterMenuRef.current = sectionId;
      pendingHrefAfterMenuRef.current = href;
      pendingLabelAfterMenuRef.current = label;
      setOrangeBgActive(false);
      // Start pink immediately (while the menu is closing).
      setPinkPhase("wipeDown");
      closeMenuAnimated();
    },
    [activeSectionId, closeMenuAnimated, transitionBusy],
  );

  /** Contact + arrow + divider + hamburger — sits on orange strip (layer 2) */
  const contactBarShellClass =
    "flex h-full min-h-0 w-max max-w-[min(100%,calc(100vw-2.5rem))] items-stretch rounded-bl-md pl-2 pr-1.5 sm:rounded-bl-lg sm:pl-4 sm:pr-3 md:rounded-bl-xl md:pl-7 md:pr-4 lg:pl-10 lg:pr-5 xl:pl-12";
  const contactCapShellClass =
    "flex h-full min-h-0 w-max max-w-[min(100%,calc(100vw-2.5rem))] items-stretch pr-1.5 sm:pr-3 md:pr-4 lg:pr-5";

  const contactBar = (wrapperClassName: string) => (
    <div
      className={wrapperClassName}
      style={{ backgroundColor: ORANGE }}
    >
      <Link
        href={cta.href}
        className="group hidden min-h-0 min-w-0 flex-1 items-center gap-5 self-stretch py-1 pr-6 text-white no-underline transition-opacity hover:opacity-90 md:flex md:gap-8 md:pr-10 lg:gap-10 lg:pr-12"
        onClick={() => {
          if (menuMounted && !menuClosing) closeMenuAnimated();
        }}
      >
        <Typography
          variant="body-lg"
          className="!text-white w-fit truncate border-b border-transparent pb-0.5 text-xs leading-tight transition-colors group-hover:border-white sm:text-base md:text-lg lg:text-[19px]"
        >
          {cta.label}
        </Typography>
        <span
          className="relative h-7 w-6 shrink-0 overflow-hidden text-transparent sm:h-8 sm:w-7 md:h-9 md:w-8"
          aria-hidden
        >
          <span className="absolute inset-0 flex items-center justify-center text-white transition-transform duration-300 ease-out group-hover:translate-x-full">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H18M18 12L12.5 6.5M18 12L12.5 17.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-white -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H18M18 12L12.5 6.5M18 12L12.5 17.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          →
        </span>
      </Link>
      <span className="mx-1.5 hidden w-px shrink-0 self-stretch bg-white md:block md:mx-2.5" aria-hidden />
      <button
        type="button"
        className="group flex h-auto min-h-0 w-14 shrink-0 flex-col items-end justify-center self-stretch py-1 pl-5 pr-3 text-white transition-opacity hover:opacity-90 sm:w-16 sm:pl-6 sm:pr-4 md:w-[4.5rem] md:pl-7 md:pr-5 lg:w-20 lg:pl-8 lg:pr-6"
        aria-label={menuMounted && !menuClosing ? "Close menu" : "Open menu"}
        aria-expanded={menuMounted && !menuClosing}
        onClick={() => {
          if (menuClosing) return;
          if (menuMounted) closeMenuAnimated();
          else openMenu();
        }}
      >
        {menuMounted && !menuClosing ? (
          <span className="relative flex h-5 w-6 items-center justify-center sm:h-6 sm:w-7 md:h-7 md:w-8">
            <span className="absolute h-0.5 w-6 rotate-45 bg-white sm:w-7 md:w-8" />
            <span className="absolute h-0.5 w-6 -rotate-45 bg-white sm:w-7 md:w-8" />
          </span>
        ) : (
          <span
            className="flex flex-col items-end gap-0.5 sm:gap-1"
            aria-hidden
          >
            <span className="block h-0.5 w-6 origin-right bg-white transition-transform duration-300 ease-out group-hover:scale-x-50 sm:w-7 md:w-8" />
            <span className="block h-0.5 w-6 origin-right bg-white transition-transform delay-200 duration-250 ease-out group-hover:scale-x-50 sm:w-7 md:w-8" />
          </span>
        )}
      </button>
    </div>
  );

  const contactTopCap = (wrapperClassName: string) => (
    <div
      className={wrapperClassName}
      style={{ backgroundColor: ORANGE }}
      aria-hidden
    >
      <div className="hidden min-h-0 min-w-0 flex-1 items-center gap-5 self-stretch py-1 pr-6 md:flex md:gap-8 md:pr-10 lg:gap-10 lg:pr-12">
        <Typography
          variant="body-lg"
          className="w-fit truncate border-b border-transparent pb-0.5 invisible text-xs leading-tight sm:text-base md:text-lg lg:text-[19px]"
        >
          {cta.label}
        </Typography>
        <span className="relative h-6 w-5 shrink-0 overflow-hidden invisible text-sm leading-none sm:h-7 sm:w-6 sm:text-base md:h-8 md:w-7 md:text-lg">
          &rarr;
        </span>
      </div>
      <span className="mx-1.5 hidden w-px shrink-0 self-stretch bg-white md:block md:mx-2.5" />
      <div className="flex h-auto min-h-0 w-14 shrink-0 flex-col items-end justify-center self-stretch py-1 pl-5 pr-3 sm:w-16 sm:pl-6 sm:pr-4 md:w-[4.5rem] md:pl-7 md:pr-5 lg:w-20 lg:pl-8 lg:pr-6">
        <span className="flex flex-col items-end gap-0.5 sm:gap-1">
          <span className="block h-0.5 w-6 invisible sm:w-7 md:w-8" />
          <span className="block h-0.5 w-6 invisible sm:w-7 md:w-8" />
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    if (!menuMounted && pinkPhase === "idle" && orangePhase === "idle") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuMounted, pinkPhase, orangePhase]);

  useEffect(() => {
    // Keep visuals in sync with URL when idle (no animations / overlays).
    if (pinkPhase !== "idle" || orangePhase !== "idle") return;
    setVisualSectionId(activeSectionId);
  }, [activeSectionId, pinkPhase, orangePhase]);

  const renderSectionContent = useCallback(
    (sectionId: string) => {
      const content = sectionContent[sectionId];
      if (content == null) return null;

      if (isValidElement<{ links?: LayerNavbarProps["links"]; activeSectionId?: string }>(content)) {
        return cloneElement(content, {
          links,
          activeSectionId: sectionId,
        });
      }

      return content;
    },
    [links, sectionContent],
  );

  const renderPinkSection = (sectionId: string) => {
    const customSection = renderSectionContent(sectionId);
    if (sectionId !== homeSectionId && customSection != null) {
      return customSection;
    }

    if (sectionId === homeSectionId) {
      return (
        <>
          <section
            className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 md:px-12 md:pt-20"
            style={{ backgroundColor: MAGENTA }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] min-h-[200px]"
              aria-hidden
            >
              <svg
                className="absolute bottom-0 left-0 h-full w-full"
                viewBox="0 0 1200 320"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,180 Q300,120 600,160 T1200,140 L1200,320 L0,320 Z"
                  fill={MAGENTA_LIGHT}
                  opacity={0.5}
                />
                <path
                  d="M0,220 Q400,160 800,200 T1200,180 L1200,320 L0,320 Z"
                  fill={MAGENTA_MID}
                  opacity={0.6}
                />
                <path
                  d="M0,260 Q350,220 700,250 T1200,230 L1200,320 L0,320 Z"
                  fill={MAGENTA}
                />
              </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="mb-1 max-w-4xl border-b border-white pb-2 sm:pb-3">
                <h1 className="text-[clamp(2.25rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight !text-white">
                  {a} {b}
                </h1>
              </div>
              <div className="mb-8 max-w-4xl border-b border-white pb-2 sm:mb-10 sm:pb-3">
                <p className="text-[clamp(2.25rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight !text-white">
                  {c}
                </p>
              </div>
              {hero.subtitleLine != null && (
                <Typography variant="body-lg" className="mb-12 !text-white/90 sm:mb-14">
                  {hero.subtitleLine}
                </Typography>
              )}

              <div className="grid gap-12 md:grid-cols-2 md:items-end md:gap-16 lg:gap-20">
                <div>
                  {hero.whoWeAreLabel != null && (
                    <Typography variant="body-xl" className="mb-4 !font-medium !text-white">
                      {hero.whoWeAreLabel}
                    </Typography>
                  )}
                  <Typography
                    variant="body-xl"
                    className="max-w-lg !font-semibold !leading-relaxed !text-white"
                  >
                    {hero.description}
                  </Typography>
                </div>
                {hero.investCta != null && (
                  <div className="flex md:justify-end">
                    <Link
                      href={hero.investCta.href}
                      className="inline-flex items-center gap-2 border-b border-white pb-1 text-lg font-medium !text-white no-underline transition-opacity hover:opacity-85"
                    >
                      <span aria-hidden>→</span>
                      {hero.investCta.label}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div
              className="pointer-events-none absolute right-4 top-[28%] h-2 w-2 rounded-full bg-white sm:right-8 md:top-[32%]"
              aria-hidden
            />
          </section>

          {customSection != null && <div className="relative z-10">{customSection}</div>}
        </>
      );
    }
    const label = links.find((l) => l.sectionId === sectionId)?.label ?? "Page";
    return (
      <div className="relative z-10 flex min-h-full items-center justify-center px-6 py-24">
        <div className="text-center">
          <div className="text-[clamp(2.75rem,7vw,5rem)] font-bold leading-none tracking-tight text-white">
            {label}
          </div>
        </div>
      </div>
    );
  };

  const renderOrangeCenteredContent = (sectionId: string) => {
    const label = links.find((l) => l.sectionId === sectionId)?.label ?? "Page";
    return (
      <div className="text-center">
        <div className="text-[clamp(2.75rem,7vw,5rem)] font-bold leading-none tracking-tight text-white">
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Orange menu only on pink layer: grows from its top-right corner toward bottom-left */}
      {menuMounted && (
        <div
          className={`fixed right-0 bottom-0 left-[36px] top-[2.25rem] z-[60] overflow-hidden sm:left-[56px] sm:top-[3.5rem] ${
            menuClosing ? "layer-menu-l-close" : "layer-menu-l-open"
          }`}
          style={{
            backgroundColor: ORANGE,
            outline: "none",
          }}
          aria-label="Menu"
          onAnimationEnd={onMenuAnimationEnd}
        >
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
            <span
              className="absolute left-0 right-0 top-0"
              style={{ height: DEBUG_BORDER, backgroundColor: MENU_DEBUG_GRAY }}
            />
            <span
              className="absolute bottom-0 left-0 right-0"
              style={{ height: DEBUG_BORDER, backgroundColor: MENU_DEBUG_GRAY }}
            />
            <span
              className="absolute bottom-0 left-0 top-0"
              style={{ width: DEBUG_BORDER, backgroundColor: MENU_DEBUG_GRAY }}
            />
            <span
              className="absolute bottom-0 right-0 top-0"
              style={{ width: DEBUG_BORDER, backgroundColor: MENU_DEBUG_GRAY }}
            />
          </div>
          {/* Box at top-left of (overlaid) pink layer — same magenta as pink layer */}
          {menuCornerVisible && (
            <div
              className="absolute left-0 top-0 z-[3] flex h-16 w-16 shrink-0 items-center justify-center text-lg font-semibold text-white sm:h-[4.5rem] sm:w-[4.5rem] sm:text-xl"
              style={{ backgroundColor: MAGENTA }}
              aria-hidden
            >
            </div>
          )}
          <div className="relative z-[2] flex h-full min-h-0 flex-col overflow-auto px-5 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10">
            <nav className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center pl-8 sm:pl-12 md:pl-20 lg:pl-28" aria-label="Primary">
              {links.map((item) => {
                const active = item.sectionId === activeSectionId;
                return (
                  <button
                    key={item.sectionId}
                    type="button"
                    className={`group relative block w-full overflow-hidden border-b border-white/35 py-4 text-left transition-colors sm:py-5 ${
                      active ? "text-white" : "text-white/55"
                    }`}
                    onClick={() => selectNavSection(item.sectionId, item.href, item.label)}
                    disabled={transitionBusy}
                  >
                    <span className="flex items-end justify-between gap-6 pb-3">
                      <span className="block pl-4 sm:pl-6 md:pl-8">
                        <Typography
                          variant="display-2xl"
                          className="!text-inherit normal-case leading-none tracking-tight md:!text-[4.25rem] lg:!text-[5.25rem]"
                        >
                          {item.label}
                        </Typography>
                      </span>
                      <span className="flex items-center self-center pr-1 text-[clamp(2.25rem,4vw,4rem)] leading-none text-white opacity-0 transition-all duration-300 ease-out translate-x-8 group-hover:translate-x-0 group-hover:opacity-100">
                        &rarr;
                      </span>
                    </span>
                    <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Fixed box at top-left of pink layer when closed — does not scroll */}
      {!(menuMounted && !menuClosing) && (
        <div
          className="fixed left-[36px] top-[2.25rem] z-[45] flex h-9 w-9 shrink-0 items-center justify-center text-xs font-semibold text-white sm:left-[56px] sm:top-[3.5rem] sm:h-[3.5rem] sm:w-[3.5rem] sm:text-lg"
          style={{ backgroundColor: MAGENTA }}
          aria-hidden
        >
          C
        </div>
      )}

      {/* Lavender → orange → pink (header + hero always mounted; menu overlays pink only when open) */}
      <div className="fixed inset-0 z-50" style={{ backgroundColor: LAVENDER }}>
            {/* Layer 1 (lavender): top band, no letters */}
            <div
              className="flex h-3 justify-end sm:h-6"
              style={{ backgroundColor: LAVENDER }}
              aria-hidden
            >
              {contactTopCap(contactCapShellClass)}
            </div>

            {/* Layer 2 (orange): contact bar on this strip */}
            <div
              className="min-w-0 ml-[18px] sm:ml-7"
              style={{ backgroundColor: ORANGE }}
            >
              <div className="relative flex h-6 shrink-0 items-stretch justify-end sm:h-8">
                {contactBar(contactBarShellClass)}
              </div>

              {/* Layer 3 (pink): inset from orange */}
              <div
                className="min-w-0 ml-[18px] sm:ml-7"
                style={{ backgroundColor: MAGENTA }}
              >
                <div
                  className={`relative h-[calc(100dvh-2.25rem)] overflow-x-hidden no-scrollbar sm:h-[calc(100dvh-3.5rem)] ${
                    pinkPhase === "idle" && orangePhase === "idle"
                      ? "overflow-y-auto"
                      : "overflow-hidden"
                  }`}
                  style={{ backgroundColor: MAGENTA }}
                >
                  {(orangeBgActive || orangePhase === "revealUp") && (
                    <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
                      <div
                        className={`absolute inset-0 ${orangePhase === "revealUp" ? "layer-orange-reveal-up" : ""}`}
                        style={{ backgroundColor: ORANGE }}
                        onAnimationEnd={orangePhase === "revealUp" ? onOrangeRevealUpEnd : undefined}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full max-w-3xl px-8">
                          {renderOrangeCenteredContent(visualSectionId)}
                        </div>
                      </div>
                    </div>
                  )}
                  {pinkPhase === "idle" && !(orangeBgActive || orangePhase === "revealUp") && (
                    <div key={visualSectionId} className="relative z-10 min-h-full">
                      {renderPinkSection(visualSectionId)}
                    </div>
                  )}
                  {pinkPhase === "wipeDown" && (
                    <div
                      className="layer-pink-wipe-down pointer-events-none absolute inset-0 z-[55]"
                      style={{ backgroundColor: MAGENTA }}
                      onAnimationEnd={onPinkWipeDownEnd}
                      aria-hidden
                    />
                  )}
                  {pinkPhase === "diagonalOut" && (
                    <div
                      className="layer-pink-diagonal-out pointer-events-none absolute inset-0 z-[55]"
                      style={{ backgroundColor: MAGENTA }}
                      onAnimationEnd={onPinkDiagonalOutEnd}
                      aria-hidden
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}
