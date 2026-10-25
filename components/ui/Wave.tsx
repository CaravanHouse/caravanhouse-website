// Живая волна на стыке секций: два слоя одной волны медленно плывут в разные стороны.
// Путь периодичен по ширине 720, полоса вдвое шире экрана сдвигается на половину — без шва.
const path = "M0 40 C 180 0, 540 80, 720 40 C 900 0, 1260 80, 1440 40 L1440 100 L0 100 Z";

export default function Wave({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-12 overflow-hidden sm:h-20 ${flip ? "rotate-180" : ""} ${className}`}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="animate-wave-slow absolute bottom-0 left-0 h-full w-[200%] text-accent opacity-40">
        <path d={path} fill="currentColor" transform="translate(0 6)" />
      </svg>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="animate-wave absolute bottom-0 left-0 h-full w-[200%] text-accent">
        <path d={path} fill="currentColor" transform="translate(0 18)" />
      </svg>
    </div>
  );
}
