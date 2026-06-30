# Nicolás Ceballos Brito — Portafolio Personal

Portafolio profesional de **Nicolás Ceballos Brito**, Ingeniero de Sistemas y Telecomunicaciones.

Identidad visual **Dev Premium**: navy + cyan eléctrico + ámbar CTA, modo claro/oscuro, navbar isla flotante y bottom dock móvil. Ver [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) para tokens, componentes y patrones.

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Framer Motion · Lenis · react-router-dom

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Inicio (Hero, Portafolio, Labores, Contacto) |
| `/about` | Sobre mí y habilidades |
| `/repositories` | Explorador GitHub con filtros |

## Arquitectura UI

| Capa | Ubicación |
|------|-----------|
| Tokens & tema | `src/styles/tokens.css`, `src/context/ThemeContext.tsx` |
| Primitivos UI | `src/components/ui/` (Button, Card, Badge, …) |
| Navegación | `Navbar`, `BottomNav`, `FloatingContactButton` |
| Hooks nav | `useSmartNavigation`, `useActiveSection` |

## Despliegue

- **Producción:** https://nicolasceballosbrito.com
- **Vercel (preview):** https://nicolas-ceballos-brito.vercel.app
- **Plataforma:** Vercel (deploy automático desde `master` vía GitHub)
- Build: `npm run build` → carpeta `dist/`

## Graphify

```bash
graphify update .    # Actualizar grafo de conocimiento (AST, sin costo API)
graphify query "..." # Consultar el grafo en graphify-out/
```

## Licencia

MIT © Nicolás Ceballos Brito
