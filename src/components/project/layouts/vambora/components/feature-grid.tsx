import { motion } from "framer-motion";
import { Clock, Code2, Globe, Map, Users, Wallet } from "lucide-react";

import type { FeatureItem } from "@/types/projects/vambora";

import { cn } from "@/lib/cn";

const ITEM_ICONS = [Map, Clock, Wallet, Users, Globe, Code2];

interface Props {
  headline?: string;
  items: FeatureItem[];
}

export function FeatureGrid({ headline, items }: Props) {
  return (
    <section className="px-8 md:px-16 mb-28 max-w-6xl mx-auto w-full">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.18em] text-(--color-accent)">
          Solution
        </span>

        {headline && (
          <h2 className="mt-4 text-3xl md:text-5xl tracking-tighter leading-none text-(--color-text-primary) max-w-3xl">
            {headline}
          </h2>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => {
          const Icon = ITEM_ICONS[i % ITEM_ICONS.length];

          const featured = i === 0;

          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl",
                featured
                  ? "bg-linear-to-br from-(--color-accent) to-(--color-accent-hover) border-(--color-accent)"
                  : "bg-(--color-bg-secondary)/80 border-(--color-border)",
              )}
            >
              {featured && (
                <div className="absolute inset-0 bg-white/10 blur-3xl" />
              )}

              <div className="relative">
                <div
                  className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center mb-6",
                    featured ? "bg-white/15" : "bg-(--color-accent-muted)",
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      featured ? "text-white" : "text-(--color-accent)",
                    )}
                  />
                </div>

                <h3
                  className={cn(
                    "text-base font-medium mb-3",
                    featured ? "text-white" : "text-(--color-text-primary)",
                  )}
                >
                  {item.title}
                </h3>

                <p
                  className={cn(
                    "text-sm md:text-[15px] leading-relaxed",
                    featured
                      ? "text-white/90"
                      : "text-(--color-text-secondary)",
                  )}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
