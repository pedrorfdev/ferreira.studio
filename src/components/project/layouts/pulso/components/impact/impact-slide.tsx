interface Props {
  label: string;
  value: string;
}

export function ImpactSlide({ label, value }: Props) {
  return (
    <div
      className="
        h-screen
        sticky
        top-0
        flex
        items-center
        justify-center
      "
    >
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-(--color-text-secondary)">
          {label}
        </p>

        <h2
          className="
            mt-8
            text-7xl
            md:text-[10rem]
            font-black
            tracking-[-0.08em]
          "
        >
          {value}
        </h2>
      </div>
    </div>
  );
}
