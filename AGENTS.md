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

Portafolio profesional de Nicolás Ceballos Brito — Ingeniero de Sistemas y Telecomunicaciones.

```
nicolas-ceballos-brito/
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
