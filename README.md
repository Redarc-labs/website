# Redarc Labs Site

This is the codebase for [redarclabs.com](https://redarclabs.com), built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

## Project Structure

```text
/
├── public/
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── components/      AnimatedLogo, Nav, ThemeToggle, Footer
│   ├── content/         markdown collections: curriculum, workshops, talks, research-log
│   ├── content.config.ts
│   ├── layouts/Base.astro
│   ├── lib/date.ts
│   ├── pages/           index, community, curriculum/, workshops/, talks, research-log/
│   └── index.css
├── docs/superpowers/    design spec and implementation plan for the 2026-09 rebrand
└── astro.config.mjs
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## Deployment

This site is statically generated (SSG) and does not require an adapter.

To deploy on Cloudflare Pages:

1. Connect your GitHub repository to Cloudflare Pages.
2. Set the framework preset to **Astro**.
3. **Build command:** `npm run build`
4. **Build output directory:** `dist`
