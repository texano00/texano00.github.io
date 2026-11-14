# Quickstart — Validation Guide: CV Website on GitHub Pages

Runnable scenarios that prove the feature works end to end. Each maps to a spec requirement or
success criterion. No implementation code here — see `plan.md`, `data-model.md`, and
`contracts/` for the contracts being validated.

---

## Prerequisites

- Repository checked out at `/home/yuri/github/my-cv` (remote:
  `https://github.com/texano00/texano00.github.io.git`)
- Python 3 (for a local static server) — `python3 --version`
- Node.js 18+ **only** if you want the automated audits (`npx html-validate`, `npx lighthouse`)
- Source of truth for content: `Bacciarini Yuri - CV.docx` (and its PDF rendering)

---

## 1. Local preview

```bash
cd /home/yuri/github/my-cv
python3 -m http.server 8000
# open http://localhost:8000/
```

**Expected**: the page renders with all sections; no console errors; no 404s in the network
panel for `/assets/...` requests.

---

## 2. Content fidelity (SC-002, FR-001, FR-018)

1. Open `index.html` in the browser at desktop width.
2. Walk the section inventory from `data-model.md` and tick each item:

| Check | Expected |
|---|---|
| Experience entries | 8, newest first (CRIF team lead → Aperion) |
| Education entries | 2, with `97/110` and `80/100` |
| Certifications | 5 (CKAD, AWS SAA, Terraform, Azure Administrator, FinOps) |
| Awards | 3 (2023 CRIF, 2019 Quidinformatica, 2017 AWS City on a Cloud) |
| Ventures | Pimp it srl (10K+ downloads), Perelli Winery |
| Speaking | Florence 2024, Bologna 2023 |
| Contact channels | email, blog, LinkedIn, GitHub, Twitter/X |
| Metrics | 10+ years, 10+ engineers, 40%, 30%, 5 certifications |

3. Confirm no extraction artifacts are visible: stray digit strings, `[My Blog] (url)` syntax,
   duplicated emoji markers.

**Pass condition**: every row matches the source document; zero invented or missing facts.

---

## 3. Navigation and section order (FR-002, FR-004)

1. Load the page at 1440 px.
2. Use the primary navigation only.

**Expected**: all 12 anchors resolve; **AI Skills appears before Experience**; each section is
reachable in at most two clicks; the "skip to content" link appears on first `Tab` press.

---

## 4. Responsive behaviour (FR-012, SC-005)

Switch device emulation between **320 px**, **768 px**, **1440 px**:

- No horizontal scrolling at any width (`document.documentElement.scrollWidth <= innerWidth`).
- Body text ≥ 16 px; nav usable without hover; nothing overlaps or clips.

---

## 5. Keyboard and screen-reader structure (FR-013, SC-004)

1. Press `Tab` from the address bar and traverse the page.
2. Run `npx html-validate index.html` and an accessibility audit
   (`npx lighthouse http://localhost:8000 --only-categories=accessibility` or the axe extension).

**Expected**: visible focus on every interactive element; one `h1`; no skipped heading levels;
heading outline matches the section order; **zero critical accessibility violations**.

---

## 6. No-JavaScript pass (FR-011, SC-009)

1. Disable JavaScript in the browser (or use `--disable-javascript` in a headless run).
2. Reload.

**Expected**: 100% of content visible; in-page anchors and external links work; the email remains
readable in `[at]` form.

---

## 7. Light / dark themes (FR-014)

1. Force `prefers-color-scheme: light`, reload, screenshot.
2. Force `prefers-color-scheme: dark`, reload, screenshot.

**Expected**: both themes readable, no flash of wrong theme, body text ≥ 4.5:1 contrast and
headings ≥ 7:1 in both.

---

## 8. Print / PDF export (FR-016, SC-007)

1. Open print preview at A4 portrait, default margins.
2. Save as PDF.

**Expected**: complete CV, ≤ 4 pages, navigation hidden, link URLs printed, no entry split across
a page break, no clipped text.

---

## 9. Download channel (FR-008)

1. Click the CV download link.

**Expected**: saves `yuri-bacciarini-cv.pdf` from `/assets/cv/`; the DOCX link saves the source
document; both open correctly outside the browser.

---

## 10. Publish and live verification (FR-009, FR-010, FR-017, SC-006)

```bash
git add -A && git commit -m "feat: publish CV website" && git push origin main

# after ~5 minutes
curl -I  https://texano00.github.io/
curl -s  https://texano00.github.io/ | grep -c '<section'
curl -I  https://texano00.github.io/assets/css/styles.css
curl -I  https://texano00.github.io/assets/cv/yuri-bacciarini-cv.pdf
curl -I  https://texano00.github.io/no-such-page
```

**Expected**: `200` for page, CSS, and PDF; ≥ 10 `<section>` elements; `404` with the custom body
for the unknown path; footer `Last updated` equals the merge date. Full matrix in
`contracts/publishing-contract.md` §6.

---

## 11. Qualitative review (SC-001, SC-008)

Ask 5 reviewers (peers or recruiters) to open the live URL for 30 seconds without guidance, then:

1. Ask them to state the owner's role and three core skill areas → **expect ≥ 4 of 5 correct**
   (SC-001).
2. Ask them to rate readability and visual appeal 1–5 → **expect mean ≥ 4.0** (SC-008).

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Page 404 on `https://texano00.github.io/` | Pages source not set to `main` / root | Repo Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)` |
| Styles missing after publish | Asset paths written as `/my-cv/...` or `./site/...` | Use root-absolute `/assets/...` paths |
| Download link 404s | CV files not moved to `assets/cv/` | Verify the file exists with the URL-safe name |
| Jekyll mangles underscores | `.nojekyll` missing | Add `.nojekyll` at repo root |
| Stale content after merge | Pages build still running | Wait up to 5 minutes; check the Pages deployment status |
