Build a page or app screen by composing existing Void Energy primitives and documented recipes.

## STOP — Read Before Proceeding

You MUST read these files in order before writing any code. Do not skip any step.
Failure to read these files will result in incorrect output.

1. `src/config/component-registry.json` — find the right components for the brief
2. `COMPOSITION-RECIPES.md` — pick the right page archetype
3. `.claude/rules/page-composition.md` — understand composition rules
4. The nearest existing page in `src/components/app/` — follow established patterns

Only proceed to implementation after you have read all four.

## Input

`$ARGUMENTS` is the user brief for the page or screen.

If the brief is empty, ask the user what page should be built and what the desired mood is.

## Goal

Produce page-level work that reuses the shipped system instead of editing or reinventing it.

## Rules

- Prefer editing `src/pages/` and `src/components/app/`
- Edit `src/layouts/` only for shared shell changes
- Treat `src/components/ui/`, `src/components/icons/`, `src/components/core/`, `src/styles/`, `src/types/`, and `src/config/design-tokens.ts` as read-only starter system files
- Use native HTML when the platform already gives the right semantics
- Use Tailwind for page composition and spacing
- Use shipped classes and components for material behavior
- If a request sounds like a missing primitive, prove it by naming the gap after checking the registry

## Working Steps

### 1. Break the brief into parts

Identify:

- page sections
- navigation needs
- forms or data entry
- lists, cards, or media
- charts or metrics
- async states
- desired visual mood

### 2. Map each part to shipped pieces

Use the registry to map each need to:

- a component
- an action
- a controller
- a documented recipe
- native HTML plus shipped classes

### 3. Choose the nearest recipe

Use `COMPOSITION-RECIPES.md` to anchor the page:

- dashboard / app home
- marketing / landing
- settings / preferences
- story / content hub
- analytics / reporting
- auth / onboarding

### 4. Implement with composition only

- Keep spacing generous
- Keep state in `data-*` or ARIA
- Use `surface-raised` and `surface-sunk` wrappers where appropriate
- Use `ActionBtn`, `IconBtn`, `tabs`, `sidebar`, `selector`, `toggle`, `tile`, and charts instead of hand-rolled substitutes

### 5. Verify (REQUIRED)

You MUST run these checks before reporting completion:

- `npm run validate` — confirm no system files were modified
- `npm run check` — confirm no TypeScript errors

Additionally run if applicable:
- `npm run scan` — if you added any inline styles or spacing
- `npm run test` — if you changed logic or state

## Output

After implementation, summarize:

- which existing primitives and recipes were used
- which files changed
- what was verified
- any real gaps found in the current system
