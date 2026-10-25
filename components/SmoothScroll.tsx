"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Плавная инерционная прокрутка колёсиком. На телефонах остаётся родная прокрутка (так быстрее и привычнее),
// при «уменьшить движение» Lenis не включается вовсе. Якоря (#prices и т.п.) — с отступом под шапку.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -80 } });
    return () => lenis.destroy();
  }, []);
  return null;
}
