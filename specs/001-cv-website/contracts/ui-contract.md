# Contract: Page Interface (UI)

**Consumers**: site visitors (screen, print, assistive technology), the site owner (maintaining
content), automated auditors (Lighthouse/axe).

This is the observable contract of the single published page. Implementation may change freely
as long as this contract holds.

---

## 1. Entry point and URL contract

| Requirement | Contract |
|---|---|
| Public entry point | `https://texano00.github.io/` returns the CV page over HTTPS with HTTP 200, no authentication |
| Trailing-slash behaviour | `/` and `/index.html` both render the same content |
| Unknown paths | Served a minimal `404.html` that links back to `/` |
| HTTPS | Enforced by the hosting platform; no mixed-content resources |

## 2. Navigation contract

| Anchor | Visible title | Must precede |
|---|---|---|
| `#top` | — (page top / name) | — |
| `#ai-skills` | AI Skills | `#experience` |
| `#skills` | Technical Skills | `#experience` |
| `#experience` | Experience | — |
| `#education` | Education | — |
| `#certifications` | Certifications | — |
| `#awards` | Awards | — |
| `#ventures` | Ventures & Side Projects | — |
| `#speaking` | Speaking & Seminars | — |
| `#community` | Community | — |
| `#hobbies` | Beyond Work | — |
| `#contact` | Contact | — |

Rules:
- Every primary-navigation link MUST resolve to an existing `id` in the same document.
- Any section MUST be reachable in ≤ 2 interactions from the top of the page (FR-002).
- Anchors are stable; renaming an `id` is a breaking change to shared/bookmarked URLs.
- The page MUST expose a "skip to content" link as the first focusable element.

## 3. Semantic structure contract

- Exactly one `h1` (the owner's name).
- Sections use `section` with an `h2`; entries inside use `h3`.
- No heading level is skipped in document order (FR-013).
- Landmarks: `header`, `nav`, `main`, `footer` present exactly once each.
- Lists of entries are `ol`/`ul` where the reading order matters.
- All links have discernible text; no `href="#"` and no empty `a` elements.
- Images (if any) have `alt`; purely decorative graphics are `aria-hidden` or CSS backgrounds.

## 4. Content contract

| Section | Required content | Count |
|---|---|---|
| Header / profile | name, headline, location, availability, 5 highlight metrics | 1 profile |
| AI Skills | capabilities + CV evidence label for each | ≥ 3, all evidence-backed |
| Technical Skills | grouped skill chips | ≤ 8 groups |
| Experience | organization, role, period, highlights | 8 entries, newest first |
| Education | institution, programme, period, location, result | 2 entries |
| Certifications | name + issuer | 5 entries |
| Awards | year, organization, description | 3 entries |
| Ventures & Side Projects | name, role, period, description | 2+ entries |
| Speaking & Seminars | institution, topic, year | 2 entries |
| Community | fundraising participation + link | ≥ 1 |
| Beyond Work | hobbies and interest links | ≥ 3 statements |
| Contact | email (`[at]` form), blog, LinkedIn, GitHub, Twitter/X | 5 channels |
| Download | link to the CV file under `assets/cv/` | ≥ 1 file |
| Footer | `Last updated: YYYY-MM-DD` | 1 |

Prohibited content: any figure, employer, date, or credential not present in the source CV
(FR-018); any plain machine-readable email address in markup (FR-007).

## 5. Interaction and no-script contract

- With JavaScript disabled: 100% of the content above remains visible and all in-page and external
  links remain operable (FR-011, SC-009).
- With JavaScript enabled: optional enhancements only — theme toggle persisted to
  `localStorage`, `mailto:` assembly on explicit user action. No content may depend on them.
- No interaction requires hover, drag, or a pointing device.
- Focus is always visible (`:focus-visible` outline with ≥ 3:1 contrast against adjacent colors).
- Any animation or transition is disabled under `@media (prefers-reduced-motion: reduce)`.

## 6. Visual and theme contract

| Token | Contract |
|---|---|
| `--bg` / `--fg` | ≥ 7:1 contrast in both light and dark themes |
| `--muted` | ≥ 4.5:1 against `--bg` (AA for body text) |
| `--accent` | ≥ 4.5:1 when used for text; ≥ 3:1 as a graphical accent |
| Default theme | Follows `prefers-color-scheme`; no flash of incorrect theme |
| Touch targets | ≥ 44 × 44 px for interactive elements |
| Body measure | 60–80 characters per line on wide viewports |

## 7. Responsive contract

| Viewport | Contract |
|---|---|
| 320 px | No horizontal scroll; body text ≥ 16 px; navigation usable without hover |
| 768 px | Two-column metadata layout may engage; no overlap or clipping |
| 1440 px | Content column capped (~72 rem) and centered; no full-bleed text lines |

## 8. Print contract

- `@media print`: navigation and interactive-only controls hidden, palette forced to light,
  link URLs printed for external links, entries not split across pages
  (`break-inside: avoid`).
- Output MUST contain the complete CV and fit within 4 pages (FR-016, SC-007).
- No content may exist only in a collapsed/hidden state at print time.

## 9. Performance contract

- Zero third-party requests; no webfonts, no analytics, no CDN.
- HTML + CSS + optional JS ≤ 300 KB uncompressed, excluding `assets/cv/*` and the social image.
- First contentful readability within 2 s on a throttled 4G mobile profile (SC-003).
