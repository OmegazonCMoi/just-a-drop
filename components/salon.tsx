"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FACTS = [
  { label: "Chair", value: "One" },
  { label: "Clients / day", value: "2–3" },
  { label: "Music", value: "Soft / none" },
  { label: "Walk-ins", value: "Never" },
] as const;

export default function Salon() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const image = imageRef.current;
      const veil = veilRef.current;
      const title = titleRef.current;
      if (!section || !stage || !image || !veil || !title) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bits = stage.querySelectorAll("[data-reveal]");

      if (reduce) {
        gsap.set([image, veil, title, bits], { clearProps: "all" });
        section.style.height = "auto";
        return;
      }

      gsap.set(image, { scale: 1.18 });
      gsap.set(veil, { opacity: 0.72 });
      gsap.set(title, { y: 80, opacity: 0 });
      gsap.set(bits, { y: 28, opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.05,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(title, { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }, 0)
        .to(image, { scale: 1, duration: 0.85, ease: "none" }, 0)
        .to(veil, { opacity: 0.45, duration: 0.45, ease: "none" }, 0.05)
        .to(
          bits,
          { y: 0, opacity: 1, duration: 0.22, stagger: 0.04, ease: "power2.out" },
          0.28,
        )
        .to({}, { duration: 0.2 }, 0.75);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0b0b0c]"
      style={{ height: "260vh" }}
    >
      <div
        ref={stageRef}
        className="relative flex h-screen w-full flex-col justify-end overflow-hidden"
      >
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/salon/studio.jpg"
            alt="Just a Drop tattoo salon — one chair, soft daylight"
            fill
            sizes="100vw"
            className="object-cover contrast-[1.02] brightness-[0.72]"
            priority
          />
        </div>
        <div
          ref={veilRef}
          aria-hidden
          className="absolute inset-0 bg-[#0b0b0c]"
          style={{ opacity: 0.72 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 px-10 pt-16 pb-12 md:px-12 md:pb-14">
          <h2
            ref={titleRef}
            className="mt-5 max-w-[10ch] text-[clamp(3.25rem,10vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-white"
          >
            One chair.
            <span className="mt-1 block text-white/40">Full attention.</span>
          </h2>

          <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
            <p
              data-reveal
              className="max-w-md text-[15px] leading-relaxed text-white/60"
            >
              A quiet room in the 11th — daylight when we can get it, lamps when
              we can’t. No waiting lounge circus. You arrive, we work, you leave
              with something that belongs on you.
            </p>

            <dl
              data-reveal
              className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4 lg:gap-x-12"
            >
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] tracking-[0.16em] text-white/35 uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-[17px] font-medium tracking-[-0.02em] text-white">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            data-reveal
            className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 md:mt-14 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-[15px] font-medium tracking-[-0.01em] text-white">
                18 rue Keller, 75011 Paris
              </p>
              <p className="mt-1 text-[13px] text-white/40">
                Tue–Sat · by appointment · metro Bastille / Voltaire
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex w-fit cursor-pointer items-center gap-3 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0b0b0c] transition-[background-color,transform] duration-300 hover:bg-white/90 active:scale-[0.98]"
            >
              Get the address
              <span
                aria-hidden
                className="inline-flex size-7 items-center justify-center rounded-full bg-black/8 text-[15px]"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
