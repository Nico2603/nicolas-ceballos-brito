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
npm run build    # prebuild (sitemap, llms.txt, OG images) + vite + prerender
npm run preview
npm run images:webp   # convertir raster en public/images/ a WebP
```

El pipeline `prebuild` genera automáticamente:

- `public/sitemap.xml` — desde `PRERENDER_ROUTES`
- `public/llms.txt` — archivo AEO para motores de respuesta
- Normalización de `og-image.webp` a 1200×630 y `apple-touch-icon.png`
- Inyección de JSON-LD en `index.html` (home)

El paso `prerender` (Puppeteer + Chromium) genera HTML estático por ruta en `dist/`.

## Rutas indexables (15 URLs prerenderizadas)

| Ruta | Página |
|------|--------|
| `/` | Inicio (Hero, Portafolio, Labores, Recursos, FAQ, Contacto) |
| `/about` | Sobre mí y habilidades |
| `/repositories` | Explorador GitHub con filtros |
| `/proyectos/chatbot-mental-health` | Proyecto ChatBot salud mental |
| `/proyectos/pdm-manager` | Proyecto mantenimiento predictivo |
| `/proyectos/fastqa-homepage` | Proyecto FastQA |
| `/proyectos/magiacafetera-ui` | Proyecto Magia Cafetera |
| `/desarrollo-web` | Landing expertise desarrollo web |
| `/inteligencia-artificial` | Landing expertise IA |
| `/analisis-datos` | Landing expertise análisis de datos |
| `/guias` | Índice de guías técnicas |
| `/guias/como-estructurar-portafolio-desarrollador` | Guía portafolio |
| `/guias/machine-learning-proyectos-estudiantes` | Guía ML estudiantes |
| `/guias/react-typescript-proyectos-reales` | Guía React + TS |
| `/politica-privacidad` | Política de privacidad |

Rutas definidas en [`src/constants/seo-routes.ts`](./src/constants/seo-routes.ts).

## Arquitectura SEO

| Capa | Ubicación |
|------|-----------|
| Meta tags + OG/Twitter | `src/components/SeoHelmet.tsx` |
| JSON-LD `@graph` | `src/lib/structured-data.ts` |
| Rutas prerender | `src/constants/seo-routes.ts` |
| Sitemap / llms.txt | `scripts/generate-sitemap.ts`, `scripts/generate-llms-txt.ts` |
| Prerender Puppeteer | `scripts/prerender.ts` |
| OG images | `scripts/normalize-seo-images.mjs` |
| AEO | `public/llms.txt` (regenerado en build) |

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

Vercel sirve archivos estáticos del filesystem antes del rewrite SPA en `vercel.json`, por lo que `dist/about/index.html` y rutas similares se entregan con meta prerenderizados.

## SEO / Google Search Console

Pasos tras el deploy (checklist completo en [`public/recursos-seo-handoff.txt`](./public/recursos-seo-handoff.txt)):

1. **Verificar dominio** en [Google Search Console](https://search.google.com/search-console) (`https://nicolasceballosbrito.com`).
   - Reemplazar `PENDIENTE_VERIFICACION_GSC` en `index.html` con el código que entrega Search Console.
2. **Enviar sitemap:** `https://nicolasceballosbrito.com/sitemap.xml`
3. **Inspección de URLs** → solicitar indexación de `/`, `/about`, una guía y un proyecto.
4. **Validar rich results:** [Rich Results Test](https://search.google.com/test/rich-results) — home debe mostrar `Person`, `WebSite` y `FAQPage`.
5. **Previews sociales:** [opengraph.xyz](https://www.opengraph.xyz/) en home, about y una guía.
6. **Bing Webmaster Tools** (opcional): mismo sitemap.

## Google Analytics 4

ID de medición: `G-QFQFLD69P3`

La etiqueta base está en `index.html` (`send_page_view: false`). Los pageviews de la SPA se envían en cada cambio de ruta vía `src/lib/analytics.ts` y `GoogleAnalytics.tsx`.

```bash
# Local (.env.local)
VITE_GA_MEASUREMENT_ID=G-QFQFLD69P3
```

**Vercel** → Settings → Environment Variables → `VITE_GA_MEASUREMENT_ID` = `G-QFQFLD69P3` (Production).

GA4 también permite verificar el dominio en Search Console como alternativa al meta tag.

## Graphify

```bash
graphify update .    # Actualizar grafo de conocimiento (AST, sin costo API)
graphify query "..." # Consultar el grafo en graphify-out/
```

## Licencia

MIT © Nicolás Ceballos Brito
