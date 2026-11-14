# Feature Specification: CV Website on GitHub Pages

**Feature Branch**: `001-cv-website`

**Created**: 2026-11-12

**Status**: Draft

**Input**: User description: "create a CV website from the CV document in the repo root: refactored, more readable and visually appealing, including an AI skills section, deployed via GitHub Pages"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read a complete, polished CV from a public URL (Priority: P1)

A visitor (recruiter, hiring manager, conference contact) opens a single public link and reads the
owner's entire professional profile: headline, summary, experience, education, certifications,
awards, side projects, community involvement, and hobbies. The content is reorganized into
clearly labelled sections and reads noticeably better than the source document, while every fact
(employers, titles, dates, metrics, links) stays accurate.

**Why this priority**: Without a complete, accurate, publicly reachable CV page there is no
product. This alone delivers the core value and is a shippable MVP.

**Independent Test**: Open the published URL on desktop and mobile, compare section by section
against the source CV document, and confirm all facts, links, and sections are present and
correctly grouped.

**Acceptance Scenarios**:

1. **Given** the published site is live, **When** a visitor loads the page URL, **Then** they see
   the owner's name, professional headline, and a short summary without scrolling.
2. **Given** the visitor scrolls or uses the section navigation, **When** they reach any CV
   section (summary, experience, education, certifications, awards, side projects, community,
   hobbies), **Then** that section is present with the full content from the source document.
3. **Given** the visitor compares two experience entries, **When** they read the entries,
   **Then** each shows role, organization, period, location when known, and outcome-focused
   highlights, ordered most recent first.
4. **Given** the visitor uses the contact links, **When** they activate email, blog, LinkedIn,
   GitHub, or Twitter links, **Then** each opens the correct destination from the source CV.
5. **Given** a reviewer checks facts against the source document, **When** they compare dates,
   employers, titles, certification names, and numeric results, **Then** no fact has been
   invented, altered, or dropped during the rewrite.

---

### User Story 2 - Instantly find AI and technical expertise (Priority: P2)

A technical recruiter or engineering manager wants to know, within seconds, what the owner can do
in AI and cloud/DevOps. The page exposes a dedicated **AI Skills** section plus a scannable
technical skill overview, so the reader can judge fit without reading the full experience history.

**Why this priority**: The owner explicitly wants AI capabilities surfaced as a first-class part
of the profile; without it the page is a reformatted document rather than a modern profile.

**Independent Test**: Load the page, locate the AI Skills section and technical skill overview
within the first two screenfuls of content, and confirm every listed capability is supported by
the CV or explicitly approved by the owner.

**Acceptance Scenarios**:

1. **Given** the visitor lands on the page, **When** they scan the primary navigation, **Then**
   "AI Skills" and "Skills"/"Expertise" appear as first-class entries.
2. **Given** the visitor reads the AI Skills section, **When** they inspect each listed capability,
   **Then** the capability is either evidenced in the CV or supplied by the owner, and none is
   fabricated.
3. **Given** the visitor wants a quick fit check, **When** they view the technical skills overview,
   **Then** cloud platforms, infrastructure automation, container orchestration, CI/CD, and
   languages/tooling are grouped and legible at a glance.
4. **Given** the visitor looks for credential credibility, **When** they view the certifications
   area, **Then** all five certifications from the source CV (Kubernetes CKAD, AWS Solutions
   Architect Associate, Terraform Associate, Azure Administrator Associate, FinOps Practitioner)
   are listed.

---

### User Story 3 - Consume the CV comfortably anywhere, offline-safe, and on paper (Priority: P3)

A visitor on a phone during a commute, a hiring panel printing the CV for an interview, and a
visitor with a slow or restricted connection all get a usable experience: layout adapts to screen
size, core content is readable without scripting, and printing produces a clean document.

**Why this priority**: Polish and reach matter for a personal marketing asset, but the feature is
already valuable once stories 1 and 2 work.

**Independent Test**: Load the page at 320 px, 768 px, and 1440 px widths; disable scripting;
print to PDF; verify layout, content availability, and legibility in each case.

**Acceptance Scenarios**:

1. **Given** a 320 px wide viewport, **When** the visitor scrolls the page, **Then** no horizontal
   scrolling is required and all text is legible without zooming.
2. **Given** scripting is disabled in the browser, **When** the visitor loads the page, **Then**
   the complete CV content is still readable and navigable.
3. **Given** the visitor prints or saves the page as PDF, **When** the export completes, **Then**
   the document contains the complete CV with no clipped sections, no interactive-only content,
   and page-break-safe entries.
4. **Given** the visitor prefers a dark interface, **When** their system preference is dark,
   **Then** the page presents a dark presentation by default while keeping the same readability.
5. **Given** the visitor wants the original artifact, **When** they activate the download link,
   **Then** the CV file from the repository is downloaded.

---

### Edge Cases

- **Owner updates the CV document**: the published page must be updatable from a single source
  without editing multiple duplicated copies of the same content.
- **Dead or moved external links** (blog posts, GitHub, Twitter/X, project URLs): links must be
  presented so a broken destination does not break the page layout; at least the visible label and
  host remain informative.
- **Email harvesting**: the email must not be exposed as a plain machine-readable address; the
  CV's `[at]` convention is preserved for humans.
- **Very long paragraphs from the source (e.g., the multi-tool technology lists)**: must be
  restructured into readable groups instead of overflowing or truncating content.
- **Very long role history on print**: entries must not split awkwardly across pages.
- **Visitor with reduced motion or keyboard-only navigation**: decorative motion must be
  suppressible and all interactive elements must be reachable and visibly focused.
- **Content drift** between the downloadable CV file and the rendered page must be detectable by
  the owner (visible last-updated date).
- **Trailing format artifacts in the source document** (stray numbers, symbols, broken headings)
  must not appear on the page.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST present the complete content of the CV document at the repository
  root: profile summary, education, experience, independent/side experiences, certifications,
  awards, community involvement, hobbies, and contact channels.
- **FR-002**: Content MUST be reorganized into clearly labelled top-level sections with a visible
  section navigation, so any section is reachable in at most two interactions from the top of the
  page.
- **FR-003**: Experience entries MUST display role, organization, period, location when available,
  and outcome-focused highlights, ordered most recent first.
- **FR-004**: The site MUST include a dedicated **AI Skills** section that appears in the primary
  navigation and is positioned before the detailed experience history.
- **FR-005**: The AI Skills section MUST list only capabilities evidenced by the CV — computer
  vision/OCR (ID-card OCR module), face recognition (IP-camera security prototype), and
  speech/voice recognition (voice-driven recipe app) — and MUST NOT publish AI claims the source
  document does not support. Owner-supplied additions may be merged later as a content-only
  change without altering this rule.
- **FR-006**: The site MUST present the key quantified achievements from the CV as scannable
  highlights (10+ years experience, 10+ engineers led, 40% faster deployments, 30% downtime
  reduction, 5 certifications).
- **FR-007**: The site MUST expose every contact and social channel from the CV (email, blog,
  LinkedIn, GitHub, Twitter/X, location, remote/travel availability), with URLs intact and the
  email protected using the CV's human-readable `[at]` convention.
- **FR-008**: The site MUST provide a download of the original CV file stored in the repository.
- **FR-009**: The site MUST be publicly reachable over HTTPS at its published address with no
  authentication.
- **FR-010**: The site MUST publish automatically from the repository's default branch, so that
  merging a content or design change makes it public without additional manual steps by the
  owner.
- **FR-011**: All primary content MUST remain readable and navigable with scripting disabled.
- **FR-012**: The layout MUST avoid horizontal scrolling and remain legible at viewport widths
  from 320 px upward.
- **FR-013**: The site MUST meet WCAG 2.1 AA contrast requirements and support full keyboard
  navigation with visible focus states and a logical heading hierarchy.
- **FR-014**: The site SHOULD honor the visitor's system light/dark preference and MUST remain
  legible in both presentations.
- **FR-015**: The site SHOULD suppress decorative motion when the visitor requests reduced motion.
- **FR-016**: Printing or exporting the page MUST produce a legible, complete document of the CV
  without clipped or interactive-only content.
- **FR-017**: The site MUST display the date on which its content was last updated.
- **FR-018**: The site MUST NOT invent, alter, or omit facts from the source document; editorial
  rewriting is limited to structure, ordering, wording clarity, and typo removal.
- **FR-019**: Skill and technology information MUST be grouped by category instead of appearing
  as long unbroken lists.
- **FR-020**: All site content MUST be maintainable from a single source of truth so a CV update
  requires editing one location only.

### Key Entities

- **Profile**: the owner's identity and positioning — name, headline, location, availability,
  short summary, and contact channels.
- **Experience Entry**: one role — organization, title, period, location, and highlight bullets.
- **Education Entry**: institution, programme, period, location, and result.
- **Certification**: certification name, issuing body, and identifier/badge where available.
- **Award**: year, granting organization, and description.
- **Skill Group**: a category (e.g., AI & Data, Cloud Platforms, Containers & Orchestration,
  Infrastructure as Code, CI/CD, Languages) containing member skills.
- **Highlight Metric**: a quantified achievement presented as a scannable figure.
- **Link**: a labelled external destination (profile, article, project, fundraiser).
- **Section**: a navigable content block with a title and anchor.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Within 30 seconds of landing, a first-time visitor can correctly state the owner's
  role and at least three of his core skill areas.
- **SC-002**: 100% of the sections in the source CV are represented on the page; a spot-check of
  all 8 experience entries, 2 education entries, 5 certifications, 3 awards, and every contact
  link passes with zero factual discrepancies.
- **SC-003**: Primary content becomes readable within 2 seconds on a typical mobile connection.
- **SC-004**: Automated accessibility auditing reports zero critical violations, and every
  interactive element is reachable using only the keyboard.
- **SC-005**: No horizontal scrolling occurs at 320 px, 768 px, and 1440 px viewport widths, and
  body text remains legible without zooming.
- **SC-006**: A merged content change becomes publicly visible within 5 minutes without manual
  intervention.
- **SC-007**: Printing or saving to PDF yields a complete, legible document of at most 4 pages
  with no clipped entries.
- **SC-008**: At least 4 out of 5 reviewers (e.g., peers or recruiters) rate the page's
  readability and visual appeal 4/5 or higher.
- **SC-009**: With scripting disabled, 100% of CV sections and contact information remain
  accessible.
- **SC-010**: The AI Skills section is reachable from the primary navigation in a single
  interaction, with 100% of its claims traceable to the CV or owner-provided input.

## Assumptions

- The CV owner is a single individual (Yuri Bacciarini); this is a personal profile, not a
  multi-user product.
- The Word/PDF files at the repository root are the authoritative source of facts and remain in
  the repository as downloadable artifacts.
- The site is presented in English, matching the source document.
- Hosting is the static site publishing facility of the repository's code host (GitHub Pages),
  served over HTTPS under the repository owner's account; the public repository is the deployment
  trigger.
- A single long-form page with section navigation is an acceptable presentation; no separate
  routes, backend, database, or CMS are required.
- No authentication, comments, analytics, or contact form are in scope for the first version;
  contact happens through the CV's existing channels.
- A custom domain is out of scope for the first version; the default hosting URL is acceptable.
- The owner will review and approve the final wording of skill claims before publication, since
  the source document understates some capabilities (AI work appears as project detail rather
  than as a skills list).
- For the first version, AI skills are derived strictly from CV evidence; a curated
  owner-supplied AI skill list (for example generative-AI tooling experience) can be added later
  as a content-only change with no redesign.
- Reasonable defaults apply for visual design direction: clean, modern, professional, high
  contrast, generous whitespace, with emphasis on scannability over decoration.
