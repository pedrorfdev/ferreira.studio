// impact.tsx
// Sticky scroll — textos trocam conforme scroll dentro do ProjectView
// IntersectionObserver com root = data-scroll-container
// Cada sentinel ocupa 100vh dentro do container de scroll
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ResultSection } from "@/types/project";

interface Props {
  section: ResultSection;
}

export function Impact({ section }: Props) {
  const metrics = section.metrics ?? [];
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    if (!metrics.length) return;

    // Aguarda o DOM estar montado para encontrar o scroll container
    const timer = setTimeout(() => {
      const scrollRoot = containerRef.current?.closest(
        "[data-scroll-container]",
      ) as Element | null;

      // Limpa observers anteriores
      observersRef.current.forEach((o) => o.disconnect());
      observersRef.current = [];

      sentinelRefs.current.forEach((el, i) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActive(i);
          },
          {
            root: scrollRoot ?? null,
            threshold: 0.5,
          },
        );
        obs.observe(el);
        observersRef.current.push(obs);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observersRef.current.forEach((o) => o.disconnect());
    };
  }, [metrics.length]);

  if (!metrics.length) return null;

  const current = metrics[active];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${metrics.length * 100}vh` }}
    >
      {/* Sentinels — um por métrica, cada um ocupa 100vh */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {metrics.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              sentinelRefs.current[i] = el;
            }}
            style={{ height: "100vh" }}
          />
        ))}
      </div>

      {/* Sticky display */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-(--color-accent)/15" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.label}
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -64 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-center px-8 max-w-4xl"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-(--color-text-tertiary) mb-12">
              {current.label}
            </p>
            <h2
              className="font-black tracking-[-0.06em] leading-none text-(--color-text-primary)"
              style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
            >
              {current.value}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 items-center">
          {metrics.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === active ? 24 : 6,
                opacity: i === active ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full bg-(--color-accent)"
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-(--color-accent)/15" />
      </div>
    </section>
  );
}
