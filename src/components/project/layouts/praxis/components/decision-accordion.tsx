import { useI18n } from "@/lib/i18n-context";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  why: string;
  trade?: string;
}

export function DecisionAccordion({ title, why, trade }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="border border-(--color-border-subtle) bg-(--color-bg-secondary)/50 backdrop-blur-xl rounded-3xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
      >
        <span className="text-(--color-text-primary) text-base md:text-lg">
          {title}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-(--color-text-tertiary) transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-5">
          <div>
            <p className="text-(--color-text-secondary) leading-relaxed">
              {why}
            </p>
          </div>

          {trade && (
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) mb-2">
                {t.project.tradeoff}
              </p>

              <p className="text-(--color-text-secondary) leading-relaxed">
                {trade}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
