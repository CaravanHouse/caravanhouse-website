"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

// Текст «как сейчас» зачёркивается золотой линией, когда блок доходит до экрана.
// Линия — фон строки (box-decoration-break: clone), поэтому работает и на тексте в несколько строк.
export default function StrikeText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <m.span
      className="bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-no-repeat [background-position:0_58%] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      initial={{ backgroundSize: "0% 3px" }}
      whileInView={{ backgroundSize: "100% 3px" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay: 0.3 + delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </m.span>
  );
}
