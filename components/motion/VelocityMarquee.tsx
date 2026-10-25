"use client";

import { m, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Бегущая строка, которая ускоряется при прокрутке и меняет направление, когда листают вверх
export default function VelocityMarquee({ children, baseVelocity = -2, className = "" }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    base.set(base.get() + move);
  });

  return (
    <div className={`overflow-hidden ${className}`}>
      <m.div className="flex w-max" style={{ x }}>
        {children}
        <div aria-hidden="true" className="flex">
          {children}
        </div>
      </m.div>
    </div>
  );
}
