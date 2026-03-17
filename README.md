# Void Energy Starter

Composition-only starter for building Astro + Svelte pages with shipped Void Energy primitives.

## Workflow

Use the starter the same way the AI docs describe:

1. Read `CLAUDE.md`
2. Read `AI-PLAYBOOK.md`
3. Read `src/config/component-registry.json`
4. Read `COMPOSITION-RECIPES.md`
5. Build routes in `src/pages/` and page-level screens in `src/components/app/`

Keep route files thin. Shared shell changes belong in `src/layouts/`. Shipped system files stay read-only unless you are intentionally doing starter maintenance.

## Protected System Surface

These paths are treated as shipped system files:

- `src/components/ui/`
- `src/components/icons/`
- `src/components/core/`
- `src/styles/`
- `src/types/`
- `src/config/design-tokens.ts`

`npm run validate` enforces that surface against the tracked baseline snapshot in `.void-starter-baseline.json`.

If you intentionally approve a new shipped-system baseline:

1. make the system change deliberately
2. run `npm run build:tokens` if tokens changed
3. run `npm run baseline:update`

Advanced override is still available through `.void-starter-baseline` or `VOID_VALIDATE_BASELINE_REF=<ref>` if you need a git-ref baseline.

## Commands

- `npm run dev`
- `npm run build`
- `npm run validate`
- `npm run check`
- `npm run scan`
- `npm run test`
- `npm run baseline:update`

## Starter Files

- `src/pages/index.astro` is the starter example route.
- `src/pages/_template.astro` is the route scaffold to clone.
- `src/components/app/HomePage.svelte` is the example composed screen.
- `src/components/app/TemplatePage.svelte` is the page-level scaffold paired with `_template.astro`.
