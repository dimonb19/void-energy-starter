Create a new page using the standard Void Energy starter scaffold.

## STOP — Read Before Proceeding

You MUST read these files in order before writing any code. Do not skip any step.
Failure to read these files will result in incorrect output.

1. `src/config/component-registry.json` — find the right components for the page
2. `COMPOSITION-RECIPES.md` — pick the right page archetype
3. `.claude/rules/new-page.md` — understand the scaffold template
4. `.claude/rules/page-composition.md` — understand composition rules
5. The nearest existing page in `src/components/app/` — follow established patterns

Only proceed to implementation after you have read all five.

## Input

`$ARGUMENTS` is the page name and brief, for example:

```text
/new-page account settings page with profile form and notification toggles
```

If the input is missing, ask for:

- route name
- page purpose
- desired mood

## What To Create

By default create both:

1. `src/pages/<route>.astro`
2. `src/components/app/<PascalCase>Page.svelte`

The `.astro` file should stay thin and usually only:

- import `Layout`
- import the page-level Svelte screen
- pass title and optional breadcrumbs
- render the Svelte screen with `client:load`

The `.svelte` screen should own:

- local state
- sections
- forms
- lists
- charts
- page actions

## Rules

- Treat `src/components/ui/`, `src/components/icons/`, `src/components/core/`, `src/styles/`, `src/types/`, and `src/config/design-tokens.ts` as read-only starter system files
- Reuse shipped primitives from the registry
- Use `src/pages/_template.astro` and `src/components/app/TemplatePage.svelte` as the starter scaffold, together with `.claude/rules/new-page.md`
- If the registry does not cover a needed primitive, stop and ask
- Prefer native HTML when the platform already gives the right semantics

## Verification (REQUIRED)

You MUST run these checks before reporting completion:

- `npm run validate` — confirm no system files were modified
- `npm run check` — confirm no TypeScript errors

Additionally run if applicable:
- `npm run scan` — if you added any inline styles or spacing

## Output

After creating the page, summarize:

- route file created
- page-level Svelte file created
- shipped primitives used
- any real gaps found
