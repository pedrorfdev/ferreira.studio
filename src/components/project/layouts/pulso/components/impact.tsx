// impact.tsx
// Slider simples — auto-rotate com pausa em hover, dots para troca manual.
// Sem scroll lock, sem IntersectionObserver, sem useScroll.
// Confiável em qualquer contexto.
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ResultSection } from "@/types/project";

interface Props {
  section: ResultSection;
}

const AUTO_INTERVAL = 5000; // ms

export function Impact({ section }: Props) {
  const metrics = section.metrics ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!metrics.length || paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % metrics.length);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [metrics.length, paused]);

  if (!metrics.length) return null;

  const current = metrics[active];

  return (
    <section
      className="h-[70vh] md:h-[80vh] w-full relative flex items-center justify-center overflow-hidden px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-(--color-accent)/15" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-(--color-accent)/15" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center text-center"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-(--color-accent) font-semibold mb-8">
            {current.label}
          </p>
          <p
            className="font-black tracking-[-0.04em] leading-none text-(--color-text-primary)"
            style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
          >
            {current.value}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots — controle manual, também pausa o autoplay ao interagir */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {metrics.map((metric, i) => (
          <button
            key={metric.label}
            onClick={() => {
              setActive(i);
              setPaused(true);
            }}
            aria-label={metric.label}
            className="p-1.5 -m-1.5 cursor-pointer"
          >
            <span
              className={`block rounded-full bg-(--color-accent) transition-all duration-300
                         ${i === active ? "w-6 h-1.5 opacity-100" : "w-1.5 h-1.5 opacity-30"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
