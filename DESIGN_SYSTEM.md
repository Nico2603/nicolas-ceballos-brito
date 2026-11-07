# Sistema de Diseño — nicolas-ceballos-brito

> **Portafolio profesional full-stack.**
> React 19 + TypeScript + Tailwind v4 + Framer Motion + Lenis + Vite 8.
> **Tema dual:** oscuro por defecto. El claro es hueso, no un blanco frío. Persistencia en `localStorage`.

---

## 1. Brand & Personalidad

| Atributo | Valor |
|---|---|
| **Nombre** | Nicolás Ceballos Brito |
| **Identidad** | El nombre es la marca: wordmark Nicolás (la á en coral) y sello NCB. No es el monograma de placa. |
| **Tono** | Técnico, directo, de tarjeta de presentación. No comparte tipo, botón ni motion con Rayito de Sol. |
| **Audiencia** | Reclutadores, clientes, colaboradores tech |
| **Dominio producción** | `https://nicolasceballosbrito.com` |
| **Paleta** | Noche `#0B0E13` · marfil `#ECE8E1` · hueso `#F3EFE7` · acero `#8AA0B8` (secundario) · coral `#E85D4C` (acción) |
| **Tipo** | Geist para nombre y cuerpo. Geist Mono para etiquetas, fechas y stack. |

---

## 2. Paleta de Colores

### 2.1 Colores fijos (`@theme`)

| Token | Valor | Uso |
|---|---|---|
| `--color-navy-deep` | `#1A1612` en claro, `#12171E` en oscuro | Texto sobre el coral y pie |
| `--color-navy-mid` | `#12171E` | Superficie oscura |
| `--color-cyan` | `#8AA0B8` | Acero — nombre legacy, ya no es el acento |
| `--color-cyan-bright` | `#B7C6D6` | Acero claro — nombre legacy |
| `--color-amber` | `#E85D4C` | Coral — nombre legacy del token |
| `--color-amber-bright` | `#E85D4C` | El mismo coral |

### 2.2 Variables de tema (cambian con `.dark`)

| Token | Light (`:root`) | Dark (`.dark`) | Uso |
|---|---|---|---|
| `--color-bg-primary` | `#F3EFE7` | `#0B0E13` | Fondo de página |
| `--color-bg-secondary` | `#E7E1D6` | `#12171E` | Secciones alternas |
| `--color-bg-card` | `#F7F4EE` | `#161B22` | Superficies de tarjeta |
| `--color-text-primary` | `#1A1612` | `#ECE8E1` | Texto principal |
| `--color-text-secondary` | `#4A433C` | `#B7B1A8` | Texto secundario |
| `--color-accent-primary` | `#6E8298` | `#8AA0B8` | Acero, secundario |
| `--color-accent-cta` | `#E85D4C` | `#E85D4C` | Botón y la á del nombre |
| `--color-border-light` | `#D9D1C4` | `#2A313C` | Bordes, inputs |
| `--color-nav-bg` | `rgba(243,239,231,0.94)` | `rgba(11,14,19,0.94)` | Navbar |

### 2.3 Sombras y gradientes

| Token | Uso |
|---|---|
| `--shadow-card` | En claro, una línea. En oscuro, ninguna |
| `--shadow-cta` | Ninguna. El botón no brilla |
| `--shadow-nav` | En claro, una línea. En oscuro, ninguna |
| `--gradient-hero` | Color plano: hueso o noche. Sin malla ni scrim |

**Archivo fuente:** `src/styles/tokens.css`

---

## 3. Tipografía

| Rol | Familia | Clase Tailwind | Pesos cargados |
|---|---|---|---|
| Texto | Geist | `font-sans` y `font-display` | 400, 500, 600 |
| Etiquetas, fechas, stack | Geist Mono | `font-mono` | 400, 500 |

Autohospedadas con `@fontsource`. Críticas en `src/styles/fonts-critical.css` (Geist 400 y 500, Geist Mono 400). El 600 y la mono 500 van diferidos. No usar Google Fonts en `index.html`. `font-display` es la misma grotesca: no hay una serif de título.

### 3.1 Activos de marca y previews sociales

| Activo | Archivo | Dimensiones | Notas |
|---|---|---|---|
| Favicon / sello | `public/favicon.svg` | 68×32 | **NCB** en coral, sin placa. El componente `Marca` usa los mismos trazos en `currentColor` |
| Tarjeta Open Graph | `public/images/og-image.webp` | 1200×630 | Generada en `prebuild` por `scripts/generate-og-image.mjs`; noche, marfil y sello coral, **sin foto** |
| Foto de perfil | `public/images/pic.webp` | 288×288 (Hero) | Variantes `pic-224.webp`, `pic-288.webp`, `pic-576.webp` en prebuild; Hero usa `<img>` con `srcSet`. **LCP lab = `<h1>` texto** (`hero-lcp-visible`), no la imagen. Preload solo en `/` |
| Apple touch icon | `public/apple-touch-icon.png` | 180×180 | Recorte de la tarjeta OG (`normalize-seo-images.mjs`) |

La tarjeta OG lleva el sello NCB, el nombre y el rol. Los meta tags (`og:title`, `og:description`, `og:image`) los inyecta `SeoHelmet.tsx` y el prerender los deja en HTML estático para crawlers de WhatsApp/LinkedIn.

Para cambiar copy o colores de la tarjeta: editar `scripts/generate-og-image.mjs` → `npm run build`.

**Patrones:**
- Eyebrow: `font-mono`, sin mayúsculas rastreadas ni filetes laterales
- H1 hero: `font-sans font-medium tracking-[-0.04em]`
- H2 sección: `font-sans font-medium tracking-[-0.03em]`, con un filete coral antes del título

---

## 4. Componentes UI (`src/components/ui/`)

### Button

| Variante | Estilo | Uso |
|---|---|---|
| `primary` | Coral, `rounded-sm`, sin brillo ni `scale` | CTAs principales |
| `secondary` | Outline navy, fill on hover | Acciones secundarias |
| `ghost` | Borde sutil, fondo on hover | CTAs sobre hero oscuro |
| `icon` | Cuadrado `rounded-sm` | Acciones icónicas |

Soporta `to` (react-router), `href` (anchor/externo/mailto) y `trailingIcon` (patrón button-in-button).

### Card

Double-bezel: shell `p-[1px]` con borde + inner `rounded-[15px]` con `bg-card`.

### SectionHeader

Props: `eyebrow`, `title`, `highlight`, `description`, `align` (`left` | `center`).

### Badge

Variantes: `default` (cyan tint), `accent` (ámbar), `muted` (gris).

### ThemeToggle

Sol/luna con stroke adaptativo según scroll y contexto hero (`onHero`).

### Marca (`src/components/Marca.tsx`)

Dos signos. El wordmark es el nombre. El sello es NCB, sin placa y sin tick.

| Variante | Dónde | Comportamiento |
|---|---|---|
| `header` | Barra | Wordmark Nicolás. La á va en coral |
| `hero` | Encima del `<h1>` | El sello NCB se traza una vez (N y C) y la B entra en opacidad. Debajo, un filete |
| `footer` | Pie oscuro | Sello en blanco + nombre completo |

El trazo es CSS (`stroke-dashoffset`), no el bundle de Motion. Si el sistema pide menos movimiento, el sello aparece terminado. El `<h1>` no se anima. El archivo oficial del signo es `brands/nicolas/assets/logo/ncb.svg` en publicidad, copia del favicon.

---

## 5. Layout & Navegación

### Arquitectura App (`src/App.tsx`)

```
LazyMotion (domAnimation)
└── ThemeProvider
    ├── Navbar              (todas las rutas)
    ├── main.pb-24.md:pb-0
    │   └── Routes (lazy por página)
    ├── BottomNav           (solo mobile)
    ├── FloatingWhatsAppButton
    ├── GoogleAnalytics
    └── DeferredVercelMetrics
```

### Navbar — floating island

- `fixed top-0`, isla `rounded-sm`, sin blur. El overlay móvil sí usa blur |
- Desktop (`md+`): links + CTA Contacto + theme toggle
- Mobile: logo + toggle + hamburger morph (CSS: `.hamburger`, `.hamburger-open`)
- Menú fullscreen con reveal escalonado vía CSS (`.mobile-menu-overlay`, `.mobile-nav-item` + `transition-delay`)
- Scroll threshold: 60px → fondo sólido

### BottomNav — dock móvil

- `md:hidden`, `fixed bottom-5 inset-x-4`
- 5 ítems: Inicio, Proyectos, Sobre mí, Repos, Contacto
- Estado activo vía `useActiveSection` (IntersectionObserver en home)
- Safe area: `paddingBottom: max(0.5rem, env(safe-area-inset-bottom))`

### Hooks

| Hook | Archivo | Responsabilidad |
|---|---|---|
| `useSmartNavigation` | `src/hooks/useSmartNavigation.ts` | Anchors cross-route, externos, mailto |
| `useActiveSection` | `src/hooks/useActiveSection.ts` | Sección activa para bottom nav |
| `useTheme` | `src/context/ThemeContext.tsx` | Tema claro/oscuro |

---

## 6. Patrones por sección

| Sección | Patrón | Archivo |
|---|---|---|
| Hero | Sello NCB, nombre en texto, rol en frase, bio, botón coral y un enlace. Foto a la derecha, debajo en el teléfono | `Hero.tsx` |
| Ahora: Prosavis | Grid 12: (1) cabecera marca, (2) media 7 + panel 5 con tarjeta de mensaje completa (no OG recortado) + foto relax, (3) copy/CTAs 7 + suite 5 | `CurrentWorkProsavis.tsx`, `data/prosavis.ts` |
| Portafolio | Grid 2×2 uniforme, stats GitHub en una línea | `Portfolio.tsx` |
| Experiencia | Banner graduación + roles LinkedIn **sin** Prosavis (ya destacado en `#ahora`) | `CurrentExperience.tsx` |
| Labores | Carousel spring + barra de progreso | `LaboresCarousel.tsx` |
| Feed LinkedIn | Post destacado ancho + grid 2 cols de actividad | `LinkedInFeed.tsx` |
| Contacto | Split 2 cols, icon containers | `Contact.tsx` |
| Footer | Navy sólido, 3 columnas | `Footer.tsx` |
| About | Foto + bio, `SkillsSection`, perfil LinkedIn completo | `About.tsx`, `LinkedInProfileDetails.tsx` |
| Repositories | SectionHeader + filtros + Card grid | `pages/Repositories.tsx` |

### Orden Home (`pages/Home.tsx`)

```
Hero → Ahora (Prosavis, una vez) → Trabajo seleccionado → Hubs sin Prosavis → Trayectoria → Fuera del código (labores + LinkedIn) → FAQ corta → Contacto → Footer
```

**Narrativa:** freelance-first + disponible para roles fuertes; señal #1 = Prosavis en producción (solo datos públicos: web, Play Store, LinkedIn).

Preload LCP (`pic-288.webp`) vía `Helmet` en `Home.tsx` — no en `index.html` global.

### Fuente de datos LinkedIn

| Dato | Archivo |
|---|---|
| Perfil completo (experiencia, educación, certs, skills) | `src/data/linkedin-profile.ts` |
| Bios y roles derivados | `src/data/profile.ts` |
| Feed de posts/actividad | `src/data/linkedin-posts.ts` |
| Sync opcional | `npm run sync:linkedin` → `linkedin-sync.raw.json` |

---

## 7. Motion & Performance

| Regla | Implementación |
|---|---|
| Easing | `--ease-smooth: cubic-bezier(0.2, 0.8, 0.2, 1)`. No es la curva de Rayito |
| Filete | Una línea coral (`scaleX`) antes del título de sección |
| Enlaces | Subrayado que crece. Los botones no usan `scale` |
| Formulario | La salida es solo opacidad. La confirmación es un filete, no un sol |
| `prefers-reduced-motion` | El sello y el filete aparecen terminados |
| `backdrop-blur` | Solo el overlay del menú móvil |
| Lenis | Desktop, `duration: 0.85`, easing `1 - (1 - t) ** 3`, `wheelMultiplier: 0.9` |
| LazyMotion | `domAnimation` en `App.tsx` |

**Iconos:** Lucide React (sin Phosphor — bundle estable).

---

## 8. Tema (ThemeContext)

- **Storage key:** `nicolas-portfolio-theme`
- **Fallback:** oscuro. Lo guardado en `localStorage` gana. El script de `index.html` pone `dark` salvo que el valor guardado sea `light`
- **Toggle:** clase `.dark` en `<html>`
- **Transiciones:** `src/styles/animations.css` (color 0.3s ease-smooth)

---

## 9. Efectos globales (`src/styles/base.css`)

- Grain overlay fijo (`body::before`, opacity 0.03)
- Scrollbar themed (thin, `border-light`)
- `::selection` con coral al 28%
- `.profile-image` — foto de perfil en About (`background-image`); Hero usa `<img>` nativo con `srcSet`
- El hero no lleva grilla, aurora ni glow. El movimiento de marca es el trazo del sello y el filete

---

## 10. Deprecaciones (post-rediseño)

| Eliminado | Reemplazo |
|---|---|
| `.glass-card` global | `Card` component |
| `SimpleNavbar` | `Navbar` unificado |
| shields.io badges | `SocialLinks` |
| skillicons.dev | `Badge` locales en `SkillsSection` |
| stats hardcoded portafolio | `useGitHubRepos` API |
| bento grid portafolio (primer card 2×2) | grid 2×2 uniforme, 4 proyectos reales |
| bio/roles manuales en `content.ts` | `linkedin-profile.ts` + `profile.ts` |
| gradient footer | `--color-navy-deep` sólido |
| Montserrat / Raleway / Fraunces / Plus Jakarta | Geist + Geist Mono |
| Placa NC y tick pollito | Sello NCB y wordmark Nicolás |
| Botón pastilla amarillo, ceja dorada, degradado a dorado | Coral plano, ceja en mono, filete |
| Aurora, grilla, glow y anillo de la foto | Campo del hero en el gradiente de tinta/papel |
| Máquina de escribir del hero | Frase de rol estática |

---

## 11. Rendimiento (LCP e interacción)

| Regla | Detalle |
|---|---|
| LCP (lab) | **`<h1>` en Geist** — clase `hero-lcp-visible`; sin `motion` en `<h1>`. Imagen de perfil: `<img>` estático, no es LCP en Lighthouse móvil |
| Rol del hero | Frase estática. El `<h1>` no lleva motion |
| Animación hero | Entrada CSS del texto secundario. El isotipo se traza una vez. Con menos movimiento, queda armado |
| Below-fold Home | `ViewportLazy` — monta chunks lazy solo al entrar en viewport |
| Framer Motion | Carrusel y contacto. `SectionHeader` y `Button` son CSS |
| Imágenes carrusel | `carouselImageSources`: solo `-480.webp` / `-640.webp` (nunca original en `srcSet`) |
| Fuentes | `fonts-critical.css` + `Geist Fallback` sobre Segoe UI; critical inline incluye estilos `h1` LCP |
| GA / métricas | GA4 post-interacción (15s idle); `web-vitals` → GA4; Vercel Speed Insights tras `load` |
| Lenis | Desktop: tras 2º scroll o `scrollY > 300` (sin idle RAF) |
| Auditoría | `audit:perf:assert`, `audit:bundle`, `performance-budget.json`; CI mobile + desktop |
| Validación build | Sin `127.0.0.1`/`localhost` en HTML prerenderizado |

---

## 12. Verificación

```bash
npm run lint
npm run build
graphify update .
```

Checklist manual:
- [ ] 375px — bottom nav no tapa CTAs
- [ ] 768px — transición navbar / dock
- [ ] 1440px — island nav centrada
- [ ] Toggle tema persiste tras refresh
- [ ] Anchor cross-route (`/about` → `/#portafolio`)
- [ ] `prefers-reduced-motion` — isotipo quieto, sin trazo
- [ ] Tras `npm run build`, `public/images/og-image.webp` muestra tarjeta de marca (no foto)
- [ ] Tras `npm run build`, HTML prerenderizado sin `127.0.0.1`/`localhost` en `dist/guias/*/index.html`
- [ ] Guías prerenderizadas sin JSON-LD de home (`#website`, `FAQPage`)
- [ ] Lighthouse mobile en `/` — mediana 3 runs: Performance ≥ 85 (`npm run audit:perf:assert`)
- [ ] Lighthouse desktop — Performance ≥ 80 (`npm run audit:perf:full`)
- [ ] Meta final: Speed Index < 4 s, desktop ≥ 90 (ver `performance-budget.json`)
