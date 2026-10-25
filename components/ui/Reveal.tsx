"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
  // смещение по горизонтали при появлении (минус — слева)
  x?: number;
};

// Мягкое появление блока при прокрутке. Для prefers-reduced-motion
// MotionConfig (см. MotionProvider) отключает смещение — остаётся только прозрачность.
export default function Reveal({ children, className, delay = 0, as = "div", x = 0 }: Props) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: x ? 0 : 36, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
