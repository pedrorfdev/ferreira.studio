import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { useClipPathTransition } from "@/hooks/use-clip-path-transition";
import { AppState } from "@/types/project";
import type { LocalizedProjectData } from "@/types/project";
import type { PraxisSections } from "@/types/projects/praxis";
import { transitions } from "@/lib/motion";
import { ProjectNav } from "@/components/project/project-nav";

import { PraxisView } from "@/components/project/layouts/praxis/view";
import { VamboraView } from "./layouts/vambora/view";
import type { BravioSections, VamboraSections } from "@/types/projects";
import { BravioView } from "./layouts/bravio/view";
import { BackToTop } from "../ui/back-to-top";

type AnyProject = LocalizedProjectData<unknown>;

function resolveLayout(project: AnyProject) {
  switch (project.id) {
    case "praxis":
      return (
        <PraxisView project={project as LocalizedProjectData<PraxisSections>} />
      );
    case "vambora":
      return (
        <VamboraView
          project={project as LocalizedProjectData<VamboraSections>}
        />
      );
    case "bravio":
      return (
        <BravioView project={project as LocalizedProjectData<BravioSections>} />
      );

    default:
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-(--color-text-tertiary) text-sm font-display">
            {project.title} — layout coming soon
          </p>
        </div>
      );
  }
}

export function ProjectView() {
  const project = useAppStore((s) => s.activeProject);
  const setAppState = useAppStore((s) => s.setAppState);
  const closeProject = useAppStore((s) => s.closeProject);
  const appState = useAppStore((s) => s.appState);
  const { origin, expanded } = useClipPathTransition();

  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0 });
    setProgress(0);
  }, [project?.id]);

  function handleAnimationComplete() {
    if (appState === AppState.EXPANDING) setAppState(AppState.PROJECT);
  }

  if (!project) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-92 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.45, duration: 0.3 }}
      >
        <ProjectNav project={project} onClose={closeProject} />
      </motion.div>

      <motion.div
        data-project={project.id}
        className="fixed inset-0 z-20 bg-(--color-bg-primary) flex flex-col"
        initial={{ clipPath: origin }}
        animate={{ clipPath: expanded }}
        exit={{ clipPath: origin }}
        transition={transitions.cinematic}
        onAnimationComplete={handleAnimationComplete}
      >
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-px z-10 bg-(--color-border-subtle) pointer-events-none">
          <motion.div
            className="h-full bg-(--color-accent) origin-left"
            style={{ scaleX: progress }}
          />
        </div>

        {/* Scroll container — pt-20 para não ficar sob o pill nav */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overscroll-none"
        >
          <div className="pt-20">{resolveLayout(project)}</div>
          <BackToTop target={containerRef} />
          <div className="h-24" />
        </div>
      </motion.div>
    </>
  );
}
