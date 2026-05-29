import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  why: string;
  trade?: string;
  decisionLabel: string;
  tradeoffLabel: string;
}

export function DecisionAccordion({
  title,
  why,
  trade,
  decisionLabel,
  tradeoffLabel,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        rounded-3xl
        border border-(--color-border)
        bg-(--color-bg-secondary)/85
        backdrop-blur-xl
        overflow-hidden
      "
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base md:text-lg text-(--color-text-primary)">
          {title}
        </span>

        <ChevronDown
          className={`
            w-4 h-4
            text-(--color-text-secondary)
            transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.28 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-(--color-accent) mb-3">
              {decisionLabel}
            </p>

            <p className="leading-relaxed text-(--color-text-secondary)">
              {why}
            </p>
          </div>

          {trade && (
            <div className="pt-5 border-t border-(--color-border-subtle)">
              <p className="text-xs uppercase tracking-[0.18em] text-(--color-gold) mb-3">
                {tradeoffLabel}
              </p>

              <p className="leading-relaxed text-(--color-text-secondary)">
                {trade}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
