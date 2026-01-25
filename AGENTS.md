# Agent Guide (elmardotdev)

This file describes how to work in this Nx + Angular repository.
Follow it when making changes, running commands, or reviewing code.

## Repository Overview

- Nx workspace with Angular app `elmardotdev`
- Unit tests: Jest
- E2E tests: Cypress (legacy `cypress.json` config)
- Linting: ESLint (Nx + Angular ESLint)
- Formatting: Prettier (single quotes)

## Primary Projects

- App: `elmardotdev` (apps/elmardotdev)
- E2E: `elmardotdev-e2e` (apps/elmardotdev-e2e)

## Install

- `npm install`

## Dev Server

- `ng serve elmardotdev`
- Default URL: http://localhost:4200

## Build

- `ng build elmardotdev`
- Production build: `ng build elmardotdev --prod`

## Lint

- `npm run lint` (runs `nx workspace-lint && ng lint`)
- App lint only: `ng lint elmardotdev`
- E2E lint only: `nx lint elmardotdev-e2e`

## Unit Tests (Jest)

- Run all tests: `ng test elmardotdev`
- Nx variant: `nx test elmardotdev`
- Single test file (pass-through to Jest):
  - `nx test elmardotdev --testPathPattern=apps/elmardotdev/src/app/app.component.spec.ts`
  - `nx test elmardotdev --testPathPattern=app.component.spec.ts`
- Single test name (pass-through to Jest):
  - `nx test elmardotdev --testNamePattern="should create"`

## E2E Tests (Cypress)

- Run all e2e: `nx e2e elmardotdev-e2e`
- Run a single spec:
  - `nx e2e elmardotdev-e2e --spec=apps/elmardotdev-e2e/src/integration/**/*.spec.ts`

## Affected Commands (Nx)

- `npm run affected:test`
- `npm run affected:lint`
- `npm run affected:build`

## Formatting

- Format all: `npm run format` or `npm run format:write`
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
- Use `styleUrls` and external templates (default setup).

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
- Prefer `*ngIf`/`*ngFor` with `trackBy` for lists.
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
- Cypress config disables `no-var-requires` in plugins file.

## Files to Check for Rules

- ESLint root: `.eslintrc.json`
- App ESLint: `apps/elmardotdev/.eslintrc.json`
- E2E ESLint: `apps/elmardotdev-e2e/.eslintrc.json`
- Prettier: `.prettierrc`
- Nx settings: `nx.json`
- Angular targets: `angular.json`

## Notes for Agents

- Prefer `nx` / `ng` commands so targets resolve correctly.
- Keep workspace defaults in mind (`defaultBase` is `master`).
- Do not modify build/test scripts without justification.
- If adding new files, follow existing folder structure.

## Cursor / Copilot Rules

- No Cursor rules found (.cursor/rules/ or .cursorrules).
- No Copilot instructions found (.github/copilot-instructions.md).
