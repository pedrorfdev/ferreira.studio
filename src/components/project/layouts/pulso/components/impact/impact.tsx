// impact.tsx — sticky scroll animation
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ResultSection } from "@/types/project";

interface Props {
  section: ResultSection;
}

export function Impact({ section }: Props) {
  const metrics = section.metrics ?? [];
  if (!metrics.length) return null;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} style={{ height: `${metrics.length * 100}vh` }} className="relative bg-(--color-bg-primary)">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {metrics.map((metric, i) => {
          const step = 1 / metrics.length;
          const start = i * step;
          const end = (i + 1) * step;
          const center = (start + end) / 2;
          
          // Entra de baixo (100%), fica no centro (0%), sai por cima (-100%)
          const y = useTransform(
            scrollYProgress,
            [start, center, end],
            ["100%", "0%", "-100%"]
          );
          
          // Fade in e out suave
          const opacity = useTransform(
            scrollYProgress,
            [start, start + step * 0.2, end - step * 0.2, end],
            [0, 1, 1, 0]
          );

          return (
            <motion.div
              key={metric.label}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              style={{ y, opacity }}
            >
              <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-(--color-accent) font-semibold mb-8">
                {metric.label}
              </p>
              <p
                className="font-black tracking-[-0.04em] leading-none text-(--color-text-primary)"
                style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
              >
                {metric.value}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
