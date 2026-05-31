import { SpectrumBar } from "./spectrum-bar";

const bars = Array.from({ length: 70 });

export function OperationalSpectrum() {
  return (
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        gap-1
        opacity-40
      "
    >
      {bars.map((_, index) => (
        <SpectrumBar
          key={index}
          height={40 + Math.random() * 300}
          delay={index * 0.03}
        />
      ))}
    </div>
  );
}
