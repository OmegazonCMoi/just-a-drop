"use client";

import { useEffect, useRef } from "react";
import { Playfair } from "next/font/google";

const REVIEWS = [
  {
    name: "Léa Moreau",
    role: "First tattoo · Forearm",
    rating: 5,
    quote:
      "I was terrified of regretting it. Mira slowed everything down, redrew twice, and the linework still looks sharp a year later.",
    initials: "LM",
    tone: "#d9dce3",
  },
  {
    name: "Noah Petit",
    role: "Cover-up · Upper arm",
    rating: 5,
    quote:
      "Old flash buried under something I’d actually wear. Quiet room, steady hand, zero pressure to upsell a bigger piece.",
    initials: "NP",
    tone: "#e4ddd4",
  },
  {
    name: "Inès Rahmani",
    role: "Fine line · Collarbone",
    rating: 5,
    quote:
      "Delicate without disappearing. She marked the placement three times until it sat right with my neckline. Worth every euro.",
    initials: "IR",
    tone: "#d8e0d9",
  },
  {
    name: "Jules Bernard",
    role: "Blackwork · Back",
    rating: 4.5,
    quote:
      "Two sittings, crystal clear aftercare. The contrast holds — no muddy grey, no rushed fills. Studio feels like a private room.",
    initials: "JB",
    tone: "#e2d9e0",
  },
  {
    name: "Camille Ortiz",
    role: "Matching · Wrists",
    rating: 5,
    quote:
      "We wanted pieces that talk to each other, not twins. Mira got the balance immediately. Soft light, soft playlist, serious craft.",
    initials: "CO",
    tone: "#dde3ea",
  },
  {
    name: "Hugo Salvi",
    role: "Custom script · Hand",
    rating: 5,
    quote:
      "Appointment-only is real — one client, full attention. The lettering is clean enough that strangers ask who did it.",
    initials: "HS",
    tone: "#e8e4d8",
  },
] as const;

const playfair = Playfair({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i && rating < i + 1;
        return (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            aria-hidden
            className={filled || half ? "text-[#171717]" : "text-[#171717]/20"}
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${i})`}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  d="M12 3.2 14.9 9l6.4.9-4.6 4.5 1.1 6.4L12 17.8 6.2 20.8l1.1-6.4L2.7 9.9 9.1 9 12 3.2z"
                />
              </>
            ) : (
              <path
                fill="currentColor"
                d="M12 3.2 14.9 9l6.4.9-4.6 4.5 1.1 6.4L12 17.8 6.2 20.8l1.1-6.4L2.7 9.9 9.1 9 12 3.2z"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

function Card({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <article className="flex w-[min(320px,82vw)] shrink-0 flex-col gap-4 rounded-2xl border border-black/[0.035] bg-white p-5 shadow-[0_4px_14px_rgba(16,16,20,0.035)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold tracking-wide text-[#171717]/70"
            style={{ backgroundColor: review.tone }}
          >
            {review.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold tracking-[-0.01em] text-[#171717]">
              {review.name}
            </p>
            <p className="truncate text-[12.5px] text-[#171717]/45">{review.role}</p>
          </div>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="text-[13.5px] leading-relaxed text-[#171717]/62">
        “{review.quote}”
      </p>
    </article>
  );
}

export default function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | null>(null);
  const seqWidthRef = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    const seq = seqRef.current;
    if (!el || !seq) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      seqWidthRef.current = seq.getBoundingClientRect().width;
    };
    measure();

    const wrap = () => {
      const w = seqWidthRef.current;
      if (w <= 0) return;
      // Keep scroll inside the middle copy so both directions feel endless
      while (el.scrollLeft >= w * 2) el.scrollLeft -= w;
      while (el.scrollLeft < w) el.scrollLeft += w;
    };

    // Start on the middle sequence
    el.scrollLeft = seqWidthRef.current;

    let raf = 0;
    const speed = 0.55;

    const tick = () => {
      if (!pausedRef.current && !reduce) {
        el.scrollLeft += speed;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const pause = () => {
      pausedRef.current = true;
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };

    const scheduleResume = () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => {
        pausedRef.current = false;
      }, 1400);
    };

    const onScroll = () => {
      wrap();
    };

    const onWheel = () => {
      pause();
      scheduleResume();
    };

    const ro = new ResizeObserver(() => {
      const before = seqWidthRef.current;
      measure();
      if (before > 0) {
        const ratio = el.scrollLeft / before;
        el.scrollLeft = ratio * seqWidthRef.current;
      }
      wrap();
    });
    ro.observe(seq);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", pause);
    el.addEventListener("pointerup", scheduleResume);
    el.addEventListener("pointercancel", scheduleResume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", scheduleResume, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", scheduleResume);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("pointerup", scheduleResume);
      el.removeEventListener("pointercancel", scheduleResume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", scheduleResume);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", scheduleResume);
    };
  }, []);

  return (
    <section className="relative w-full bg-white pt-44 pb-32 md:pt-56 md:pb-44">
      <div className="mx-auto max-w-5xl px-10 text-center md:px-12">
        <h2 className={`${playfair.className} whitespace-nowrap text-[clamp(1.35rem,3.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.04em] text-[#171717]`}>
          Trusted by 1,000+ quiet commitments
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#171717]/55">
          See why first-timers and cover-ups keep the chair booked months ahead.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-5xl md:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-20"
        />

        <div
          ref={scrollerRef}
          className="cursor-grab overflow-x-auto py-6 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max">
            <div
              ref={seqRef}
              className="flex gap-4 pr-4 md:gap-5 md:pr-5"
            >
              {REVIEWS.map((review) => (
                <Card key={`a-${review.name}`} review={review} />
              ))}
            </div>
            <div className="flex gap-4 pr-4 md:gap-5 md:pr-5" aria-hidden>
              {REVIEWS.map((review) => (
                <Card key={`b-${review.name}`} review={review} />
              ))}
            </div>
            <div className="flex gap-4 pr-4 md:gap-5 md:pr-5" aria-hidden>
              {REVIEWS.map((review) => (
                <Card key={`c-${review.name}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
