import type { ListSection } from "@/types/project";

import { motion } from "framer-motion";

import { Eyebrow } from "./eyebrow";

interface Props {
  section: ListSection;
}

export function Workflow({ section }: Props) {
  return (
    <section className="space-y-10">
      <Eyebrow>WORKFLOW</Eyebrow>

      <div className="space-y-5">
        <h2 className="text-3xl md:text-5xl tracking-[-0.06em] leading-[1.05] text-white max-w-2xl">
          {section.headline}
        </h2>

        {section.body && (
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            {section.body}
          </p>
        )}

        <div className="pt-8 space-y-5">
          {section.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.05,
                duration: 0.4,
              }}
              className="flex items-start gap-4 border-b border-white/6 pb-6"
            >
              <span className="text-(--color-accent) text-sm mt-1 font-medium">
                0{index + 1}
              </span>

              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
