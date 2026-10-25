"use client";

import { m } from "framer-motion";

// Золотая линия, которая «дорисовывается» слева направо, когда доходит до экрана
export default function GrowLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`relative block h-1 overflow-hidden rounded-full bg-line ${className}`}>
      <m.span
        className="absolute inset-0 origin-left rounded-full bg-accent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </span>
  );
}
