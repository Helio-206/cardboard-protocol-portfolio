import type { StoryPanel } from "@/data/project-stories/types";

export function ComicPanel({ panel, index }: { panel: StoryPanel; index: number }) {
  return (
    <article
      className={`story-panel story-panel--${panel.kind} story-panel--${panel.tone ?? "ink"}`}
      data-story-reveal
    >
      <span className="story-panel__number" aria-hidden="true">
        P.{String(index + 1).padStart(2, "0")}
      </span>
      {panel.stamp ? <p className="story-panel__stamp">{panel.stamp}</p> : null}
      {panel.title ? <h3>{panel.title}</h3> : null}
      {panel.body?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {panel.items ? (
        <ul>
          {panel.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {panel.steps ? (
        <ol className="story-flow">
          {panel.steps.map((step, stepIndex) => (
            <li key={`${step}-${stepIndex}`}>
              <span>{String(stepIndex + 1).padStart(2, "0")}</span>
              <b>{step}</b>
            </li>
          ))}
        </ol>
      ) : null}
      {panel.lines ? (
        <pre className="story-terminal">
          <code>{panel.lines.join("\n")}</code>
        </pre>
      ) : null}
    </article>
  );
}
