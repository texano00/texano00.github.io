# Phase 0 — Research: CV Website on GitHub Pages

All Technical Context unknowns are resolved below. No `NEEDS CLARIFICATION` remains.

---

## R1. Publishing topology

- **Decision**: Treat the repository as a GitHub **user site** (`texano00/texano00.github.io`),
  publish from the root of `main`, and serve the page at `https://texano00.github.io/`.
- **Rationale**: The remote is already `https://github.com/texano00/texano00.github.io.git`. For
  a repository named `<owner>.github.io`, Pages serves `main` (root) at the domain root, so
  `index.html` at the repository root is immediately live after a merge. No workflow, no `dist/`
  artifact, and no sub-path handling are needed, which satisfies FR-010 (no manual steps) and
  SC-006 (public within 5 minutes).
- **Alternatives considered**:
  - *Project site* (`/my-cv/` sub-path): would require rewriting every asset and anchor path and
    would publish under a secondary URL; rejected because the remote is already a user site.
  - *GitHub Actions artifact deployment*: adds a workflow and build step; rejected as
    unnecessary for a build-free single page.
  - *`gh-pages` branch*: introduces a second branch to keep in sync; rejected (risk of drift,
    violates FR-020 spirit).

## R2. Site generation approach

- **Decision**: Hand-authored semantic HTML5 with a single CSS file. No static site generator.
- **Rationale**: One page, one author, no repeating data collections that justify templating.
  Eliminates the toolchain the owner would otherwise need to maintain, keeps content edit-able
  in the editor, guarantees the page works with JavaScript disabled (FR-011), and keeps the
  published bytes identical to the committed bytes (no build-output drift).
- **Alternatives considered**:
  - *Astro / Eleventy / Hugo*: better for many pages or data-driven collections; for a single
    long document they add Node or Go toolchains, a build step, and a CI workflow that the spec
    does not require. Rejected on simplicity grounds.
  - *Markdown → HTML at build time*: adds a build step for marginal authoring comfort; the
    owner needs styled layout anyway, so CSS classes in HTML are equivalent effort.

## R3. Content single source of truth

- **Decision**: `index.html` is the single authoritative copy of CV content. The Word/PDF files
  are treated as immutable historical artifacts and are exposed only as downloads. A visible
  `Last updated: YYYY-MM-DD` line is maintained in the footer.
- **Rationale**: FR-020 forbids duplicated content; templating an external data file without a
  generator would create two sources. The footer date gives the owner the drift signal required
  by the spec's edge cases.
- **Alternatives considered**: JSON/YAML content file plus client-side rendering — rejected
  because it breaks FR-011 (content would disappear without scripting); JSON plus build step —
  rejected with R2.

## R4. Theming and dark mode

- **Decision**: CSS-only theming via `@media (prefers-color-scheme: dark)` over design tokens
  (`--bg`, `--fg`, `--accent`, …) on `:root`. A small optional toggle may refine the choice and
  persist it in `localStorage` when scripting is available.
- **Rationale**: Honors the system preference with zero scripting (FR-014), keeps both themes
  driven by one token set, and prevents a flash of wrong theme.
- **Alternatives considered**: JS-only theme detection — rejected (fails without scripting);
  separate dark stylesheet — rejected (duplication, higher maintenance).

## R5. Print / PDF export

- **Decision**: `@media print` block that collapses navigation, forces light palette, removes
  shadows/backgrounds, sets `break-inside: avoid` on entries, prints URLs for external links, and
  uses `pt`-based type scale.
- **Rationale**: FR-016 and SC-007 require a complete, legible ≤4-page export; print CSS is the
  only approach that works in every browser without a PDF library.
- **Alternatives considered**: Pre-generated PDF only — rejected because it does not satisfy
  "printing the page" and duplicates content (FR-020).

## R6. Accessibility strategy

- **Decision**: Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`, no
  skipped heading levels, a "skip to content" link, visible `:focus-visible` outlines, AA-contrast
  token pairs verified in both themes, `prefers-reduced-motion` guard on any transition, and no
  interaction that is pointer-only.
- **Rationale**: FR-013 and SC-004 demand keyboard operability and zero critical automated
  violations; semantic structure also gives screen readers and print the same outline.
- **Alternatives considered**: ARIA-heavy widget patterns — rejected (native elements are more
  robust and need no JS state management).

## R7. Email obfuscation

- **Decision**: Render the address in human form exactly as the CV does
  (`yuribacciarini[at]gmail.com`) as text. When scripting is available, an optional script may
  assemble a `mailto:` link on activation; without scripting the text remains copyable.
- **Rationale**: FR-007 requires the `[at]` convention; no plain machine-readable address may be
  in the markup, which reduces harvesting by naive scrapers without breaking the contact path.
- **Alternatives considered**: Plain `mailto:` — rejected (harvestable); JavaScript-only
  rendering — rejected (breaks FR-011).

## R8. Typography and visual system

- **Decision**: System font stack (`-apple-system, Segoe UI, Roboto, Inter, …`) with a
  modular type scale, 8 px spacing rhythm, one accent color, card-less "timeline" layout for
  experience with a vertical rule and dot markers, and metric "chips" for quantified wins.
- **Rationale**: No webfont request keeps SC-003 reachable on slow mobile connections and works
  offline; tokens make both themes and print easy; the timeline pattern makes 9 roles scannable.
- **Alternatives considered**: Google Fonts / variable webfont — rejected (blocking network
  dependency, privacy, layout shift); grid-of-cards layout — rejected (denser, harder to print).

## R9. Asset and download naming

- **Decision**: Move (not copy) the root CV files to `assets/cv/yuri-bacciarini-cv.pdf` and
  `assets/cv/yuri-bacciarini-cv.docx`; link with a visible size/format label.
- **Rationale**: Current filenames contain spaces, parentheses, and parentheses-digit noise,
  which break in URLs and look unpolished; moving prevents a second copy of the artifact
  (FR-020). The download must survive renames, so the link uses the new path only.
- **Alternatives considered**: Percent-encoding the existing names — rejected (fragile, ugly in
  the address bar); copying — rejected (duplicate artifacts).

## R10. Validation tooling

- **Decision**: `html-validate` (or the W3C Nu validator) for conformance, Lighthouse CLI for
  performance/accessibility/SEO, `axe` for a second accessibility opinion, a link checker for
  external URLs, and a manual viewport/print/no-JS matrix.
- **Rationale**: SC-004 and SC-005 are automated checks; SC-001, SC-002, and SC-008 need human
  review, which the content contract and review checklist cover.
- **Alternatives considered**: Full browser e2e suite — rejected (no application logic to test;
  static document).

## R11. Repository hygiene on a published root

- **Decision**: Add `.nojekyll` at root; keep `specs/`, `.specify/`, `.github/` in the repository
  and accept that they are reachable but unlinked; add `404.html` as a minimal fallback.
- **Rationale**: `.nojekyll` prevents Jekyll from touching the tree and lets all file names be
  served verbatim. Excluding the Spec Kit folders would require an artifact-deploy pipeline
  (rejected in R1); the repository is public regardless, and no secrets live there.
- **Alternatives considered**: Separate `site/` source folder — impossible for a user site
  without a build step, since the served root must contain `index.html`.

## R12. Content restructuring rules

- **Decision**: Preserve the CV's section inventory verbatim in meaning; split long
  technology lists into grouped chips; convert result statements into "highlight + metric";
  normalize the source document's artifacts (stray numbers, `✍️`/`→` markers, run-together
  headings) into clean headings and labelled links; keep Italian month abbreviations' meaning by
  rendering periods as `May 2025 – Present` style.
- **Rationale**: FR-001, FR-003, FR-018, FR-019 require full coverage, readable grouping, and
  factual fidelity; the source contains extraction artifacts (e.g. `-1047741219200619...`,
  `yuribacciarini[at]gmail.com6229350238125`) that must not reach the page.
- **Alternatives considered**: Verbatim transcription — rejected (fails "more readable").
