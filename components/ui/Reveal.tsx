import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  // оставлено для совместимости вызовов; анимации появления при прокрутке убраны —
  // на странице один анимированный момент (расписание в hero)
  delay?: number;
  as?: "div" | "li" | "article";
};

export default function Reveal({ children, className, as = "div" }: Props) {
  const Component = as;
  return <Component className={className}>{children}</Component>;
}
