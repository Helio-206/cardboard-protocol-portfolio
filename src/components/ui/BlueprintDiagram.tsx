import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

const nodeClasses = [
  "blueprint-node blueprint-node--web",
  "blueprint-node blueprint-node--gateway",
  "blueprint-node blueprint-node--service",
  "blueprint-node blueprint-node--store",
  "blueprint-node blueprint-node--queue",
  "blueprint-node blueprint-node--worker",
];

export function BlueprintDiagram({ locale }: { locale: Locale }) {
  const blueprint = messages[locale].blueprint;
  return (
    <div className="blueprint" aria-label={blueprint.label}>
      <div className="blueprint__grid" aria-hidden="true" />
      <p className="blueprint__title">{blueprint.title}</p>
      <div className="blueprint__lines" aria-hidden="true" />
      {blueprint.nodes.map((label, index) => (
        <span key={label} className={nodeClasses[index]}>
          {label}
        </span>
      ))}
      <p className="blueprint__note">{blueprint.note}</p>
    </div>
  );
}
