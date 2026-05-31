# Project Initialization

## Why

A minimal React web application is needed as the foundation for rendering two features later. Starting from a clean, smallest-possible Vite + React + TypeScript template keeps future work focused and avoids premature architecture.

## What

A runnable Vite + React + TypeScript app with Vitest and GitHub Actions CI. No feature modules — only the composition root under `src/app/` and a simple demo UI (title + counter) sufficient for smoke testing.

**Done when:** `npm run dev` serves on port 3000, `npm run build` succeeds, `npm run test` passes, and both GitHub Actions workflows pass on `master`.

## Context

**Relevant files (to be created):**
- `package.json` — scripts: `dev`, `build`, `test`, `preview`
- `vite.config.ts` — Vite config; reads port from env
- `.env` — local port config (`VITE_PORT=3000` or `PORT=3000`; use Vite convention)
- `example.env` — committed template for env vars (no secrets)
- `src/main.tsx` — bootstrap; wraps `<App />` with `AppProvider`
- `src/app/App.tsx` — root UI (title + demo counter, no feature folders)
- `src/app/providers/AppProvider.tsx` — composition root for global providers
- `src/app/App.css` — simple global styling (reset, typography, layout)
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript config
- `vitest.config.ts` or Vitest section in `vite.config.ts` — test runner
- `.github/workflows/build.yml`, `.github/workflows/test.yml` — CI

**Patterns to follow:**
- Read `.cursor/skills/implement-feature-based-setup/SKILL.mdc` before T1
- App structure:

```
src/
  main.tsx
  app/
    App.tsx
    App.css
    providers/
      AppProvider.tsx
```

**Key decisions already made:**
- Stack: Vite, React, TypeScript, Vitest (no routing, no state libs, no UI frameworks)
- Dev server port **3000**, defined in `.env`, with `example.env` committed
- Path alias `@/*` → `./src/*` (configured in T2)
- Branch name for CI: `master`
- Commit format: `<type>(<scope>)[spec-001]: <description>`

## Constraints

**Must:**
- Follow `implement-feature-based-setup` skill: minimal composition root only
- Keep `main.tsx` free of business logic
- Use Given / When / Then test structure (see `.cursor/rules/frontend-testing.mdc`)
- Add `.env` to `.gitignore` if not already present; commit `example.env`

**Must not:**
- Create `src/features/` or any feature architecture
- Add routing, state management, or UI frameworks
- Add dependencies beyond: `react`, `react-dom`, `vite`, `typescript`, `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`

**Out of scope:**
- Feature implementation (counter stays inline in `App.tsx` as demo only)
- E2E tests, linting setup, Prettier, Docker

## Tasks

### T1: Setup Vite & React

**Do:**
- Scaffold Vite + React + TypeScript project in repo root
- Create `src/app/` structure per skill: `App.tsx`, `providers/AppProvider.tsx`, `App.css`
- Create `src/main.tsx` that renders `<AppProvider><App /></AppProvider>`
- `App.tsx`: render a page title and a simple demo counter (inline state, no feature layer)
- Configure Vite dev server to use port from `.env` (default 3000)
- Add `.env` with port variable; add `example.env` with same keys and placeholder values
- Add minimal global CSS: system font stack, sensible defaults, centered layout, basic button styles

**Files:** `package.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/app/App.tsx`, `src/app/providers/AppProvider.tsx`, `src/app/App.css`, `.env`, `example.env`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `src/vite-env.d.ts`

**Verify:**
```bash
npm install
npm run dev
# Manual: open http://localhost:3000 — page shows title and counter at 0
```

**Commit:** `feat(init)[spec-001]: setup Vite and React template`

---

### T2: Update tsconfig.app.json

**Do:**
- Set `"target": "ESNext"` in `tsconfig.app.json`
- Add path alias:

```json
"paths": {
  "@/*": ["./src/*"]
}
```

- Ensure `vite.config.ts` resolves `@` alias to match (if not already from T1)

**Files:** `tsconfig.app.json`, `vite.config.ts` (alias only if missing)

**Verify:**
```bash
npx tsc -p tsconfig.app.json --noEmit
```

**Commit:** `chore(tsconfig)[spec-001]: add ESNext target and @ path alias`

---

### T3: Setup Vitest

**Do:**
- Install and configure Vitest with `jsdom` environment
- Add `@testing-library/react` and `@testing-library/jest-dom`
- Add `npm run test` script
- Create one smoke test for `App` using Given / When / Then:

```ts
describe('Given an App to render', () => {
  describe('When the user has not clicked on the counter yet', () => {
    it('then show a title', () => {
      // render App, assert title text is visible
    })
  })
})
```

- Place test adjacent to component or in `src/app/App.test.tsx`

**Files:** `vitest.config.ts` or `vite.config.ts`, `src/app/App.test.tsx`, `package.json`, optional `src/test/setup.ts`

**Verify:**
```bash
npm run test
```

**Commit:** `test(vitest)[spec-001]: add Vitest and App smoke test`

---

### T4: Setup GitHub Actions

**Do:**
- Create `.github/workflows/build.yml`: trigger on push/PR to `master`; run `npm ci && npm run build`
- Create `.github/workflows/test.yml`: trigger on push/PR to `master`; run `npm ci && npm run test`
- Use Node LTS (20.x); cache npm

**Files:** `.github/workflows/build.yml`, `.github/workflows/test.yml`

**Verify:**
```bash
npm ci && npm run build && npm run test
# Manual: push branch and confirm both workflows pass on GitHub
```

**Commit:** `ci(github)[spec-001]: add build and test workflows for master`

---

## Done

End-to-end verification after all tasks:

- [ ] `npm ci && npm run build` passes
- [ ] `npm run test` passes
- [ ] Manual: `npm run dev` → http://localhost:3000 shows title and counter; clicking counter increments
- [ ] GitHub Actions `build` and `test` workflows pass on `master`
- [ ] No feature folders or extra architecture added under `src/`

## Implementation notes

To implement: fresh session → read `./specs/001-project-initialization.md` and implement **T1** only.

After each task, commit with conventional commits scoped to this spec:
```bash
git commit -m "<type>(<scope>)[spec-001]: <task description>"
```
