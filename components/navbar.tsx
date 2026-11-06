"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Inter } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  Droplet,
  Heart,
  PenTool,
  RefreshCw,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const linkClass =
  "inline-flex items-center rounded-xl px-4.5 py-3 text-sm leading-none text-[#171717] transition-colors duration-500 hover:bg-[#efeff1]";

const useCases: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "First tattoo",
    description: "Calm consult, small placement, zero pressure.",
    icon: Sparkles,
  },
  {
    title: "Custom piece",
    description: "Your idea, drawn from scratch, inked once.",
    icon: PenTool,
  },
  {
    title: "Fine line",
    description: "Delicate work, clean detail, soft contrast.",
    icon: WandSparkles,
  },
  {
    title: "Blackwork",
    description: "Bold fills, heavy contrast, lasting presence.",
    icon: Droplet,
  },
  {
    title: "Cover-ups",
    description: "Old ink reworked into something you actually want.",
    icon: RefreshCw,
  },
  {
    title: "Matching / couples",
    description: "Two designs that talk to each other, not twins.",
    icon: Heart,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const panelId = useId();

  useGSAP(
    () => {
      const shell = shellRef.current;
      if (!shell) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(shell, { transformOrigin: "50% 0%" });
      gsap.to(chevronRef.current, {
        rotate: open ? 180 : 0,
        duration: reduceMotion ? 0 : 0.24,
        ease: "power2.out",
        overwrite: true,
      });

      if (!open) return;

      if (reduceMotion) {
        gsap.set(shell, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        shell,
        { autoAlpha: 0, y: -10, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.28,
          ease: "power3.out",
          overwrite: true,
        },
      );
    },
    { scope: navRef, dependencies: [open] },
  );

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      className={`${inter.className} absolute top-0 right-0 left-0 z-50 flex items-center justify-between p-10`}
    >
      <div className="flex items-center gap-10">
        <Link href="/" aria-label="Just a Drop" className="inline-flex">
          <Image
            src="/logo.svg"
            alt=""
            width={200}
            height={200}
            priority
            className="h-7 w-auto"
          />
        </Link>
        <div className="flex items-center gap-2">
          <div>
            <button
              type="button"
              className={`${linkClass} gap-1.5 ${open ? "bg-[#efeff1]" : ""}`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              Home
              <svg
                ref={chevronRef}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
                className="origin-center shrink-0"
              >
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              id={panelId}
              ref={panelRef}
              role="region"
              aria-label="Studio services"
              aria-hidden={!open}
              hidden={!open}
              className="absolute top-[calc(100%-1.75rem)] right-10 left-10 z-50"
            >
              <div
                ref={shellRef}
                className="rounded-2xl bg-white/95 p-5 shadow-[0_24px_70px_rgba(16,16,20,0.14)] ring-1 ring-black/5 backdrop-blur-md will-change-transform"
              >
                <p className="pb-4 text-[11px] font-medium tracking-[0.16em] text-[#171717]/40 uppercase">
                  Studio
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {useCases.map((item) => (
                    <Link
                      key={item.title}
                      href="/"
                      className="group/card relative flex min-h-40 flex-col justify-between rounded-xl bg-[#f3f4f6] p-5 transition-colors duration-300 hover:bg-[#eceef2]"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <item.icon
                          aria-hidden
                          size={22}
                          strokeWidth={1.5}
                          className="text-[#3d3d3d]"
                        />
                        <span
                          aria-hidden
                          className="inline-flex size-8 items-center justify-center rounded-full bg-[#e4e5e8] text-[#171717] opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
                        >
                          <ArrowRight size={14} strokeWidth={1.75} />
                        </span>
                      </div>
                      <span className="mt-8 block">
                        <span className="block text-[16px] font-medium tracking-[-0.01em] text-[#171717]">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[13.5px] leading-snug font-normal text-[#171717]/55">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="cursor-pointer rounded-2xl px-4 py-2 text-[#171717] transition-colors duration-500 hover:bg-[#efeff1]"
        >
          Portfolio
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-[18px] bg-[#171717] px-5 py-2.5 text-white transition-[background-color,transform] duration-500 hover:bg-[#2e2e2e] active:scale-[0.98]"
        >
          Book a session
        </button>
      </div>
    </nav>
  );
}
