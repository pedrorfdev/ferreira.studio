interface Props {
  eyebrow: string;
  headline: string;
  body?: string;
}
export function EditorialBlock({ eyebrow, headline, body }: Props) {
  return (
    <section>
      {" "}
      <div className="space-y-7">
        {" "}
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
          {" "}
          {eyebrow}{" "}
        </p>{" "}
        <h2 className="max-w-3xl text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
          {" "}
          {headline}{" "}
        </h2>{" "}
        {body && (
          <p className="max-w-2xl text-lg leading-relaxed text-(--color-text-secondary)">
            {" "}
            {body}{" "}
          </p>
        )}{" "}
      </div>{" "}
    </section>
  );
}
