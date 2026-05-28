interface Props {
  children: React.ReactNode;
}

export function Eyebrow({ children }: Props) {
  return (
    <p className="text-[11px] uppercase tracking-[0.22em] text-(--color-accent) font-medium">
      {children}{" "}
    </p>
  );
}
