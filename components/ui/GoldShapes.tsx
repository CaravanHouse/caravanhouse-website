import Parallax from "./Parallax";

// Декоративные золотые фигуры: каждая постоянно плавает или вращается (CSS) и ещё смещается при прокрутке (параллакс).
// Наборы заданы для конкретных секций, чтобы фигуры не перекрывали текст.
type Shape = "star" | "ring" | "dot" | "squiggle" | "pencil";
type Item = { shape: Shape; className: string; offset: number; rotate?: number; size: number; motion: "float" | "spin" | "bob" };

const sets: Record<string, Item[]> = {
  hero: [
    { shape: "star", className: "top-48 left-[47%]", offset: 70, rotate: 40, size: 28, motion: "spin" },
    { shape: "ring", className: "bottom-24 left-[4%]", offset: 140, size: 70, motion: "float" },
    { shape: "dot", className: "top-40 right-[6%]", offset: -80, size: 14, motion: "bob" },
    { shape: "squiggle", className: "bottom-10 right-[38%]", offset: 110, rotate: 12, size: 90, motion: "float" },
  ],
  site: [
    { shape: "star", className: "top-16 right-[8%]", offset: 120, rotate: 60, size: 36, motion: "spin" },
    { shape: "ring", className: "top-1/2 -left-6", offset: -100, size: 90, motion: "float" },
    { shape: "dot", className: "bottom-24 right-[30%]", offset: 80, size: 18, motion: "bob" },
  ],
  prices: [
    { shape: "pencil", className: "top-24 right-[6%]", offset: 100, rotate: 20, size: 80, motion: "float" },
    { shape: "star", className: "bottom-20 left-[3%]", offset: -120, rotate: 45, size: 30, motion: "spin" },
  ],
  process: [
    { shape: "squiggle", className: "top-14 right-[10%]", offset: 90, rotate: -10, size: 110, motion: "float" },
    { shape: "dot", className: "bottom-16 left-[20%]", offset: -70, size: 16, motion: "bob" },
  ],
  cta: [
    { shape: "star", className: "top-16 right-[46%]", offset: 80, rotate: 90, size: 34, motion: "spin" },
    { shape: "ring", className: "bottom-10 left-[38%]", offset: -90, size: 80, motion: "float" },
  ],
};

function Svg({ shape, size }: { shape: Shape; size: number }) {
  const common = { width: size, height: size, viewBox: "0 0 48 48", "aria-hidden": true as const };
  switch (shape) {
    case "star":
      return (
        <svg {...common}>
          <path d="M24 0l5.2 18.8L48 24l-18.8 5.2L24 48l-5.2-18.8L0 24l18.8-5.2z" fill="var(--color-accent)" />
        </svg>
      );
    case "ring":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="19" fill="none" stroke="var(--color-accent)" strokeWidth="4" strokeDasharray="6 7" />
        </svg>
      );
    case "dot":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="24" fill="var(--color-accent-deep)" />
        </svg>
      );
    case "squiggle":
      return (
        <svg width={size} height={size / 3} viewBox="0 0 120 40" aria-hidden="true">
          <path d="M4 28c12-20 22-20 32 0s20 20 32 0 22-20 32 0 12 8 16 4" fill="none" stroke="var(--color-accent)" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...common}>
          <g transform="rotate(-35 24 24)">
            <rect x="8" y="19" width="26" height="10" rx="2" fill="var(--color-accent)" />
            <rect x="4" y="19" width="6" height="10" rx="2" fill="var(--color-accent-deep)" />
            <path d="M34 19l10 5-10 5z" fill="#efcf9c" />
            <path d="M41 22.5l3 1.5-3 1.5z" fill="var(--color-fg)" />
          </g>
        </svg>
      );
  }
}

const motionClass = { float: "animate-float", spin: "animate-spin-slow", bob: "animate-bob" } as const;

export default function GoldShapes({ set, className = "" }: { set: keyof typeof sets; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden sm:block ${className}`}>
      {sets[set].map((item, i) => (
        <Parallax key={i} offset={item.offset} rotate={item.rotate} className={`absolute ${item.className}`}>
          <div className={motionClass[item.motion]} style={{ animationDelay: `${i * 0.7}s` }}>
            <Svg shape={item.shape} size={item.size} />
          </div>
        </Parallax>
      ))}
    </div>
  );
}
