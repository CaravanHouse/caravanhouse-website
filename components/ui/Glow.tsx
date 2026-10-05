// Мягкое тёплое свечение за секцией (утилита soft-glow — без тяжёлого blur). Скрыто от скринридеров и не ловит клики.
// Горизонтальный вылет за экран обрезает overflow-x-clip на <body>.
export default function Glow({ className = "", strong = false }: { className?: string; strong?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`soft-glow pointer-events-none absolute -z-10 ${strong ? "[--glow:rgb(246_183_60/0.25)]" : "[--glow:rgb(246_183_60/0.17)]"} ${className}`}
    />
  );
}
