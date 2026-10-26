# AGENTS.md

Personal portfolio site for Elmar Beckmann, deployed at https://elmar.dev. It is a static single-page site: one Angular 22 standalone component, no routing, no state management, no backend.

## Workspace

- Nx 24 workspace with two projects: the app `elmardotdev` and the Cypress e2e project `elmardotdev-e2e`. `libs/` is empty.
- Run every task through `nx`. The workspace has no `angular.json`, so the `ng` CLI fails. The `test`, `lint` and `e2e` targets are inferred by the plugins in `nx.json`; `build` and `serve` are in `apps/elmardotdev/project.json`.
- Scripts for common tasks are in `package.json`.
- The build writes the site to `dist/apps/elmardotdev/browser`.

## Site structure

- The whole site is `apps/elmardotdev/src/app/app.component.{ts,html,scss}`. SEO metadata and the JSON-LD structured data are in `apps/elmardotdev/src/index.html`.
- Visible content and the metadata in `index.html` describe the same facts (role, employer, client, social links). When one changes, update the other.
- The build prerenders `/` to static HTML (`outputMode: "static"`, server entry `main.server.ts`, hydration in `main.ts`). There is no server runtime.
- Change detection uses Zone.js (`provideZoneChangeDetection()` in `main.ts`, Zone.js test setup in `test-setup.ts`).
- There is no CSS framework. The reset is in `styles.scss`. Google Fonts loads from a CDN in `index.html`.

## Styling

- All styles are in `apps/elmardotdev/src/app/app.component.scss`, with the shared SCSS variables at the top.
- The template uses generic class names (`content-card`, `skill-item`). Visual styling goes in the stylesheet, not in the template.
- The only web font is Geist, loaded from Google Fonts in `index.html`.

## Conventions

- Selector prefix `elmardotdev`: kebab-case for components, camelCase for directives. ESLint enforces this.
- Use built-in control flow (`@if`, `@for` with `track`) in templates and keep logic in the component class.
- Group imports: Angular and third-party, then workspace, then relative, with a blank line between groups.

## Testing

- Jest 30 renamed the path filter: run one spec with `nx test elmardotdev --testPathPatterns=app.component.spec.ts`.
- Run one e2e spec with `nx e2e elmardotdev-e2e --spec=src/e2e/app.cy.ts`.
- If Cypress fails with `bad option: --no-sandbox`, the shell has `ELECTRON_RUN_AS_NODE=1` set. Run it with `env -u ELECTRON_RUN_AS_NODE`.
- `npm run format:check` compares against `main`. Use `nx format:check --all` to check every file.

## Deployment

- Vercel deploys the GitHub repo `elmarbeckmann/elmar.dev`: `main` goes to production, every other branch gets a preview URL per commit.
- `vercel.json` sets the build command and the output folder. If the build output path changes, update `vercel.json`, or the deployment serves a 404.

## Dependencies

- Update with `nx migrate latest`, then `npm install` and `nx migrate --run-migrations`.
- TypeScript stays within the range that `@angular/compiler-cli` accepts as a peer dependency, even when a newer TypeScript is out.
