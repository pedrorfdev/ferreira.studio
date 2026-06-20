// background-layer.tsx
// Light: sem scrim branco (era bg-white/5, agora removido no hover)
// Dark: mantém bg-black/15
import { useAppStore } from "@/store/use-app-store";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { AppState } from "@/types/project";
import { useThemeStore } from "@/store/use-theme-store";
import { projects, globalConfig } from "@/data/projects";

export function BackgroundLayer() {
  const appState = useAppStore((s) => s.appState);
  const hoveredProject = useAppStore((s) => s.hoveredProject);
  const activeProject = useAppStore((s) => s.activeProject);
  const { theme } = useThemeStore();

  const isProject =
    appState === AppState.PROJECT || appState === AppState.EXPANDING;
  const project = isProject ? activeProject : hoveredProject;

  // Light: sem scrim no hover — a imagem respira
  // Dark: scrim leve para legibilidade
  const scrimClass = theme === "light" ? "" : "bg-black/15";

  return (
    <div className="absolute inset-0 z-0 bg-(--color-bg-primary)">
      {/* Default Global Video Background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400 ease-in-out"
        style={{ opacity: !project ? 1 : 0 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-65"
          onError={(e) => {
            (e.target as HTMLVideoElement).style.display = "none";
          }}
        >
          <source src={globalConfig.heroBgVideo.webm} type="video/webm" />
          <source src={globalConfig.heroBgVideo.mp4} type="video/mp4" />
        </video>
        <MediaPlaceholder
          variant="bg"
          aspect=""
          className="absolute inset-0 w-full h-full opacity-15"
        />
        <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-primary)/10 via-transparent to-transparent" />
      </div>

      {/* Preloaded Project Backgrounds */}
      {projects.map((p) => {
        const isActive = project?.id === p.id;
        return (
          <div
            key={p.id}
            className="absolute inset-0 pointer-events-none transition-opacity duration-400 ease-in-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            {p.heroVideo ? (
              <video
                src={p.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : p.media?.src ? (
              <img
                src={p.media.src}
                alt={p.media.alt ?? ""}
                className="w-full h-full object-cover"
                loading="eager"
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
            {scrimClass && <div className={`absolute inset-0 ${scrimClass}`} />}
            <div className="absolute inset-0 bg-linear-to-r from-(--color-bg-primary)/60 via-transparent to-transparent" />
          </div>
        );
      })}
    </div>
  );
}
