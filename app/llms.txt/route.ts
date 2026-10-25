// /llms.txt — краткая справка о компании для ИИ-ассистентов (ChatGPT, Perplexity и т. п.), формат llmstxt.org.
// Цены — из калькулятора, как и на сайте.
import { formatSum, getPrices } from "@/lib/prices";
import { contacts, SITE_URL } from "@/lib/site";

export const revalidate = 300;

export async function GET() {
  const { starting, prepaymentPercent, supportMonthlyFrom } = await getPrices();
  const price = (id: string) => formatSum(starting.find((p) => p.id === id)!.from).replace(/ /g, " ");
  const text = `# CaravanHouse

> Студия из Ташкента, которая делает сайты для учебных центров, языковых школ, репетиторов и онлайн-школ в Узбекистане: курсы и цены, расписание групп, тест уровня, запись на пробный урок, заявки администратору в Telegram. Сайты на русском и узбекском.

## Пакеты и стартовые цены (сум)
- Репетитор или мини-школа (одностраничный сайт) — от ${price("landing")}
- Учебный центр (многостраничный сайт: курсы, расписание, тест уровня) — от ${price("corporate")}
- Онлайн-школа (сайт с личным кабинетом и оплатой Click/Payme) — цена после обсуждения
- Дополнение: Telegram-бот записи и напоминаний — от ${price("bot")}

Оплата: ${prepaymentPercent}% предоплата, ${100 - prepaymentPercent}% после сдачи. Первый месяц поддержки бесплатно, дальше от ${formatSum(supportMonthlyFrom).replace(/ /g, " ")} сум в месяц.
Код и домен после полной оплаты принадлежат клиенту. Работаем с 09:00 до 21:00 (Ташкент).

## Пример
- [Демо-сайт учебного центра: курсы, тест уровня, расписание, запись на пробный, кабинет ученика](https://edu.caravanhouse.uz)
- Другие сайты: [клиника](https://clinic.caravanhouse.uz), [интернет-магазин](https://store.caravanhouse.uz)

## Ссылки
- [Сайт (RU)](${SITE_URL}/ru)
- [Sayt (UZ)](${SITE_URL}/uz)
- [Оставить заявку в Telegram](${contacts.telegramUrl})
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
