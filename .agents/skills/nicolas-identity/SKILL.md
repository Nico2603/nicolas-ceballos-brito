---
name: nicolas-identity
description: >-
  Identidad de Nicolás Ceballos Brito y de cada repo propio. Usar al redactar
  README, AGENTS.md, commits públicos, copy de portafolio, o cuando el agente
  necesite quién es el autor, redes, marca Ink & Steel, o qué no mezclar con
  Prosavis oficina.
---

# Nicolás Ceballos Brito — identidad

Leer este skill **siempre** en repos `Nico2603/*` propios (públicos o privados).
No aplica a forks de terceros salvo que el usuario pida portar la cara visual.

## Persona

| Campo | Valor |
|---|---|
| Nombre | Nicolás Ceballos Brito |
| Headline | Ingeniero en Sistemas y Telecomunicaciones · software, web, datos e IA |
| Formación | Universidad Católica de Pereira, 2025 |
| Rol actual | Director técnico en Prosavis (Pereira). App Lead previo (jul–sept 2025). |
| Extra | AI Engineer trainee (Modin / Teilur, 2025). Representante estudiantil Consejo Académico 2023–2025. |
| Sitio | https://nicolasceballosbrito.com |
| Email | nicolasceballosbrito@gmail.com |
| GitHub | https://github.com/Nico2603 |
| LinkedIn | https://www.linkedin.com/in/nicolas-ceballos-brito/ |
| X | https://x.com/NicolasCBrito |
| Instagram | https://www.instagram.com/nico_ceballos26/ |
| Facebook | https://www.facebook.com/NicolasCeballosBrito |
| Hugging Face | https://huggingface.co/Flackoooo |
| Ciudad | Pereira, Risaralda, Colombia |

Bio corta (README / footer):

> Ingeniero en Sistemas y Telecomunicaciones (UCP 2025). Diseño y construyo productos web, móvil e IA. CTO en Prosavis. Disponible para colaboraciones selectas.

No escribir: «estudiante de noveno semestre», «novato», placeholders `tu-usuario` / `<URL_DEL_REPOSITORIO>`.

## Marca visual (Ink & Steel)

Fuente de verdad de producto: `landings/nicolas-ceballos-brito/DESIGN_SYSTEM.md`.

| Token | Hex | Uso |
|---|---|---|
| Ink | `#070A0F` | Fondo banner |
| Steel | `#3D5A80` / `#7BA3C9` | Acento, links |
| Chick yellow | `#FACC15` | CTA, tick de marca |
| Paper | `#F4F6F8` | Superficie clara |

Misma **cara** en todos los README propios (público o privado): banner SVG `docs/assets/banner.svg`, badges steel/yellow, pie de autor idéntico. El **cuerpo** cambia: vitrina vs ops. En privados: cero secretos, IPs, tokens o allowlists.

Acento por familia (solo el tick del banner):

| Familia | Acento |
|---|---|
| Perfil / landings | `#FACC15` |
| Salud mental | `#7BAF9E` |
| PdM | `#C4A574` |
| Aula / portafolio | `#7BA3C9` |
| Clínicos | `#5B8FA8` |
| Casa | `#8B7E74` |

## Cómo escribir

- Español, tono editorial y técnico. Sin emojis de relleno ni GIFs ajenos (octocat, pacman).
- Un repo = una tesis. Relacionar hermanos (MarIA ↔ LiveKit ↔ BERT; PdM cuarteto).
- Si el código es prototipo o frontend-only, decirlo. No vender backend que no existe.
- Licencia: no inventar MIT si no hay `LICENSE`.

## Frontera Prosavis

- Repos personales `Nico2603/*` ≠ org `Prosavis/*`.
- No copiar tokens, Firebase oficina, ni `publicidad` de Prosavis a casa.
- `Nico2603/publicidad` es anuncios casa. Distinto de `Prosavis/publicidad`.
- Forks Prosavis: identidad de Nicolás en footer está bien; no rebrandear el producto de la empresa.

## Pendientes (no inventar)

Ver [`docs/PORTFOLIO-PENDING.md`](../../docs/PORTFOLIO-PENDING.md). Sobre todo: **no** poner URL de Space Hugging Face del BERT hasta que se confirme; MarIA en Render sigue viva; Colectivo = programación, sin año.

## Pie obligatorio (README)

Usar el bloque de [`docs/portfolio-kit/readme-footer.md`](../../docs/portfolio-kit/readme-footer.md). En un checkout de repo, copiar el mismo HTML al final de `README.md`.

## Skills obligatorias (todos los repos propios)

Instalar / copiar en `.agents/skills/`:

1. `using-superpowers`
2. `brainstorming`
3. `systematic-debugging`
4. `writing-plans`
5. `executing-plans`
6. `verification-before-completion`
7. `requesting-code-review`
8. `find-skills`
9. `nicolas-identity` (este archivo)

Más el bundle de stack (web, Python/ML, FastAPI, etc.) según el repo. Lockfile: `skills-lock.json`. Regla: `.cursor/rules/skills-mandatory.mdc`.

## Graphify

En **cada** repo propio: `graphify update .` · `graphify-out/` en `.gitignore`.
En la raíz del workspace (`Documents\GitHub`) ya hay un grafo de ops. No mezclar los dos como si fueran el mismo proyecto.
