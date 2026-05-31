# Chakra UI Setup

## Why

Chakra UI is needed to render accessible, styled components in future features. Adding it now at the composition root keeps feature UI layers free to use Chakra primitives without re-wiring providers later.

## What

Install Chakra UI v3 with the minimal manual setup (no custom theme, no CLI snippets). Wire `ChakraProvider` into the existing `AppProvider`, convert the demo `App` heading to a Chakra component, and ensure Vitest renders through the provider so tests keep passing.

**Done when:** `npm run build` and `npm run test` pass, dev server shows the title via Chakra, and CI workflows still pass on `master`.

## Context

**Relevant files:**
- `package.json` — add `@chakra-ui/react`, `@emotion/react`
- `src/app/providers/AppProvider.tsx` — composition root; wrap children with Chakra provider
- `src/app/providers/ChakraProvider.tsx` — new; exports `ChakraUiProvider` using `defaultSystem`
- `src/app/App.tsx` — replace raw `<h1>` with a Chakra heading component
- `src/app/App.test.tsx` — wrap render with `ChakraUiProvider` (or shared test helper)
- `src/test/setup.ts` — optional shared `renderWithProviders` helper
- `src/main.tsx` — unchanged (already uses `AppProvider`)

**Patterns to follow:**
- Read `.cursor/rules/frontend-architecture.mdc`: global providers live in `src/app/providers/`
- Existing bootstrap:

```tsx
// src/main.tsx
<AppProvider>
  <App />
</AppProvider>
```

- Chakra v3 uses `ChakraProvider` with `value={defaultSystem}` (not the v2 `theme` prop)
- Commit format: `<type>(<scope>)[spec-002]: <description>`

**Key decisions already made:**
- Chakra UI **v3** (`@chakra-ui/react` + `@emotion/react`) — matches React 19
- **Manual provider** in `src/app/providers/ChakraProvider.tsx` — skip `@chakra-ui/cli snippet add` and `next-themes` for now
- **No custom theme** — use `defaultSystem` from `@chakra-ui/react`
- Keep `App.css` for now; remove only the heading styles that Chakra replaces
- Vitest is already configured (spec-001 T3); this spec only adds Chakra-aware test wrapping

## Constraints

**Must:**
- Place Chakra provider in `src/app/providers/` (not `src/components/ui/`)
- Keep `main.tsx` free of Chakra imports — wiring stays in `AppProvider`
- Use Given / When / Then in tests (see `.cursor/rules/frontend-testing.mdc`)
- Run `npm run build && npm run test` after each task

**Must not:**
- Add routing, state libs, or feature folders
- Add `@chakra-ui/cli` snippets, `next-themes`, or a custom theme
- Move business logic into `App.tsx` or providers

**Out of scope:**
- Color mode toggle, dark/light theme
- Replacing all CSS with Chakra
- Feature-layer Chakra usage (future specs)

## Tasks

### T1: Install Chakra UI dependency

**Do:**
- Install runtime deps: `@chakra-ui/react`, `@emotion/react`
- Do not add other Chakra-related packages yet

**Files:** `package.json`, `package-lock.json`

**Verify:**
```bash
npm install
npm run build
```

**Commit:** `chore(deps)[spec-002]: add Chakra UI and Emotion`

---

### T2: Create a Chakra UI provider

**Do:**
- Create `src/app/providers/ChakraProvider.tsx` exporting `ChakraUiProvider`
- Use `ChakraProvider` and `defaultSystem` from `@chakra-ui/react`
- Update `AppProvider` to wrap `{children}` with `<ChakraUiProvider>`

**Files:** `src/app/providers/ChakraProvider.tsx`, `src/app/providers/AppProvider.tsx`

**Verify:**
```bash
npm run build
npm run dev
# Manual: open http://localhost:3000 — page loads with no console errors
```

**Commit:** `feat(chakra)[spec-002]: add ChakraUiProvider to AppProvider`

---

### T3: Configure Vitest for Chakra UI

**Do:**
- Update `App.tsx`: replace `<h1 className="app__title">` with Chakra `Heading` (keep title text `Yendou`)
- Ensure `App.test.tsx` renders `<App />` inside `ChakraUiProvider` so Chakra context is available
- Prefer a small `renderWithProviders` helper in `src/test/setup.ts` or `src/test/test-utils.tsx` if reuse is cleaner
- Assert the same heading role/name as before (`getByRole('heading', { name: 'Yendou' })`)

**Files:** `src/app/App.tsx`, `src/app/App.test.tsx`, optional `src/test/test-utils.tsx`

**Verify:**
```bash
npm run test
npm run build
npm run dev
# Manual: http://localhost:3000 shows "Yendou" as a styled Chakra heading
```

**Commit:** `test(chakra)[spec-002]: render App with Chakra provider in tests`

---

## Done

End-to-end verification after all tasks:

- [ ] `npm ci && npm run build` passes
- [ ] `npm run test` passes
- [ ] Manual: `npm run dev` → http://localhost:3000 shows "Yendou" via Chakra `Heading`
- [ ] GitHub Actions `build` and `test` workflows pass on `master`
- [ ] No feature folders or extra dependencies beyond `@chakra-ui/react` and `@emotion/react`

## Implementation notes

To implement: fresh session → read `./specs/002-chakra-ui-setup.md` and implement **T1** only.

After each task, commit with conventional commits scoped to this spec:
```bash
git commit -m "<type>(<scope>)[spec-002]: <task description>"
```
