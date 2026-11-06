"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Artist() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bits = root.querySelectorAll("[data-reveal]");
      const media = root.querySelectorAll("[data-media]");

      if (reduce) {
        gsap.set(bits, { autoAlpha: 1, y: 0 });
        gsap.set(media, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(bits, { autoAlpha: 0, y: 28 });
      gsap.set(media, { autoAlpha: 0, y: 48, scale: 1.04 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(media, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.15,
        stagger: 0.14,
        ease: "power3.out",
      }).to(
        bits,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        },
        0.2,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white px-10 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-end gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Media stack */}
        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
          <div
            data-media
            className="squircle relative aspect-[4/5] w-[86%] overflow-hidden rounded-[40px] bg-[#ececee] md:rounded-[48px]"
          >
            <Image
              src="/body/shoulder-v2.jpg"
              alt="Mira Chen at work on a shoulder piece"
              fill
              sizes="(max-width: 1024px) 80vw, 42vw"
              className="object-cover grayscale contrast-[1.05] brightness-[0.88]"
              priority
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5"
            />
          </div>

          <div
            data-media
            className="squircle absolute right-0 bottom-[-8%] aspect-[5/6] w-[44%] overflow-hidden rounded-[28px] bg-[#e4e4e8] shadow-[0_24px_60px_rgba(16,16,20,0.14)] md:bottom-[-6%] md:rounded-[36px]"
          >
            <Image
              src="/body/hand-v2.jpg"
              alt="Close detail of Mira’s fine-line work"
              fill
              sizes="(max-width: 1024px) 40vw, 20vw"
              className="object-cover grayscale contrast-[1.08] brightness-[0.82]"
            />
          </div>

          <p
            data-reveal
            className="mt-16 text-[12px] tracking-[0.18em] text-[#171717]/35 uppercase md:mt-20"
          >
            Est. 2017 · Paris 11e
          </p>
        </div>

        {/* Copy */}
        <div className="pb-2 lg:pb-8">
          <h2
            data-reveal
            className="mt-5 text-[clamp(3rem,7vw,5.5rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-[#171717]"
          >
            Mira
            <span className="mt-1 block text-[#171717]/32">Chen</span>
          </h2>
          <p
            data-reveal
            className="mt-5 text-[15px] text-[#171717]/55"
          >
            Fine line & blackwork
          </p>

          <p
            data-reveal
            className="mt-10 max-w-md text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.45] font-medium tracking-[-0.02em] text-[#171717]"
          >
            I draw what stays quiet on the skin — small commitments, heavy
            contrast, lines that still feel honest ten years later.
          </p>

          <div
            data-reveal
            className="mt-8 max-w-md space-y-4 text-[15px] leading-relaxed text-[#171717]/58"
          >
            <p>
              Eight years in the chair. No flash sheets, no rushing the consult.
              Every piece starts as a conversation — then a drawing that didn’t
              exist before you walked in.
            </p>
            <p>
              Appointment-only. One client at a time. Soft light, clean room,
              and enough silence to hear the machine.
            </p>
          </div>

          <div data-reveal className="mt-11 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex cursor-pointer items-center rounded-full bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition-[background-color,transform] duration-300 hover:bg-[#2e2e2e] active:scale-[0.98]"
            >
              Book with Mira
            </Link>
            <Link
              href="/"
              className="inline-flex cursor-pointer items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#171717] transition-colors duration-300 hover:bg-[#efeff1]"
            >
              Studio note
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
