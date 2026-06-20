import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { useCardPosition } from "@/hooks/use-card-position";
import { Zap } from "lucide-react";
import { projects } from "@/data/projects";
import type { AnyProject } from "@/data/projects";

const CARD_REVEAL: Variants = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

interface CardProps {
  project: AnyProject;
  index: number;
}

function Card({ project, index }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const openProject = useAppStore((s) => s.openProject);
  const slot = useCardPosition(index);
  const [clicking, setClicking] = useState(false);

  function handleClick() {
    if (clicking || !ref.current) return;
    setClicking(true);
    setTimeout(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      openProject(project, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }, 200);
  }

  return (
    <motion.div
      ref={ref}
      data-project={project.id}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      variants={CARD_REVEAL}
      initial="hidden"
      animate={
        clicking ? { scale: 1.06, opacity: 1, filter: "blur(0px)" } : "visible"
      }
      exit="exit"
      style={{
        position: "fixed",
        top: slot.top,
        left: slot.left,
        transform: "translate(-50%, -50%)",
        zIndex: 25,
      }}
      className="w-96 md:w-md rounded-xl overflow-hidden cursor-pointer
                 border border-white/10 shadow-2xl
                 hover:border-(--color-project-primary,white)/25
                 transition-[border-color] duration-300"
    >
      <div
        className="w-full overflow-hidden bg-(--color-bg-tertiary)"
        style={{ aspectRatio: "16/8" }}
      >
        {project.heroImage ? (
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center
                          bg-linear-to-br from-(--color-bg-secondary) to-(--color-bg-tertiary)"
          >
            <span className="font-display text-sm font-semibold text-(--color-text-tertiary)">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Badge in development */}
      {project.status === "in development" && (
        <div
          className="flex items-center gap-1.5 px-3 py-2
                        bg-(--color-bg-secondary)/95 backdrop-blur-sm
                        border-t border-white/5"
        >
          <Zap size={10} className="text-(--color-gold)" />
          <span className="text-[10px] uppercase tracking-[0.14em] text-(--color-gold) font-medium">
            In progress
          </span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-(--color-gold) animate-pulse" />
        </div>
      )}
    </motion.div>
  );
}

export function ProjectCard() {
  const hoveredProject = useAppStore((s) => s.hoveredProject);
  const hoveredIndex = hoveredProject
    ? projects.findIndex((p) => p.id === hoveredProject.id)
    : -1;

  return (
    <>
      {/* Preload images for cards to avoid white flashes on hover */}
      <div className="hidden" aria-hidden="true">
        {projects.map((p) => (
          p.heroImage && (
            <img 
              key={`preload-card-${p.id}`} 
              src={p.heroImage} 
              loading="eager" 
              decoding="async" 
              alt="" 
            />
          )
        ))}
      </div>

      <AnimatePresence mode="wait">
        {hoveredProject && hoveredIndex !== -1 && (
          <Card
            key={hoveredProject.id}
            project={hoveredProject as AnyProject}
            index={hoveredIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
