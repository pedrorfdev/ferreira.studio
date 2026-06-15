// components/home/project-list.tsx
// Fix: WIP badge mais visível — cor accent em vez de gold, sem borda fina
import { cn } from "@/lib/cn";
import { slideUp, staggerContainer } from "@/lib/motion";
import { useAppStore } from "@/store/use-app-store";
import { motion } from "framer-motion";
import { projects, type AnyProject } from "@/data/projects";

interface ItemProps {
  project: AnyProject;
  index: number;
}

function ProjectItem({ project, index }: ItemProps) {
  const hoveredProject = useAppStore((s) => s.hoveredProject);
  const setHovered = useAppStore((s) => s.setHovered);
  const openProject = useAppStore((s) => s.openProject);

  const isHovered = hoveredProject?.id === project.id;
  const anyHovered = hoveredProject !== null;

  function handleOpen() {
    const el = document.querySelector(
      `[data-project-item="${project.id}"]`,
    ) as HTMLElement;
    if (!el) {
      openProject(project, {
        top: window.innerHeight * 0.4,
        left: window.innerWidth * 0.1,
        width: window.innerWidth * 0.8,
        height: 80,
      });
      return;
    }
    const rect = el.getBoundingClientRect();
    openProject(project, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }

  return (
    <motion.div
      variants={slideUp}
      data-project-item={project.id}
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => e.key === "Enter" && handleOpen()}
      onMouseEnter={() => setHovered(project)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex items-center gap-4 w-full select-none cursor-pointer",
        "py-4 md:py-3",
        index !== 0 && "border-t border-(--color-border-subtle)",
        "transition-opacity duration-300",
        anyHovered && !isHovered ? "opacity-25" : "opacity-100",
      )}
    >
      <span className="text-xs tabular-nums text-(--color-text-tertiary) w-5 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={cn(
          "font-display font-semibold tracking-[-0.02em] leading-none flex-1",
          "text-2xl md:text-3xl transition-colors duration-200",
          isHovered
            ? "text-(--color-text-primary)"
            : "text-(--color-text-secondary)",
        )}
      >
        {project.title}
      </span>

      {/* WIP badge — mais visível: bg accent, sem border */}
      {project.status === "in development" && (
        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1
                        bg-(--color-accent)/15 shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.12em] text-(--color-accent) font-semibold">
            WIP
          </span>
        </div>
      )}

      {/* Arrow hover — desktop */}
      <motion.span
        className="text-(--color-accent) text-sm leading-none shrink-0 hidden md:block"
        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
        transition={{ duration: 0.18 }}
        aria-hidden
      >
        →
      </motion.span>

      {/* Chevron mobile */}
      <span
        className="text-(--color-text-tertiary) text-xs md:hidden"
        aria-hidden
      >
        ›
      </span>
    </motion.div>
  );
}

export function ProjectList() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full"
    >
      {projects.map((project, index) => (
        <ProjectItem key={project.id} project={project} index={index} />
      ))}
    </motion.div>
  );
}
