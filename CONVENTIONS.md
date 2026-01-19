# Rackula Development Conventions

> For AI coding assistants (Aider, Claude Code, etc.)

## Tech Stack

- **Framework:** Svelte 5 with runes (`$state`, `$derived`, `$effect`)
- **Language:** TypeScript strict mode
- **Testing:** Vitest + @testing-library/svelte + Playwright
- **Styling:** CSS custom properties (tokens in `src/lib/styles/tokens.css`)
- **Rendering:** SVG-based rack visualization

## Svelte 5 Rules (MANDATORY)

```svelte
<!-- ✅ CORRECT: Svelte 5 runes -->
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
<button onclick={() => count++}>Click</button>

<!-- ❌ WRONG: Svelte 4 patterns -->
<script lang="ts">
  import { writable } from 'svelte/store';  // NO stores
</script>
<button on:click={handler}>Click</button>  <!-- NO on:event -->
```

## Testing Policy

### When to Write Tests

**Write tests for:**

- Complex algorithms (collision detection, coordinate math)
- User-facing behavior (can user place device? does undo work?)
- State machines and business logic
- Error paths and edge cases

**Skip tests for:**

- Visual-only components (icons, decorative SVGs)
- Thin wrappers with no logic
- Components where only test is "renders without throwing"
- Static data (schema validates it)

### Test Anti-Patterns (NEVER DO)

```typescript
// ❌ BAD: Hardcoded array lengths
expect(devices).toHaveLength(68);

// ❌ BAD: Hardcoded colors
expect(color).toBe("#FFFFFF");

// ❌ BAD: DOM access
container.querySelector(".rack");

// ❌ BAD: Class assertions
expect(button).toHaveClass("primary");

// ❌ BAD: Duplicate schema validation
expect(device.slug).toBeDefined();
```

### Test Best Practices

```typescript
// ✅ GOOD: Test behavior
it("user can place a device in rack", () => {
  store.placeDevice("server-slug", 10);
  expect(store.rack.devices).toContain(
    expect.objectContaining({ slug: "server-slug" }),
  );
});

// ✅ GOOD: Use factories
import { createTestDeviceType } from "./factories";
const device = createTestDeviceType({ u_height: 2 });

// ✅ GOOD: Test algorithms with edge cases
it("detects collision when devices overlap", () => {
  // ... meaningful test
});
```

## Code Style

### Simplicity First

- Avoid over-engineering
- Only implement what's asked
- Simple solutions over abstractions
- Three similar lines > premature abstraction
- Delete unused code completely (no `_unused` vars)

### No Backwards Compatibility Hacks

- No renaming to `_unusedVar`
- No re-exporting removed types
- No `// removed` comments
- If unused, delete it

### File Operations

- ALWAYS prefer editing existing files over creating new ones
- NEVER create documentation files unless explicitly requested
- NEVER add comments to code you didn't change

## Commands

```bash
npm run dev          # Dev server
npm run test         # Unit tests (watch)
npm run test:run     # Unit tests (CI)
npm run test:e2e     # Playwright E2E
npm run build        # Production build
npm run lint         # ESLint check
```

## Git Conventions

- Commit message format: `type: description`
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- Branch naming: `fix/<issue>-desc`, `feat/<issue>-desc`
- Always include `Co-Authored-By` for AI assistance

## Key Files

- `docs/ARCHITECTURE.md` - Codebase overview (start here)
- `docs/reference/SPEC.md` - Technical specification (authoritative)
- `src/tests/factories.ts` - Test data factories
- `src/lib/styles/tokens.css` - Design tokens
