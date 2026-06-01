interface Props {
  value: number;
}

export function SpectrumBar({ value }: Props) {
  return (
    <div
      className="
        flex-1
        rounded-full
        bg-linear-to-t
        from-(--color-pulso-primary)
        via-(--color-pulso-secondary)
        to-(--color-text-primary)
      "
      style={{
        height: `${value * 100}%`,
      }}
    />
  );
}
