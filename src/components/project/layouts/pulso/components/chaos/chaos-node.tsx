interface Props {
  x: number;
  y: number;
}

export function ChaosNode({ x, y }: Props) {
  return (
    <div
      className="
        absolute
        size-3
        rounded-full
        bg-(--color-accent)
      "
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    />
  );
}
