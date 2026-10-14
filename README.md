# Aziz BM — Aziz Ben Mahmoud

Personal portfolio: **https://azizverse.github.io/**

The repository root contains the production static site. GitHub Pages publishes the `main` branch root; `.nojekyll` keeps the build assets intact.

## Editable source

React, TypeScript, Vite, and plain CSS source lives in `portfolio/`. Contact, ventures, experience, and education are centralized in `portfolio/src/content.ts`.

```sh
cd portfolio
npm ci
npm run dev
```

Checks and production build:

```sh
npm run lint
npm run build
```

The build emits `portfolio/dist/`. To publish an approved update, replace the root's generated `assets/` folder and copy the **contents** of `portfolio/dist/` into the repository root. Commit both the source and generated files, then push `main`. GitHub Pages publishes the update automatically. Keep `.nojekyll` in the root.

The refined ABM logo is an original SVG redrawn from Aziz's supplied mark, in the site's pale sage palette. Venture descriptions intentionally remain broad; no feature lists, internal implementation, roadmaps, or application screenshots are included.
