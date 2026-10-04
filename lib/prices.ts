// Цены «от» живут в одном месте — в конфигураторе (repo CaravanHouse/configurator, shared/pricing.ts).
// Сайт забирает их при сборке и обновляет раз в 5 минут (ISR), поэтому цены меняются только там.
export const CALC_URL = "https://calc.caravanhouse.uz";

export type StartingPriceId = "landing" | "bot" | "corporate" | "miniapp";
export interface Prices {
  prepaymentPercent: number;
  supportMonthlyFrom: number;
  starting: { id: StartingPriceId; from: number }[];
}

const PRICES_SCHEMA = 3;

const IDS: StartingPriceId[] = ["landing", "bot", "corporate", "miniapp"];

export async function getPrices(): Promise<Prices> {
  // ?v= — версия формата ответа: кэш fetch в Next.js привязан к URL, и после смены формата
  // (новое поле) старый ответ из кэша иначе мог бы прийти при сборке. Меняйте при изменении API.
  const res = await fetch(`${CALC_URL}/api/prices?v=${PRICES_SCHEMA}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Не удалось получить цены: ${CALC_URL}/api/prices?v=${PRICES_SCHEMA} → ${res.status}`);
  const data = (await res.json()) as Partial<Prices>;
  const starting = IDS.map((id) => {
    const from = data.starting?.find((p) => p.id === id)?.from;
    // Лучше упасть при сборке, чем показать клиенту неверную цену: прошлая версия сайта останется в работе
    if (typeof from !== "number" || from <= 0) throw new Error(`В ответе /api/prices нет цены для «${id}»`);
    return { id, from };
  });
  const prepaymentPercent = typeof data.prepaymentPercent === "number" ? data.prepaymentPercent : 50;
  const supportMonthlyFrom = data.supportMonthlyFrom;
  if (typeof supportMonthlyFrom !== "number" || supportMonthlyFrom <= 0) throw new Error("В ответе /api/prices нет цены поддержки");
  return { prepaymentPercent, supportMonthlyFrom, starting };
}

/** 1 500 000 → «1 500 000» с неразрывными пробелами */
export const formatSum = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, " ");
