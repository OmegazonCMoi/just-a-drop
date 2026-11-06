"use client";

import { useRef } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type Cell = {
  src: string;
  alt: string;
  height: string;
};

/** Four columns — every src unique, no repeated grid */
const COLUMNS: Cell[][] = [
  [
    { src: "/body/forearm-v2.jpg", alt: "Fine-line forearm session", height: "h-72 md:h-[22rem]" },
    { src: "/gallery/g4.jpg", alt: "Artist focused on the machine", height: "h-52 md:h-60" },
    { src: "/body/hand-v2.jpg", alt: "Detailed hand tattoo", height: "h-64 md:h-72" },
    { src: "/gallery/g30.jpg", alt: "Ink and skin in soft light", height: "h-56 md:h-64" },
    { src: "/gallery/g20.jpg", alt: "Neon tattoo shop at night", height: "h-80 md:h-96" },
  ],
  [
    { src: "/body/upper-arm-v2.jpg", alt: "Upper arm floral piece", height: "h-96 md:h-[28rem]" },
    { src: "/body/wrist-v2.jpg", alt: "Wrist placement", height: "h-48 md:h-56" },
    { src: "/gallery/g12.jpg", alt: "Peony fine-line forearm", height: "h-72 md:h-80" },
    { src: "/body/thigh-v2.jpg", alt: "Thigh composition", height: "h-60 md:h-[17rem]" },
    { src: "/gallery/g33.jpg", alt: "Studio session detail", height: "h-72 md:h-80" },
  ],
  [
    { src: "/body/chest-v2.jpg", alt: "Chest piece in progress", height: "h-56 md:h-64" },
    { src: "/body/shoulder-v2.jpg", alt: "Shoulder canvas", height: "h-80 md:h-96" },
    { src: "/gallery/g21.jpg", alt: "Tattoo shop window flash", height: "h-52 md:h-60" },
    { src: "/body/collarbone-v2.jpg", alt: "Collarbone fine line", height: "h-56 md:h-64" },
    { src: "/gallery/g35.jpg", alt: "Portrait of healed work", height: "h-72 md:h-80" },
  ],
  [
    { src: "/body/back-v2.jpg", alt: "Large-scale back work", height: "h-72 md:h-80" },
    { src: "/salon/studio.jpg", alt: "Quiet one-chair studio", height: "h-80 md:h-96" },
    { src: "/gallery/g31.jpg", alt: "Needle close-up", height: "h-52 md:h-60" },
    { src: "/gallery/g32.jpg", alt: "Blackwork contrast", height: "h-64 md:h-72" },
    { src: "/gallery/g34.jpg", alt: "Aftercare light on fresh ink", height: "h-56 md:h-64" },
  ],
];

function MasonryGrid() {
  return (
    <div className="grid grid-cols-2 items-start gap-3 md:grid-cols-4 md:gap-4">
      {COLUMNS.map((col, colIndex) => {
        const fromBelow = colIndex % 2 === 0;
        return (
          <div key={`col-${colIndex}`} className="flex flex-col gap-3 md:gap-4">
            {col.map((cell) => (
              <div
                key={cell.src}
                data-gallery-item
                data-dir={fromBelow ? "up" : "down"}
                className={`relative w-full overflow-hidden rounded-2xl bg-[#e8e8ea] ${cell.height}`}
              >
                <div data-gallery-media className="absolute inset-0 h-full w-full">
                  <Image
                    src={cell.src}
                    alt={cell.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center grayscale contrast-[1.08] brightness-[0.9]"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = root.querySelectorAll<HTMLElement>("[data-gallery-item]");
      const medias = root.querySelectorAll<HTMLElement>("[data-gallery-media]");

      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0 });
        gsap.set(medias, { scale: 1 });
        return;
      }

      gsap.set(items, { opacity: 0 });
      gsap.set(medias, { scale: 1.06 });

      items.forEach((item) => {
        const up = item.dataset.dir === "up";
        const media = item.querySelector<HTMLElement>("[data-gallery-media]");

        gsap.fromTo(
          item,
          { opacity: 0, y: up ? 36 : -36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 93%",
              once: true,
            },
          },
        );

        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.06 },
            {
              scale: 1,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 93%",
                once: true,
              },
            },
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white px-4 pt-16 pb-24 md:px-8 md:pt-20 md:pb-32"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          className={`${playfair.className} mb-10 text-center text-[clamp(2.75rem,7vw,5rem)] font-semibold tracking-[-0.03em] text-[#171717] md:mb-12`}
        >
          Gallery
        </h2>
        <MasonryGrid />
      </div>
    </section>
  );
}
