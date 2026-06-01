import { useEffect, useState } from "react";

export function useSpectrum(bars = 48) {
  const [values, setValues] = useState<number[]>(
    Array.from({ length: bars }, () => 0.5),
  );

  useEffect(() => {
    let frame = 0;

    const loop = () => {
      frame += 0.015;

      setValues(
        Array.from({ length: bars }, (_, index) => {
          return 0.5 + Math.sin(frame + index * 0.25) * 0.35;
        }),
      );

      requestAnimationFrame(loop);
    };

    loop();
  }, [bars]);

  return values;
}
