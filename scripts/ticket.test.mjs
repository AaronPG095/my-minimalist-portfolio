import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync, execFileSync } from 'node:child_process';

const scripts = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(scripts, 'ticket.config.json'), 'utf8'));
const prefix = config.prefix || 'FO';
const url = 'https://www.notion.so/40a0b9c6786f817fab0ff2059ad410e3';

function fixture(t, front = '', responses = []) {
  const root = mkdtempSync(join(tmpdir(), 'ticket-regression-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'scripts'));
  mkdirSync(join(root, 'docs/plans'), { recursive: true });
  copyFileSync(join(scripts, 'ticket.mjs'), join(root, 'scripts/ticket.mjs'));
  copyFileSync(join(scripts, 'ticket.config.json'), join(root, 'scripts/ticket.config.json'));
  const plan = join(root, `docs/plans/${prefix}-Plan-Test.plan.md`);
  writeFileSync(plan, `---\ntitle: Plan - Process: Test\nstatus: draft\n${front}---\n# Test\n\n## Summary\nTest fixture\n\n## Acceptance criteria\n- [x] Works verified: fixture\n\n## Steps\n- [x] Implement\n`);
  const requests = join(root, 'requests.jsonl');
  const preload = join(root, 'mock.mjs');
  writeFileSync(preload, `import { appendFileSync } from 'node:fs';
const responses = JSON.parse(process.env.MOCK_RESPONSES);
globalThis.fetch = async (url, init) => {
  appendFileSync(process.env.MOCK_REQUESTS, JSON.stringify({url, method:init.method, body: init.body ? JSON.parse(init.body) : null}) + '\\n');
  const response = responses.shift();
  if (!response) throw new Error('unexpected API request');
  if (response.throw) throw new Error(response.throw);
  return new Response(JSON.stringify(response.body), {status: response.status || 200});
};`);
  function run(command, options = [], replies = responses) {
    const result = spawnSync(process.execPath, ['--import', pathToFileURL(preload).href, 'scripts/ticket.mjs', command, `docs/plans/${prefix}-Plan-Test.plan.md`, ...options], {
      cwd: root, encoding: 'utf8', env: { ...process.env, NOTION_TOKEN: 'test-token', MOCK_RESPONSES: JSON.stringify(replies), MOCK_REQUESTS: requests },
    });
    const calls = (() => { try { return readFileSync(requests, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse); } catch { return []; } })();
    return { ...result, calls, plan: readFileSync(plan, 'utf8') };
  }
  function git(...args) { return execFileSync('git', args, {cwd: root, encoding: 'utf8', stdio: ['ignore','pipe','pipe']}).trim(); }
  return { root, plan, run, git };
}
const empty = {body: {results: [], has_more: false}};
const created = {body: {url, id: '40a0b9c6786f817fab0ff2059ad410e3'}};
test('create stamps development fields, optional fields and canonical provenance', t => {
  const f = fixture(t, 'priority: high\nstate: flow\ndue: 2026-11-15\n', [empty, created]);
  const r = f.run('create', ['--agent', 'Codex']);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.calls[0].body.filter.rich_text.equals, `${prefix}:${prefix}-Plan-Test`);
  const p = r.calls[1].body.properties;
  assert.equal(p.Status.status.name, 'To Do');
  assert.equal(p['Task Lane'].select.name, 'Development');
  assert.equal(p['Dev Ticket Key'].rich_text[0].text.content, `${prefix}:${prefix}-Plan-Test`);
  assert.equal(p['Capture Source'].select.name, 'Codex');
  assert.equal(p['Capture State'].select.name, 'Pending');
  assert.equal(p.Priority.select.name, '⭐ High');
  assert.equal(p.State.select.name, '🌊Flow');
  assert.equal(p['Due Date'].date.start, '2026-11-15');
  assert.equal(p['Life Area'].relation.length, 1);
  assert.equal(p.Project.relation.length, 1);
  for (const key of ['Date', 'Focus Slot', 'Started At']) assert.equal(p[key], undefined);
  assert.match(r.plan, new RegExp(`devTicketKey: ${prefix}:${prefix}-Plan-Test`));
  assert.match(r.plan, /ticket: https:\/\/www.notion.so/);
  const again = f.run('create', ['--agent', 'Codex'], []);
  assert.notEqual(again.status, 0);
  assert.equal(again.calls.length, 2, 'recorded URL prevents additional API calls');
});
test('default create has no due date and does not read generic status setting', t => {
  const r = fixture(t, '', [empty, created]).run('create', ['--agent','Codex']);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.calls.length, 2);
  assert.ok(r.calls.every(c => c.method === 'POST'));
  assert.equal(r.calls[1].body.properties['Due Date'], undefined);
});
test('lost local URL recovers by persisted key without modifying existing Task', t => {
  const r = fixture(t, `devTicketKey: ${prefix}:original-plan\n`, [{body: {results: [{url}], has_more: false}}]).run('create', ['--agent','Codex']);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.calls.length, 1);
  assert.equal(r.calls[0].body.filter.rich_text.equals, `${prefix}:original-plan`);
  assert.match(r.plan, /ticket: https:\/\/www.notion.so/);
  assert.match(r.plan, /status: draft/);
  assert.doesNotMatch(r.plan, /agent:/);
});
test('ambiguous existing key stops creation', t => {
  const r = fixture(t, '', [{body:{results:[{url},{url}], has_more:false}}]).run('create',['--agent','Codex']);
  assert.notEqual(r.status, 0);
  assert.equal(r.calls.length, 1);
  assert.doesNotMatch(r.plan, /ticket:/);
});
for (const [name, front, options] of [
  ['priority', 'priority: urgent\n', []], ['inherited option name', 'priority: constructor\n', []], ['state', 'state: hard\n', []],
  ['date format', 'due: 15.11.2026\n', []], ['impossible date', 'due: 2026-02-30\n', []],
  ['status override', '', ['--status','Doing']],
]) test(`invalid ${name} is rejected before API calls`, t => {
  const r = fixture(t, front).run('create',['--agent','Codex', ...options]);
  assert.notEqual(r.status, 0);
  assert.equal(r.calls.length, 0);
});
test('invalid title fails both create and check before API calls', t => {
  const f = fixture(t);
  writeFileSync(f.plan, readFileSync(f.plan,'utf8').replace('Plan - Process: Test','Fix this'));
  for (const command of ['create','check']) {
    const r = f.run(command,['--agent','Codex']);
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /title must read/);
    assert.equal(r.calls.length, 0);
  }
});
test('known Life Area refusal retries once while keeping development fields', t => {
  const r = fixture(t, '', [empty,{status:404,body:{code:'object_not_found',message:'Life Area unavailable'}},created]).run('create',['--agent','Codex']);
  assert.equal(r.status,0,r.stderr);
  assert.match(r.stderr,/share the Life Areas database/);
  assert.equal(r.calls.length,3);
  assert.equal(r.calls[2].body.properties['Life Area'],undefined);
  assert.equal(r.calls[2].body.properties['Task Lane'].select.name,'Development');
});
for (const error of [{throw:'network response lost'}, {status:500,body:{message:'internal error'}}, {status:400,body:{code:'validation_error',message:'Task Lane missing'}}]) {
  test(`uncertain or unrelated creation failure never retries: ${JSON.stringify(error)}`, t => {
    const r = fixture(t,'',[empty,error]).run('create',['--agent','Codex']);
    assert.notEqual(r.status,0);
    assert.equal(r.calls.length,2);
    assert.doesNotMatch(r.plan,/ticket:/);
  });
}
for (const started of [null,'2026-10-31']) test(`start preserves existing date (${started})`, t => {
  const f = fixture(t, `ticket: ${url}\n`, [{body:{properties:{'Started At':{date: started ? {start:started} : null}}}}, {body:{}}]);
  f.git('init','-b','test-ticket');
  f.git('-c','user.name=Test','-c','user.email=test@example.invalid','commit','--allow-empty','-m','base');
  const r = f.run('start');
  assert.equal(r.status,0,r.stderr);
  assert.equal(r.calls[1].body.properties.Status.status.name,'Doing');
  if (started) assert.equal(r.calls[1].body.properties['Started At'],undefined);
  else assert.match(r.calls[1].body.properties['Started At'].date.start,/^\d{4}-\d{2}-\d{2}$/);
});
test('done writes Done and Completed At together', t => {
  const r = fixture(t, `ticket: ${url}\n`, [{body:{}}]).run('done');
  assert.equal(r.status,0,r.stderr);
  assert.equal(r.calls[0].body.properties.Status.status.name,'Done');
  assert.match(r.calls[0].body.properties['Completed At'].date.start,/^\d{4}-\d{2}-\d{2}$/);
});
test('ci-done closes the merged plan with Completed At', t => {
  const f = fixture(t, `ticket: ${url}\n`, [{body:{}}]);
  f.git('init','-b','test-ticket');
  f.git('-c','user.name=Test','-c','user.email=test@example.invalid','commit','--allow-empty','-m','base');
  f.git('add','docs/plans');
  f.git('-c','user.name=Test','-c','user.email=test@example.invalid','commit','-m','plan');
  const r = f.run('ci-done',['--head',f.git('rev-parse','HEAD')]);
  assert.equal(r.status,0,r.stderr);
  assert.equal(r.calls[0].body.properties.Status.status.name,'Done');
  assert.match(r.calls[0].body.properties['Completed At'].date.start,/^\d{4}-\d{2}-\d{2}$/);
});

test('malformed lookup response fails closed before creating a Task', t => {
  const r = fixture(t, '', [{body: {}}]).run('create', ['--agent','Codex']);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /no query results/);
  assert.equal(r.calls.length, 1);
});
test('dry-run prints lookup and creation without persisting the ticket', t => {
  const r = fixture(t).run('create', ['--agent','Codex','--dry-run']);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.calls.length, 0);
  assert.match(r.stdout, /data_sources\/.*\/query/);
  assert.match(r.stdout, /Development/);
  assert.doesNotMatch(r.plan, /ticket:/);
});
