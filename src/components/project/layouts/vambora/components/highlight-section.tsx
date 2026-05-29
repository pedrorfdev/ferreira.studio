import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

interface Props {
  eyebrow: string;
  headline: string;
  body: string;

  variant?: "default" | "accent" | "outline" | "glass";
}

export function HighlightSection({
  eyebrow,
  headline,
  body,
  variant = "default",
}: Props) {
  return (
    <section className="px-6 md:px-10">
      <div
        className={cn(
          `max-w-5xl mx-auto rounded-[32px] border overflow-hidden relative`,
          variant === "accent" &&
            `border-(--color-accent)/20 bg-(--color-accent-muted)`,
          variant === "outline" && `border-(--color-border) bg-transparent`,
          variant === "glass" && `border-white/10 bg-white/3 backdrop-blur-2xl`,
          variant === "default" &&
            `border-(--color-border) bg-(--color-bg-secondary)/70`,
        )}
      >
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 p-7 md:p-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-(--color-accent) mb-5">
              {eyebrow}
            </p>

            <h2
              className="
              text-3xl md:text-5xl
              tracking-tighter
              leading-[0.95]
              text-(--color-text-primary)
              max-w-xl
              "
            >
              {headline}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex items-center"
          >
            <p className="text-base md:text-lg leading-relaxed text-(--color-text-secondary)">
              {body}
            </p>
          </motion.div>
        </div>

        {variant === "accent" && (
          <div className="absolute inset-0 bg-(--color-accent)/5 blur-3xl pointer-events-none" />
        )}
      </div>
    </section>
  );
}
