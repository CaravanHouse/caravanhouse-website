// Приём заявок из формы на сайте.
// Основной путь: пересылаем заявку боту @CaravanHousebot (Railway) — он сохраняет её в базу, держит лимит
// по IP и публикует карточку с голосованием в группе «Заказы».
// Запасной путь: если сервер бота не ответил, отправляем заявку в ту же группу напрямую через Telegram Bot API,
// чтобы она не потерялась. Если недоступно и это — пишем заявку в логи Vercel и просим клиента написать в Telegram.

const SERVICES = { bot: "Telegram-бот", site: "Сайт", miniapp: "Mini App", other: "Другое" } as const;
type Service = keyof typeof SERVICES;

interface Lead {
  name: string;
  contact: string;
  service: Service;
  message: string;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Лимит для запасного пути (основной лимит — в боте). В памяти одного инстанса, этого достаточно для аварийного режима.
const fallbackHits = new Map<string, number[]>();
function fallbackAllowed(ip: string) {
  const now = Date.now();
  const list = (fallbackHits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (list.length >= 5) return false;
  list.push(now);
  fallbackHits.set(ip, list);
  return true;
}

async function sendViaBot(lead: Lead, ip: string): Promise<Response | null> {
  const url = process.env.ORDER_BOT_URL;
  const secret = process.env.LEAD_SECRET;
  if (!url || !secret) return null;
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Lead-Secret": secret, "X-Client-IP": ip },
      body: JSON.stringify(lead),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => ({}))) as { id?: number; error?: string };
    if (res.ok) return Response.json({ ok: true, id: data.id ?? null });
    if (res.status === 400 || res.status === 429) return Response.json({ error: data.error ?? "bad_request" }, { status: res.status });
    console.error(`[lead] бот ответил ${res.status}, переключаюсь на запасной канал`);
  } catch (err) {
    console.error("[lead] бот недоступен, переключаюсь на запасной канал:", (err as Error).message);
  }
  return null;
}

async function sendDirectToTelegram(lead: Lead): Promise<boolean> {
  const token = process.env.ORDER_BOT_TOKEN;
  const chatId = process.env.ORDER_GROUP_ID;
  const threadId = process.env.ORDER_THREAD_ID;
  if (!token || !chatId) return false;
  const text =
    "⚠️ <b>Заявка с сайта — резервный канал</b>\n" +
    "Сервер бота не ответил: заявка <b>не сохранена в базе</b> и без голосования. Свяжитесь с клиентом вручную.\n\n" +
    `<b>Имя:</b> ${esc(lead.name)}\n<b>Контакт:</b> ${esc(lead.contact)}\n` +
    `<b>Услуга:</b> ${SERVICES[lead.service]}\n<b>Задача:</b> ${esc(lead.message || "—")}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", ...(threadId && { message_thread_id: Number(threadId) }) }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "bad_json" }, { status: 400 });

  // Ловушка для ботов: человек это поле не видит и не заполняет
  if (str(body.website, 200)) return Response.json({ ok: true, id: null });

  const service = (typeof body.service === "string" && body.service in SERVICES ? body.service : "other") as Service;
  const lead: Lead = { name: str(body.name, 60), contact: str(body.contact, 80), service, message: str(body.message, 1000) };
  if (lead.name.length < 2) return Response.json({ error: "name" }, { status: 400 });
  if (lead.contact.length < 5) return Response.json({ error: "contact" }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

  const viaBot = await sendViaBot(lead, ip);
  if (viaBot) return viaBot;

  if (!fallbackAllowed(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });
  if (await sendDirectToTelegram(lead)) return Response.json({ ok: true, id: null });

  // Последняя запись, чтобы заявку можно было найти в логах Vercel
  console.error("[lead] ЗАЯВКА НЕ ДОСТАВЛЕНА ни одним каналом:", JSON.stringify(lead));
  return Response.json({ error: "failed" }, { status: 502 });
}
