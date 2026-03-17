# AI Playbook

Compact operating guide for autonomous page building in the `void-energy-starter`.

## Job

Build pages and app screens by composing the shipped system.

- Reuse existing primitives, actions, controllers, layouts, and native HTML patterns.
- Default edit targets are `src/pages/` and `src/components/app/`. Edit `src/layouts/` only for shared shell changes.
- Treat `src/components/ui/`, `src/components/icons/`, `src/components/core/`, `src/styles/`, `src/types/`, and `src/config/design-tokens.ts` as read-only starter system files.

## Read Order

Read these in order before inventing anything:

1. `CLAUDE.md`
2. `AI-PLAYBOOK.md`
3. `src/config/component-registry.json`
4. `COMPOSITION-RECIPES.md`
5. `.claude/rules/*.md` relevant to the file type
6. nearest local analog in `src/pages/`, `src/components/app/`, or shared app-level `src/components/`

## Build Order

1. Parse the request into sections, interactions, data, and mood.
2. Check the registry for shipped primitives, actions, controllers, and patterns.
3. Pick the nearest recipe from `COMPOSITION-RECIPES.md`.
4. Clone the starter route pattern: thin `.astro` shell plus page-level `.svelte` screen.
5. Compose with shipped pieces. Do not replace the system.
6. Run the narrow verification set before handoff.

## Compose-Only Rules

- Native HTML is valid Void Energy output when the system already styles it correctly.
- Tailwind owns page composition, responsive layout, spacing, and consumer-side geometry.
- Shipped SCSS owns materials, blur, shadows, borders, and primitive-internal behavior.
- State belongs in `data-*` and ARIA, not modifier classes.
- If the registry does not cover a real need, stop and ask instead of inventing a new primitive.

## No-Invention Matrix

If the request sounds like this, use the shipped system first:

- Choice picker: `Selector`, `Switcher`, `Tabs`, `Combobox`
- Boolean control: `Toggle`
- Text input: `EditField`, `GenerateField`, `EditTextarea`, `GenerateTextarea`, `SearchField`
- Navigation: `Sidebar`, `Breadcrumbs`, `Tabs`, `Dropdown`, `navlink`
- Actions: native `<button>` with `btn-*`, `ActionBtn`, `IconBtn`
- Feedback: `toast`, `modal`, `PortalLoader`, `Skeleton`, `ProgressRing`
- Data display: `Tile`, `StatCard`, `LineChart`, `BarChart`, `DonutChart`
- Motion: `tooltip`, `morph`, `kinetic`, `narrative`
- Drag and reorder: `draggable`, `dropTarget`, `reorderByDrop`, `resolveReorderByDrop`

## Responsive Breakpoints

Mobile-first. All breakpoints are `min-width` and sourced from `src/config/design-tokens.ts`.

| Prefix           | Min-width | Container max | Typical use                           |
| ---------------- | --------- | ------------- | ------------------------------------- |
| _(default)_      | 0px       | 100%          | Single-column mobile layout           |
| `tablet:`        | 768px     | 720px         | Two-column grids, side-by-side cards  |
| `small-desktop:` | 1024px    | 960px         | Sidebar + content, three-column grids |
| `large-desktop:` | 1440px    | 1320px        | Wide dashboards, spacious layouts     |
| `full-hd:`       | 1920px    | 1600px        | Full HD monitors                      |
| `quad-hd:`       | 2560px    | 1920px        | Ultra-wide displays                   |

Common responsive patterns:

- `grid grid-cols-1 tablet:grid-cols-2 gap-lg` — two-column split
- `grid grid-cols-1 tablet:grid-cols-2 small-desktop:grid-cols-3 gap-lg` — three-column grid
- `flex flex-col tablet:flex-row gap-lg` — stack on mobile, row on tablet
- `hidden tablet:block` — show only on tablet and above
- `tablet:hidden` — show only on mobile

Container queries (`@container`) are available for component-level responsive behavior. Add `@container` class to the parent, then use `@sm:`, `@md:`, `@lg:`, `@xl:` on children.

## Page Defaults

- Page wrapper: `container flex flex-col gap-2xl py-2xl`
- Section wrapper: `flex flex-col gap-xl`
- Floating surfaces: `surface-raised p-lg flex flex-col gap-lg`
- Sunk wells: `surface-sunk p-md flex flex-col gap-md`
- Tight coupling only: `gap-xs` for label -> input, icon + text, title + subtitle

## When You Hit a Gap

If the registry does not cover a need, do not invent a new primitive. Instead, report:

1. What the user requested
2. Which registry entries you checked and why they do not fit
3. The closest composition you can build from existing pieces
4. What specific capability is missing

This turns "I'm stuck" into a useful handoff that the user can resolve by either:

- pointing you to a registry entry you missed
- confirming the closest composition is good enough
- acknowledging a real gap that requires system-level work

## Verification

Run the narrowest set that matches the change:

- `npm run validate` before final handoff when consumer files changed
- `npm run check` for registry, Astro, TypeScript, and Svelte validation
- `npm run scan` for raw token-law values in consumer-editable files
- `npm run test` when logic, state, or controllers change

If a task explicitly changes the shipped system surface, treat that as starter maintenance work and update the protected baseline intentionally afterward.
