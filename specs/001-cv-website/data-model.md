# Phase 1 — Data Model: CV Website on GitHub Pages

The site has no database. "Entities" here are the content structures that must exist on the page,
their required fields, and the rules that keep the rendering faithful to the source CV. Each
entity maps to one region of `index.html`.

---

## Entity: Profile

| Field | Required | Rules |
|---|---|---|
| `fullName` | yes | `Yuri Bacciarini`; rendered once as the page `h1` |
| `headline` | yes | The CV's role line, verbatim: *Team lead & Manager (10+ engineers) / DevOps Engineer / Cloud Expert* |
| `location` | yes | `Bologna, Italy` plus availability qualifier (`Open to work remotely / traveling`) |
| `summary` | yes | 3–5 short statements derived from the CV's TL;DR block; every claim traceable to a CV statement |
| `availability` | optional | Free-text qualifier rendered next to location |

**Relationship**: 1 Profile → many `ContactChannel`, many `HighlightMetric`.

---

## Entity: ContactChannel

| Field | Required | Rules |
|---|---|---|
| `label` | yes | Human label: Email, Blog, LinkedIn, GitHub, Twitter/X |
| `target` | yes | URL for all except email; email uses the `[at]` human form and MUST NOT appear as a plain address in markup |
| `kind` | yes | `email` \| `web` |

**Validation**: every `web` target from the CV must be preserved exactly
(`www.yuribacciarini.com`, `linkedin.com/in/yuri-bacciarini`, `github.com/texano00`,
`twitter.com/YBacciarini`). Links open in a new tab with `rel="noopener noreferrer"`.

---

## Entity: HighlightMetric

| Field | Required | Rules |
|---|---|---|
| `value` | yes | Leading figure as in the CV: `10+`, `40%`, `30%`, `5`, `97/110` |
| `label` | yes | Short noun phrase, e.g. *years in DevOps & cloud*, *faster deployments* |
| `context` | optional | Role or period the figure belongs to |

**Validation**: a metric may only be rendered if the source CV states it; figures must not be
re-derived, rounded, or generalized. Exactly the achievements in FR-006 are required
(10+ years, 10+ engineers led, 40% deployment speed, 30% downtime reduction, 5 certifications).

---

## Entity: SkillGroup

| Field | Required | Rules |
|---|---|---|
| `name` | yes | One of: AI & Computer Vision, Cloud Platforms, Containers & Orchestration,
Infrastructure as Code, CI/CD & Release, Observability, Languages & Runtimes, Data & Messaging |
| `members` | yes | Individual skills as chips; each must be evidenced somewhere in the CV |
| `evidence` | required for `ai` group | Short phrase pointing at the CV origin (e.g. *ID-card OCR module*) |

**Validation**:
- The `AI & Computer Vision` group is mandatory and must appear in navigation before Experience
  (FR-004).
- Every AI member must be backed by an `evidence` phrase; AI claims without CV support are
  forbidden (FR-005).
- No group may contain an unbroken list longer than 12 members; split or group instead (FR-019).
- Total skill groups ≤ 8 to keep the section scannable.

---

## Entity: ExperienceEntry

| Field | Required | Rules |
|---|---|---|
| `organization` | yes | As in the CV (`CRIF spa`, `Quid Informatica spa`, `Qi-Lab srl / Quid Informatica Spa`, `Thinkermail`, `Aperion srl`, `Pimp it srl`, `Perelli Winery`) |
| `role` | yes | Job title exactly as in the CV |
| `period` | yes | Normalized `Mon YYYY – Mon YYYY` or `Mon YYYY – Present`; Italian month abbreviations expanded to English |
| `location` | optional | Present only where the CV states it (Florence, Arezzo) |
| `highlights` | yes | 3–6 outcome-oriented bullets, preserving the CV's numbers |
| `technologies` | optional | Grouped chips, not a prose list |

**Ordering**: descending by `period.start` (most recent first). The CV's own order is
authoritative and already descending.

**Validation**: exactly 8 employment entries are required (2 CRIF, 3 Quid Informatica, 1 Qi-Lab joint,
1 Thinkermail, 1 Aperion). The co-founder and consultancy engagements are modeled separately as
`SideVenture` so the employment list stays a pure record of salaried roles.

> Count correction (2026-11-14, during implementation): earlier artifacts stated 9 entries; the
> source CV contains 8 employment entries plus 4 independent/side engagements. The page and all
> artifacts now use 8.

---

## Entity: EducationEntry

| Field | Required | Rules |
|---|---|---|
| `institution` | yes | `University of Florence`, `Technical mathematical computer institute / Alessandro Volta` |
| `programme` | yes | Degree/curriculum text as in the CV |
| `period` | yes | `Sep 2013 – Jul 2019`, `Sep 2008 – Jun 2013` |
| `location` | yes | `Florence` |
| `result` | optional | `97/110`, `80/100` |
| `note` | optional | The CV's explanation of the study pause (2015–2017) |

**Validation**: exactly 2 entries.

---

## Entity: Certification

| Field | Required | Rules |
|---|---|---|
| `name` | yes | Full certification name |
| `issuer` | yes | Issuing body (`CNCF`, `AWS`, `HashiCorp`, `Microsoft`, `FinOps Foundation`) |
| `identifier` | optional | Credential ID or badge link where the CV provides one |

**Validation**: exactly 5 entries — CKAD, AWS Solutions Architect – Associate, Terraform
Associate, Azure Administrator Associate, FinOps Certified Practitioner.

---

## Entity: Award

| Field | Required | Rules |
|---|---|---|
| `year` | yes | `2023`, `2019`, `2017` |
| `organization` | yes | `CRIF spa` (ITIO Award), `Quidinformatica S.p.A.`, AWS *City on a Cloud* |
| `description` | yes | One sentence; the 2017 entry keeps its AWS competition URL |

**Validation**: exactly 3 entries, newest first.

---

## Entity: SideVenture

| Field | Required | Rules |
|---|---|---|
| `name` | yes | `Pimp it srl` (co-founder, Pimp My Chef), `Perelli Winery` (IT consultant) |
| `role` | yes | Co-founder / IT consultant |
| `period` | yes | As in the CV |
| `description` | yes | 1–3 bullets; the *10K downloads* figure and newspaper-link label are preserved |
| `links` | optional | Project URLs (`perelliwinery.it`, press article) |

---

## Entity: TalkOrSeminar

| Field | Required | Rules |
|---|---|---|
| `institution` | yes | `University of Florence` (2024), `University of Bologna` (2023) |
| `topic` | yes | Cloud computing seminars / Software lifecycle in a structured company |
| `year` | yes | `2024`, `2023` |

---

## Entity: Section

| Field | Required | Rules |
|---|---|---|
| `id` | yes | Stable kebab-case anchor: `top`, `ai-skills`, `skills`, `experience`, `education`, `certifications`, `awards`, `ventures`, `speaking`, `community`, `hobbies`, `contact` |
| `title` | yes | Visible heading, unique, contributing to a single `h1` → `h2` → `h3` hierarchy |
| `navLabel` | yes | Short label used in primary navigation; identical target to `id` |

**Validation**: `ai-skills` must precede `experience` in document order (FR-004); every `id`
must be unique; every navigation entry must resolve to an existing `id` (FR-002).

---

## Entity: PageMetadata

| Field | Required | Rules |
|---|---|---|
| `title` | yes | `Yuri Bacciarini — Team Lead & DevOps / Cloud Engineer` |
| `metaDescription` | yes | 1–2 sentences, ≤ 160 characters |
| `lastUpdated` | yes | `YYYY-MM-DD`, visible in the footer (FR-017) |
| `canonicalUrl` | yes | `https://texano00.github.io/` |
| `socialImage` | optional | `assets/img/og-card.png` |

---

## Relationships

```text
Profile 1 ── * ContactChannel
Profile 1 ── * HighlightMetric
Profile 1 ── * Section ── 0..* (ExperienceEntry | EducationEntry | Certification | Award |
                                    SideVenture | TalkOrSeminar | SkillGroup)
PageMetadata 1 ── 1 Profile
```

## State Transitions

| Entity | Transition | Trigger |
|---|---|---|
| `PageMetadata.lastUpdated` | old date → today | Any content edit merged to `main` |
| `ExperienceEntry.period` | `– Present` → fixed end date | Owner changes job |
| `Section` order | unchanged | Anchors are stable and must not be renumbered |
| Theme | `system` → `light`/`dark` | Visitor preference; CSS default follows system |
| Render mode | `screen` → `print` | Media query; palette forced to light, navigation collapsed |

## Cross-cutting Validation Rules

1. No content may exist on the page that cannot be traced to the CV or to an owner-approved
   addition (FR-018, SC-002).
2. Every factual figure appears once in `HighlightMetric` and, where relevant, inside the owning
   entry — never with conflicting values.
3. Source extraction artifacts must never be rendered: stray digit strings
   (`-1047741219200619…`, `6229350238125`), duplicate emoji markers, and `[My Blog] (url)`
   syntax.
4. Dates are always ISO in metadata and `Mon YYYY` in visible text.
