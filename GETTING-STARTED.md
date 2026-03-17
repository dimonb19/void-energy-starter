# Getting Started with Void Energy + Claude Code

This guide is for anyone who wants to build websites with AI — even if you've never written code before. Follow each step exactly and you'll have a working development environment in about 15 minutes.

> **See it live first:** Check out the component showcase at [void-energy-ui.vercel.app](https://void-energy-ui.vercel.app) to see what you'll be building with.

---

## Before You Start

You'll need:
- A computer (Mac or Windows)
- About 15 minutes for setup
- **A paid Anthropic account** — either the [Max plan on claude.ai](https://claude.ai) ($20/month) or [API credits on console.anthropic.com](https://console.anthropic.com). This is **not** the same as a regular Claude App subscription — Claude Code needs its own access. Set this up first so you're not surprised later.

---

## Why Claude Code, Not the Claude App?

You might already use Claude at [claude.ai](https://claude.ai). It's great for chatting — but it **cannot build websites**. Here's why:

| Capability | Claude App (claude.ai) | Claude Code (VS Code) |
|---|---|---|
| Read your project files | No | Yes |
| Create and edit code files | No | Yes |
| Run terminal commands | No | Yes |
| Install dependencies | No | Yes |
| Preview your site locally | No | Yes |
| Enforce project rules automatically | No | Yes |
| Access a GitHub repo by link | No | Yes |

The Claude App is like texting an architect. Claude Code is like having the architect in your workshop with all the tools.

**Claude Code runs inside VS Code** (a free code editor) and can directly read, write, and run your project. It follows the rules baked into this repo so that it builds pages correctly every time — using the pre-built design system instead of inventing things from scratch.

---

## What You're Getting

Void Energy is a complete design system — think of it as a box of high-quality LEGO bricks. It includes:

- **40+ pre-built UI components** (buttons, forms, charts, modals, toasts, navigation, etc.)
- **12 built-in visual themes** ("atmospheres") that change the entire look with one switch
- **3 physics presets** (glass/smooth, flat/minimal, retro/pixel-art) that control how surfaces feel
- **Responsive design** that works on phones, tablets, and desktops automatically
- **Dark and light modes** built in

Your job (with Claude Code's help) is to **compose pages** from these pieces. You describe what you want, and Claude Code assembles it using the existing components. No need to design buttons, style forms, or write CSS from scratch.

---

## Step 1: Install the Prerequisites

You need three things installed on your computer. All are free.

### 1a. Install Node.js

Node.js runs JavaScript on your computer (needed to build and preview your site).

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the big green button) for your operating system
3. Run the installer — click Next through everything, accept all defaults
4. Verify it worked — open **Terminal** (Mac: search "Terminal" in Spotlight) or **Command Prompt** (Windows: search "cmd" in Start) and type:
   ```
   node --version
   ```
   You should see a version number like `v22.x.x`.

### 1b. Install VS Code

VS Code is a free code editor made by Microsoft. It's where you'll work.

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download and install for your operating system
3. Open VS Code to make sure it launches

### 1c. Install Git

Git tracks changes to your code and lets you download the project.

**Mac:**
Git usually comes pre-installed. Check by opening Terminal and typing:
```
git --version
```
If it's not installed, macOS will prompt you to install it.

**Windows:**
1. Go to [git-scm.com](https://git-scm.com)
2. Download and install — accept all defaults

---

## Step 2: Get the Project

1. Open **Terminal** (Mac) or **PowerShell** (Windows: search "PowerShell" in Start)
2. Navigate to where you want the project. For example, your Desktop:
   ```
   cd ~/Desktop
   ```
3. Clone (download) the project:
   ```
   git clone https://github.com/dimonb19/void-energy-starter.git
   ```
4. Go into the project folder:
   ```
   cd void-energy-starter
   ```
5. Install the dependencies (the project's building blocks):
   ```
   npm install
   ```
   This will take a minute. You'll see a progress bar.

---

## Step 3: Open in VS Code

1. Open VS Code
2. Go to **File > Open Folder**
3. Select the `void-energy-starter` folder on your Desktop

You should see a file tree on the left with folders like `src/`, `public/`, `tests/`, etc.

---

## Step 4: Install Claude Code Extension

Claude Code is a VS Code extension that puts an AI assistant directly in your editor.

1. In VS Code, click the **Extensions** icon in the left sidebar (it looks like four squares)
2. Search for **"Claude Code"**
3. Click **Install** on the one published by Anthropic
4. After installation, you'll see a Claude icon in the left sidebar

### Set Up Your Account

1. Click the Claude icon in the sidebar
2. It will ask you to sign in — use the Anthropic account you set up in "Before You Start"
3. Follow the sign-in flow
4. Once connected, you'll see a chat panel where you can talk to Claude

---

## Step 5: Verify Everything Works

In the Claude Code chat panel, type:

```
Run npm run validate and tell me if there are any issues
```

Claude will run the validation and report back. If everything is green, you're ready.

To preview your site, ask Claude:

```
Start the dev server so I can preview the site
```

Claude will run `npm run dev` and give you a local URL (usually `http://localhost:4321`). Open that in your browser to see the starter site.

---

## Step 6: Build Your First Page

Now you're ready to create. Here's how to talk to Claude Code:

### Describe What You Want

Be specific about the *type* of page and the *vibe* you want. Examples:

> "Build me a dashboard page with 4 stat cards at the top showing revenue, users, orders, and conversion rate. Below that, add a line chart for revenue over time and a donut chart for traffic sources. Use the 'nebula' atmosphere for a cosmic feel."

> "Create a settings page with a sidebar navigation. Include sections for Profile (name, email, avatar upload), Notifications (toggle switches for email/push/sms), and Appearance (theme picker, density selector). Keep it clean with the 'focus' atmosphere."

> "Build a landing page for a SaaS product. Hero section with a headline, subtitle, and CTA button. Feature grid with 6 tiles below. FAQ section using expandable details. Use the 'paper' atmosphere for a warm, professional look."

### What Claude Code Will Do

When you give it a prompt like this, Claude Code will:

1. Read the project's rules automatically (CLAUDE.md, component registry, recipes)
2. Find the right pre-built components for your needs
3. Create a route file in `src/pages/` (the thin shell)
4. Create a page component in `src/components/app/` (the actual UI)
5. Compose everything using existing components — no new CSS, no new primitives
6. The hooks will automatically format the code, check types, and verify no system files were changed

### Using Slash Commands

The project includes two shortcuts:

- **`/new-page`** — Creates the scaffold for a new page (route + component files)
- **`/build-page`** — Builds a complete page from your description

Try: `/build-page` and describe what you want when prompted.

---

## Step 7: Preview and Iterate

After Claude builds your page:

1. Make sure the dev server is running (`npm run dev`)
2. Open `http://localhost:4321/your-page-name` in your browser
3. Tell Claude what to change:

> "Make the stat cards stack vertically on mobile instead of 2x2"

> "Add a search bar above the data table"

> "Switch the atmosphere to 'terminal' and show me how it looks"

> "The spacing between the hero and features feels too tight — add more breathing room"

Claude will make the changes and you'll see them instantly in your browser.

---

## How It All Works (The Simple Version)

Think of it like building a house:

- **The design system** (components, styles, themes) = pre-fabricated walls, doors, windows, fixtures. They're already built and tested. You don't modify them.
- **Your pages** = the floor plans. You decide what goes where.
- **Claude Code** = the builder. It reads the floor plan (your prompt), picks the right pre-fab pieces, and assembles them.
- **The rules** (CLAUDE.md, hooks) = building codes. They prevent the builder from cutting corners or using raw materials when pre-fab exists.

The key insight: **you never need to build a button, style a form, or design a modal**. It's all already done. You just describe the page layout and content, and Claude composes it from existing pieces.

---

## Tips for Best Results

### Do This
- **Be specific about layout**: "3-column grid on desktop, single column on mobile"
- **Name the components you want**: "Use stat cards, a line chart, and a sidebar"
- **Reference the atmospheres**: "Use the 'solar' atmosphere" or "Give it a dark, techy feel"
- **Iterate in small steps**: Ask for one section at a time, review, then continue
- **Ask Claude to explain**: "What components are available for data display?"

### Don't Do This
- Don't ask Claude to "build a custom button component" — buttons already exist
- Don't use hex colors in page markup — set them once in a custom atmosphere (see Brand Customization below), and the whole site adapts
- Don't ask Claude to edit files in `src/components/ui/` — these are locked
- Don't describe pixel-perfect layouts — use the semantic spacing system instead

### Stuck on Setup?

If any installation step doesn't work, paste the error message into the regular Claude app at [claude.ai](https://claude.ai) and ask it to help you troubleshoot. Yes — the regular Claude can help you set up Claude Code.

### If Something Goes Wrong During Building
- Ask Claude: `Run npm run validate and fix any issues`
- Ask Claude: `Run npm run check and fix any issues`
- If the site looks broken: `Run npm run dev` to restart the dev server
- If you want to undo everything Claude did: `Undo all changes since the last commit`

---

## Publishing Your Site

Once you're happy with your site, you can publish it for free.

### Option A: Netlify (Easiest)
1. Ask Claude: "Help me deploy this site to Netlify"
2. Claude will walk you through:
   - Creating a free Netlify account
   - Running `npm run build` to create the production files
   - Dragging the `dist/` folder to Netlify's deploy zone
3. You'll get a live URL like `your-site.netlify.app`

### Option B: Vercel
1. Ask Claude: "Help me deploy to Vercel"
2. Similar process — free account, connect your repo, automatic deploys

### Option C: GitHub Pages
1. Ask Claude: "Set up GitHub Pages deployment"
2. Free hosting tied to your GitHub account

All three options are free for personal sites and give you a public URL you can share.

---

## Brand Customization

The 12 built-in atmospheres cover a wide range of vibes, but if you need your site to match a specific brand identity — exact colors, exact fonts — you can create a custom atmosphere. This is the one area where you go beyond "just describe it" and give Claude precise specs.

### Custom Brand Colors

Tell Claude something like:

> "Create a custom atmosphere called 'lions' with these exact brand colors:
> - Background: #002147 (dark navy)
> - Surface: rgba(0, 33, 71, 0.8)
> - Primary accent: #FFB81C (gold)
> - Text: #FFFFFF
> - Mode: dark, physics: glass
>
> Register it with voidEngine and set it as the default atmosphere."

Claude will create a theme registration file that maps your brand colors to the system's palette tokens (`bg-canvas`, `energy-primary`, `text-main`, etc.). Every component — buttons, cards, forms, charts — will automatically use your brand colors.

**The full palette has 28 token slots.** You only need to specify the ones you care about — the system fills in the rest from a sensible base. The key ones:

| Token | What it controls |
|---|---|
| `bg-canvas` | Page background |
| `bg-surface` | Card/panel backgrounds |
| `bg-sunk` | Input/well backgrounds |
| `energy-primary` | Buttons, links, focus rings — your main brand accent |
| `energy-secondary` | Hover states, borders — your secondary accent |
| `text-main` | Headings and primary text |
| `text-dim` | Body text |
| `text-mute` | Captions and placeholders |
| `color-success` | Success states (green by default) |
| `color-error` | Error states (red by default) |
| `font-atmos-heading` | Heading font family |
| `font-atmos-body` | Body font family |

### Custom Fonts

The system ships with 11 font families. If your brand uses a different font (e.g., Montserrat, Roboto, your company's custom typeface), tell Claude:

> "Add the font Montserrat to this project. Download the Regular and Bold .woff2 files, put them in public/fonts/, add @font-face declarations in src/styles/config/_fonts.scss, and use it in my 'lions' atmosphere as both the heading and body font."

Claude will:
1. Place the `.woff2` files in `public/fonts/`
2. Add `@font-face` rules to the font stylesheet
3. Set `font-atmos-heading` and `font-atmos-body` in your custom atmosphere to reference the new font

**Where to get .woff2 files:** [Google Fonts](https://fonts.google.com) has thousands of free fonts. Download the font, then use a converter like [CloudConvert](https://cloudconvert.com/ttf-to-woff2) to get `.woff2` format if needed.

### Making Your Brand Theme the Default

Once your custom atmosphere exists, tell Claude:

> "Make 'lions' the default atmosphere so the site loads with it."

Claude will update the default in the configuration so your brand theme is what visitors see first.

### Example: Full Brand Setup Prompt

Here's a single prompt that does everything at once:

> "Set up a custom brand atmosphere called 'acme' for my company:
> - Colors: primary #E63946, background #1D3557, surface rgba(29, 53, 87, 0.7), text white
> - Font: Poppins (download Regular and Bold weights)
> - Mode: dark, physics: flat
> - Make it the default atmosphere
> - Then build a landing page with a hero section, 3 feature cards, and a CTA."

---

## Glossary

If you see these terms and aren't sure what they mean:

| Term | Meaning |
|---|---|
| **Component** | A reusable UI piece (button, form field, chart, etc.) |
| **Atmosphere** | A complete visual theme (colors, fonts, mood) |
| **Physics preset** | How surfaces behave (glass=smooth, flat=minimal, retro=pixel-art) |
| **Route** | A page URL (e.g., `/dashboard` maps to `src/pages/dashboard.astro`) |
| **Hydration** | Making a page interactive (static HTML becomes a live app) |
| **Token** | A named design value (e.g., `gap-lg` instead of `32px`) |
| **Dev server** | A local preview of your site that updates as you make changes |
| **Build** | Compiling your site into optimized files ready for the internet |
| **Deploy** | Putting your built site on a server so others can see it |
| **Repository (repo)** | A project folder tracked by Git |
| **Clone** | Downloading a copy of a repo to your computer |
| **Dependencies** | Packages your project needs to work (installed by `npm install`) |
| **Terminal** | A text-based interface for running commands on your computer |

---

## Quick Reference

| What you want | What to tell Claude |
|---|---|
| New page | `/new-page` or "Create a new page called [name]" |
| Build a full page | `/build-page` or describe what you want in detail |
| Change theme | "Switch to the [name] atmosphere" |
| Custom brand theme | "Create a custom atmosphere called [name] with these colors: ..." |
| Custom font | "Add the font [name] to the project and use it in my atmosphere" |
| Preview site | "Start the dev server" |
| Check for errors | "Run npm run validate" |
| See available components | "What components are available for [need]?" |
| Undo changes | "Undo all changes since the last commit" |
| Deploy | "Help me deploy this site to Netlify" |
