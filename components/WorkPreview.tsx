import Image, { type StaticImageData } from "next/image";

type Props = { url: string; title: string; shot?: StaticImageData; label: string };

// Окно браузера с работой участника: скриншот, а если его нет — живое превью сайта.
// Превью рисуется в 2,5 раза шире окна и уменьшается, чтобы сайт показался в десктопной вёрстке.
// Оно только для просмотра: клики перехватывает ссылка поверх, сайт открывается в новой вкладке.
export default function WorkPreview({ url, title, shot, label }: Props) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-bg shadow-[0_40px_80px_-40px_rgb(164_71_28/0.45)]">
      <div className="flex h-10 items-center gap-2 border-b border-line bg-bg-elevated px-4">
        <span className="h-3 w-3 rounded-full bg-[#e8a29a]" />
        <span className="h-3 w-3 rounded-full bg-accent-soft" />
        <span className="h-3 w-3 rounded-full bg-[#a8d49a]" />
        <span className="ml-3 truncate rounded-full bg-bg px-3 py-1 text-xs text-muted">{host}</span>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label}: ${title}`} className="group relative block aspect-[16/10] bg-surface">
        {shot ? (
          <Image
            src={shot}
            alt={title}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            placeholder="blur"
            className="object-cover object-top transition-transform duration-700 ease-soft group-hover:scale-[1.02]"
          />
        ) : (
          <>
            {/* Подложка на случай, если сайт не даст себя встроить: название и адрес вместо пустого окна */}
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
              <span className="text-lg font-bold">{title}</span>
              <span className="text-sm text-muted">{host}</span>
            </span>
            <iframe
              src={url}
              title={`${label}: ${title}`}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
              className="pointer-events-none absolute top-0 left-0 h-[250%] w-[250%] origin-top-left scale-[0.4] border-0 bg-transparent"
            />
          </>
        )}
      </a>
    </div>
  );
}
