import type { TimelineItem } from "@/types/projects/vambora";

import { SectionReveal } from "@/components/project/section-reveal";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n-context";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  items?: TimelineItem[];
}

export function Timeline({ items = [] }: Props) {
  const { lang } = useI18n();

  return (
    <section className="px-6 md:px-16 mb-32 max-w-5xl mx-auto w-full">
      <SectionReveal className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {lang === "pt" ? "Jornada do produto" : "Product journey"}
        </span>
      </SectionReveal>

      <div className="relative flex flex-col gap-10">
        <div className="absolute left-1/2 top-0 bottom-0 hidden md:block w-px border-l border-dashed border-(--color-border)" />

        {items.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <SectionReveal key={item.title} delay={i * 0.08}>
              <div className="md:grid md:grid-cols-[1fr_auto_1fr] flex flex-col gap-4 items-center">
                <div
                  className={cn("w-full", isLeft ? "md:block" : "md:invisible")}
                >
                  {isLeft && <Card item={item} featured={i === 0} />}
                </div>

                <div className="relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className={cn(
                      "w-11 h-11 rounded-full border flex items-center justify-center",
                      i === 0
                        ? "bg-(--color-accent) border-(--color-accent)"
                        : "bg-(--color-bg-secondary) border-(--color-border)",
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-bold",
                        i === 0 ? "text-(--color-text-inverse)" : "text-(--color-text-primary)",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                </div>

                <div
                  className={cn(
                    "w-full",
                    !isLeft ? "md:block" : "md:invisible",
                  )}
                >
                  {!isLeft && <Card item={item} />}
                </div>

                <div className="md:hidden w-full">
                  <Card item={item} compact />
                </div>
              </div>

              {i < items.length - 1 && (
                <motion.div
                  className="flex justify-center mt-3"
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                >
                  <ArrowRight
                    size={14}
                    className="rotate-90 text-(--color-accent)/40"
                  />
                </motion.div>
              )}
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}

function Card({
  item,
  featured,
  compact,
}: {
  item: TimelineItem;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all",
        compact ? "p-5" : "p-6",

        featured
          ? "bg-(--color-accent-muted) border-(--color-accent)/30"
          : "bg-(--color-bg-secondary) border-(--color-border)",
      )}
    >
      <h3 className="font-display text-lg font-semibold text-(--color-text-primary) leading-snug mb-3">
        {item.title}
      </h3>

      <p className="text-sm text-(--color-text-secondary) leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
