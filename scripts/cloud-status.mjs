#!/usr/bin/env node
/**
 * Cloud Agent status: probe + last Vercel deploy + optional Supabase counts.
 * Never prints secret values or table rows.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const examplePath = join(root, '.env.example')
const bindingPath = join(root, '.deploy/binding.json')

const LUMEN_TABLES = ['patients', 'appointments', 'notes', 'payments', 'session_evolutions']
const CASA_TABLES = ['casa_devices', 'casa_heartbeats', 'notify_outbox', 'transfer_sessions']

function redact(text) {
  return String(text ?? '')
    .replace(/Bearer\s+\S+/gi, 'Bearer [redacted]')
    .replace(/sb_secret_[A-Za-z0-9]+/g, 'sb_secret_[redacted]')
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[jwt]')
}

function keysFromExample(text) {
  const keys = []
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#') || !line.includes('=')) continue
    keys.push(line.split('=')[0].trim())
  }
  return keys
}

function loadBinding() {
  if (!existsSync(bindingPath)) return null
  try {
    return JSON.parse(readFileSync(bindingPath, 'utf8').replace(/^\uFEFF/, ''))
  } catch {
    return null
  }
}

function flag(name) {
  return process.env[name] ? 'set' : 'missing'
}

function probeNames(binding) {
  const names = existsSync(examplePath)
    ? keysFromExample(readFileSync(examplePath, 'utf8'))
    : []
  if (binding?.vercel?.enabled) names.push('VERCEL_TOKEN')
  if (binding?.supabase?.enabled) {
    names.push('SUPABASE_ACCESS_TOKEN', 'SUPABASE_SERVICE_ROLE_KEY')
  }
  if (!binding) {
    for (const name of [
      'CASA_SUPABASE_URL',
      'CASA_SUPABASE_ANON_KEY',
      'CASA_SUPABASE_SERVICE_ROLE_KEY',
      'CASA_SUPABASE_ACCESS_TOKEN',
    ]) {
      if (!names.includes(name)) names.push(name)
    }
  }
  return [...new Set(names)]
}

function iso(value) {
  if (value == null) return '-'
  const date = typeof value === 'number' ? new Date(value) : new Date(String(value))
  return Number.isNaN(date.getTime()) ? '-' : date.toISOString()
}

/**
 * @param {number} started
 * @returns {number}
 */
function worse(started, next) {
  return Math.max(started, next)
}

async function vercelStatus(binding) {
  if (!binding?.vercel?.enabled) {
    console.log('vercel: skipped (not enabled)')
    return 0
  }
  if (!process.env.VERCEL_TOKEN) {
    console.log('vercel: skipped (VERCEL_TOKEN=missing)')
    return 1
  }

  const projectId = binding.vercel.projectId
  const teamId = binding.vercel.orgId
  const params = new URLSearchParams({ limit: '5' })
  if (projectId) params.set('projectId', String(projectId))
  if (teamId) params.set('teamId', String(teamId))

  const response = await fetch(`https://api.vercel.com/v6/deployments?${params}`, {
    headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
  })

  if (!response.ok) {
    console.log(`vercel: error http=${response.status} ${redact(await response.text()).slice(0, 180)}`)
    return 2
  }

  const body = await response.json()
  const rows = Array.isArray(body?.deployments) ? body.deployments : []
  console.log(
    `vercel: project=${binding.vercel.projectName ?? projectId} team=${binding.vercel.teamSlug ?? '-'} count=${rows.length}`,
  )
  for (const row of rows.slice(0, 5)) {
    const id = row.uid ?? row.id ?? '-'
    const state = row.readyState ?? row.state ?? '-'
    const target = row.target ?? '-'
    const host = row.url ?? '-'
    console.log(`  ${id}  ${state}  ${target}  ${iso(row.created)}  ${host}`)
  }
  if (rows.length === 0) console.log('  (no deployments)')
  return 0
}

async function countTable(baseUrl, key, table) {
  const url = `${baseUrl.replace(/\/$/, '')}/rest/v1/${table}?select=id`
  const response = await fetch(url, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'count=exact',
      Range: '0-0',
    },
  })
  if (!response.ok) {
    return { table, ok: false, detail: `http=${response.status}` }
  }
  const range = response.headers.get('content-range') ?? ''
  const total = range.includes('/') ? range.split('/').pop() : '?'
  return { table, ok: true, count: total }
}

async function supabaseCounts(binding) {
  if (binding?.supabase?.enabled) {
    const host = binding.supabase.host
    const base =
      process.env.VITE_SUPABASE_URL ||
      (host ? `https://${host}` : '')
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!key) {
      console.log('db: skipped (SUPABASE_SERVICE_ROLE_KEY=missing)')
      return 1
    }
    if (!base) {
      console.log('db: skipped (no VITE_SUPABASE_URL / binding.host)')
      return 1
    }
    console.log(`db: lumen ref=${binding.supabase.projectRef ?? '-'}`)
    let code = 0
    for (const table of LUMEN_TABLES) {
      const result = await countTable(base, key, table)
      if (result.ok) console.log(`  ${result.table} count=${result.count}`)
      else {
        console.log(`  ${result.table} error ${result.detail}`)
        code = 2
      }
    }
    return code
  }

  if (!binding) {
    const base = process.env.CASA_SUPABASE_URL ?? ''
    const key = process.env.CASA_SUPABASE_SERVICE_ROLE_KEY
    if (!key || !base) {
      console.log(
        `db: skipped (CASA_SUPABASE_URL=${flag('CASA_SUPABASE_URL')} CASA_SUPABASE_SERVICE_ROLE_KEY=${flag('CASA_SUPABASE_SERVICE_ROLE_KEY')})`,
      )
      return 1
    }
    console.log('db: casa')
    let code = 0
    for (const table of CASA_TABLES) {
      const result = await countTable(base, key, table)
      if (result.ok) console.log(`  ${result.table} count=${result.count}`)
      else {
        console.log(`  ${result.table} error ${result.detail}`)
        code = 2
      }
    }
    return code
  }

  console.log('db: skipped (supabase not enabled)')
  return 0
}

const binding = loadBinding()
console.log('cloud-status: probe')
for (const name of probeNames(binding)) {
  console.log(`${name}=${flag(name)}`)
}

let exitCode = 0
try {
  console.log('cloud-status: vercel')
  exitCode = worse(exitCode, await vercelStatus(binding))
  console.log('cloud-status: db')
  exitCode = worse(exitCode, await supabaseCounts(binding))
} catch (error) {
  console.error(`cloud-status: ${redact(error instanceof Error ? error.message : error)}`)
  exitCode = worse(exitCode, 2)
}

process.exit(exitCode)
