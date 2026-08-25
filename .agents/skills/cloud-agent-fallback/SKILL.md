---
name: cloud-agent-fallback
description: >-
  Operates Nico2603 products from a hosted Cloud Agent (Ubuntu) when
  Nico-Laptop / Remote Control is unavailable. Use for DB status, last
  deploy, cloud:probe / cloud:status / cloud:deploy, or when the user
  says the laptop is off, My Machines is missing, or they want the Cloud
  specialist channel.
---

# Cloud Agent fallback (sin Remote Control)

## When this applies

- Runtime is a **hosted Cloud Agent** (Ubuntu VM), not **`Nico-Laptop`**.
- User says the laptop is off, worker down, or they have no Remote Control.
- Ask is product ops: probe secrets, last deploy, patient/Casa counts, fix/ship via `cloud:deploy`.

If Runtime **is** `Nico-Laptop`, stop and use `remote-control-nico` + `personal-ship` + `nico-ops` instead.

## Hard rules

- One environment = one repo. Never mix Lumen `SUPABASE_*` / `service_role` into Rayito, portafolio, or Casa.
- Never print token values, JWTs, `sb_secret_…`, or table **rows** (counts only).
- Do **not** run PowerShell under `%LOCALAPPDATA%\cursor-agent\personal\`.
- Do **not** call `nico-ops` or `nico-*-admin` (Windows stdio). They do not exist on the VM.
- Local unpushed files on the PC **do not exist** here. Work is the GitHub clone.

## Two GitHub accounts

- Office plugin **Prosavis** stays. Never disconnect it.
- Cuartel uses **Nico2603** + Cloud Agent of `Nico2603/<repo>`.
- If someone asks to reauth GitHub: **add** Nico2603, do not replace Prosavis.

## Channel (pick the repo)

| Repo / environment | Qué puede hacer |
|---|---|
| `Nico2603/lumen-care` | Vercel `lumencare` + conteos Lumen (`patients`, …) |
| `Nico2603/rayito-de-sol` | Vercel `maria-camila` |
| `Nico2603/nicolas-ceballos-brito` | Vercel `flackosss` |
| `Nico2603/nube-personal` | Casa Supabase (`CASA_*`) only — no galería, Drive, LocalSend, Toshiba |

## Commands (this repo root)

```bash
npm run cloud:probe    # NAME=set|missing — never values
npm run cloud:status   # probe + last deploy + optional counts
npm run cloud:deploy   # preview (webs; needs VERCEL_TOKEN=set)
npm run cloud:deploy:prod
```

If `cloud:status` reports `missing` for a required secret, stop. Tell the user to paste it in [My Secrets](https://cursor.com/dashboard/cloud-agents) scoped to **this** repo. Checklist: `docs/CLOUD-AGENT-SECRETS.md` (workspace) section **Checklist FALTA**. Do not ask them to paste the value into chat if they can use the dashboard.

## Magic phrases

| User says | Do |
|---|---|
| probe / ¿faltan secretos? | `cloud:probe` |
| estado / último deploy | `cloud:status` |
| ¿cuántos pacientes? | Lumen only → `cloud:status` (count, no dump) |
| estado Casa | `nube-personal` → `cloud:status` |
| arregla / preview | `cloud:deploy` |
| deploy prod | `cloud:deploy:prod` |

## Docs

- Workspace: `docs/CLOUD-AGENT-SECRETS.md` · `docs/MOBILE-REMOTE-CONTROL.md`
- This repo: `AGENTS.md` section **Cloud fallback**
