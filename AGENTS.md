# Portfolio Website

## Development process (every AI: Claude, Codex, Gemini/Antigravity, Cursor)

Non-trivial changes follow these five steps. Only trivial changes (at most 40 changed lines, no new files under `app/`, `components/`, `contexts/`, `data/`, `hooks/`, `lib/`, `types/`: typos, dependency bumps, one-line fixes) may skip them; their PR gets the `no-plan` label.

1. **Plan.** Investigate read-only and propose a plan. Wait for Aaron's approval before changing code, and quote it under Notes in the plan.
2. **Plan doc.** Copy `docs/plans/_template.plan.md` to `docs/plans/PW-Plan-<Topic>-<YYYY-MM>.plan.md` and fill it in. Acceptance criteria and Steps are `- [ ]` checkboxes. A plan bigger than one PR is split into separate plans, one per PR.
3. **Ticket.** Run `node scripts/ticket.mjs create <plan> --agent <Claude|Codex|Gemini|Other>`. It creates the Notion Task (PW prefix, Portfolio Website project, To Do) and writes its URL into the plan. Create PW tickets only this way.
4. **Implement.** Create a branch, commit the plan on it, and run `node scripts/ticket.mjs start <plan>` (Task → Doing; records the branch and worktree in the plan).
   - Tick each checkbox as soon as it is done. A ticked acceptance criterion ends with `verified: <how it was checked and the result>`; never tick one you have not verified.
   - Never delete a checkbox. Anything you will not do stays unticked and ends with `deferred: <reason>`.
   - Record discoveries under Notes. Progress lives in the plan; do not post progress to Notion.
   - **Before you stop** (end of session, usage limit, handing over), run `node scripts/ticket.mjs log <plan> --agent <you> --message "<done>; next: <step>; open: <questions>"` and commit the plan. To continue someone else's work, find the plan with `status: in-progress`, read it fully including the Progress log, and resume at the first unticked step.
5. **Finish.** You are done only when `node scripts/ticket.mjs check <plan>` passes. Then open the PR with the template filled in and run `node scripts/ticket.mjs ship <plan> --pr <url>`; copy the deferred items it prints into the PR. Merging closes the Task; never set it to Done yourself.

If a `ticket.mjs` command fails (for example no `NOTION_TOKEN`), say so and stop at that step. Do not create or update the ticket another way. CI (`Plan check`) blocks a PR whose plan has open items, unverified criteria, removed checkboxes or no ticket, and a `no-plan` PR that is not trivial.

Setting up this process in another repo: follow `docs/dev-workflow/setup-other-repos.md`.
