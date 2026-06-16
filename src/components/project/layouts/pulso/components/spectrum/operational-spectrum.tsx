import { useSpectrum } from "./use-spectrum";
import { SpectrumBar } from "./spectrum-bar";

export function OperationalSpectrum() {
  const values = useSpectrum();

  return (
    <div
      className="
        absolute inset-0
        flex items-center
        justify-center
        pointer-events-none
      "
    >
      <div
        className="
          w-full
          h-[320px]
          flex
          items-end
          gap-1
          opacity-70
        "
      >
        {values.map((value, index) => (
          <SpectrumBar key={index} value={value} />
        ))}
      </div>
    </div>
  );
}
