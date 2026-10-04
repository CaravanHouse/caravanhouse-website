// Мягкое тёплое свечение за секцией. Чисто декоративное: скрыто от скринридеров и не ловит клики.
// Горизонтальный вылет за экран обрезает overflow-x-clip на <body>.
export default function Glow({ className = "", strong = false }: { className?: string; strong?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full blur-[120px] ${strong ? "bg-accent/25" : "bg-accent/[0.17]"} ${className}`}
    />
  );
}
