<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- Architecture: feature-sliced App Router. `app/**/page.tsx` only composes feature components and places `<Suspense>`; features live in `features/<domain>/`.
- Styling: plain CSS with semantic tokens in `app/globals.css` (Apple-native theme, light + dark via `prefers-color-scheme`). Feature stylesheets (`features/<domain>/<domain>.css`) use tokens only — no raw colors.
- Filenames: kebab-case; component exports PascalCase; skeletons are exported from the same file as their component, defined last.
