// components/shell/background-layer.tsx
// Scrim reduzido: dark 10-15%, light 5% — deixa a imagem respirar
import { AnimatePresence, motion } from "framer-motion";
import { backgroundCrossfade } from "@/lib/motion";
import { useAppStore } from "@/store/use-app-store";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { AppState } from "@/types/project";
import { useThemeStore } from "@/store/use-theme-store";

const GLOBAL_BG_VIDEO = "/media/hero-bg.mp4";

export function BackgroundLayer() {
  const appState = useAppStore((s) => s.appState);
  const hoveredProject = useAppStore((s) => s.hoveredProject);
  const activeProject = useAppStore((s) => s.activeProject);
  const { theme } = useThemeStore();

  const isProject =
    appState === AppState.PROJECT || appState === AppState.EXPANDING;
  const project = isProject ? activeProject : hoveredProject;

  // Scrim bem leve — max 20% dark, max 10% light
  // A imagem tem que respirar e aparecer com vida
  const scrimClass = theme === "light" ? "bg-white/5" : "bg-black/15";

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-(--color-bg-primary)" />

      {/* Vídeo global da home */}
      <AnimatePresence>
        {!project && (
          <motion.div
            key="global-bg"
            className="absolute inset-0"
            variants={backgroundCrossfade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <video
              src={GLOBAL_BG_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-65"
              onError={(e) => {
                (e.target as HTMLVideoElement).style.display = "none";
              }}
            />
            <MediaPlaceholder
              variant="bg"
              aspect=""
              className="absolute inset-0 w-full h-full opacity-15"
            />
            {/* Gradient sutil nas bordas para mesclar com o conteúdo */}
            <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary)/10 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mídia do projeto no hover */}
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.id}
            className="absolute inset-0"
            variants={backgroundCrossfade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {project.heroVideo ? (
              <video
                src={project.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : project.media?.src ? (
              <img
                src={project.media.src}
                alt={project.media.alt ?? ""}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ) : (
              <MediaPlaceholder
                variant="bg"
                aspect=""
                className="absolute inset-0 w-full h-full"
              />
            )}
            {/* Scrim leve — deixa a imagem aparecer */}
            <div className={`absolute inset-0 ${scrimClass}`} />
            {/* Gradient nas bordas para o conteúdo não competir */}
            <div className="absolute inset-0 bg-linear-to-r from-(--color-bg-primary)/60 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
