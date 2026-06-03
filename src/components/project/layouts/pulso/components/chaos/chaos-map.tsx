// chaos-map.tsx
// Scroll listener no data-scroll-container correto
// progress calculado relativo à posição do container dentro do scroll
// Sem useScroll/useTransform — direto via onScroll + useState
import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ChaosSection } from "@/types/projects/pulso";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  section: ChaosSection;
}

function buildPositions(count: number) {
  const golden = 137.508 * (Math.PI / 180);
  return Array.from({ length: count }, (_, i) => {
    const angle = i * golden;
    const r = 0.18 + ((i * 0.13) % 0.28);
    return {
      chaosX: 0.5 + Math.cos(angle) * r,
      chaosY: 0.5 + Math.sin(angle) * r * 0.65,
      specX: (i + 0.5) / count,
      specY: 0.5 + Math.sin((i / count) * Math.PI) * 0.15,
    };
  });
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function ChaosMap({ section }: Props) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollElRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const labels = section.items?.map((i: { title: string }) => i.title) ?? [];
  const positions = buildPositions(labels.length);

  const onScroll = useCallback(() => {
    const container = containerRef.current;
    const scrollEl = scrollElRef.current;
    if (!container || !scrollEl) return;

    // scrollTop do container de scroll
    const scrollTop = scrollEl.scrollTop;
    // offsetTop do nosso container relativo ao scrollEl
    const containerTop = container.offsetTop;
    const totalScroll = container.offsetHeight - scrollEl.clientHeight;

    const scrolled = scrollTop - containerTop;
    setProgress(Math.max(0, Math.min(1, scrolled / totalScroll)));
  }, []);

  useEffect(() => {
    // Aguarda montagem para encontrar o scroll container
    const timer = setTimeout(() => {
      const scrollEl = containerRef.current?.closest(
        "[data-scroll-container]",
      ) as HTMLElement | null;

      if (!scrollEl) return;
      scrollElRef.current = scrollEl;
      scrollEl.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }, 100);

    return () => {
      clearTimeout(timer);
      scrollElRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const expandP = ease(Math.max(0, Math.min(1, (progress - 0.1) / 0.35)));
  const convergeP = ease(Math.max(0, Math.min(1, (progress - 0.45) / 0.5)));

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas — tamanho e bordas interpolados via style direto (sem motion.animate para máxima responsividade) */}
        <div
          className="relative bg-(--color-bg-secondary) border border-(--color-border) overflow-hidden"
          style={{
            width: `${lerp(65, 100, expandP)}%`,
            height: `${lerp(60, 100, expandP)}%`,
            borderRadius: `${lerp(28, 0, expandP)}px`,
            transition: "none",
          }}
        >
          {/* Labels de fase */}
          <AnimatePresence mode="wait">
            {convergeP < 0.4 ? (
              <motion.div
                key="chaos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-8 left-8 z-20 max-w-sm"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) font-semibold mb-2">
                  {section.eyebrow ?? t.project.chaos}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-(--color-text-primary) leading-snug">
                  {section.headline}
                </h3>
                <p className="mt-3 text-sm text-(--color-text-secondary) leading-relaxed max-w-xs">
                  {section.body}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="synced"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) font-semibold">
                  {section.resolvedEyebrow ?? t.project.spectrum}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG com nós e linhas */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Linhas caóticas */}
            {labels.map((_, i) =>
              [i + 1, i + 2, i + 3]
                .filter((j) => j < labels.length)
                .map((j) => {
                  const a = positions[i];
                  const b = positions[j];
                  return (
                    <line
                      key={`c-${i}-${j}`}
                      x1={a.chaosX * 1000}
                      y1={a.chaosY * 600}
                      x2={b.chaosX * 1000}
                      y2={b.chaosY * 600}
                      stroke="var(--color-border)"
                      strokeWidth="1"
                      opacity={Math.max(0, 1 - convergeP * 2)}
                    />
                  );
                }),
            )}

            {/* Linhas spectrum */}
            {labels.map((_, i) => {
              if (i >= labels.length - 1) return null;
              const a = positions[i];
              const b = positions[i + 1];
              const x1 = lerp(a.chaosX, a.specX, convergeP) * 1000;
              const y1 = lerp(a.chaosY, a.specY, convergeP) * 600;
              const x2 = lerp(b.chaosX, b.specX, convergeP) * 1000;
              const y2 = lerp(b.chaosY, b.specY, convergeP) * 600;
              return (
                <line
                  key={`s-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  opacity={convergeP}
                />
              );
            })}

            {/* Nós */}
            {labels.map((label, i) => {
              const pos = positions[i];
              const cx = lerp(pos.chaosX, pos.specX, convergeP) * 1000;
              const cy = lerp(pos.chaosY, pos.specY, convergeP) * 600;
              const r = lerp(5, 4, convergeP);
              return (
                <g key={label}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r * 3.5}
                    fill="var(--color-accent)"
                    opacity={0.08 + convergeP * 0.1}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="var(--color-accent)"
                    opacity={0.7 + convergeP * 0.3}
                  />
                  <text
                    x={cx}
                    y={cy - r - 7}
                    textAnchor="middle"
                    fill="var(--color-text-secondary)"
                    fontSize="11"
                    opacity={Math.max(0.25, convergeP)}
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, transparent 45%, var(--color-bg-secondary) 100%)`,
              opacity: lerp(0.8, 0.3, expandP),
            }}
          />
        </div>

        {/* Scroll hint */}
        <AnimatePresence>
          {progress < 0.06 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="w-px h-10 bg-linear-to-b from-(--color-accent) to-transparent mx-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
