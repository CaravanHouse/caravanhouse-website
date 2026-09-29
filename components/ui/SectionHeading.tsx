import Reveal from "./Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ id, eyebrow, title, subtitle, align = "left" }: Props) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
        <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? <p className="max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
