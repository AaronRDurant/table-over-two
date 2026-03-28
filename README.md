# Table Over Two

[Table Over Two](https://www.tableovertwo.com), built with Next.js and Ghost CMS, explores what drives success in Supercross and motocross.

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 3
- TypeScript
- Ghost (headless CMS, Content API)
- @tailwindcss/typography (prose for article HTML)
- Heroicons and Font Awesome (UI icons)
- cmdk (⌘K / Ctrl+K theme palette)
- ESLint 9 (flat config) and Prettier 3

## Getting started

Requires Node 18+.

Add `.env.local` with `GHOST_API_URL` and `GHOST_CONTENT_API_KEY` (legacy `GHOST_ADMIN_API_KEY` is still accepted as a fallback). Then:

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## Project structure

- `src/app` — App Router layout, pages, `globals.css`, and `sidebar.tsx`
- `src/app/[slug]` — article routes and metadata
- `src/app/about`, `archive`, `topics` — static routes and dynamic `topics/[tagSlug]`
- `src/app/api/card-image` — same-origin image proxy for social preview images
- `src/api/ghost.ts` — Ghost Content API helpers (posts, pages, tags)
- `src/providers/theme.tsx` — `ThemeProvider`, light / dark / system, OEM reading palettes
- `src/lib/themes/*` — palette tokens, `localStorage` keys, inline boot script (no flash), cmdk search strings
- `src/components/theme/*` — sidebar theme card and command palette
- `src/types.ts` — shared TypeScript types for Ghost payloads
- `public` — favicons, logo, web app manifest, default social image
- `eslint.config.mjs` — Next.js + TypeScript + import sort + Prettier compatibility
- `.prettierrc` / `.prettierignore` — formatting scope
- `.env.local` — Ghost URL and Content API key (gitignored; not committed)

## Scripts

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Development server           |
| `npm run build`        | Production build             |
| `npm run start`        | Run production build locally |
| `npm run lint`         | ESLint (max warnings 0)      |
| `npm run lint:fix`     | ESLint with `--fix`          |
| `npm run format`       | Prettier write               |
| `npm run format:check` | Prettier check (CI-friendly) |

## License

All rights reserved.
