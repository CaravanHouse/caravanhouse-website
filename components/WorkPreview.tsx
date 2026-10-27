import Image, { type StaticImageData } from "next/image";

type Props = { url: string; title: string; shot: StaticImageData; label: string };

// Окно браузера со скриншотом работы участника. По клику сайт открывается в новой вкладке.
// Живое превью во встроенном окне не используем: чужие сайты могут запрещать встраивание (так было с NEW ERA).
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
        <Image
          src={shot}
          alt={title}
          fill
          sizes="(min-width: 1024px) 720px, 100vw"
          placeholder="blur"
          className="object-cover object-top transition-transform duration-700 ease-soft group-hover:scale-[1.02]"
        />
      </a>
    </div>
  );
}
