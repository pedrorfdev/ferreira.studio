interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function ChaosEdge({ x1, y1, x2, y2 }: Props) {
  return (
    <svg className="absolute inset-0">
      <line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke="currentColor"
        className="
          text-(--color-border)
        "
      />
    </svg>
  );
}
