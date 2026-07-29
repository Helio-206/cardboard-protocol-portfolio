# Design QA — Interactive Technical Editions

## Evidence

- Source visual truth path: `/tmp/reference-comic.jpg`
- Source brief: user-provided technical graphic-novel specification and selected physical-comic reference
- Desktop implementation screenshot: `/tmp/story-book-kaya-spread-1440-v2.png`
- Mobile implementation screenshots:
  - `/tmp/story-book-kaya-cover-390.png`
  - `/tmp/story-book-kaya-page-01-390.png`
  - `/tmp/story-book-african-business-network-page-01-390.png`
  - `/tmp/story-book-recall-page-01-390-v2.png`
- Index state: `/tmp/story-book-kaya-index-1440.png`
- Combined comparison: `/tmp/design-qa-story-book-comparison.png`
- Browser-rendered route: `/pt/projects/kaya/story`
- State: cover, first double-page spread, first mobile page and edition index

## Normalization

- Source: 1600 × 900 px, density 1, physical 16:9 comic-spread photograph.
- Desktop implementation: 1440 × 900 px, CSS viewport 1440 × 900, device scale factor 1.
- Mobile implementation: 780 × 1688 px, CSS viewport 390 × 844, device scale factor 2.
- The combined comparison preserves both desktop artifacts inside equal-width frames without stretching. The source defines reading rhythm and physical-page grammar rather than exact portfolio copy.

## Full-view comparison evidence

The implementation now adopts the source's essential reading model: a single cover, paired pages on desktop, a visible central gutter, sequential page controls and page-specific compositions. It retains the CARDBOARD PROTOCOL archive language instead of copying superhero characters or Marvel artwork.

Generated editorial photographs give each edition an original narrative opening. They contain no people, identities, brands or purported product screenshots. On mobile, each spread becomes one page with vertical content flow and horizontal swipe navigation.

## Required fidelity surfaces

- Fonts and typography: display headings retain strong comic-scale hierarchy; monospaced folios, stamps and controls remain legible. Long Portuguese titles wrap without truncation.
- Spacing and layout rhythm: desktop spreads use balanced two-column pages and a physical gutter. Mobile pages maintain consistent margins at 320, 375, 390 and 430 px with no horizontal overflow.
- Colors and visual tokens: cardboard, paper, ink, muted red and technical blue continue using the established portfolio tokens. Generated images match the warm/cool archival palette.
- Image quality and asset fidelity: all three images are original 1536 × 1024 generations, converted to optimized WebP. Crops remain sharp at desktop and mobile sizes. No CSS or SVG substitute is used for narrative photography.
- Copy and content: all ten technical chapters remain available in English and Portuguese. Conceptual scenes are explicitly marked as reconstructions, preventing confusion with real project evidence.
- Interaction: previous/next controls, swipe, Arrow keys, Page Up/Down, Home/End, index dialog, language toggle and back navigation were exercised.
- Accessibility: semantic buttons, native dialog, focus states, alt text, live page count and reduced-motion behavior are present.

## Findings

No actionable P0, P1 or P2 findings remain.

## Comparison history

### Pass 1

- Finding: the earlier dossier used continuous vertical scrolling and did not reproduce the user's intended page-by-page comic reading model.
- Severity: P1.
- Fix: replaced the story sequence with a 12-page edition reader: cover, ten chapter pages and back cover. Desktop advances by double-page spreads; mobile advances one page at a time.
- Post-fix evidence: `/tmp/story-book-kaya-spread-1440-v2.png` and `/tmp/story-book-kaya-cover-390.png`.

### Pass 2

- Finding: inherited chapter CSS kept some internal panels in a narrow two-column grid, and the sticky toolbar could leave the viewport after a page change.
- Severity: P2.
- Fix: scoped chapter layouts under the edition reader, changed internal panels to a single readable column and fixed the toolbar above the page surface.
- Post-fix evidence: `/tmp/story-book-kaya-spread-1440-v2.png` and `/tmp/story-book-recall-page-01-390-v2.png`.

### Pass 3

- Finding: reduced-motion emulation still reported the page-turn animation name because the normal animation selector had higher specificity.
- Severity: P2.
- Fix: disabled the page-turn animation explicitly inside `prefers-reduced-motion: reduce`.
- Post-fix evidence: browser computed style reports `animation-name: none`.

### Pass 4

- Finding: none at P0, P1 or P2.
- Post-fix evidence: `/tmp/design-qa-story-book-comparison.png` and all browser captures above.

## Verification

- Viewports checked: 320, 375, 390, 430 and 1440 CSS px.
- Locales and routes checked: all three editions in English and Portuguese.
- Page count: 12 physical pages per edition.
- Mobile swipe: moved from `#page-1` to `#page-2`.
- Desktop keyboard: Arrow Right moved from the first spread to `#page-3`.
- Index dialog: opened and closed successfully.
- Generated images: loaded successfully in all three editions.
- Reduced motion: page-turn animation disabled.
- Console errors: none.
- Horizontal overflow: none.
- Canonical URLs: custom-domain URLs preserved for all six routes.

## Follow-up polish

Real project screenshots can later replace or follow the conceptual reconstruction panel when verified public media is available.

final result: passed
