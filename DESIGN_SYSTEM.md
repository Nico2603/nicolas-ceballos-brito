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

| Rol | Familia | Clase Tailwind | Pesos |
|---|---|---|---|
| Display | Fraunces | `font-display` | 400, 600, 700 |
| Body | Plus Jakarta Sans | `font-sans` | 400, 500, 600, 700 |

Carga en `index.html` vía Google Fonts.

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
ThemeProvider
├── Navbar              (todas las rutas)
├── main.pb-24.md:pb-0
│   └── Routes
├── BottomNav           (solo mobile)
└── FloatingContactButton (solo desktop)
```

### Navbar — floating island

- `fixed top-0`, isla centrada `rounded-full backdrop-blur-xl`
- Desktop (`md+`): links + CTA Contacto + theme toggle
- Mobile: logo + toggle + hamburger morph (Framer Motion)
- Menú fullscreen con stagger reveal
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
| Hero | Split `md:grid-cols-2`, mesh + `HeroGrid` canvas | `Hero.tsx` |
| Portafolio | Bento grid, stats GitHub API | `Portfolio.tsx` |
| Labores | Carousel spring + barra de progreso | `LaboresCarousel.tsx` |
| Contacto | Split 2 cols, icon containers | `Contact.tsx` |
| Footer | Navy sólido, 3 columnas | `Footer.tsx` |
| About | Foto + bio en Card, 4 skill categories | `pages/About.tsx` |
| Repositories | SectionHeader + filtros + Card grid | `pages/Repositories.tsx` |

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
| Lenis | Clases `html.lenis lenis-smooth` en `App.tsx` |

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
- `.hero-grid-bg` — grid mesh reutilizable
- `.profile-image` — foto de perfil (`/images/pic.webp`)

---

## 10. Deprecaciones (post-rediseño)

| Eliminado | Reemplazo |
|---|---|
| `.glass-card` global | `Card` component |
| `SimpleNavbar` | `Navbar` unificado |
| shields.io badges | `SocialLinks` |
| skillicons.dev | `Badge` locales en `SkillsSection` |
| stats hardcoded portafolio | `useGitHubRepos` API |
| gradient footer | `--color-navy-deep` sólido |
| Montserrat / Raleway | Plus Jakarta Sans + Fraunces |

---

## 11. Verificación

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
