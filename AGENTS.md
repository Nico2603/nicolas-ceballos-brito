## graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review.

---

# Nicolás Ceballos Brito — Portafolio Personal

`C:\Users\nicol\Documentos\GitHub\nicolas-ceballos-brito\`

## Visión General

Portafolio profesional de Nicolás Ceballos Brito — Ingeniero en Sistemas y Telecomunicaciones (UCP 2025), App Lead Developer en Prosavis.

```
nicolas-ceballos-brito/
├── src/data/linkedin-profile.ts   # Fuente principal: perfil LinkedIn
├── src/data/profile.ts            # Bios y roles derivados
└── React 19 / Vite / TypeScript / Tailwind / Framer Motion
```

## Stack

| Tecnología | Versión | Propósito |
|---|---|---|
| React | ^19.2.6 | UI Framework |
| TypeScript | ~6.0.2 | Tipado estático |
| Vite | ^8.0.12 | Build tool |
| Tailwind CSS | ^4.3.0 | Estilos |
| Framer Motion | ^12.40.0 | Animaciones |
| Lenis | ^1.3.23 | Smooth scroll |
| Lucide React | ^1.17.0 | Iconos |
| react-router-dom | ^7.17.0 | Routing |
| react-helmet-async | ^3.0.0 | SEO |

## Despliegue

- **Producción:** https://nicolasceballosbrito.com
- **Plataforma:** Vercel (deploy automático desde `master`)

## Convenciones

- Usar `npm run lint` antes de cada commit
- NO commits directos a main — usar ramas separadas para cambios grandes

## Scripts

- `npm run dev` — Servidor de desarrollo
- `npm run build` — Build de producción
- `npm run lint` — ESLint
- `npm run preview` — Preview del build
- `npm run sync:linkedin` — Snapshot del perfil LinkedIn (`linkedin-sync.raw.json`)

## Datos del perfil

- **LinkedIn:** editar `src/data/linkedin-profile.ts` (experiencia, educación, certificaciones, skills, actividad). URL en `src/constants/social.ts`.
- **Derivados:** `profile.ts`, `linkedin-posts.ts`, `credentials.ts` consumen o mapean desde ahí.
- **GitHub:** dinámico vía `useGitHubRepos` (API pública, sin token).
- Tras cambios en datos de perfil: `npm run build` regenera `llms.txt` y JSON-LD.

## Skills — ubicación e instalación

| Alcance | Ruta | Estado |
|---------|------|--------|
| **Proyecto (definitivo)** | `nicolas-ceballos-brito/.agents/skills/` | 30 skills instaladas |
| Lockfile reproducible | `skills-lock.json` | `npx skills experimental_install` |

Verificar: `npx skills ls` (desde la raíz del repo).

Regla Cursor always-on: [`.cursor/rules/skills-mandatory.mdc`](.cursor/rules/skills-mandatory.mdc)

### Skills instaladas (30)

**Core (8):** brainstorming, systematic-debugging, using-superpowers, frontend-design, vercel-react-best-practices, web-design-guidelines, find-skills, agent-browser

**Complementarias (20):** motion-framer, tailwind-design-system, design-dna, design-taste-frontend, high-end-visual-design, emil-design-eng, ui-ux-pro-max, landing-page-design, css-animations, react-typescript, seo-optimizer, aceternity-ui, vercel-composition-patterns, canvas-design, theme-factory, brand-guidelines, sleek-design-mobile-apps, extract-design-system, redesign-existing-projects, design-motion-principles

**Workflow (2):** writing-plans, verification-before-completion

**Analytics (2):** google-analytics-admin-api-basics, google-analytics-data-api-basics

Reinstalar desde lockfile: `npx skills experimental_install -y`

### Bundles resumidos

- **Siempre:** `using-superpowers`
- **Feature:** brainstorming → spec → writing-plans
- **UI:** frontend-design + design-taste-frontend + brand-guidelines + tailwind-design-system + ui-ux-pro-max + high-end-visual-design
- **Motion:** motion-framer + emil-design-eng + design-motion-principles + design-dna + css-animations
- **React/TSX:** react-typescript + vercel-composition-patterns + vercel-react-best-practices
- **Cierre:** web-design-guidelines + verification-before-completion
- **Bug:** systematic-debugging
- **QA visual:** agent-browser

Antes de UI o features nuevas, leer [`src/styles/tokens.css`](src/styles/tokens.css). No introducir Inter/Roboto ni layouts template SaaS.
