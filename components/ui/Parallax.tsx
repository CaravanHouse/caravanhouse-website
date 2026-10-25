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
};

// Слой параллакса: двигается со своей скоростью относительно прокрутки, с пружинным сглаживанием
export default function Parallax({ children, className = "", offset = 60, rotate = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [offset, -offset]);
  const r = useTransform(smooth, [0, 1], [-rotate, rotate]);

  return (
    <m.div ref={ref} className={className} style={reduce ? undefined : { y, rotate: rotate ? r : undefined }}>
      {children}
    </m.div>
  );
}
