"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PARTS = [
  { label: "Forearm", src: "/body/forearm-v2.jpg" },
  { label: "Upper arm", src: "/body/upper-arm-v2.jpg" },
  { label: "Wrist", src: "/body/wrist-v2.jpg" },
  { label: "Hand", src: "/body/hand-v2.jpg" },
  { label: "Chest", src: "/body/chest-v2.jpg" },
  { label: "Back", src: "/body/back-v2.jpg" },
  { label: "Shoulder", src: "/body/shoulder-v2.jpg" },
  { label: "Thigh", src: "/body/thigh-v2.jpg" },
  { label: "Collarbone", src: "/body/collarbone-v2.jpg" },
] as const;

function SectionTitle({ text }: { text: string }) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(root, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        root,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <h2
      ref={rootRef}
      className="w-fit text-[clamp(3.5rem,9vw,7rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-[#171717]"
    >
      {text}
    </h2>
  );
}

export default function BodyParts() {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const sync = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < max - 4);
    };

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      scrollTween.current?.kill();
    };
  }, []);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const gap = window.innerWidth >= 768 ? 20 : 16;
    const step = (card?.getBoundingClientRect().width ?? 280) + gap;
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(max, el.scrollLeft + dir * step));

    scrollTween.current?.kill();
    scrollTween.current = gsap.to(el, {
      scrollLeft: target,
      duration: 0.85,
      ease: "power3.inOut",
      overwrite: true,
    });
  };

  return (
    <section className="relative w-full bg-white pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="px-10 md:px-12">
        <SectionTitle text="Pick a canvas" />
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#171717]/60">
          The placements clients ask for most — from quiet first pieces to full commitments.
        </p>
      </div>

      <div className="mt-12 md:mt-16">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto px-10 md:gap-5 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PARTS.map((part) => (
            <article
              key={part.label}
              className="squircle relative h-[420px] w-[280px] shrink-0 overflow-hidden rounded-[42px] md:h-[460px] md:w-[300px] md:rounded-[48px]"
            >
              <Image
                src={part.src}
                alt={`${part.label} tattoo`}
                fill
                sizes="300px"
                className="object-cover grayscale contrast-[1.05] brightness-[0.82]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
                style={{
                  background:
                    "radial-gradient(120% 100% at 100% 100%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 38%, transparent 72%)",
                }}
              />
              <span className="absolute right-5 bottom-5 text-[15px] font-medium tracking-wide text-white">
                {part.label}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2.5 px-10 md:px-12">
          <button
            type="button"
            aria-label="Previous"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-[#e8e8ea] text-[#171717] transition-[background-color,transform,opacity] duration-300 ease-out hover:bg-[#dcdce0] active:scale-[0.96] disabled:cursor-default disabled:opacity-35 disabled:active:scale-100"
          >
            <ArrowLeft size={18} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-[#e8e8ea] text-[#171717] transition-[background-color,transform,opacity] duration-300 ease-out hover:bg-[#dcdce0] active:scale-[0.96] disabled:cursor-default disabled:opacity-35 disabled:active:scale-100"
          >
            <ArrowRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
