# Agent Guide (elmardotdev)

This file describes how to work in this Nx + Angular repository.
Follow it when making changes, running commands, or reviewing code.

## Repository Overview

- Nx workspace with Angular app `elmardotdev`
- Unit tests: Jest
- E2E tests: Cypress (`cypress.config.ts`)
- Linting: ESLint (Nx + Angular ESLint)
- Formatting: Prettier (single quotes)

## Primary Projects

- App: `elmardotdev` (apps/elmardotdev)
- E2E: `elmardotdev-e2e` (apps/elmardotdev-e2e)

## Install

- `npm install`

## Dev Server

- `nx serve elmardotdev`
- Default URL: http://localhost:4200

## Build

- Production build (default): `nx build elmardotdev`
- Development build: `nx build elmardotdev -c development`

## Lint

- `npm run lint` (runs `nx run-many -t lint`)
- App lint only: `nx lint elmardotdev`
- E2E lint only: `nx lint elmardotdev-e2e`

## Unit Tests (Jest)

- Run all tests: `nx test elmardotdev`
- Single test file (pass-through to Jest):
  - `nx test elmardotdev --testPathPattern=apps/elmardotdev/src/app/app.component.spec.ts`
  - `nx test elmardotdev --testPathPattern=app.component.spec.ts`
- Single test name (pass-through to Jest):
  - `nx test elmardotdev --testNamePattern="should create"`

## E2E Tests (Cypress)

- Run all e2e: `nx e2e elmardotdev-e2e`
- Run a single spec:
  - `nx e2e elmardotdev-e2e --spec=apps/elmardotdev-e2e/src/e2e/**/*.cy.ts`

## Affected Commands (Nx)

- `npm run affected:test`
- `nx affected -t lint`
- `nx affected -t build`

## Formatting

- Format all: `npm run format:write`
- Check formatting: `npm run format:check`

## Code Style Guidelines

### TypeScript

- Use single quotes (Prettier config).
- Prefer explicit types for public APIs and complex objects.
- Keep Angular decorators close to class definitions.
- Use `const` by default, `let` only when reassigned.
- Avoid `any`; use union types or generics.
- Prefer `readonly` for immutable fields where applicable.
- Narrow types with type guards instead of `as` casts.

### Angular Conventions

- Component selector: element, prefix `elmardotdev`, kebab-case.
  - Example: `elmardotdev-root`
- Directive selector: attribute, prefix `elmardotdev`, camelCase.
  - Example: `elmardotdevFocus`
- Keep modules/components/services in their feature folders.
- Use `styleUrl` and external templates (default setup).
- Components use `OnPush` change detection (the Angular 22 default).

### Imports

- Group imports by source:
  1. Angular / third-party
  2. Workspace / app imports
  3. Relative imports
- Separate groups with a blank line.
- Avoid deep relative imports if a path alias exists.

### Naming

- Classes: PascalCase
- Functions/variables: camelCase
- Files: kebab-case by Angular conventions
- Tests: `*.spec.ts`

### Templates (HTML)

- Use Angular template syntax with readability in mind.
- Use built-in control flow (`@if`, `@for` with `track`).
- Avoid complex logic in templates; move to component TS.

### Styles (SCSS)

- Keep component styles scoped to the component.
- Prefer variables for repeated values.
- Use BEM-like naming if needed for clarity.

### Error Handling

- Fail fast for invalid inputs in component logic.
- For async flows, surface errors in the UI rather than `console.log`.
- Keep error messages user-friendly and actionable.

### Testing Practices

- Prefer focused unit tests for component logic and services.
- Keep tests deterministic; avoid timing-based flakiness.
- Use clear test names that describe behavior.

## Lint Rules to Remember

- Nx module boundary enforcement is enabled.
- Angular ESLint enforces selector prefixes and styles.

## Files to Check for Rules

- ESLint root: `eslint.config.mjs`
- App ESLint: `apps/elmardotdev/eslint.config.mjs`
- E2E ESLint: `apps/elmardotdev-e2e/eslint.config.mjs`
- Prettier: `.prettierrc`
- Nx settings: `nx.json`
- Project targets: `apps/elmardotdev/project.json`, `apps/elmardotdev-e2e/project.json`

## Notes for Agents

- Use `nx` commands. The `ng` CLI does not work because there is no `angular.json`.
- `defaultBase` is `main`.
- Do not modify build/test scripts without justification.
- If adding new files, follow existing folder structure.

## Cursor / Copilot Rules

- No Cursor rules found (.cursor/rules/ or .cursorrules).
- No Copilot instructions found (.github/copilot-instructions.md).
