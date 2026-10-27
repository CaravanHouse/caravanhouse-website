"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Огромное контурное слово на фоне секции, которое едет вбок при прокрутке
export default function ParallaxWord({ text, from = "10%", to = "-30%", className = "" }: { text: string; from?: string; to?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-x-0 -z-10 overflow-hidden ${className}`}>
      <m.p
        style={reduce ? undefined : { x }}
        className="font-display text-[18vw] leading-none font-bold whitespace-nowrap text-transparent [-webkit-text-stroke:2px_rgb(238_167_42/0.4)] lg:text-[13rem]"
      >
        {text}
      </m.p>
    </div>
  );
}
