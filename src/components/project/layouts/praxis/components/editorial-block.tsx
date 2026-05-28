import { Eyebrow } from "./eyebrow";

interface Props {
  eyebrow: string;
  headline: string;
  body?: string;
  bottomSpacing?: boolean;
}

export function EditorialBlock({
  eyebrow,
  headline,
  body,
  bottomSpacing = false,
}: Props) {
  return (
    <section className={bottomSpacing ? "pb-32" : ""}>
      {" "}
      <div className="space-y-6">
        {" "}
        <Eyebrow>{eyebrow} </Eyebrow>
        <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.05] text-white max-w-2xl">
          {" "}
          {headline}{" "}
        </h2>
        {body && (
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
