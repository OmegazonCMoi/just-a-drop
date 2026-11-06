"use client";

import Iridescence from "@/components/Iridescence";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/*
        Soft edge is done IN the shader (softEdge) — CSS blur/mask on WebGL
        leaves hard cuts. No overflow clip on the blob itself.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-14%] right-[-10%] z-0 h-[105%] w-[68%] min-w-[360px]"
        style={{ transform: "rotate(-8deg) scale(1.12)" }}
      >
        <Iridescence
          speed={1}
          mouseReact={false}
          amplitude={0.28}
          warp={2.4}
          brightness={1.4}
          softEdge={0.62}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-10 pb-16 md:max-w-[46%] md:px-12 md:pb-20">
        <h1 className="text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-[#171717] text-balance">
          So, what are we getting tattooed today?
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#171717]/65">
          A drop of ink, a clean idea, and the room to make it yours.
        </p>
        <button
          type="button"
          className="mt-7 w-fit cursor-pointer rounded-full bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#2e2e2e]"
        >
          Book a consult
        </button>
      </div>
    </section>
  );
}
