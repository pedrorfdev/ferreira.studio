import type { BravioProject } from "@/types/projects/bravio";
interface Props {
  project: BravioProject;
}
export function Background({ project }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {" "}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: `url(${project.media.src})` }}
      />{" "}
      <div className="absolute inset-0 bg-(--color-bg-primary)" />{" "}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/70" />{" "}
      <div className="absolute top-[-200px] right-[-120px] w-[700px] h-[700px] rounded-full blur-[140px] bg-(--color-accent-muted) opacity-20" />{" "}
    </div>
  );
}
