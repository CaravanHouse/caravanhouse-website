import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "ink";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 select-none active:scale-[0.98]";

const variants: Record<Variant, string> = {
  // золото — главное действие
  primary: "bg-accent text-on-accent hover:bg-accent-soft",
  // контур цвета текста — второе действие (на светлом и тёмном фоне)
  secondary: "border border-fg/20 text-fg hover:border-fg/45 hover:bg-fg/[0.04]",
  // золотой контур — подписка на канал
  outline: "border border-accent/60 text-accent-ink hover:border-accent hover:bg-accent/10",
  ghost: "text-muted hover:text-fg",
  // графит — акцентный пакет на светлом фоне
  ink: "bg-fg text-bg hover:bg-fg/85",
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

// Обычная ссылка <a>: все кнопки на сайте ведут либо в Telegram, либо на якоря и демо.
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
