import type { VisualKind } from "@/types/content";
import { RoadStage } from "@/components/showreel/RoadStage";
import { PipelineStage } from "@/components/showreel/PipelineStage";
import { DashboardStage } from "@/components/showreel/DashboardStage";
import { TerminalStage } from "@/components/showreel/TerminalStage";
import { WellStrata } from "@/components/projects/visuals/WellStrata";
import { QrCards } from "@/components/projects/visuals/QrCards";
import { PixelArena } from "@/components/projects/visuals/PixelArena";

/**
 * Maps a project's `visual` key to its generated composition.
 *
 * Every visual is CSS/SVG rather than an image: nothing to download, nothing
 * to license, and each one scales to any container without layout shift.
 */
const registry: Record<VisualKind, () => React.JSX.Element> = {
  "road-scan": RoadStage,
  "document-pipeline": PipelineStage,
  "signal-board": DashboardStage,
  "local-core": TerminalStage,
  "well-strata": WellStrata,
  "qr-cards": QrCards,
  "pixel-arena": PixelArena,
};

export function ProjectVisual({ kind }: { kind: VisualKind }) {
  const Visual = registry[kind];
  return <Visual />;
}
