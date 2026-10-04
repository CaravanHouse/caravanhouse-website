import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 select-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent shadow-[0_0_0_1px_rgb(255_210_122/0.4)_inset,0_10px_40px_-10px_rgb(246_183_60/0.6)] hover:bg-accent-soft hover:shadow-[0_0_0_1px_rgb(255_210_122/0.6)_inset,0_14px_50px_-10px_rgb(246_183_60/0.8)]",
  secondary: "border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.07]",
  // золотой контур — второстепенная, но заметная кнопка (подписка на канал)
  outline: "border border-accent/55 bg-accent/[0.07] text-accent-soft hover:border-accent hover:bg-accent/15 hover:text-accent",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
};

// Обычная ссылка <a>: все кнопки на сайте ведут либо в Telegram, либо на якоря.
export default function ButtonLink({
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
