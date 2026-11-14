# Implementation Plan: CV Website on GitHub Pages

**Branch**: `001-cv-website` | **Date**: 2026-11-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-cv-website/spec.md`

**User constraint**: the repository is already the GitHub user site
`texano00/texano00.github.io`, so the site publishes from the **root of `main`** and is served at
`https://texano00.github.io/` (no sub-path).

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Convert the CV documents at the repository root into a single, polished, hand-authored static
page published at `https://texano00.github.io/`. Content is restructured into navigable sections
(profile, AI skills, technical skills, experience, education, certifications, awards, side
projects, community, hobbies, contact), rewritten for readability while preserving every fact
from the source CV, and delivered as dependency-free HTML + CSS with print and dark-mode support.

Because the repository is a **user site** (not a project site), there is no build pipeline and no
sub-path: merging to `main` republishes the root of the repository, which satisfies the
"public within 5 minutes, no manual step" requirement without CI infrastructure. The cost of that
choice is that the page is authored directly rather than generated from a data file; factual
fidelity is therefore protected by a written content contract plus a review checklist.

## Technical Context

**Language/Version**: HTML5, CSS3 (custom properties, grid/flexbox, `@media print`,
`prefers-color-scheme`), ES2020 (≈30 lines of optional progressive-enhancement script)

**Primary Dependencies**: none at runtime (no framework, no webfont, no CDN). Dev-only validation
tools: `html-validate` or the W3C Nu validator, Lighthouse CLI, `axe` accessibility checks

**Storage**: none — static files only; CV binaries served as downloadable assets

**Testing**: HTML conformance validation, automated accessibility audit (zero critical
violations), Lighthouse performance/SEO audit, manual matrix of 320/768/1440 px viewports,
no-JavaScript pass, print/PDF export pass, link check

**Target Platform**: evergreen desktop and mobile browsers; GitHub Pages static hosting (user
site root, HTTPS, Jekyll processing disabled via `.nojekyll`)

**Project Type**: single-page static website (document-oriented, no backend, no routing)

**Performance Goals**: primary content readable within 2 s on a typical mobile connection;
initial page weight ≤ 300 KB excluding the downloadable CV files; no blocking third-party
requests

**Constraints**: repo root **is** the publish root; no server-side code; must remain fully
readable with scripting disabled; WCAG 2.1 AA contrast; print output ≤ 4 pages and
page-break-safe; content must stay editable by the owner without a toolchain

**Scale/Scope**: one page, ~11 sections, 8 experience entries, 2 education entries,
5 certifications, 3 awards, 3 side ventures, 2 seminar engagements; single owner, no CMS,
no analytics, no forms

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

`.specify/memory/constitution.md` is an **unmodified Spec Kit scaffold**: every placeholder
(`[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]` … `[GOVERNANCE_RULES]`, version/ratification fields) is
still unresolved, so no principles have been ratified and no gates can be derived.

| Gate | Status | Note |
|---|---|---|
| Ratified principles | N/A | Constitution not yet ratified; no enforceable gates |
| Governance rules | N/A | Amendment procedure not yet defined |
| Complexity justification | PASS | No violations to justify (see Complexity Tracking) |

The plan voluntarily honors the non-negotiables the spec already states: factual fidelity
(FR-018), readability without scripting (FR-011), accessibility (FR-013), and single source of
truth for content (FR-020).

**Post-design re-check (after Phase 1)**: unchanged — still N/A for ratified gates, PASS for
complexity. No new dependencies, services, or architectural layers were introduced by the design.

## Project Structure

### Documentation (this feature)

```text
specs/001-cv-website/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   ├── ui-contract.md
│   └── publishing-contract.md
├── checklists/
│   └── requirements.md
├── spec.md
└── tasks.md             # Phase 2 output (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
index.html                     # The entire site: semantic sections + anchors
404.html                       # Fallback page (Pages serves this automatically)
.nojekyll                      # Disable Jekyll so files are served verbatim
favicon.svg
README.md                      # Repo description (not part of the page)
assets/
├── css/
│   └── styles.css             # Design tokens, layout, responsive, print, dark mode
├── js/
│   └── enhance.js             # Optional: theme toggle, mailto assembly (progressively enhanced)
├── img/
│   └── og-card.png            # Social preview image
└── cv/
    └── yuri-bacciarini-cv.docx # URL-safe Word copy (official CV is a Google Doc)

specs/                         # Spec Kit artifacts (served but unlinked)
.specify/                      # Spec Kit configuration (not published as a page)
.github/                       # Skills/agent config (not published as a page)
```

**Structure Decision**: Root-level single-page layout, chosen because a GitHub **user site**
(`texano00.github.io`) serves the repository root at the domain root — an `index.html` at root is
the only file needed for `https://texano00.github.io/` to work, and no build or deploy artifact
is required. The alternative (generator + `dist/` + Actions deploy) was rejected: it adds a Node
toolchain, a CI workflow, and a build step for a one-page document, while the spec explicitly
requires owner-maintainability and no manual steps. CV binaries move to `assets/cv/` with
URL-safe names so the download link contains no spaces or parentheses.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | No violations: single page, zero runtime dependencies, no new services or layers |
