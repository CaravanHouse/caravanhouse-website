// Цены «от» живут в одном месте — в конфигураторе (repo CaravanHouse/configurator, shared/pricing.ts).
// Сайт забирает их при сборке и обновляет раз в час (ISR), поэтому цены меняются только там.
export const CALC_URL = "https://calc.caravanhouse.uz";

export type StartingPriceId = "landing" | "bot" | "corporate" | "miniapp";
export interface Prices {
  prepaymentPercent: number;
  starting: { id: StartingPriceId; from: number }[];
}

const IDS: StartingPriceId[] = ["landing", "bot", "corporate", "miniapp"];

export async function getPrices(): Promise<Prices> {
  const res = await fetch(`${CALC_URL}/api/prices`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Не удалось получить цены: ${CALC_URL}/api/prices → ${res.status}`);
  const data = (await res.json()) as Partial<Prices>;
  const starting = IDS.map((id) => {
    const from = data.starting?.find((p) => p.id === id)?.from;
    // Лучше упасть при сборке, чем показать клиенту неверную цену: прошлая версия сайта останется в работе
    if (typeof from !== "number" || from <= 0) throw new Error(`В ответе /api/prices нет цены для «${id}»`);
    return { id, from };
  });
  const prepaymentPercent = typeof data.prepaymentPercent === "number" ? data.prepaymentPercent : 50;
  return { prepaymentPercent, starting };
}

/** 1 500 000 → «1 500 000» с неразрывными пробелами */
export const formatSum = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, " ");
