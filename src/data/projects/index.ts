import type {
  BravioProject,
  PraxisProject,
  PulsoProject,
  VamboraProject,
  VellorProject,
} from "@/types/projects";

import { bravioProject } from "./bravio/project";
import { praxisProject } from "./praxis/project";
import { pulsoProject } from "./pulso/project";
import { vamboraProject } from "./vambora/project";
import { vellorProject } from "./vellor/project";

export type AnyProject =
  | PraxisProject
  | VamboraProject
  | BravioProject
  | PulsoProject
  | VellorProject;

export const projects: AnyProject[] = [
  praxisProject,
  vamboraProject,
  bravioProject,
  pulsoProject,
  vellorProject,
];

export const globalConfig = {
  heroBgVideo: {
    webm: "/media/hero-bg.webm",
    mp4: "/media/hero-bg-otimizado.mp4",
  },
};
