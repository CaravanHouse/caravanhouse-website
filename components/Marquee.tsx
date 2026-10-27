import VelocityMarquee from "./motion/VelocityMarquee";

type Props = { items: string[]; variant?: "gold" | "soft"; reverse?: boolean };

const star = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
    <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
  </svg>
);

// Бегущая строка: идёт сама, ускоряется при прокрутке и разворачивается, когда листают вверх.
// gold — золотая лента «для кого», soft — светлая лента с преимуществами, идёт в другую сторону.
export default function Marquee({ items, variant = "gold", reverse = false }: Props) {
  const tone =
    variant === "gold"
      ? "-rotate-1 border-y border-accent-deep/30 bg-accent text-on-accent shadow-[0_18px_40px_-24px_rgb(164_71_28/0.6)]"
      : "rotate-1 border-y border-line bg-accent-wash text-accent-ink";
  return (
    <div className="overflow-x-clip py-3">
      <div className={`-mx-[5%] w-[110%] py-4 ${tone}`}>
        <VelocityMarquee baseVelocity={reverse ? 2 : -2}>
          <ul className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-6 pr-6 font-display text-base font-bold whitespace-nowrap sm:text-lg">
                {item}
                {star}
              </li>
            ))}
          </ul>
        </VelocityMarquee>
      </div>
    </div>
  );
}
