// components/shell/app-shell.tsx
// Fix: importa AnyProject de @/data/projects para consistência de tipos
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { BackgroundLayer } from "@/components/shell/background-layer";
import { IntroLoader } from "@/components/loader/intro-loader";
import { HomeView } from "@/components/home/home-view";
import { ProjectView } from "@/components/project/project-view";
import { MenuOverlay } from "@/components/menu/menu-overlay";
import { AssistantLayer } from "@/components/assistant/assistant-layer";
import { Nav } from "@/components/navigation/nav";

import { useAppStore } from "@/store/use-app-store";
import { useMenuStore } from "@/store/use-menu-store";
import { AppState } from "@/types/project";
import type { AnyProject } from "@/data/projects";

export function AppShell() {
  const appState = useAppStore((s) => s.appState);
  // Cast explícito para AnyProject de @/data/projects — resolve conflito
  const activeProject = useAppStore(
    (s) => s.activeProject,
  ) as AnyProject | null;
  const isMenuOpen = useMenuStore((s) => s.isOpen);

  useEffect(() => {
    const shouldLock =
      appState === AppState.PROJECT ||
      appState === AppState.EXPANDING ||
      isMenuOpen;

    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [appState, isMenuOpen]);

  const isLoading = appState === AppState.LOADING;
  const isProjectOpen =
    appState === AppState.PROJECT || appState === AppState.EXPANDING;

  return (
    <div className="relative w-full h-dvh overflow-hidden">
      <BackgroundLayer />
      <Nav />

      <AnimatePresence mode="wait">
        {!isProjectOpen && <HomeView key="home" />}
      </AnimatePresence>

      <AnimatePresence>
        {isProjectOpen && <ProjectView key={activeProject?.id} />}
      </AnimatePresence>

      <AnimatePresence>
        {appState === AppState.PROJECT && activeProject && (
          <AssistantLayer project={activeProject} />
        )}
      </AnimatePresence>

      <AnimatePresence>{isMenuOpen && <MenuOverlay />}</AnimatePresence>
      <AnimatePresence>{isLoading && <IntroLoader />}</AnimatePresence>
    </div>
  );
}
