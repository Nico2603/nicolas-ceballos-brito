# Sistema de Diseño — nicolas-ceballos-brito

> **Portafolio profesional full-stack.**
> React 19 + TypeScript + Tailwind v4 + Framer Motion + Lenis + Vite 8.
> **Tema dual:** Claro / Oscuro con persistencia en `localStorage`.

---

## 1. Brand & Personalidad

| Atributo | Valor |
|---|---|
| **Nombre** | Nicolás Ceballos Brito |
| **Identidad** | Dev Premium — navy profundo + acentos eléctricos |
| **Tono** | Técnico, editorial, confiable, moderno |
| **Audiencia** | Reclutadores, clientes, colaboradores tech |
| **Dominio producción** | `https://nicolasceballosbrito.com` |
| **Paleta maestra** | Navy (`#0B1220`) + Cyan (`#22D3EE`) + Ámbar CTA (`#F59E0B`) |

---

## 2. Paleta de Colores

### 2.1 Colores fijos (`@theme`)

| Token | Valor | Uso |
|---|---|---|
| `--color-navy-deep` | `#1E293B` | Footer, texto sobre CTA |
| `--color-navy-mid` | `#0F172A` | Fondos oscuros profundos |
| `--color-cyan` | `#0891B2` | Acento claro (modo light) |
| `--color-cyan-bright` | `#22D3EE` | Acento oscuro (modo dark) |
| `--color-amber` | `#F59E0B` | CTA primario (light) |
| `--color-amber-bright` | `#FBBF24` | CTA primario (dark) |

### 2.2 Variables de tema (cambian con `.dark`)

| Token | Light (`:root`) | Dark (`.dark`) | Uso |
|---|---|---|---|
| `--color-bg-primary` | `#F7F9FC` | `#0B1220` | Fondo de página |
| `--color-bg-secondary` | `#E8EEF7` | `#111827` | Secciones alternas |
| `--color-bg-card` | `#FFFFFF` | `#1A2332` | Superficies de tarjeta |
| `--color-text-primary` | `#0F172A` | `#F1F5F9` | Texto principal |
| `--color-text-secondary` | `#475569` | `#94A3B8` | Texto secundario |
| `--color-accent-primary` | `#0891B2` | `#22D3EE` | Links, iconos, highlights |
| `--color-accent-cta` | `#F59E0B` | `#FBBF24` | Botones primarios |
| `--color-border-light` | `#E2E8F0` | `#1E293B` | Bordes, inputs |
| `--color-nav-bg` | `rgba(255,255,255,0.85)` | `rgba(11,18,32,0.9)` | Navbar / dock |

### 2.3 Sombras y gradientes

| Token | Uso |
|---|---|
| `--shadow-card` | Elevación base de cards |
| `--shadow-card-hover` | Hover con tinte cyan |
| `--shadow-cta` | Glow de botón ámbar |
| `--shadow-nav` | Isla flotante navbar / bottom dock |
| `--gradient-hero` | Fondo hero y headers de página |
| `--gradient-hero-scrim` | Scrim radial sobre hero |
| `--gradient-hero-grid` | Grid mesh CSS (48px) |

**Archivo fuente:** `src/styles/tokens.css`

---

## 3. Tipografía

| Rol | Familia | Clase Tailwind | Pesos cargados |
|---|---|---|---|
| Display | Fraunces | `font-display` | 600, 700 |
| Body | Plus Jakarta Sans | `font-sans` | 400, 500, 600, 700 |

Autohospedadas con `@fontsource`: pesos críticos en `src/styles/fonts-critical.css` (Jakarta 400, Fraunces 700) y resto diferido vía `DeferredFonts`. Entrada principal en `src/index.css` (`@import fonts-critical`, tokens, animations, base). No usar Google Fonts en `index.html`. Evitar añadir pesos extra sin medir impacto en LCP.

### 3.1 Activos de marca y previews sociales

| Activo | Archivo | Dimensiones | Notas |
|---|---|---|---|
| Favicon | `public/favicon.svg` | 32×32 | Monograma **NC**, fondo `#2a5c82` — pestaña del navegador |
| Tarjeta Open Graph | `public/images/og-image.webp` | 1200×630 | Generada en `prebuild` por `scripts/generate-og-image.mjs`; paleta navy/cyan/ámbar, **sin foto** |
| Foto de perfil | `public/images/pic.webp` | 288×288 (Hero) | Variantes `pic-224.webp`, `pic-288.webp`, `pic-576.webp` en prebuild; Hero usa `<img>` con `srcSet`. **LCP lab = `<h1>` texto** (`hero-lcp-visible`), no la imagen. Preload solo en `/` |
| Apple touch icon | `public/apple-touch-icon.png` | 180×180 | Recorte de la tarjeta OG (`normalize-seo-images.mjs`) |

La tarjeta OG replica el eyebrow del hero (*Full-Stack Developer · Ing. Sistemas*), el nombre y un stack resumido. Los meta tags (`og:title`, `og:description`, `og:image`) los inyecta `SeoHelmet.tsx` y el prerender los deja en HTML estático para crawlers de WhatsApp/LinkedIn.

Para cambiar copy o colores de la tarjeta: editar `scripts/generate-og-image.mjs` → `npm run build`.

**Patrones:**
- Eyebrow: `text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)]`
- H1 hero: `font-display text-4xl md:text-5xl lg:text-6xl font-bold`
- H2 sección: `font-display text-3xl md:text-4xl font-bold`

---

## 4. Componentes UI (`src/components/ui/`)

### Button

| Variante | Estilo | Uso |
|---|---|---|
| `primary` | Pill ámbar + `shadow-cta` | CTAs principales |
| `secondary` | Outline navy, fill on hover | Acciones secundarias |
| `ghost` | Borde sutil, fondo on hover | CTAs sobre hero oscuro |
| `icon` | Circular compacto | Acciones icónicas |

Soporta `to` (react-router), `href` (anchor/externo/mailto) y `trailingIcon` (patrón button-in-button).

### Card

Double-bezel: shell `p-[1px]` con borde + inner `rounded-[15px]` con `bg-card`.

### SectionHeader

Props: `eyebrow`, `title`, `highlight`, `description`, `align` (`left` | `center`).

### Badge

Variantes: `default` (cyan tint), `accent` (ámbar), `muted` (gris).

### ThemeToggle

Sol/luna con stroke adaptativo según scroll y contexto hero (`onHero`).

### Logo (`src/components/Logo.tsx`)

Monograma **NC** — variantes `default` y `onDark`.

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

- `fixed top-0`, isla centrada `rounded-full backdrop-blur-xl`
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
| Hero | Split `md:grid-cols-2`, mesh + `HeroGrid` canvas, mini-stats desde graduación UCP | `Hero.tsx` |
| Experiencia actual | Banner graduación + grid 2 cols de roles LinkedIn | `CurrentExperience.tsx` |
| Feed LinkedIn | Post destacado ancho + grid 2 cols de actividad | `LinkedInFeed.tsx` |
| Portafolio | Grid 2×2 uniforme, stats GitHub en una línea | `Portfolio.tsx` |
| Labores | Carousel spring + barra de progreso | `LaboresCarousel.tsx` |
| Contacto | Split 2 cols, icon containers | `Contact.tsx` |
| Footer | Navy sólido, 3 columnas | `Footer.tsx` |
| About | Foto + bio, `SkillsSection`, perfil LinkedIn completo | `About.tsx`, `LinkedInProfileDetails.tsx` |
| Repositories | SectionHeader + filtros + Card grid | `pages/Repositories.tsx` |

### Orden Home (`pages/Home.tsx`)

```
Hero → CurrentExperience (lazy) → LinkedInFeed (lazy) → Portfolio → LaboresCarousel (lazy) → RecursosSection → FaqSection (lazy) → Contact (lazy) → Footer
```

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
| Easing | `--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1)` |
| Spring carousel | `stiffness: 300, damping: 30` |
| Section reveal | `SectionWrapper` — `margin: '-100px'`, ease smooth |
| GPU-safe | Solo `transform` + `opacity` en animaciones |
| `prefers-reduced-motion` | Desactiva `HeroGrid` canvas; transiciones mínimas en CSS |
| `backdrop-blur` | Solo en elementos `fixed` (navbar, dock, overlay) |
| Lenis | Solo desktop (≥768px), diferido idle/primer scroll; clases `html.lenis lenis-smooth` en `App.tsx` |
| LazyMotion | `domAnimation` en `App.tsx` — bundle de motion reducido |

**Iconos:** Lucide React (sin Phosphor — bundle estable).

---

## 8. Tema (ThemeContext)

- **Storage key:** `nicolas-portfolio-theme`
- **Fallback:** `prefers-color-scheme`
- **Toggle:** clase `.dark` en `<html>`
- **Transiciones:** `src/styles/animations.css` (color 0.3s ease-smooth)

---

## 9. Efectos globales (`src/styles/base.css`)

- Grain overlay fijo (`body::before`, opacity 0.03)
- Scrollbar themed (thin, `border-light`)
- `::selection` con tinte cyan
- `.hero-grid-bg` — grid mesh reutilizable (fallback CSS; canvas `HeroGrid` solo desktop)
- `.profile-image` — foto de perfil en About (`background-image`); Hero usa `<img>` nativo con `srcSet`

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
| Montserrat / Raleway | Plus Jakarta Sans + Fraunces |

---

## 11. Rendimiento (LCP e interacción)

| Regla | Detalle |
|---|---|
| LCP (lab) | **`<h1>` texto Fraunces** — clase `hero-lcp-visible`; sin `motion` en `<h1>`. Imagen de perfil: `<img>` estático, no es LCP en Lighthouse móvil |
| TypingAnimation | `DeferredTypingAnimation`: texto estático hasta `requestIdleCallback`, luego lazy de `TypingAnimation` |
| Animación hero | Clases `hero-entrance`, `hero-entrance-delay-*`, `hero-profile-float` en `src/styles/animations.css` |
| Flotación avatar | `hero-profile-float` desactivada en `max-width: 768px` (mejor INP móvil) |
| Framer Motion | `LazyMotion` + `domAnimation` en `App.tsx`; `SectionWrapper` usa CSS `section-reveal` (sin `m`) |
| Home lazy | `Portfolio`, `RecursosSection`, `Footer`, `LinkedInFeed`, etc. con `React.lazy()` |
| Prerender home | CSS crítico inline (`critical-inline.css`), strip `modulepreload` below-fold, link `/schema/home.jsonld` |
| Fuentes | `fonts-critical.css` + `DeferredFonts`; fallback `--font-display: Fraunces, Georgia, Times New Roman, serif` |
| GA / métricas | GA4 post-interacción; Vercel Analytics/Speed Insights tras `load` |
| Navbar móvil | Overlay con clases `mobile-menu-*` y hamburger CSS — no `AnimatePresence` |
| Lenis | Solo viewport ≥768px; mobile usa scroll nativo |
| Preload imagen | Solo home: `Home.tsx` (Helmet) + fallback en `scripts/prerender.ts` |
| JSON-LD home | Inline lite en prebuild; schema completo en `public/schema/home.jsonld` |
| Imágenes carrusel | `carouselImageSources` + variantes `p*-640.webp` |
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
- [ ] `prefers-reduced-motion` — sin canvas hero
- [ ] Tras `npm run build`, `public/images/og-image.webp` muestra tarjeta de marca (no foto)
- [ ] Tras `npm run build`, HTML prerenderizado sin `127.0.0.1`/`localhost` en `dist/guias/*/index.html`
- [ ] Guías prerenderizadas sin JSON-LD de home (`#website`, `FAQPage`)
- [ ] Lighthouse mobile en `/` — mediana 3 runs: Performance ≥ 69, LCP < 3.5 s (`npm run audit:perf`)
- [ ] Meta final: Performance ≥ 85, LCP < 2.5 s (ver `lighthouserc.json` y `reports/performance-baseline.json`)
