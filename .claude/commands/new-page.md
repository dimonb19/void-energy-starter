Create a new page using the standard Void Energy starter scaffold.

## Input

`$ARGUMENTS` is the page name and brief, for example:

```text
/new-page account settings page with profile form and notification toggles
```

If the input is missing, ask for:

- route name
- page purpose
- desired mood

## Mandatory Read Order

1. `CLAUDE.md`
2. `AI-PLAYBOOK.md`
3. `src/config/component-registry.json`
4. `COMPOSITION-RECIPES.md`
5. `.claude/rules/page-composition.md`
6. `.claude/rules/new-page.md`
7. nearest local analog in `src/pages/`, `src/components/app/`, or shared app-level `src/components/`

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

## Verification

Run the narrowest checks that fit the result:

- `npm run validate`
- `npm run check`
- `npm run scan`

## Output

After creating the page, summarize:

- route file created
- page-level Svelte file created
- shipped primitives used
- any real gaps found
