import { Montserrat } from "next/font/google";

// Фирменный шрифт CaravanHouse. Один экземпляр на весь сайт: layout, 404 и страница ошибки.
export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});
