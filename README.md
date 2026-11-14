# texano00.github.io

Personal CV site of **Yuri Bacciarini** — Team Lead & Manager (10+ engineers) / DevOps Engineer /
Cloud Engineer.

Published at **https://texano00.github.io/** from the root of the `main` branch (GitHub user site,
no build step, no CI).

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Structure

```text
index.html                  # the entire site (semantic sections + anchors)
404.html                    # fallback page
.nojekyll                   # serve files verbatim, no Jekyll processing
favicon.svg
assets/css/styles.css       # design tokens, layout, responsive, dark mode, print
assets/js/enhance.js        # optional enhancements (theme toggle, mailto upgrade)
assets/img/og-card.png      # social preview card (source: og-card.svg)
assets/cv/                  # downloadable CV in PDF and DOCX
specs/001-cv-website/       # spec, plan, research, data model, contracts, tasks
```

## Updating the CV

1. Edit the relevant `<section>` in `index.html` — it is the single source of truth for page
   content.
2. Replace `assets/cv/yuri-bacciarini-cv.pdf` and `.docx` if the official documents changed.
3. Update the footer date (`<time datetime="...">`) so readers can see freshness.
4. Commit and push to `main`. GitHub Pages redeploys automatically within a few minutes.

Content rules: nothing may be published that the CV does not evidence — especially in the
**AI Skills** section. Editorial rewording is fine; facts (employers, dates, metrics,
credentials) are not.

## Validation

```bash
npx html-validate index.html 404.html
```

See `specs/001-cv-website/quickstart.md` for the full validation matrix (content fidelity,
responsive checks, no-JS pass, print export, live publish verification).

