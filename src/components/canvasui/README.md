# Canvas UI

Html-in-canvas effects from [@canvas-ui](https://canvasui.dev). Source lives here; unused files are not in the bundle.

```tsx
import { Liquid } from "@/components/canvasui/Liquid";
import { Bend } from "@/components/canvasui/Bend";

<Liquid rainbow style={{ height: 480 }}>
  {children}
</Liquid>
```

Add another component from the project root:

```powershell
cmd.exe /c "npx --yes shadcn@latest add @canvas-ui/<name>-react -y"
```

Registry is pinned in `components.json`. This portfolio wraps desktop pages in `PageBend` (Bend demo: cube-face scroll). Production Chrome needs an origin trial token per domain; without it, children still render as HTML.
