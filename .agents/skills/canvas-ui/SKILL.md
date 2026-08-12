---
name: canvas-ui
description: >-
  Install and apply Canvas UI html-in-canvas effects (Liquid, Bend, Glass, …)
  via the shadcn registry @canvas-ui. Use when adding visual canvas effects,
  browsing the Canvas UI registry, or installing @canvas-ui/* components.
  Never on Lumen Care clinical UI.
---

# Canvas UI (`@canvas-ui`)

Registry: https://canvasui.dev · MCP: shadcn · local: `src/components/canvasui/README.md`

This skill is local (not in `skills-lock.json`). Keep the folder if you reinstall skills.

## Where it belongs

This portfolio is the default showcase. **Home and inner pages use full-page `PageBend` on desktop** (canvasui.dev demo props). Rayito: only if calm and on-brand. **Never** on Lumen Care.

Wrap one region, not the whole app. Components fall back to regular HTML when html-in-canvas is missing.

## Installed here

- `src/components/canvasui/Liquid.tsx`
- `src/components/canvasui/Bend.tsx`

```tsx
import { Liquid } from "@/components/canvasui/Liquid";
import { Bend } from "@/components/canvasui/Bend";

<Liquid rainbow style={{ height: 480 }}>
  <YourContent />
</Liquid>
```

## Add more

```powershell
cmd.exe /c "npx --yes shadcn@latest add @canvas-ui/<name>-react -y"
```

Zero-extra-dep: `glass`, `ripple`, `magnify`, `peel`, `frost`, `glitch`, `clouds`.
Three.js (`ascii-object`, `dithered-object`, `particle-object`, `glass-object`, `liquid-object`) only if the page needs a 3D object.

Registry is pinned in `components.json`. MCP server: `shadcn`.

## Production

Local Chrome: `chrome://flags/#canvas-draw-element`. Production needs an origin trial token per domain. Without it, HTML still renders.

## Rules

- Effects only — do not adopt shadcn/ui as the design system.
- Import one file; no barrel that pulls every effect.
- `npm run lint` after adding a component.
