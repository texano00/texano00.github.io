# Contract: Publishing (GitHub Pages User Site)

**Purpose**: define exactly how the page becomes public, so FR-009, FR-010, FR-017 and SC-006 can
be verified without reading the implementation.

---

## 1. Hosting topology

| Property | Value |
|---|---|
| Repository | `texano00/texano00.github.io` (remote already configured) |
| Site type | **User site** — repository name equals `<username>.github.io` |
| Publish source | Branch `main`, folder `/` (repository root). *Requires Pages → Source = "Deploy from a branch", branch `main`, folder `/root`* |
| Public origin | `https://texano00.github.io/` |
| Base path | `/` — **no** sub-path, so all asset and anchor URLs are root-relative |
| Build step | none |
| Deploy artifact | none |

## 2. Required files at the publish root

| Path | Role | Must exist |
|---|---|---|
| `index.html` | The published page | yes |
| `assets/css/styles.css` | Styles (tokens, layout, print, dark mode) | yes |
| Official CV (Google Docs) | External canonical CV linked from the page — no in-repo copy | yes |
| `.nojekyll` | Serve files verbatim, skip Jekyll | yes |
| `favicon.svg` | Browser icon | yes |
| `404.html` | Fallback for unknown paths | yes |
| `assets/img/og-card.png` | Social preview card | yes |
| `assets/js/enhance.js` | Optional progressive enhancement | optional |

## 3. Publish trigger contract

| Rule | Contract |
|---|---|
| Trigger | Any push/merge to `main` |
| Manual steps | none after merge |
| Latency | Public within 5 minutes of merge (SC-006) |
| Feature work | Developed on `001-cv-website`, merged to `main` to publish |
| Rollback | Revert the offending commit on `main`; previous content is public again after the next build |

## 4. URL and asset contract

- All internal references are **root-absolute** (`/assets/css/styles.css`, `#experience`) or
  document-relative; no `./site/` or `/my-cv/` prefixes.
- No URL in the repository may contain spaces or parentheses, and no CV file is published from
  the repository at all: the CV lives in Google Docs and the page links to it.
- Canonical link points to `https://texano00.github.io/`.
- Download links use the `download` attribute with a human-readable filename.

## 5. What is intentionally public

The user-site model publishes the whole repository (`specs/`, `.github/`, `.specify/` are
reachable but unlinked). Accepted because the repository is public regardless and contains no
secrets. Adding a `CNAME` for a custom domain is out of scope for this feature.

## 6. Verification contract

A publish is considered valid only when all checks pass against the **live** origin:

| Check | Command / method | Pass condition |
|---|---|---|
| Reachability | `curl -I https://texano00.github.io/` | `HTTP/2 200`, valid certificate, no redirect loop |
| Content present | `curl -s https://texano00.github.io/ \| grep -c '<section'` | ≥ 10 sections |
| Assets resolve | `curl -I https://texano00.github.io/assets/css/styles.css` | `200`, `content-type: text/css` |
| Official CV link | page contains the Google Docs URL with `&ref=yuribacciarini.com` | present in header and contact block |
| No CV copy published | `curl -I https://texano00.github.io/assets/cv/yuri-bacciarini-cv.docx` | `404` |
| No Jekyll interference | `curl -I https://texano00.github.io/.nojekyll` (or check render fidelity) | Files served as committed |
| Freshness | compare footer `Last updated` with merge date | Same day |
| 404 fallback | `curl -I https://texano00.github.io/no-such-page` | `404` with the custom page body |

## 7. Out of scope

Custom domain (`CNAME`), HTTPS certificate customization, branch previews, analytics, CI quality
gates, and any server-side behaviour.
