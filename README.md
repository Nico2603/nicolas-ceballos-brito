# Nicolás Ceballos Brito — Portafolio Personal

Portafolio profesional de **Nicolás Ceballos Brito**, Ingeniero en Sistemas y Telecomunicaciones (UCP 2025). App Lead Developer en Prosavis.

Identidad visual **Dev Premium**: navy + cyan eléctrico + ámbar CTA, modo claro/oscuro, navbar isla flotante y bottom dock móvil. Ver [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) para tokens, componentes y patrones.

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Framer Motion · Lenis · react-router-dom · @fontsource

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build         # prebuild (sitemap, llms.txt, OG images) + vite + prerender
npm run preview
npm run sync:linkedin # snapshot del perfil LinkedIn (opcional, ver abajo)
```

El pipeline `prebuild` genera automáticamente:

- `public/sitemap.xml` — desde `PRERENDER_ROUTES`
- `public/llms.txt` — archivo AEO para motores de respuesta (incluye datos de LinkedIn)
- `public/images/og-image.webp` — tarjeta Open Graph de marca (1200×630, sin foto; ver abajo)
- `public/apple-touch-icon.png` — derivado de la tarjeta OG (180×180)
- `public/images/pic-288.webp` y `pic-576.webp` — variantes responsive de la foto de perfil (LCP)
- `scripts/inject-home-schema.ts` — inyecta JSON-LD de home en `index.html` vía placeholder `<!-- INJECT_HOME_JSON_LD -->` (el HTML base queda liviano; el schema se genera desde `src/lib/structured-data.ts` en cada build)

El paso `prerender` (Puppeteer + Chromium) genera HTML estático por ruta en `dist/`. Tras capturar cada página, `scripts/prerender.ts` aplica post-proceso:

- **Strip de origen preview:** convierte URLs absolutas `127.0.0.1`/`localhost` en rutas relativas (`/assets/...`). El build falla si queda alguna referencia local.
- **Home (`/`):** inyecta `<link rel="preload">` de la imagen LCP (`pic-288.webp` + `srcSet`).
- **Rutas secundarias:** elimina el JSON-LD global de home (WebSite, FAQPage, etc.) para aligerar el HTML; cada página conserva su schema vía `SeoHelmet`.

## Datos del perfil (LinkedIn + GitHub)

El sitio es un SPA estático. Los datos profesionales provienen de dos fuentes:

| Fuente | Archivo | Contenido |
|--------|---------|-----------|
| **LinkedIn** (fuente principal) | [`src/data/linkedin-profile.ts`](./src/data/linkedin-profile.ts) | Headline, about, experiencia, educación, certificaciones, skills, idiomas, proyectos, actividad |
| Derivados | [`src/data/profile.ts`](./src/data/profile.ts) | Bio hero/about, graduación, roles actuales — consume `linkedin-profile.ts` |
| Posts / feed | [`src/data/linkedin-posts.ts`](./src/data/linkedin-posts.ts) | Mapeo de `linkedInActivity` para el feed en Home |
| **GitHub API** | [`src/hooks/useGitHubRepos.ts`](./src/hooks/useGitHubRepos.ts) | Repos, stars y stats en `/repositories` |
| Stats estáticos (Home) | [`src/data/github-repos-fallback.ts`](./src/data/github-repos-fallback.ts) | Línea compacta en Portafolio sin fetch a la API |
| Proyectos destacados | [`src/data/content.ts`](./src/data/content.ts) | Grid 2×2 en Home (4 repos reales) |
| SEO / JSON-LD | [`src/constants/credentials.ts`](./src/constants/credentials.ts) | Credenciales y experiencia derivadas de LinkedIn |

### Sincronizar LinkedIn

```bash
npm run sync:linkedin
```

- Navega al perfil público definido en [`src/constants/social.ts`](./src/constants/social.ts) (`SOCIAL_LINKS.linkedin`)
- Guarda snapshot en `src/data/linkedin-sync.raw.json` (gitignored)
- Imprime en consola posts/experiencia detectados para comparar con `linkedin-profile.ts`
- **No sobrescribe** automáticamente el TypeScript curado (evita romper copy editorial si LinkedIn bloquea el scrape)

Tras actualizar manualmente `linkedin-profile.ts`, ejecutar `npm run build` para regenerar `llms.txt` y JSON-LD.

## Rutas indexables (15 URLs prerenderizadas)

| Ruta | Página |
|------|--------|
| `/` | Inicio (Hero → Experiencia → LinkedIn → Portafolio → Labores → Recursos → FAQ → Contacto) |
| `/about` | Sobre mí, skills técnicos y perfil LinkedIn completo (formación, certificaciones, proyectos) |
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
| Meta tags + OG / X Cards | `src/components/SeoHelmet.tsx` |
| Constantes OG (URL imagen, alt) | `src/constants/seo.ts` |
| JSON-LD `@graph` | `src/lib/structured-data.ts` (`worksFor`, `hasOccupation`, `SocialMediaPosting` del post destacado) |
| Rutas prerender | `src/constants/seo-routes.ts` |
| Sitemap / llms.txt | `scripts/generate-sitemap.ts`, `scripts/generate-llms-txt.ts` |
| Prerender Puppeteer | `scripts/prerender.ts` |
| JSON-LD home (prebuild) | `scripts/inject-home-schema.ts` |
| Sync LinkedIn | `scripts/sync-linkedin.ts` |
| Tarjeta OG (generación) | `scripts/generate-og-image.mjs` |
| OG / apple-touch (normalización) | `scripts/normalize-seo-images.mjs` |
| Imágenes LCP / carrusel | `scripts/optimize-profile-images.mjs` |
| AEO | `public/llms.txt` (regenerado en build) |

### Previews al compartir (WhatsApp, LinkedIn, X)

WhatsApp y otras redes **no ejecutan JavaScript**: leen el HTML estático que entrega el prerender. Cada ruta indexable incluye meta Open Graph y X Cards (`twitter:*`, estándar vigente de X) vía `SeoHelmet`.

| Activo | Archivo | Uso |
|--------|---------|-----|
| **Favicon** (pestaña) | `public/favicon.svg` | Monograma **NC** en azul `#2a5c82` |
| **Tarjeta OG** (preview del link) | `public/images/og-image.webp` | Generada en build: navy + cyan + ámbar, nombre, eyebrow y stack — **sin foto** |
| Foto de perfil (sitio) | `public/images/pic.webp` (+ `pic-288.webp`, `pic-576.webp`) | Hero (`<img>` LCP con `srcSet`); preload solo en `/`; About usa `.profile-image` en CSS |
| **Apple touch icon** | `public/apple-touch-icon.png` | Acceso directo en iOS; recorte de la tarjeta OG |

Para editar textos o colores de la tarjeta OG, modificar las constantes en `scripts/generate-og-image.mjs` y ejecutar `npm run build` (o solo `node scripts/generate-og-image.mjs` en desarrollo).

Tras un deploy, si WhatsApp muestra una preview antigua, refrescar caché en [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) → **Volver a extraer**.

## Arquitectura UI

| Capa | Ubicación |
|------|-----------|
| Tokens & tema | `src/styles/tokens.css`, `src/context/ThemeContext.tsx` |
| Primitivos UI | `src/components/ui/` (Button, Card, Badge, …) |
| Perfil LinkedIn | `CurrentExperience.tsx`, `LinkedInFeed.tsx`, `LinkedInProfileDetails.tsx` |
| Navegación | `Navbar`, `BottomNav`, `FloatingContactButton` |
| Hooks nav | `useSmartNavigation`, `useActiveSection` |
| Hooks datos | `useGitHubRepos` (solo `/repositories`); stats estáticos en Home |
| Rendimiento | Code splitting, lazy sections, analytics diferidos — ver abajo |

## Rendimiento y Speed Insights

Optimizaciones para RES, LCP, FCP, TTFB e INP (Vercel Speed Insights + Lighthouse):

| Área | Implementación |
|------|----------------|
| **Prerender** | Post-proceso en `scripts/prerender.ts`: rutas relativas a assets (fix `ERR_CONNECTION_REFUSED`), preload LCP en `/`, JSON-LD de home solo en home; el build falla si queda `127.0.0.1` o `localhost` |
| **HTML base** | `index.html` sin JSON-LD inline ni preload global de imagen; schema y assets SEO se generan en `prebuild` |
| **LCP** | `<img>` estático en Hero (`fetchPriority="high"`, `srcSet`); preload de `pic-288.webp` en `/` vía Helmet + prerender (no en `index.html` global) |
| **Hero crítico** | Entrada y avatar LCP con CSS (`hero-entrance`, `hero-profile-float` en `animations.css`); flotación desactivada en mobile |
| **JS inicial** | `React.lazy()` en rutas y en `CurrentExperience`; secciones below-fold lazy en Home; `manualChunks` (react, motion, lenis) en `vite.config.ts` |
| **Framer Motion** | `LazyMotion` + `domAnimation` en `App.tsx`; motion en Hero limitado a CTAs; Navbar móvil con transiciones CSS |
| **Red** | Sin llamadas a GitHub API en Home (`Portfolio` con `staticStats`) |
| **Fuentes** | 6 pesos `@fontsource` en `src/index.css` (Jakarta 400–700, Fraunces 600–700); `font-display: swap` |
| **Terceros** | GA4 vía `requestIdleCallback` en `src/lib/analytics.ts`; Vercel Analytics/Speed Insights tras `load` (`DeferredVercelMetrics.tsx`) |
| **INP** | Lenis solo desktop (≥768px), diferido idle/primer scroll; `HeroGrid` desactivado en mobile; `prefers-reduced-motion` respetado |
| **Caché** | Headers `immutable` en `vercel.json` para `/assets/` e `/images/` |

### Validación tras deploy

1. Hard refresh en `/` y en una guía (`/guias/...`) — Network: chunks `200` desde `/assets/`, sin `127.0.0.1`.
2. Lighthouse mobile en `/` y en una guía prerenderizada.
3. Speed Insights: esperar 48–72 h para datos de campo (RES debería subir respecto a métricas previas al fix de prerender).

### Errores de consola no del sitio

Avisos en `contentscript.js` (`MaxListenersExceededWarning`, `ObjectMultiplex`) provienen de extensiones del navegador (p. ej. wallets). Verificar en ventana de incógnito sin extensiones.

## Despliegue

- **Producción:** https://nicolasceballosbrito.com
- **Vercel (preview):** https://nicolas-ceballos-brito.vercel.app
- **Plataforma:** Vercel (deploy automático desde `master` vía GitHub)
- Build: `npm run build` → carpeta `dist/`

Vercel sirve archivos estáticos del filesystem antes del rewrite SPA en `vercel.json`, por lo que `dist/about/index.html` y rutas similares se entregan con meta prerenderizados. Assets versionados en `/assets/` e imágenes en `/images/` llevan `Cache-Control: public, max-age=31536000, immutable`.

## SEO / Google Search Console

Pasos tras el deploy (checklist completo en [`public/recursos-seo-handoff.txt`](./public/recursos-seo-handoff.txt)):

1. **Verificar dominio** en [Google Search Console](https://search.google.com/search-console) (`https://nicolasceballosbrito.com`).
   - Reemplazar `PENDIENTE_VERIFICACION_GSC` en `index.html` con el código que entrega Search Console.
2. **Enviar sitemap:** `https://nicolasceballosbrito.com/sitemap.xml`
3. **Inspección de URLs** → solicitar indexación de `/`, `/about`, una guía y un proyecto.
4. **Validar rich results:** [Rich Results Test](https://search.google.com/test/rich-results) — home debe mostrar `Person`, `WebSite` y `FAQPage`.
5. **Previews sociales:** [opengraph.xyz](https://www.opengraph.xyz/) en home, about y una guía — debe mostrar la tarjeta de marca (no la foto de perfil).
6. **WhatsApp / Meta:** [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) → pegar URL → **Volver a extraer** si la preview está desactualizada.
7. **Bing Webmaster Tools** (opcional): mismo sitemap.

## Google Analytics 4

ID de medición: `G-QFQFLD69P3`

La carga de GA4 es **diferida** (`requestIdleCallback` en `src/lib/analytics.ts`; sin script bloqueante en `index.html`). Los pageviews de la SPA se envían en cada cambio de ruta vía `GoogleAnalytics.tsx`. Si falta la variable de entorno en Vercel, se usa el ID por defecto `G-QFQFLD69P3`.

Eventos personalizados: `generate_lead` (formulario de contacto), `contact` (WhatsApp y email). La medición mejorada de GA4 cubre scroll, clics salientes y formularios automáticamente.

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
