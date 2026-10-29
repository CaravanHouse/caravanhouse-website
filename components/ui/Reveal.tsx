"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
  // смещение по горизонтали при появлении (минус — слева)
  x?: number;
};

// Мягкое появление блока при прокрутке.
// Прячется только CSS-правилом `html.js .reveal` (класс `js` ставит скрипт в layout),
// поэтому в серверном HTML контент видим: роботы без JS и медленный интернет
// видят текст сразу. prefers-reduced-motion обрабатывается в globals.css.
export default function Reveal({ children, className, delay = 0, as = "div", x = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = as;
  const style = {
    "--reveal-x": `${x}px`,
    "--reveal-y": x ? "0px" : "36px",
    "--reveal-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <Component
      ref={ref as never}
      className={className ? `reveal ${className}` : "reveal"}
      style={style}
    >
      {children}
    </Component>
  );
}
