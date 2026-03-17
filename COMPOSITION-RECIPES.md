# Composition Recipes

Compact page archetypes for AI page-building. Use this after `CLAUDE.md`, `AI-PLAYBOOK.md`, and `src/config/component-registry.json`.

## General Scaffold

```svelte
<div class="container flex flex-col gap-2xl py-2xl">
  <section class="flex flex-col gap-xl">
    <div class="surface-raised p-lg flex flex-col gap-lg">
      <div class="flex flex-col gap-xs">
        <h2>Section title</h2>
        <p class="text-dim">Short explanation.</p>
      </div>

      <div class="surface-sunk p-md flex flex-col gap-md">
        <!-- content -->
      </div>
    </div>
  </section>
</div>
```

## Dashboard / App Home

Use when the page has summary metrics, quick actions, and recent activity.

- Header: native heading + short copy + `ActionBtn` / `IconBtn`
- Summary row: `stat-card`, `progress-ring`, or compact raised cards
- Navigation: `breadcrumbs` for hierarchy, `tabs` for mode switching, `sidebar` for section nav
- Activity or lists: native lists/tables inside `surface-sunk`
- Charts: `line-chart`, `bar-chart`, `donut-chart`

Avoid:

- Custom KPI widgets when `stat-card`, charts, or native markup already cover the need
- Dense card spacing; use `gap-lg`

## Marketing / Landing Page

Use when the page is mostly narrative, CTA-driven, and section based.

- Hero: native headings, paragraph text, `ActionBtn`, `IconBtn`, `btn-ghost`
- Feature grid: raised cards with icons, short text, and native links/buttons
- Social proof or highlights: `tile` if content is story-like, otherwise native cards
- FAQ: native `<details>` groups before inventing accordion widgets
- Footer CTAs: native buttons and links with shipped button classes

Avoid:

- Building a fake design-system `Hero` component
- Recreating carousels or accordions without proving a real need

## Settings / Preferences

Use when the page is form-heavy and grouped by concern.

- Page nav: `sidebar` or `tabs`
- Form groups: raised card per category, sunk wells per subgroup
- Inputs: `edit-field`, `selector`, `switcher`, `toggle`, `edit-textarea`, `slider-field`
- Async assist: `generate-field` and `generate-textarea`
- Save/cancel: native buttons with `btn-*` classes or `ActionBtn`

Recommended structure:

- Account
- Appearance
- Notifications
- Danger zone

## Story / Content Hub

Use when the page is about browsable media, editorial sections, or token-gated content.

- Hero or spotlight: raised card with native media/text layout
- Category rails: `tile` inside horizontal strips
- Filtering: `tabs`, `switcher`, `selector`, `search-field`
- Metadata: native text groups, badges, chips, and links
- Gated content: `tile` with `gate`

Avoid:

- Rebuilding cards for story browsing when `tile` already exists
- Hiding key state only in color; use labels and icons

## Analytics / Reporting

Use when the page is data heavy but still explanatory.

- Top row: `stat-card` or compact raised summaries
- Visualization block: `line-chart`, `bar-chart`, `donut-chart`
- Controls: `tabs`, `selector`, `switcher`
- Definitions and notes: native text blocks below charts
- Drill-down lists: native tables or list markup inside sunk wells

Guideline:

- Pair every chart with a visible title, short description, and value-format explanation

## Auth / Onboarding

Use when the page is focused on one primary task.

- Narrow centered container
- One raised surface as the primary shell
- `edit-field`, `password-field`, `toggle`, `selector`
- `ActionBtn` for primary intent
- `btn-ghost` for secondary links and dismissive actions
- `toast` for async feedback, `modal` for confirmation or help

Avoid:

- Multi-panel complexity unless the flow truly requires it
- Tiny spacing inside the primary card

## Data Loading

Use these patterns when a page fetches data or performs async actions.

### Layout loading (initial page data)

Use `Skeleton` to hold the layout shape while data loads:

```svelte
{#if loading}
  <div class="surface-raised p-lg flex flex-col gap-lg">
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="paragraph" lines={3} />
    <Skeleton variant="card" height="200px" />
  </div>
{:else}
  <!-- real content -->
{/if}
```

### Background loading (user-initiated actions)

Use `toast.promise` for save, delete, and submit flows:

```svelte
async function save() {
  await toast.promise(api.saveSettings(data), {
    loading: 'Saving settings...',
    success: 'Settings saved',
    error: 'Failed to save settings',
  });
}
```

Use `toast.loading` when you need step-by-step control:

```svelte
async function importData() {
  const loader = toast.loading('Importing data...');
  try {
    const result = await api.importData(file);
    loader.success(`Imported ${result.count} records`);
  } catch (err) {
    loader.error('Import failed');
  }
}
```

### AI generation loading

Use `LoadingSpin` (icon) inside buttons during generation, and `LoadingQuill` for branded AI loading states:

```svelte
<button disabled={generating}>
  {#if generating}
    <LoadingSpin class="icon" data-size="sm" /> Generating...
  {:else}
    Generate
  {/if}
</button>
```

Or use the shipped `GenerateField` / `GenerateTextarea` which handle loading states automatically.

### Avoid

- Custom loading spinners or progress bars when `Skeleton` or `toast` already cover the need
- Blocking the entire page when only a section is loading

## Before Creating Something New

Ask these in order:

1. Is this already a registry component?
2. Is this already a registry action or controller?
3. Is this a documented recipe built from native HTML and shipped classes?
4. Is the missing need real, or am I failing to compose the existing system correctly?
