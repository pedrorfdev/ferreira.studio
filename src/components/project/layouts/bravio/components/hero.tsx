import type { BravioProject } from "@/types/projects/bravio";
import { motion } from "framer-motion";
interface Props {
  project: BravioProject;
}
export function Hero({ project }: Props) {
  return (
    <section className="relative px-6 md:px-10 pt-32 md:pt-44 pb-36">
      {" "}
      <div className="max-w-5xl mx-auto">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {" "}
          <p className="text-(--color-accent) uppercase tracking-[0.28em] text-xs mb-8 font-medium">
            {" "}
            Agricultural Operations Platform{" "}
          </p>{" "}
          <h1 className="text-6xl md:text-8xl tracking-[-0.08em] leading-none font-semibold">
            {" "}
            <span className="text-(--color-text-primary)">
              {" "}
              {project.title}{" "}
            </span>{" "}
          </h1>{" "}
          <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-(--color-text-secondary)">
            {" "}
            {project.tagline}{" "}
          </p>{" "}
          <div className="mt-14 flex flex-wrap gap-3">
            {" "}
            {project.tags.map((tag) => (
              <div
                key={tag}
                className=" px-4 py-2 rounded-full border border-(--color-border) bg-(--color-bg-secondary) text-sm text-(--color-text-secondary) "
              >
                {" "}
                {tag}{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </motion.div>{" "}
      </div>{" "}
    </section>
  );
}
