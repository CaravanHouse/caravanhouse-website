import type { Dictionary } from "@/locales";

// Золотая бегущая строка: для кого мы делаем сайты. Список повторяется дважды — так лента идёт без шва.
export default function Marquee({ items }: { items: Dictionary["hero"]["audience"] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 pr-6 font-display text-base font-semibold whitespace-nowrap sm:text-lg">
          {item}
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="-mx-[5%] w-[110%] -rotate-1 overflow-hidden border-y border-accent-deep/30 bg-accent py-4 text-on-accent shadow-[0_18px_40px_-24px_rgb(143_91_0/0.6)]">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
