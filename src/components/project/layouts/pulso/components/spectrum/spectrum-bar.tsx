interface Props {
  value: number;
}

export function SpectrumBar({ value }: Props) {
  const opacity = 0.55 + value * 0.45;
  const glow = Math.round(value * 14);

  return (
    <div
      className="flex-1 rounded-full"
      style={{
        height: `${value * 100}%`,
        background: `linear-gradient(
          to top,
          var(--color-accent),
          color-mix(in oklch, var(--color-accent) 55%, var(--color-text-primary)),
          var(--color-text-primary)
        )`,
        opacity,
        boxShadow: `0 0 ${glow}px color-mix(in oklch, var(--color-accent) 45%, transparent)`,
      }}
    />
  );
}
