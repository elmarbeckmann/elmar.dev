# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for Elmar Beckmann (https://elmar.dev). Nx 23 monorepo with a single Angular 22 standalone-component app. No routing, no state management, no backend API — it's a static single-page site.

## Commands

| Task             | Command                                                       |
| ---------------- | ------------------------------------------------------------- |
| Install          | `npm install`                                                 |
| Dev server       | `nx serve elmardotdev` (http://localhost:4200)                |
| Build (prod)     | `nx build elmardotdev`                                        |
| Dev build        | `nx build elmardotdev -c development`                         |
| Lint             | `npm run lint`                                                |
| Lint app only    | `nx lint elmardotdev`                                         |
| Format           | `npm run format:write`                                        |
| Format check     | `npm run format:check`                                        |
| Unit tests       | `nx test elmardotdev`                                         |
| Single test file | `nx test elmardotdev --testPathPattern=app.component.spec.ts` |
| Single test name | `nx test elmardotdev --testNamePattern="should create"`       |
| E2E tests        | `nx e2e elmardotdev-e2e`                                      |
| Affected tests   | `npm run affected:test`                                       |

Use `nx` commands. There is no `angular.json`, so the `ng` CLI does not work in this workspace.

## Architecture

- **Monorepo**: Nx workspace with two projects — `elmardotdev` (app) and `elmardotdev-e2e` (Cypress)
- **App entry**: `apps/elmardotdev/src/main.ts` bootstraps a standalone `AppComponent` (no NgModule)
- **Single component**: `apps/elmardotdev/src/app/app.component.ts` — the entire site is one component
- **Styling**: SCSS with Bootstrap 4.3.1 (CSS-only, no JS), Google Fonts (Roboto Slab, Kalam), DevIcon
- **Theming**: Four switchable themes via a dropdown. Each theme lives in its own SCSS partial under `apps/elmardotdev/src/app/themes/` (`_original.scss`, `_neumorphism.scss`, `_brutalism.scss`, `_maximalism.scss`). The main `app.component.scss` holds shared base styles and imports all theme files. A random theme is loaded on each page visit.
- **Theme conventions**: HTML uses generic class names (`content-card`, `skill-item`, `style-picker`, etc.) — no theme-specific references in the template. Each theme scopes its styles under `.theme-<name>`, applied via `[ngClass]` on the page wrapper.
- **Build**: `@angular/build:application` (esbuild). Output goes to `dist/apps/elmardotdev/browser`.
- **Testing**: Jest for unit tests, Cypress for E2E (`apps/elmardotdev-e2e/cypress.config.ts`). The `test`, `lint` and `e2e` targets are inferred by the Nx plugins in `nx.json`.
- **libs/**: Empty — no shared libraries exist

## Code Conventions

- Single quotes (Prettier enforced via `.prettierrc`)
- 2-space indentation (EditorConfig)
- Component selector prefix: `elmardotdev` (e.g., `elmardotdev-root`), kebab-case
- Directive selector prefix: `elmardotdev`, camelCase
- Avoid `any`; prefer union types or generics
- Use `const` by default, `let` only when reassigned
- Group imports: Angular/third-party, then workspace, then relative (blank line between groups)
- File naming: kebab-case per Angular conventions
- Nx module boundary enforcement is enabled

## Key Config Files

- `apps/*/project.json` — build/serve targets and budgets
- `nx.json` — workspace config and inference plugins
- `eslint.config.mjs` (root and per project) — ESLint flat config
- `.prettierrc` — `{ "singleQuote": true }`
- `tsconfig.base.json` — target ES2022, module esnext
