# Tasks: CV Website on GitHub Pages

**Input**: Design documents from `/specs/001-cv-website/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`,
`quickstart.md`

**Tests**: Not requested in the specification — no unit/e2e test tasks are generated. Verification
tasks use the runnable scenarios in `quickstart.md` and the checks in
`contracts/publishing-contract.md`.

**Organization**: Tasks are grouped by user story so each story is independently implementable and
testable. The entire site is authored in one file (`index.html`), so content tasks within a story
are sequential; only tasks touching different files carry `[P]`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in every description

## Path Conventions

This feature publishes from the **repository root of a GitHub user site**
(`texano00.github.io`), so site files live at the root, not under `src/`. Paths are relative to the
repository root `/home/yuri/github/my-cv`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the publishable file layout required by `contracts/publishing-contract.md` §2

- [ ] T001 Create site asset directories `assets/css/`, `assets/js/`, `assets/img/`, `assets/cv/` at the repository root
- [ ] T002 [P] Add an empty `.nojekyll` file at the repository root so Pages serves files verbatim without Jekyll processing
- [ ] T003 [P] Move the CV binaries with `git mv`: `Bacciarini Yuri - CV.docx` → `assets/cv/yuri-bacciarini-cv.docx` and `Bacciarini Yuri - CV (1).pdf` → `assets/cv/yuri-bacciarini-cv.pdf` (URL-safe names, no spaces or parentheses; do not leave copies behind — FR-020)
- [ ] T004 [P] Create `favicon.svg` at the repository root (simple monogram mark, ≤ 2 KB, no embedded raster)
- [ ] T005 [P] Create `404.html` at the repository root: minimal page with `lang="en"`, a "Page not found" `h1`, a link back to `/`, and the same `assets/css/styles.css` stylesheet

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Document shell, design tokens, and navigation that every user story renders into

**⚠️ CRITICAL**: No user story content can be authored until this phase is complete

- [ ] T006 Create `index.html` document shell: doctype, `lang="en"`, `<head>` metadata per `data-model.md` → PageMetadata (`title`, `metaDescription` ≤ 160 chars, `canonicalUrl` = `https://texano00.github.io/`, `socialImage`), and the single landmark skeleton (`header`, `nav`, `main`, `footer`)
- [ ] T007 Implement design tokens in `assets/css/styles.css`: `--bg`, `--fg`, `--muted`, `--accent` on `:root` with light values meeting `ui-contract.md` §6 contrast (`--fg`/`--bg` ≥ 7:1, `--muted`/`--bg` ≥ 4.5:1), plus a `@media (prefers-color-scheme: dark)` override block
- [ ] T008 Implement base layout and typography in `assets/css/styles.css`: system font stack, modular type scale, 8 px spacing rhythm, centered content column capped at 72 rem, body measure 60–80 characters, list/link resets
- [ ] T009 [P] Create `assets/js/enhance.js`: optional theme toggle that reads/writes `localStorage` and assembles a `mailto:` link only on explicit user activation; no content may depend on it (FR-011)
- [ ] T010 [P] Create `assets/img/og-card.png` social preview card (1200×630, name + headline + accent color) referenced by the `<head>` metadata
- [ ] T011 Build the primary navigation inside `nav` in `index.html` using exactly the 12 anchors from `ui-contract.md` §2 (`#top`, `#ai-skills`, `#skills`, `#experience`, `#education`, `#certifications`, `#awards`, `#ventures`, `#speaking`, `#community`, `#hobbies`, `#contact`), with a "skip to content" link as the first focusable element and unique `id` values on every target section

**Checkpoint**: Shell, tokens, and navigation exist — user story content can now be authored

---

## Phase 3: User Story 1 - Read a complete, polished CV from a public URL (Priority: P1) 🎯 MVP

**Goal**: The full CV is readable on the published page with every fact preserved and truthfully
restructured.

**Independent Test**: Open the page locally, compare section by section against
`assets/cv/yuri-bacciarini-cv.docx`, and run `quickstart.md` §2 — all 8 experience, 2 education,
5 certification, 3 award rows must match with zero factual discrepancies.

### Implementation for User Story 1

- [ ] T012 [US1] Author the header/profile block in `index.html` inside `header`: `h1` = `Yuri Bacciarini`, headline verbatim from the CV, `Bologna, Italy` plus the `Open to work remotely / traveling` qualifier, and a 3–5 statement summary derived from the CV's TL;DR
- [ ] T013 [US1] Author the highlight-metrics row in `index.html` with exactly the FR-006 figures: `10+` years, `10+` engineers led, `40%` faster deployments, `30%` downtime reduction, `5` certifications (`data-model.md` → HighlightMetric)
- [ ] T014 [US1] Author the `#experience` section in `index.html` with all 8 employment entries (CRIF team lead, CRIF senior DevOps, Quid Head of Cloud DevOps, Quid Head of Software Development, Quid R&D team lead, Qi-Lab front-end, Thinkermail, Aperion), each with `organization`, `role`, normalized `Mon YYYY – Mon YYYY`/`Present` period, location where stated, and 3–6 outcome bullets preserving the CV's numbers; ordered newest first with `h3` per entry
- [ ] T015 [US1] Author the `#education` section in `index.html` with both entries (`University of Florence`, `Technical mathematical computer institute / Alessandro Volta`), periods, locations, results `97/110` and `80/100`, and the CV's 2015–2017 study-pause note
- [ ] T016 [US1] Author the `#certifications` section in `index.html` with all 5 certifications and their issuers (CKAD/CNCF, AWS Solutions Architect – Associate, HashiCorp Terraform Associate, Microsoft Azure Administrator Associate, FinOps Certified Practitioner)
- [ ] T017 [US1] Author the `#awards` section in `index.html` with the 3 awards (2023 CRIF ITIO Award, 2019 Quidinformatica, 2017 AWS "City on a Cloud" finalist including its URL), newest first
- [ ] T018 [US1] Author the `#ventures` section in `index.html`: `Pimp it srl` (co-founder, Pimp My Chef, 10K+ downloads, press link) and `Perelli Winery` (IT consultant, `perelliwinery.it`) with role, period, and 1–3 description bullets each
- [ ] T019 [US1] Author the `#speaking` section in `index.html` with the two seminar engagements (University of Florence 2024 — cloud computing; University of Bologna 2023 — software lifecycle)
- [ ] T020 [US1] Author the `#community` section in `index.html` with the ANT fundraising / Ironman entry and its `insieme.ant.it` link
- [ ] T021 [US1] Author the `#hobbies` ("Beyond Work") section in `index.html` with team sports, running/ultra distances (blog link), Fisar sommelier level 1 (2019), and travel (blog link)
- [ ] T022 [US1] Author the `#contact` section in `index.html` with all 5 channels from `data-model.md` → ContactChannel: `yuribacciarini[at]gmail.com` (no plain address in markup), `www.yuribacciarini.com`, `linkedin.com/in/yuri-bacciarini`, `github.com/texano00`, `twitter.com/YBacciarini` — external links with `rel="noopener noreferrer"` and discernible text
- [ ] T023 [US1] Add the CV download block in `index.html` linking `assets/cv/yuri-bacciarini-cv.pdf` and `assets/cv/yuri-bacciarini-cv.docx` with the `download` attribute and a visible format/size label (FR-008)
- [ ] T024 [US1] Add the page footer in `index.html` with `Last updated: 2026-11-12` and the copyright/name line (FR-017)
- [ ] T025 [US1] Style the experience timeline, entry metadata rows, and metric chips in `assets/css/styles.css` (vertical rule + dot markers, `break-inside: avoid` on entries, no card-heavy layout — `research.md` R8)
- [ ] T026 [US1] Strip source extraction artifacts from the authored content: stray digit runs (`-1047741219200619…`, `6229350238125`), duplicated emoji, `[My Blog] (url)` syntax, and run-together headings (`data-model.md` §Cross-cutting rule 3)
- [ ] T027 [US1] Execute `quickstart.md` §2 (content fidelity) end to end and correct every discrepancy found; record the result in the PR description or commit message

**Checkpoint**: User Story 1 is complete and shippable as the MVP — the full CV is readable and accurate

---

## Phase 4: User Story 2 - Instantly find AI and technical expertise (Priority: P2)

**Goal**: A recruiter can judge AI and technical fit within the first two screenfuls.

**Independent Test**: Load the page, locate `#ai-skills` and `#skills` from the primary navigation,
and confirm every AI capability carries a CV-evidence label and every skill chip is evidenced in
the CV.

### Implementation for User Story 2

- [ ] T028 [US2] Author the `#ai-skills` section in `index.html` with exactly the CV-evidenced capabilities — computer vision/OCR (ID-card OCR module), face recognition (IP-camera security prototype), speech/voice recognition (voice-driven recipe app) — each rendered with a short `evidence` label per `data-model.md` → SkillGroup; **do not add AI claims absent from the CV** (FR-005)
- [ ] T029 [US2] Author the `#skills` section in `index.html` with at most 8 `SkillGroup`s (AI & Computer Vision, Cloud Platforms, Containers & Orchestration, Infrastructure as Code, CI/CD & Release, Observability, Languages & Runtimes, Data & Messaging), each limited to ≤ 12 member chips and each member traceable to a CV technology mention (FR-019)
- [ ] T030 [US2] Style skill groups and chips in `assets/css/styles.css`: wrapping chip rows, group headings at `h3`, no horizontal overflow at 320 px, and a visually distinct treatment for the AI group
- [ ] T031 [US2] Verify document order places `#ai-skills` and `#skills` **before** `#experience` in `index.html` and that both are present in the primary navigation (FR-004, `ui-contract.md` §2)

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Consume the CV comfortably anywhere, offline-safe, and on paper (Priority: P3)

**Goal**: Responsive, script-free, print-ready and theme-aware reading experience.

**Independent Test**: Run `quickstart.md` §4, §6, §7, and §8 at 320/768/1440 px, with scripting
disabled, in both color schemes, and in print preview.

### Implementation for User Story 3

- [ ] T032 [US3] Add responsive rules to `assets/css/styles.css`: single-column flow at 320 px with no horizontal scroll, two-column metadata layout at ≥ 768 px, capped centered column at ≥ 1440 px, and touch targets ≥ 44 × 44 px
- [ ] T033 [US3] Add the `@media print` block to `assets/css/styles.css`: hide `nav` and script-only controls, force the light palette, print external link URLs, apply `break-inside: avoid` to entries, and use a `pt` type scale so the export fits ≤ 4 pages (FR-016, SC-007)
- [ ] T034 [US3] Add `@media (prefers-reduced-motion: reduce)` guards and `:focus-visible` outlines (≥ 3:1 contrast) to `assets/css/styles.css` (FR-015, FR-013)
- [ ] T035 [US3] Verify the no-JavaScript pass on `index.html`: disable scripting, load the page, confirm 100% of content is visible, all anchors and external links work, and the email remains readable in `[at]` form (FR-011, SC-009)
- [ ] T036 [US3] Verify print/PDF export at A4 portrait: complete CV, ≤ 4 pages, nothing clipped or split across a page break; adjust `assets/css/styles.css` if any entry breaks badly
- [ ] T037 [US3] Verify both themes for contrast and legibility (forced light and forced dark), confirm no flash of the wrong theme, and adjust the token pairs in `assets/css/styles.css` to meet `ui-contract.md` §6

**Checkpoint**: All three user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates, documentation, and publishing

- [ ] T038 [P] Validate `index.html` and `404.html` for conformance with `npx html-validate index.html 404.html` (or the W3C Nu validator) and fix every error
- [ ] T039 [P] Run an accessibility and performance audit of `index.html` against `http://localhost:8000/` (Lighthouse `accessibility` + `performance` categories, plus an axe pass) and fix every critical violation (SC-004, SC-003)
- [ ] T040 [P] Check every external link in `index.html` (blog, LinkedIn, GitHub, Twitter/X, `qinetic.io`, `perelliwinery.it`, `insieme.ant.it`, AWS competition URL) and mark or fix any destination that no longer resolves
- [ ] T041 [P] Update `README.md` at the repository root: what the site is, local preview command, how to update CV content, and the `Last updated` maintenance rule
- [ ] T042 Run the full matrix in `specs/001-cv-website/quickstart.md` (§1–§11 except §10) and record pass/fail per section
- [ ] T043 Commit the feature on branch `001-cv-website`, merge to `main`, and push; then execute §10 of `specs/001-cv-website/quickstart.md` live verification against `https://texano00.github.io/` (page 200, CSS 200, PDF 200, ≥ 10 sections, 404 fallback, footer date = merge date)
- [ ] T044 (Owner, manual) Per §3 of `specs/001-cv-website/contracts/publishing-contract.md`, set GitHub repository Settings → Pages → Source = "Deploy from a branch", branch `main`, folder `/ (root)`; confirm `https://texano00.github.io/` returns 200 within 5 minutes (SC-006)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on T001 (directories) — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion; they can then proceed in
  parallel or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2 — no dependency on other stories (MVP)
- **User Story 2 (P2)**: Starts after Phase 2 — needs T011 (navigation) to place `#ai-skills`;
  otherwise independent of US1 content
- **User Story 3 (P3)**: Starts after Phase 2 but validates styles that US1/US2 introduce —
  practically scheduled after both

### Within Each User Story

- Content authoring tasks in `index.html` are sequential (single file)
- Style tasks in `assets/css/styles.css` are sequential (single file)
- Verification tasks run after the authoring tasks they check

### Parallel Opportunities

- Phase 1: T002, T003, T004, T005 are independent files → parallel
- Phase 2: T009 (`assets/js/enhance.js`) and T010 (`assets/img/og-card.png`) are independent files → parallel with T006–T008
- Phase 6: T038, T039, T040, T041 target different artifacts → parallel

---

## Parallel Example: Phase 1 Setup

```bash
Task: "Add an empty .nojekyll file at the repository root"
Task: "Move the CV binaries with git mv into assets/cv/ with URL-safe names"
Task: "Create favicon.svg at the repository root"
Task: "Create 404.html at the repository root"
```

## Parallel Example: Phase 2 Foundational

```bash
Task: "Create assets/js/enhance.js (optional theme toggle + mailto assembly)"
Task: "Create assets/img/og-card.png social preview card (1200x630)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: run `quickstart.md` §2 and §10 live checks
5. Ship — a complete, accurate CV is already public

### Incremental Delivery

1. Setup + Foundational → shell exists
2. US1 → full CV content → validate → deploy (MVP)
3. US2 → AI Skills + Technical Skills → validate → deploy
4. US3 → responsive/print/theme hardening → validate → deploy
5. Polish → audits, README, live verification

### Parallel Team Strategy

Single-author content, so parallel work is limited to distinct files: one contributor on
`assets/css/styles.css` while another authors `index.html`; audits run in parallel in Phase 6.

---

## Notes

- `[P]` tasks touch different files with no dependencies
- `[Story]` labels map tasks to the spec's user stories for traceability
- The whole site is one HTML file, so most content tasks are sequential by necessity
- Verification tasks map 1:1 to `quickstart.md` sections and `contracts/publishing-contract.md` §6
- Never publish an AI claim that is not evidenced in the CV (FR-005)
- Commit after each phase; stop at any checkpoint to validate the story independently
