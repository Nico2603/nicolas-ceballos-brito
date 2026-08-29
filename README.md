<div align="center">
  <img src="docs/assets/banner.svg" alt="Nicolás Ceballos Brito" width="100%" />
</div>

<br />

# Nicolás Ceballos Brito — Portafolio personal

Sitio: **[nicolasceballosbrito.com](https://nicolasceballosbrito.com)**

Ingeniero en Sistemas y Telecomunicaciones (UCP 2025). Director técnico en Prosavis. Diseño y construyo productos web, móvil e IA.

Identidad visual **Ink & Steel** (graphite + steel + chick yellow), modo claro/oscuro, navbar isla y dock móvil. Tokens: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

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
- `public/images/pic-224.webp`, `pic-288.webp` y `pic-576.webp` — variantes responsive de la foto de perfil (LCP)
- `public/images/p*-640.webp` — variantes responsive del carrusel Labores/LinkedIn
- `public/schema/home.jsonld` — schema completo (credenciales íntegras) para referencia SEO
- `scripts/inject-home-schema.ts` — inyecta JSON-LD lite en `index.html` vía placeholder `<!-- INJECT_HOME_JSON_LD -->` (máx. 5 credenciales inline; schema completo en `public/schema/home.jsonld`)

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
| **Prerender** | Post-proceso en `scripts/prerender.ts`: rutas relativas, preload LCP en `/`, CSS crítico inline (`critical-inline.css`), strip de `modulepreload` below-fold, link a `/schema/home.jsonld`; JSON-LD de home solo en home |
| **HTML base** | `index.html` con link alterno al schema completo; preload global de imagen solo vía Helmet/prerender en `/` |
| **LCP** | Elemento LCP lab = **`<h1>` texto Fraunces** (clase `hero-lcp-visible`); imagen de perfil con `fetchPriority="high"` y `srcSet`; preload `pic-288.webp` en `/` |
| **Hero crítico** | `DeferredTypingAnimation` (idle + lazy); `DeferredHeroDecor` (aurora/grid tras idle, off en mobile); animaciones infinitas (`ring`, `aurora`, `float`, `scroll-hint`, `gradient-shift`) gated bajo `.hero-decor-active` tras `load`+idle (`useHeroDecorSettle`); entrada CSS con delays reducidos en mobile |
| **Below-fold** | `ViewportLazy` + `IntersectionObserver` en Home — monta secciones solo al acercarse al viewport |
| **JS inicial** | `React.lazy()` en rutas y secciones Home; `manualChunks` en `vite.config.ts`; `CurrentExperience`, `FaqAccordion`, `RepositoryCard` sin Framer Motion |
| **Framer Motion** | `LazyMotion` + `domAnimation`; reservado para carrusel, contacto y UI interactiva |
| **Imágenes carrusel** | Solo variantes `-480.webp` / `-640.webp` (sin original 960w en `srcSet`) |
| **Terceros** | GA4 tras `pointerdown`/`keydown` o idle 15s (sin trigger `scroll`); Vercel Analytics/Speed Insights tras `load` |
| **RUM** | `web-vitals` → eventos `web_vitals` en GA4 + consola en dev; comparar con Vercel Speed Insights (campo P75) |
| **INP** | Lenis desktop tras 2º scroll o `scrollY > 300` (sin RAF en idle); auroras off en mobile |
| **Caché** | Headers `immutable` en `vercel.json` para `/assets/` e `/images/` |

### Validación tras deploy

1. Hard refresh en `/` y en una guía — Network: chunks `200` desde `/assets/`, sin `127.0.0.1`.
2. **Protocolo lab fiable (recomendado):** `npm run build` → `npm run preview -- --port 4173 --strictPort --host 127.0.0.1` → en otra terminal `npm run audit:perf:local` (móvil+desktop contra preview, sin latencia de red). Alternativa CI: `npm run audit:perf:ci` (móvil) y `npm run audit:perf:ci:desktop`.
3. Comparar `reports/performance-diff.json` (delta vs snapshot anterior en `performance-latest.json`).
4. **No** medir Lighthouse desde tu máquina contra producción (`audit:perf` sin `--url` local): suma la latencia ISP→edge EE.UU. e infla FCP/LCP/SI de escritorio.
5. [Vercel Speed Insights](https://vercel.com/flackosss/nicolas-ceballos-brito/speed-insights) — **campo** (P75). Con <~75 muestras el RES no es representativo; el TTFB de campo suele incluir el redirect `www→apex`.
6. [PageSpeed Insights](https://pagespeed.web.dev/) en producción — lab consistente desde infra de Google tras cada deploy relevante.

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

## Rendimiento

| Métrica | Pre-OPT (baseline) | Post-OPT (jun 2026) | Hero settle (jul 2026, preview local) | Meta |
|---------|-------------------|---------------------|--------------------------------------|------|
| Performance móvil | 32 | **90** | **93** | ≥ 85 |
| Performance desktop | 58 | **69*** | **100** (`--preset=desktop`) | ≥ 90 |
| Speed Index | 9.5 s | **6.8 s** | **2.1 s** móvil / **0.7 s** desktop | < 3.4 s |
| LCP móvil | 6.2 s | **2.1 s** | **2.9 s** | < 2.5–4.0 s |
| FCP móvil | 3.5 s | **1.8 s** | **2.1 s** | < 1.8–2.5 s |
| TBT móvil | 12 080 ms | **470 ms** | **100 ms** | < 800 ms |

\*El desktop 69 de jun 2026 se midió con throttling móvil contra curvas de escritorio (bug del script). Con `--preset=desktop` el score real es mucho más alto.

Detalle en `reports/performance-baseline.json` (sección `postDeploy`) y snapshot más reciente en `reports/performance-latest.json`.

```bash
# Lab fiable (contra preview local — sin latencia de red)
npm run build
npm run preview -- --port 4173 --strictPort --host 127.0.0.1
# otra terminal:
npm run audit:perf:local        # 3× móvil + desktop → reports/ + performance-diff.json

npm run audit:perf:ci           # Build + LHCI móvil (lighthouserc.json, preview :4173)
npm run audit:perf:ci:desktop   # Build + LHCI desktop (lighthouserc.desktop.json)

# Contra producción (solo referencia; inflado por latencia ISP)
npm run audit:perf              # 3× Lighthouse móvil → mediana → reports/
npm run audit:perf -- --runs=1  # Iteración rápida (1 corrida)
npm run audit:perf:full         # 3× móvil + desktop
npm run audit:perf:assert       # full + gates vs performance-budget.json (exit 1 si falla)
npm run audit:perf:routes       # full en /, /about, /desarrollo-web
npm run audit:bundle            # build + tamaños gzip por chunk
```

Artefactos: `reports/performance-latest.json`, `performance-opportunities.json`, `performance-diff.json`, `bundle-budget.json`. Presupuestos declarativos en `performance-budget.json`.

CI: `.github/workflows/lighthouse.yml` — jobs **mobile** (`lighthouserc.json`, perf ≥ 0.85, SI < 5 s) y **desktop** (`lighthouserc.desktop.json`, perf ≥ 0.90, SI < 3.4 s). Regla: ningún PR que baje mediana mobile < 85 o desktop < 90.

## Graphify

```bash
graphify update .    # Actualizar grafo de conocimiento (AST, sin costo API)
graphify query "..." # Consultar el grafo en graphify-out/
```

## Licencia

MIT © Nicolás Ceballos Brito

---

<div align="center">

**Nicolás Ceballos Brito** · Ingeniero en Sistemas y Telecomunicaciones (UCP 2025)  
CTO · Prosavis · Pereira, Colombia

[nicolasceballosbrito.com](https://nicolasceballosbrito.com)
·
[GitHub](https://github.com/Nico2603)
·
[LinkedIn](https://www.linkedin.com/in/nicolas-ceballos-brito/)
·
[X](https://x.com/NicolasCBrito)
·
[Instagram](https://www.instagram.com/nico_ceballos26/)
·
[Hugging Face](https://huggingface.co/Flackoooo)
·
[Email](mailto:nicolasceballosbrito@gmail.com)

</div>
