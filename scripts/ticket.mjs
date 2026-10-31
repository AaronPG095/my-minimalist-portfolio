#!/usr/bin/env node
// Ticket workflow CLI shared by every AI client (Claude, Codex, Gemini/Antigravity, Cursor) and CI.
// The process it enforces is described in AGENTS.md ("Development process").
//
//   node scripts/ticket.mjs create <plan> --agent <Claude|Codex|Gemini|Other>   Notion Task (To Do), URL written into the plan
//   node scripts/ticket.mjs start  <plan>                                      Task -> Doing, branch + worktree recorded
//   node scripts/ticket.mjs log    <plan> --agent <client> --message "<text>"  handoff line in the plan's Progress log
//   node scripts/ticket.mjs check  <plan>                                      fails while any checkbox is open or a ticked
//                                                                              criterion has no "verified:" evidence
//   node scripts/ticket.mjs ship   <plan> --pr <url>                           check, link PR on the Task, add a comment
//   node scripts/ticket.mjs done   <plan>                                      Task -> Done (normally run by CI on merge)
//   node scripts/ticket.mjs ci-check --base <sha> --head <sha>                 CI: changed plans must pass check and keep every
//                                                                              checkbox; "no-plan" PRs must stay small
//   node scripts/ticket.mjs ci-done  --head <merge sha>                        CI: set merged plans' Tasks to Done
//
// Options: --dry-run prints Notion requests instead of sending them and does not modify the plan.
// Auth: NOTION_TOKEN from the environment or the repository's .env file (Notion internal integration
// shared with the Tasks database).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const config = JSON.parse(readFileSync(join(here, 'ticket.config.json'), 'utf8'));
const NOTION_VERSION = '2025-09-03';

const [command, ...rest] = process.argv.slice(2);
const opts = { files: [] };
for (let i = 0; i < rest.length; i++) {
  const a = rest[i];
  if (a === '--dry-run') opts.dryRun = true;
  else if (a.startsWith('--')) opts[a.slice(2)] = rest[++i];
  else opts.files.push(a);
}

function fail(message) {
  console.error(`ticket: ${message}`);
  process.exit(1);
}

// ---------- plan files ----------

function readPlan(path) {
  const full = resolve(path);
  if (!existsSync(full)) fail(`plan not found: ${path}`);
  const text = readFileSync(full, 'utf8');
  const eol = text.includes('\r\n') ? '\r\n' : '\n';
  const norm = text.replace(/\r\n/g, '\n');
  const m = norm.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) fail(`${path}: no frontmatter. Start from ${config.plansDir}/_template.plan.md.`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: norm.slice(m[0].length), eol, full, rel: relative(repoRoot, full).replace(/\\/g, '/') };
}

function writePlan(plan) {
  if (opts.dryRun) return;
  const head = Object.entries(plan.meta).map(([k, v]) => `${k}: ${v}`).join('\n');
  const out = `---\n${head}\n---\n${plan.body}`;
  writeFileSync(plan.full, plan.eol === '\r\n' ? out.replace(/\n/g, '\r\n') : out);
}

function section(body, heading) {
  const out = [];
  let on = false;
  for (const line of body.split('\n')) {
    if (/^## /.test(line)) { on = line.slice(3).trim().toLowerCase() === heading.toLowerCase(); continue; }
    if (on) out.push(line);
  }
  return out.join('\n').trim();
}

function problems(plan, { requireTicket = true } = {}) {
  const found = [];
  if (!plan.meta.title || plan.meta.title.startsWith('<')) found.push('frontmatter has no title');
  if (requireTicket && !/^https:\/\//.test(plan.meta.ticket || '')) found.push(`no Notion ticket URL (run: node scripts/ticket.mjs create ${plan.rel} --agent <client>)`);
  if (!/^\s*- \[[ xX]\]/m.test(section(plan.body, 'Steps'))) found.push('Steps section has no checkboxes');
  if (!/^\s*- \[[ xX]\]/m.test(section(plan.body, 'Acceptance criteria'))) found.push('Acceptance criteria section has no checkboxes');
  for (const line of plan.body.split('\n')) {
    if (/^\s*- \[ \]/.test(line) && !/deferred:/i.test(line)) found.push(`open item: ${line.trim()}`);
  }
  for (const line of section(plan.body, 'Acceptance criteria').split('\n')) {
    if (/^\s*- \[[xX]\]/.test(line) && !/verified:/i.test(line)) found.push(`criterion ticked without evidence (append "verified: <how it was checked>"): ${line.trim()}`);
  }
  return found;
}

const BOX = /^\s*- \[[ xX]\]/gm;
const countBoxes = (body) => ['Acceptance criteria', 'Steps'].reduce((n, h) => n + (section(body, h).match(BOX) || []).length, 0);
const deferredItems = (body) => body.split('\n').filter(l => /^\s*- \[ \]/.test(l) && /deferred:/i.test(l)).map(l => l.trim());

function bodyOf(text) {
  const norm = text.replace(/\r\n/g, '\n');
  const m = norm.match(/^---\n[\s\S]*?\n---\n/);
  return m ? norm.slice(m[0].length) : norm;
}

function git(args) {
  return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

// The plan as it was before this branch changed it: at the merge base if it already existed, otherwise its first commit on the branch.
function originalPlan(file, base, head) {
  const mergeBase = git(['merge-base', base, head]);
  try { return git(['show', `${mergeBase}:${file}`]); } catch { /* new on this branch */ }
  const first = git(['log', '--diff-filter=A', '--format=%H', `${mergeBase}..${head}`, '--', file]).split('\n').filter(Boolean).pop();
  return first ? git(['show', `${first}:${file}`]) : null;
}

function appendToSection(body, heading, entry) {
  const lines = body.split('\n');
  const start = lines.findIndex(l => l.trim().toLowerCase() === `## ${heading}`.toLowerCase());
  if (start === -1) return `${body.replace(/\s*$/, '')}\n\n## ${heading}\n\n${entry}\n`;
  let end = lines.findIndex((l, i) => i > start && /^## /.test(l));
  if (end === -1) end = lines.length;
  while (end > start + 1 && lines[end - 1].trim() === '') end--;
  lines.splice(end, 0, entry);
  return lines.join('\n');
}

function pageId(url) {
  const id = (url || '').split(/[?#]/)[0].replace(/-/g, '').match(/[0-9a-f]{32}(?=[^0-9a-f]*$)/i);
  if (!id) fail(`cannot read a Notion page id from "${url}"`);
  return id[0];
}

// ---------- Notion API ----------

function token() {
  if (process.env.NOTION_TOKEN) return process.env.NOTION_TOKEN.trim();
  const env = join(repoRoot, '.env');
  if (!existsSync(env)) return '';
  const m = readFileSync(env, 'utf8').match(/^\s*NOTION_TOKEN\s*=\s*"?([^"\r\n]+)"?/m);
  return m ? m[1].trim() : '';
}

async function notion(method, path, body, { soft = false } = {}) {
  if (opts.dryRun) {
    console.log(`[dry-run] ${method} https://api.notion.com/v1/${path}\n${JSON.stringify(body, null, 2)}`);
    return { url: 'https://www.notion.so/dry-run-00000000000000000000000000000000', id: 'dry-run' };
  }
  const auth = token();
  if (!auth) fail('NOTION_TOKEN is not set (environment or .env). Stop here and tell the user; do not create the ticket another way.');
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`https://api.notion.com/v1/${path}`, {
      method,
      headers: { Authorization: `Bearer ${auth}`, 'Notion-Version': NOTION_VERSION, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429 && attempt === 0) {
      const wait = Number(res.headers.get('retry-after') || 2);
      await new Promise(r => setTimeout(r, wait * 1000));
      continue;
    }
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = `Notion ${method} ${path} failed (${res.status}): ${json.message || res.statusText}`;
      if (soft) throw new Error(message);
      fail(message);
    }
    return json;
  }
}

const setStatus = (url, name) => notion('PATCH', `pages/${pageId(url)}`, { properties: { Status: { status: { name } } } });
const text = (content) => [{ text: { content: content.slice(0, 1990) } }];

// ---------- commands ----------

function onePlan() {
  if (opts.files.length !== 1) fail(`usage: node scripts/ticket.mjs ${command} <plan-file>`);
  return readPlan(opts.files[0]);
}

function changedPlans(args) {
  const out = execFileSync('git', ['diff', '--name-only', '--diff-filter=AM', ...args, '--', config.plansDir], { cwd: repoRoot, encoding: 'utf8' });
  return out.split('\n').map(s => s.trim())
    .filter(f => f.endsWith('.plan.md') && !basename(f).startsWith('_'))
    .filter(f => existsSync(join(repoRoot, f)) && readFileSync(join(repoRoot, f), 'utf8').startsWith('---'));
}

const commands = {
  async create() {
    const plan = onePlan();
    if (/^https:\/\//.test(plan.meta.ticket || '')) fail(`${plan.rel} already has a ticket: ${plan.meta.ticket}`);
    const pre = problems(plan, { requireTicket: false }).filter(p => !p.startsWith('open item'));
    if (pre.length) fail(`fix the plan first:\n- ${pre.join('\n- ')}`);
    const agent = opts.agent || process.env.AI_CLIENT || '';
    if (!config.captureSources.includes(agent)) fail(`--agent must be one of: ${config.captureSources.join(', ')}`);
    const description = [
      section(plan.body, 'Summary'),
      `Acceptance criteria:\n${section(plan.body, 'Acceptance criteria')}`,
      `Plan: ${plan.rel}`,
    ].join('\n\n');
    const page = await notion('POST', 'pages', {
      parent: { type: 'data_source_id', data_source_id: config.dataSourceId },
      properties: {
        Name: { title: text(`${config.prefix} - ${plan.meta.title}`) },
        Status: { status: { name: 'To Do' } },
        Project: { relation: [{ id: config.projectPageId }] },
        Tag: { select: { name: config.tag } },
        Description: { rich_text: text(description) },
        'Capture Source': { select: { name: agent } },
        'Capture State': { select: { name: 'Pending' } },
      },
    });
    plan.meta.ticket = page.url;
    plan.meta.status = 'planned';
    plan.meta.agent = agent;
    writePlan(plan);
    console.log(`Ticket created: ${page.url}\nPlan updated: ${plan.rel}`);
  },

  async start() {
    const plan = onePlan();
    if (!/^https:\/\//.test(plan.meta.ticket || '')) fail(`${plan.rel} has no ticket yet; run create first.`);
    const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
    if ([...(config.protectedBranches || ['main', 'master', 'develop']), 'HEAD'].includes(branch)) fail(`you are on "${branch}". Create a branch for this plan first.`);
    await setStatus(plan.meta.ticket, 'Doing');
    plan.meta.status = 'in-progress';
    plan.meta.branch = branch;
    plan.meta.worktree = basename(git(['rev-parse', '--show-toplevel']));
    writePlan(plan);
    console.log(`Ticket set to Doing: ${plan.meta.ticket}\nBranch ${branch} recorded in ${plan.rel}`);
  },

  async log() {
    const plan = onePlan();
    if (!opts.message) fail('usage: node scripts/ticket.mjs log <plan> --agent <client> --message "<done>; next: <step>; open: <questions>"');
    const agent = opts.agent || process.env.AI_CLIENT || 'Unknown';
    const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    plan.body = appendToSection(plan.body, 'Progress log', `- ${stamp} UTC, ${agent}: ${opts.message.replace(/\s+/g, ' ').trim()}`);
    writePlan(plan);
    console.log(`Progress logged in ${plan.rel}`);
  },

  async check() {
    const plan = onePlan();
    const found = problems(plan);
    if (found.length) fail(`${plan.rel} is not closed out:\n- ${found.join('\n- ')}`);
    console.log(`${plan.rel}: closed out.`);
  },

  async ship() {
    const plan = onePlan();
    const found = problems(plan);
    if (found.length) fail(`${plan.rel} is not closed out:\n- ${found.join('\n- ')}`);
    if (!/^https:\/\//.test(opts.pr || '')) fail('ship needs --pr <pull request URL>; open the PR first.');
    const id = pageId(plan.meta.ticket);
    const deferred = deferredItems(plan.body);
    const deferredText = deferred.length ? `Deferred (${deferred.length}):\n${deferred.join('\n')}` : 'Deferred: none';
    await notion('PATCH', `pages/${id}`, { properties: { URL: { url: opts.pr } } });
    console.log(`Copy into the PR's "Deferred" section:\n${deferred.length ? deferred.join('\n') : 'None'}`);
    try {
      await notion('POST', 'comments', { parent: { page_id: id }, rich_text: text(`Shipped for review: ${opts.pr}\nPlan ${plan.rel} is closed out. The Task moves to Done when the PR merges.\n${deferredText}`) }, { soft: true });
    } catch (e) {
      console.warn(`ticket: could not add a comment (${e.message}); the PR link is set.`);
    }
    plan.meta.status = 'shipped';
    plan.meta.pr = opts.pr;
    writePlan(plan);
    console.log(`Ticket linked to ${opts.pr}`);
  },

  async done() {
    const plan = onePlan();
    if (!/^https:\/\//.test(plan.meta.ticket || '')) fail(`${plan.rel} has no ticket.`);
    await setStatus(plan.meta.ticket, 'Done');
    console.log(`Ticket set to Done: ${plan.meta.ticket}`);
  },

  async 'ci-check'() {
    if (!opts.base || !opts.head) fail('usage: ci-check --base <sha> --head <sha>');
    const range = `${opts.base}...${opts.head}`;
    const plans = changedPlans([range]);
    if (!plans.length) {
      if (process.env.NO_PLAN !== '1') fail(`no plan with a ticket header changed in this PR. Add one under ${config.plansDir}/ (see AGENTS.md), or add the "no-plan" label for a trivial change.`);
      const { maxChangedLines, noNewFilesUnder } = config.noPlan;
      const changed = git(['diff', '--numstat', range]).split('\n').filter(Boolean)
        .reduce((n, l) => { const [a, d] = l.split('\t'); return n + (Number(a) || 0) + (Number(d) || 0); }, 0);
      const newFiles = git(['diff', '--name-only', '--diff-filter=A', range, '--', ...noNewFilesUnder]).split('\n').filter(Boolean);
      if (changed > maxChangedLines || newFiles.length) {
        fail(`the no-plan label only covers trivial changes (at most ${maxChangedLines} changed lines, no new files under ${noNewFilesUnder.join(', ')}). This PR changes ${changed} lines${newFiles.length ? ` and adds ${newFiles.join(', ')}` : ''}. Add a plan instead.`);
      }
      return console.log(`No plan in this PR; allowed by the no-plan label (${changed} changed lines).`);
    }
    let failed = false;
    for (const f of plans) {
      const plan = readPlan(join(repoRoot, f));
      const found = problems(plan);
      const original = originalPlan(f, opts.base, opts.head);
      if (original) {
        const before = countBoxes(bodyOf(original));
        const now = countBoxes(plan.body);
        if (now < before) found.push(`${before - now} checkbox(es) removed since the plan was first committed. Restore them and mark any you won't do "deferred: <reason>".`);
      }
      if (found.length) { failed = true; console.error(`${f}:\n- ${found.join('\n- ')}`); continue; }
      const deferred = deferredItems(plan.body);
      console.log(`${f}: closed out.${deferred.length ? `\n  Deferred:\n  ${deferred.join('\n  ')}` : ''}`);
    }
    if (failed) fail('close out the plan(s) above: tick every item or mark it "deferred: <reason>".');
  },

  async 'ci-done'() {
    if (!opts.head) fail('usage: ci-done --head <merge sha>');
    if (!token() && !opts.dryRun) return console.log('NOTION_TOKEN secret not set; skipping ticket close.');
    for (const f of changedPlans([`${opts.head}^1`, opts.head])) {
      const plan = readPlan(join(repoRoot, f));
      if (/^https:\/\//.test(plan.meta.ticket || '')) {
        await setStatus(plan.meta.ticket, 'Done');
        console.log(`${f}: ticket set to Done.`);
      }
    }
  },
};

if (!commands[command]) fail(`unknown command "${command || ''}". Commands: ${Object.keys(commands).join(', ')}`);
await commands[command]();
