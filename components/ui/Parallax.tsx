"use client";

import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  // на сколько пикселей слой смещается за время, пока блок проходит через экран (минус — навстречу прокрутке)
  offset?: number;
  // дополнительный поворот слоя за тот же путь, в градусах
  rotate?: number;
  as?: "div" | "li";
};

// Слой параллакса: двигается со своей скоростью относительно прокрутки, с пружинным сглаживанием
export default function Parallax({ children, className = "", offset = 60, rotate = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Component = as === "li" ? m.li : m.div;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [offset, -offset]);
  const r = useTransform(smooth, [0, 1], [-rotate, rotate]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Component ref={ref as any} className={className} style={reduce ? undefined : { y, rotate: rotate ? r : undefined }}>
      {children}
    </Component>
  );
}
