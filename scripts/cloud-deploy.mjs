#!/usr/bin/env node
/**
 * Vercel deploy for Cursor Cloud Agents (Ubuntu).
 * Reads team/project from .deploy/binding.json.
 * Uses VERCEL_TOKEN from the environment — never prints it, never passes --token.
 *
 *   node scripts/cloud-deploy.mjs           # preview
 *   node scripts/cloud-deploy.mjs --prod    # production
 *   node scripts/cloud-deploy.mjs --whoami
 */
import { existsSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const bindingPath = join(root, '.deploy/binding.json')
const prod = process.argv.includes('--prod')
const whoami = process.argv.includes('--whoami')

if (!existsSync(bindingPath)) {
  console.error('cloud-deploy: missing .deploy/binding.json')
  process.exit(1)
}

const binding = JSON.parse(readFileSync(bindingPath, 'utf8'))
if (!binding?.vercel?.enabled) {
  console.error('cloud-deploy: vercel.enabled is false in binding.json')
  process.exit(1)
}

if (!process.env.VERCEL_TOKEN) {
  console.error('cloud-deploy: missing VERCEL_TOKEN (Cursor Runtime Secret). Do not paste tokens into chat.')
  process.exit(1)
}

const orgId = binding.vercel.orgId
const projectId = binding.vercel.projectId
const scope = binding.vercel.teamSlug
if (!orgId || !projectId || !scope) {
  console.error('cloud-deploy: binding.json missing vercel.orgId, projectId, or teamSlug')
  process.exit(1)
}

const env = {
  ...process.env,
  VERCEL_ORG_ID: String(orgId),
  VERCEL_PROJECT_ID: String(projectId),
}

const args = whoami
  ? ['--yes', 'vercel', 'whoami', '--scope', String(scope)]
  : ['--yes', 'vercel', 'deploy', '--yes', '--scope', String(scope), ...(prod ? ['--prod'] : [])]

console.log(
  whoami
    ? `cloud-deploy: vercel whoami scope=${scope}`
    : `cloud-deploy: vercel deploy scope=${scope} project=${binding.vercel.projectName} target=${prod ? 'production' : 'preview'}`,
)

const result = spawnSync('npx', args, {
  cwd: root,
  env,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

if (result.error) {
  console.error(`cloud-deploy: failed to start npx (${result.error.message})`)
  process.exit(1)
}

process.exit(result.status ?? 1)
