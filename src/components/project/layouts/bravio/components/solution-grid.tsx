import { useI18n } from "@/lib/i18n-context";
import type { SolutionSection } from "@/types/projects/bravio";

import { Database, MapPinned, Smartphone, Wallet, WifiOff } from "lucide-react";

const ICONS = [MapPinned, Database, Wallet, WifiOff, Smartphone];

interface Props {
  section: SolutionSection;
}

export function SolutionGrid({ section }: Props) {
  const { t } = useI18n();
  return (
    <section className="space-y-12">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold)">
          {t.project.solution}
        </p>

        <h2 className="max-w-3xl text-3xl md:text-5xl tracking-[-0.06em] leading-[1.04] text-(--color-text-primary)">
          {section.headline}
        </h2>

        {section.body && (
          <p className="max-w-2xl text-lg leading-relaxed text-(--color-text-secondary)">
            {section.body}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {section.items?.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];

          return (
            <div
              key={item.title}
              className="
                relative overflow-hidden
                rounded-[28px]
                border border-(--color-border)
                bg-(--color-bg-secondary)
                p-7
              "
            >
              <div className="absolute inset-0 bg-linear-to-br from-(--color-project-glow) to-transparent opacity-40 pointer-events-none" />

              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-(--color-accent-muted) flex items-center justify-center mb-6">
                  <Icon size={18} className="text-(--color-gold)" />
                </div>

                <p className="text-base font-medium text-(--color-text-primary)">
                  {item.title}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-(--color-text-secondary)">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
