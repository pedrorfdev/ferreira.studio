interface Props {
  eyebrow: string;
  title: string;
}

export function Header({ eyebrow, title }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-(--color-accent) font-medium">
        {eyebrow}
      </p>

      <h2
        className="
          text-3xl md:text-5xl
          tracking-[-0.07em]
          leading-[0.95]
          text-(--color-text-primary)
          max-w-lg
        "
      >
        {title}
      </h2>
    </div>
  );
}
