// spectrum-bar.tsx — barra com cor accent em gradiente
interface Props {
  value: number;
}

export function SpectrumBar({ value }: Props) {
  return (
    <div
      className="flex-1 rounded-full"
      style={{
        height: `${value * 100}%`,
        background: `linear-gradient(
          to top,
          var(--color-accent),
          color-mix(in oklch, var(--color-accent) 50%, var(--color-text-primary)),
          var(--color-text-primary)
        )`,
        opacity: 0.45 + value * 0.55,
        boxShadow: `0 0 ${Math.round(value * 10)}px color-mix(in oklch, var(--color-accent) 35%, transparent)`,
      }}
    />
  );
}
