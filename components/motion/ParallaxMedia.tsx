"use client";

import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Картинка внутри рамки едет медленнее рамки (эффект «окна»). Рамка обрезает края, картинка чуть увеличена.
export default function ParallaxMedia({ children, offset = 40, className = "" }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [-offset, offset]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <m.div className="absolute -inset-y-[12%] inset-x-0" style={reduce ? undefined : { y }}>
        {children}
      </m.div>
    </div>
  );
}
