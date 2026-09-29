import type { SVGProps } from "react";

// Фирменный «бумажный самолётик» Telegram (в lucide нет брендовых иконок).
export default function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M21.94 4.3a1.2 1.2 0 0 0-1.62-1.33L2.9 9.77c-1.2.47-1.14 2.2.09 2.58l4.37 1.36 1.66 5.28c.3.94 1.5 1.24 2.2.54l2.43-2.41 4.35 3.2c.8.59 1.95.15 2.16-.82l1.78-15.2Zm-4.3 3.37-7.3 6.63a.8.8 0 0 0-.25.48l-.36 2.63-1.1-3.67 8.53-6.34c.35-.26.8.16.48.27Z" />
    </svg>
  );
}
