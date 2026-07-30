# Engineering Archive

The Engineering Archive adds three evidence-oriented views to each public Project File:

- `lab`: deterministic client-side architecture simulations;
- `evidence`: reviewed claims connected to public sources and explicit proof limits;
- `x-ray`: curated system, repository and dependency views.

## Routing

Each experience is statically generated at:

```text
/{locale}/projects/{project}/lab
/{locale}/projects/{project}/evidence
/{locale}/projects/{project}/x-ray
```

Supported projects are `kaya`, `african-business-network` and `recall`.

## Data model

`src/data/engineering/` owns all project-specific content. Stable IDs connect:

- lab steps;
- evidence records;
- public sources;
- repository areas;
- Project File chapters.

Components receive localized, typed data and do not query GitHub at runtime.

## Evidence policy

The portfolio uses curated snapshots reviewed on `2026-07-29`. `verified` requires direct
public code, structure, test or release evidence. README-only claims are `documented`. Every
evidence detail states what the source does not prove.

No GitHub token, private repository data or runtime API dependency is used.

## Simulations

The labs use a shared reducer in `src/lib/labs/simulation.ts`. They run entirely in the browser
with prepared data and deterministic transitions. They do not connect to the represented
systems, external APIs, AI providers, video platforms or production infrastructure.

## Responsive behaviour

Desktop uses a simulation board or repository map with a persistent inspector. Below 900px the
inspector moves into the document flow. Below 600px diagrams become vertical sequences, filters
stack, and controls use two-column or single-column touch layouts without horizontal page scroll.
