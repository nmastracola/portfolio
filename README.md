# nicholas-mastracola

Personal site: landing page + CV now, blog later. Astro, no CMS, no framework
runtime beyond what Astro ships by default.

## Decisions baked into this scaffold

- **No CMS.** CV lives in `src/content/cv/resume.json`, validated against a
  schema in `src/content.config.ts`. Edit the JSON, commit, deploy — same
  workflow as everything else in this repo.
- **Blog via Astro content collections**, scaffolded but empty
  (`src/content/blog/`). Add `.md` files there when you're ready; the schema
  is already defined.
- **Fonts are self-hosted** via `@fontsource-variable`, not loaded from
  Google's CDN — no third-party request, no render-blocking external fetch.
  Space Grotesk for display/headers, Inter for body. Swap these in
  `BaseLayout.astro` and `global.css` if you land on different faces.
- **Color tokens** live in `src/styles/global.css` as CSS custom properties —
  warm cream/charcoal mid-century palette, light and dark variants. Change
  the hex values in one place, the whole site updates.
- **Theme toggle** defaults to system preference (`prefers-color-scheme`),
  and a manual override persists via `localStorage`. The inline script in
  `BaseLayout.astro`'s `<head>` runs before first paint to avoid a flash of
  the wrong theme.
- **CV page renders from data**, not hand-written HTML — see
  `src/pages/cv.astro`. There's also a "Download PDF" link pointing at
  `/resume.pdf`; drop a generated PDF into `public/` for that link to work.
  The HTML page is the primary artifact; the PDF is the export.

## Not decided yet / left as TODOs in the code

- Landing page positioning line (`src/pages/index.astro`) — what the site
  asserts about you in one sentence. Marked with a `TODO` comment.
- Headshot crop and placement on the landing page vs. CV page.
- "Selected work" section content — intentionally left empty rather than
  filled with placeholder cards.
- Actual CV content in `resume.json` — currently placeholder data matching
  the shape, not your real history.

## Getting started

```bash
npm install
npm run dev
```

Then visit `http://localhost:4321`.

## Deploying

Static output (`output: 'static'` in `astro.config.mjs`) — this builds to
plain HTML/CSS/JS with no server runtime required. Any static host works
(Cloudflare Pages, Netlify, GitHub Pages, or your own homelab if you want to
serve it yourself). Update `site` in `astro.config.mjs` to your actual domain
before deploying.
