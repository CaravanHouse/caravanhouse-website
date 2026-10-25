import eduShot from "@/public/projects/edu.jpg";

// Демо-сайты на Vercel, репозитории CaravanHouse/<name>-demo.
// Главный пример — учебный центр: на нём показываем, что получит клиент.
export const eduDemo = { url: "https://edu.caravanhouse.uz", shot: eduShot } as const;

// Другие наши сайты — маленькие ссылки под примером, чтобы было видно, что делаем не по одному шаблону
export const otherDemos = [
  { id: "clinic", url: "https://clinic.caravanhouse.uz" },
  { id: "store", url: "https://store.caravanhouse.uz" },
] as const;
