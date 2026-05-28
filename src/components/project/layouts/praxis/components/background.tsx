import type { PraxisProject } from "@/types/projects";

interface Props {
  project: PraxisProject;
}

export function Background({ project }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
        style={{
          backgroundImage: `url(${project.media.src})`,
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[160px] bg-(--color-accent-muted) opacity-70" />
    </div>
  );
}
