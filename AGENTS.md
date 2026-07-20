# AGENTS.md

## Commands

### Webapp (React/Next.js)

```bash
cd webapp
npm run dev      # Dev server (Turbopack)
npm run build   # Production build
npm run lint    # ESLint
```

### Legacy HTML

```bash
# .impeccable lint (from repo root)
npx impeccable
```

## Project Structure

- `webapp/` — Next.js 16 App Router (React 19, Tailwind v4, shadcn/ui base-nova)
- `webapp/app/` — Pages (homepage, projects, 404)
- `webapp/components/` — UI components + shadcn
- `webapp/data/projects.json` — Project data
- `webapp/public/images/` — Static assets (logo, project images)
- `index.html` — Legacy homepage (superseded by webapp)
- `404.html` — Legacy 404 with black hole (not yet migrated)

## Notes

- shadcn/ui uses **base-nova** style: `@base-ui/react`, NOT radix. Use `render` prop, NOT `asChild`.
- Theme: "Midnight Indigo" — deep navy bg, electric indigo accent, Space Grotesk + DM Sans fonts.
- `.impeccable/hook.cache.json` has lint findings on legacy HTML site.
