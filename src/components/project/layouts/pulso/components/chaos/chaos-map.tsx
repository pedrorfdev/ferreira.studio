// chaos-map.tsx
// Mobile: nós se alinham verticalmente (canvas estreito)
// Desktop: linha horizontal
// viewBox 0 0 100 100 — coordenadas em %
import { motion } from "framer-motion";
import type { ChaosSection } from "@/types/projects/pulso";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  section: ChaosSection;
}

const CHAOS_POS = [
  { x: 22, y: 28 },
  { x: 73, y: 22 },
  { x: 50, y: 52 },
  { x: 18, y: 68 },
  { x: 80, y: 48 },
  { x: 42, y: 76 },
  { x: 65, y: 70 },
  { x: 32, y: 44 },
];

// Desktop: linha horizontal no centro
function specPosDesktop(i: number, total: number) {
  return { x: ((i + 0.5) / total) * 100, y: 52 };
}

// Mobile: linha vertical no centro
function specPosMobile(i: number, total: number) {
  return { x: 50, y: ((i + 0.5) / total) * 90 + 5 };
}

function MapSVG({
  labels,
  isMobile,
  viewport,
}: {
  labels: string[];
  isMobile: boolean;
  viewport: { once: boolean; amount: number };
}) {
  const count = labels.length;
  const specPos = isMobile ? specPosMobile : specPosDesktop;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Linhas caóticas */}
      {labels.map((_, i) => {
        const a = CHAOS_POS[i % CHAOS_POS.length];
        const b = CHAOS_POS[(i + 3) % CHAOS_POS.length];
        return (
          <motion.line
            key={`cl-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--color-border)"
            strokeWidth="0.5"
            initial={{ opacity: 0.6 }}
            whileInView={{ opacity: 0 }}
            viewport={viewport}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
        );
      })}

      {/* Linhas spectrum */}
      {labels.map((_, i) => {
        if (i >= count - 1) return null;
        const a = specPos(i, count);
        const b = specPos(i + 1, count);
        return (
          <motion.line
            key={`sl-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--color-accent)"
            strokeWidth="0.6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.85 }}
            viewport={viewport}
            transition={{ delay: 1.2 + i * 0.06, duration: 0.35 }}
          />
        );
      })}

      {/* Nós */}
      {labels.map((label, i) => {
        const chaos = CHAOS_POS[i % CHAOS_POS.length];
        const spec = specPos(i, count);
        return (
          <g key={label}>
            {/* Glow */}
            <motion.circle
              r={2.8}
              fill="var(--color-accent)"
              initial={{ cx: chaos.x, cy: chaos.y, opacity: 0.1 }}
              whileInView={{ cx: spec.x, cy: spec.y, opacity: 0.18 }}
              viewport={viewport}
              transition={{
                delay: 1.0 + i * 0.07,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            {/* Nó */}
            <motion.circle
              r={1.4}
              fill="var(--color-accent)"
              initial={{ cx: chaos.x, cy: chaos.y, opacity: 0.5 }}
              whileInView={{ cx: spec.x, cy: spec.y, opacity: 1 }}
              viewport={viewport}
              transition={{
                delay: 1.0 + i * 0.07,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            {/* Label */}
            <motion.text
              fontSize="3.2"
              textAnchor="middle"
              fill="var(--color-text-secondary)"
              initial={{ x: chaos.x, y: chaos.y - 4.5, opacity: 0 }}
              whileInView={{ x: spec.x, y: spec.y - 4.5, opacity: 0.85 }}
              viewport={viewport}
              transition={{ delay: 1.15 + i * 0.07, duration: 0.5 }}
            >
              {label}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

export function ChaosMap({ section }: Props) {
  const { t } = useI18n();
  const labels = section.items?.map((i: { title: string }) => i.title) ?? [];
  const vp = { once: false, amount: 0.65 };

  return (
    <section className="h-dvh w-full flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ width: "65%", height: "60%", borderRadius: 28 }}
        whileInView={{ width: "100%", height: "100%", borderRadius: 0 }}
        viewport={vp}
        transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
        className="relative bg-(--color-bg-secondary) border border-(--color-border) overflow-hidden"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="absolute top-6 left-6 md:top-8 md:left-8 z-20 max-w-xs"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-(--color-accent) font-semibold mb-1.5">
            {section.eyebrow ?? t.project.chaos}
          </p>
          <h3 className="text-base md:text-xl font-bold text-(--color-text-primary) leading-snug">
            {section.headline}
          </h3>
          <p className="mt-2 text-xs md:text-sm text-(--color-text-secondary) leading-relaxed hidden md:block max-w-xs">
            {section.body}
          </p>
        </motion.div>

        {/* Desktop SVG — nós horizontais */}
        <div className="hidden md:block absolute inset-0">
          <MapSVG labels={labels} isMobile={false} viewport={vp} />
        </div>

        {/* Mobile SVG — nós verticais */}
        <div className="md:hidden absolute inset-0">
          <MapSVG labels={labels} isMobile={true} viewport={vp} />
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, var(--color-bg-secondary) 100%)",
          }}
        />
      </motion.div>
    </section>
  );
}
