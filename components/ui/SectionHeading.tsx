import WordReveal from "../motion/WordReveal";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeading({ id, title, subtitle, className = "" }: Props) {
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${className}`}>
      <h2 id={id} className="font-display text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.75rem]">
        <WordReveal text={title} />
      </h2>
      {subtitle ? <p className="max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
