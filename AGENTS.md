# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro site with Svelte components and Tailwind CSS.
- `src/pages/`: route entrypoints (`index.astro`, `projects.astro`, blog routes).
- `src/components/`: feature components grouped by domain (`Home/`, `About/`, `Projects/`, `KansenMatrix/`).
- `src/lib/components/ui/`: reusable UI primitives.
- `src/content/blog/`: Markdown/MDX blog content.
- `src/styles/global.css`: global theme tokens and base styles.
- `src/assets/` and `public/`: images and static files.
- `dist/`: build output (generated).

## Build, Test, and Development Commands
Use Bun in this project.
- `bun install`: install dependencies.
- `bun run dev`: start local dev server (Astro).
- `bun run build`: production build to `dist/`.
- `bun run preview`: serve the built site locally.
- `bun run astro -- check`: run Astro/type checks.

Example:
```bash
bun install
bun run dev
```

## Coding Style & Naming Conventions
- Follow existing file-local formatting (current code mixes tab-indented `.astro` and space-indented `.svelte`).
- Use `PascalCase` for component files (`HeroSocials.svelte`), kebab/lowercase for content filenames, and clear route names in `src/pages/`.
- Prefer small, composable components grouped by feature directory.
- Keep Tailwind utility usage readable; extract repeated UI patterns into `src/lib/components/ui/`.

## Testing Guidelines
There is no dedicated automated test suite yet. Minimum validation for each change:
- `bun run astro -- check`
- `bun run build`
- Manual browser check for affected pages/components, including mobile layouts.

If adding tests, colocate them with the feature (or in a dedicated `tests/` folder) and document run commands in `package.json`.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit messages (for example: `fix header with hamburger`, `responsive projects`). Keep that style, but be more specific when possible.
- Commit format: concise imperative summary of one logical change.
- PRs should include: purpose, key files changed, manual verification steps, and screenshots for UI updates.
- Link related issues/tasks when available.
