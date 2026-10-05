// /llms.txt — краткая справка о компании для ИИ-ассистентов (ChatGPT, Perplexity и т. п.), формат llmstxt.org.
// Цены — из калькулятора, как и на сайте.
import { CALC_URL, formatSum, getPrices } from "@/lib/prices";
import { contacts, SITE_URL } from "@/lib/site";

export const revalidate = 300;

export async function GET() {
  const { starting, prepaymentPercent, supportMonthlyFrom } = await getPrices();
  const price = (id: string) => formatSum(starting.find((p) => p.id === id)!.from).replace(/ /g, " ");
  const text = `# CaravanHouse

> IT-студия из Ташкента: Telegram-боты, веб-сайты, Telegram Mini Apps и мобильные приложения для малого и среднего бизнеса в Узбекистане. Сайт на русском и узбекском.

## Услуги и стартовые цены (сум)
- Лендинг — от ${price("landing")}
- Telegram-бот (Node.js + grammY) — от ${price("bot")}
- Корпоративный сайт (Next.js) — от ${price("corporate")}
- Telegram Mini App — от ${price("miniapp")}
- Мобильные приложения для iOS и Android — новое направление, цена после обсуждения задачи
- Под заказ: amoCRM, Bitrix24, Eskiz SMS, доставка, ИИ-ассистент, оплата Click и Payme

Оплата: ${prepaymentPercent}% предоплата, ${100 - prepaymentPercent}% после сдачи. Первый месяц поддержки бесплатно, дальше от ${formatSum(supportMonthlyFrom).replace(/ /g, " ")} сум в месяц.
Код и домен после полной оплаты принадлежат клиенту. Работаем с 09:00 до 21:00 (Ташкент).

## Ссылки
- [Сайт (RU)](${SITE_URL}/ru)
- [Sayt (UZ)](${SITE_URL}/uz)
- [Калькулятор стоимости](${CALC_URL})
- [Оставить заявку в Telegram](${contacts.telegramUrl})
- [Демо-проекты на GitHub](https://github.com/CaravanHouse)
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
