interface Props {
  x: number;
  y: number;
  label: string;
}

export function ChaosNode({ x, y, label }: Props) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        r="10"
        className="
          fill-(--color-pulso-primary)
        "
      />

      <text
        y="-18"
        textAnchor="middle"
        className="
          fill-(--color-text-secondary)
          text-xs
        "
      >
        {label}
      </text>
    </g>
  );
}
