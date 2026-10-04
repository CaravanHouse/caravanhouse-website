// Текущая версия сайта. Открытые вкладки сравнивают её со своей и предлагают обновиться (UpdateNotifier).
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { version: process.env.NEXT_PUBLIC_BUILD_ID ?? "dev" },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
