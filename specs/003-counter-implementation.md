# Counter Feature Implementation

## Why

The demo counter in `App.tsx` is inline state with no separation of concerns. Implementing a Counter feature under `src/features/counter/` establishes the project's feature-based Clean Architecture: domain holds business rules, adapters bridge React state to the domain, and UI handles presentation only.

## What

Build a self-contained Counter feature that:

- Displays the current count value
- Increments the count via a Chakra UI `+1` button
- Shows a Chakra toast notification on each increment

**Done when:** `npm run build` and `npm run test` pass, the app renders the Counter at the composition root, clicking `+1` updates the display and shows a styled toast, and all layer tests pass.

## Context

**Relevant files:**
- `src/app/App.tsx` — replace demo UI with `<Counter />`
- `src/app/App.test.tsx` — update smoke test; Counter tests live in the feature
- `src/app/providers/AppProvider.tsx` — register `CounterProvider` here (composition root)
- `src/app/providers/ChakraProvider.tsx` — already wraps app; required for `useToast()`
- `src/test/setup.ts` — optional shared `renderWithProviders` helper for feature tests
- `.cursor/skills/implement-feature-based-use-case/SKILL.mdc` — feature folder structure
- `.cursor/rules/frontend-architecture.mdc` — layer boundaries
- `.cursor/rules/frontend-testing.mdc` — Given / When / Then, test locations

**Feature structure (required):**

```
src/features/counter/
  domain/
    Counter.ts
    CounterError.ts
    Counter.test.ts
  adapters/
    useCounter.ts
    counter.context.ts
    counter.provider.ts
    useCounter.test.ts
  ui/
    Counter.tsx
    Counter.test.ts
    CounterToast.tsx          # T4 only
  index.ts
```

**Patterns to follow:**
- Dependency flow: **UI → Adapters → Domain** (App → Adapters + UI)
- State lives in adapters; domain is immutable and stateless
- Commit format: `<type>(<scope>)[spec-003]: <description>`

**Key decisions already made:**
- Chakra UI v3 is installed and wired via `ChakraUiProvider` (spec-002)
- Toast is triggered **only** in the UI click handler — not in domain, provider, or hook
- Adapter layer must **not** use `useCallback`, `useMemo`, or `createElement`
- Provider context value must conform to an explicit `CounterContextValue` type

## Constraints

**Must:**
- Place all Counter code under `src/features/counter/` with `domain/`, `adapters/`, `ui/`, `index.ts`
- Keep domain free of React; adapters free of UI rendering/styling; UI free of business logic and direct domain imports
- Use Chakra UI for the button and toast
- Use Given / When / Then in all tests
- Run `npm run test` scoped to the task's files after each task

**Must not:**
- Import domain from UI tests or UI components
- Put toast logic in domain, `CounterProvider`, or `useCounter`
- Use `useState` inside UI components (state belongs in adapters)
- Export internal domain/adapters implementation details beyond the public API in `index.ts`

**Out of scope:**
- Decrement, reset, or persistence
- Custom Chakra theme or color-mode toggle
- E2E tests

## Tasks

### T1: Implement Counter domain

**Do:**
- Create `src/features/counter/domain/Counter.ts` — immutable entity:
  - `Counter.create(initialValue?: number)` — defaults to `0`
  - `getValue(): number`
  - `increment(): Counter` — returns a **new** instance with value + 1; original unchanged
  - Reject negative initial values with `CounterError`
- Create `src/features/counter/domain/CounterError.ts` — extends `Error`, `name = "CounterError"`
- Create `src/features/counter/domain/Counter.test.ts`

**Tests (Given / When / Then):**
- Create with no arg → value is `0`
- Create with positive value → value matches
- Create with negative value → throws `CounterError`
- Increment → new instance has value + 1; original unchanged

**Example:**

```ts
const counter = Counter.create()
counter.getValue() // 0
const next = counter.increment()
next.getValue() // 1
counter.getValue() // 0 (unchanged)
```

**Files:** `Counter.ts`, `CounterError.ts`, `Counter.test.ts`

**Verify:**
```bash
npm test -- src/features/counter/domain
```

**Commit:** `feat(counter)[spec-003]: add Counter domain entity and tests`

---

### T2: Implement Counter adapters

**Do:**
- Create `src/features/counter/adapters/counter.context.ts` — React context + `CounterContextValue` type (e.g. `{ count: number; increment: () => void }`)
- Create `src/features/counter/adapters/counter.provider.ts` — holds `Counter` domain instance in React state; exposes `count` and `increment` via context; `increment` calls domain `increment()` and updates state
- Create `src/features/counter/adapters/useCounter.ts` — reads context; throws or asserts if used outside provider
- Create `src/features/counter/adapters/useCounter.test.ts` — use `renderHook` with `CounterProvider` wrapper and `ChakraUiProvider` if needed

**Rules:**
- Adapters MAY use React APIs (`useState`, `useContext`)
- Adapters MAY depend on domain
- Adapters MUST NOT render UI, apply styling, or import UI components
- Do **not** use `useCallback`, `useMemo`, or `createElement`
- Provider value must satisfy `CounterContextValue`

**Tests (Given / When / Then):**
- Given `useCounter`, when at initial state → count is `0`
- Given `useCounter`, when incremented once → count is `1`
- Given `useCounter`, when incremented twice → count is `2`

**Files:** `counter.context.ts`, `counter.provider.ts`, `useCounter.ts`, `useCounter.test.ts`

**Verify:**
```bash
npm test -- src/features/counter/adapters
```

**Commit:** `feat(counter)[spec-003]: add Counter context, provider, and useCounter hook`

---

### T3: Implement Counter UI and wire into app

**Do:**
- Create `src/features/counter/ui/Counter.tsx`:
  - Internal **Display** — consumes `useCounter`, renders `Current count ${count}`; no `useState`, no domain imports
  - Internal **Button** — Chakra UI button labeled `+1`, calls `increment` from `useCounter` on click; no `useState`, no domain imports
  - **Counter** — flexbox layout, horizontally centered on all screen sizes; Display and Button side by side; small border radius
- Create `src/features/counter/ui/Counter.test.ts` — wrap render with `CounterProvider` + `ChakraUiProvider`
- Create `src/features/counter/index.ts` — export public API: `Counter`, `CounterProvider`, `useCounter` (and types if useful)
- Register `CounterProvider` in `src/app/providers/AppProvider.tsx`
- Render `<Counter />` from `src/app/App.tsx` (keep or update existing title as desired; Counter is the main feature UI)
- Update `src/app/App.test.tsx` if smoke assertions break

**Display styling:**
- Background: transparent (no fill)
- Border: `1px solid #FF3337`
- Text color: `#424355`
- Height must match the button

**Button styling:**
- Chakra UI `Button` with color `#FF3337`
- Label: `+1`
- Height must match the Display

**Layout styling:**
- Flexbox; component centered horizontally and vertically on any viewport
- Display and Button in a row
- Small border radius on the container

**Tests (Given / When / Then):**
- Given Counter to render, when user has not clicked → shows `Current count 0` and button `+1`
- Given Counter to render, when user clicks `+1` once → shows `Current count 1` and button still `+1`

**Files:** `Counter.tsx`, `Counter.test.ts`, `index.ts`, `AppProvider.tsx`, `App.tsx`, optionally `App.test.tsx`

**Verify:**
```bash
npm test -- src/features/counter/ui
npm test -- src/app/App.test.tsx
npm run build
npm run dev
# Manual: http://localhost:3000 — Counter centered; click +1 → count updates (no toast yet)
```

**Commit:** `feat(counter)[spec-003]: add Counter UI and register provider in app`

---

### T4: Implement toast notification on increment

**Do:**
- Create `src/features/counter/ui/CounterToast.tsx` — presentational toast body; all toast styling lives here
- Update `Counter.tsx` button click handler:
  - Call `increment()` from `useCounter`
  - After increment, call Chakra `useToast()` with:
    - `position: "bottom"`
    - `duration: 3000`
    - `isClosable: false`
    - `render: () => <CounterToast value={nextCount} />` (use the new count after increment)
- Add tests in `Counter.test.ts` for toast appearance after click (assert visible toast text/content)
- Ensure `ChakraUiProvider` wraps tests so `useToast()` works

**CounterToast content:**
- Show the incremented value (e.g. display the new count)
- Include a success-style icon (24×24, color `#74C898`) — inline SVG is fine if no icon package is installed

**CounterToast styling:**

| Element | Styles |
|--------|--------|
| Container | `display: flex; flex-direction: row; align-items: center; padding: 12px 20px 12px 16px; gap: 8px; background: radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(116, 200, 152, 0.15) 0%, rgba(116, 200, 152, 0.03) 100%), #46474F; box-shadow: 0px 0px 0px 1px rgba(40, 41, 50, 0.04), 0px 2px 2px -1px rgba(40, 41, 50, 0.04), 0px 4px 4px -2px rgba(40, 41, 50, 0.04), 0px 8px 8px -4px rgba(40, 41, 50, 0.06), 0px 16px 32px rgba(40, 41, 50, 0.06); border-radius: 8px; border: 1px solid; border-image-source: linear-gradient(0deg, #6F7076, #6F7076), radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(116, 200, 152, 0.65) 0%, rgba(116, 200, 152, 0.1) 100%);` |
| Icon | `width: 24px; height: 24px; color: #74C898` |
| Value text | `font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px; line-height: 16px; color: #FFFFFF` |

**Rules:**
- Toast MUST NOT be triggered from domain, `CounterProvider`, or `useCounter`
- Toast styling MUST NOT live in adapters

**Files:** `CounterToast.tsx`, `Counter.tsx`, `Counter.test.ts`

**Verify:**
```bash
npm test -- src/features/counter
npm run build
npm run dev
# Manual: click +1 → count increments and bottom toast appears for ~3s with styled content
```

**Commit:** `feat(counter)[spec-003]: show toast on increment via CounterToast`

---

## Done

End-to-end verification after all tasks:

- [ ] `npm ci && npm run build` passes
- [ ] `npm run test` passes (domain, adapters, UI, app smoke)
- [ ] Manual: `npm run dev` → Counter centered with red-bordered display and `+1` button
- [ ] Manual: click `+1` → display updates; toast appears at bottom for 3 seconds
- [ ] Manual: create with negative value is only possible in domain tests (UI starts at 0)
- [ ] No domain React imports; no UI direct domain imports; no toast in adapters
- [ ] GitHub Actions `build` and `test` workflows pass on `master`

## Implementation notes

To implement: fresh session → read `./specs/003-counter-implementation.md` and implement **T1** only.

After each task, commit with conventional commits scoped to this spec:

```bash
git commit -m "<type>(<scope>)[spec-003]: <task description>"
```
