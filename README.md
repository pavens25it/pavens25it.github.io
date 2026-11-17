# Paven S. — Developer Portfolio

Editorial developer portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, statically exported and deployed to GitHub Pages at `https://pavens25it.github.io`.

## Palette

Strictly built using three colors and their opacity variations:
- **Charcoal Black** — `#242321`
- **Earth Brown** — `#76543B`
- **Burnt Amber** — `#C47A36`

## Pages

- `/` — Editorial Home (Hero with scroll-reactive portrait, About, Skills, Featured Projects, Contact)
- `/projects` — Filterable Selected Works / Projects archive
- `/projects/[slug]` — Dedicated project case-study pages for verified GitHub repositories

## Development

```bash
npm install
npm run dev
```

## Static Export

```bash
npm run build
```

Static files are generated in `out/` and deployed automatically via `.github/workflows/deploy.yml`.
