---
title: Plan - Process: Set up the shared AI development process
ticket: https://app.notion.com/p/PW-Plan-Process-Set-up-the-shared-AI-development-process-40a0b9c6786f8138b928cb7a34cfda85
status: shipped
agent: Codex
branch: chore/dev-workflow
worktree: dev-workflow
pr: https://github.com/AaronPG095/my-minimalist-portfolio/pull/1
---
# Portfolio Website: shared AI development process

<!--
Copy to docs/plans/PW-Plan-<Topic>-<YYYY-MM>.plan.md. Follow "Development process" in AGENTS.md.
Frontmatter is maintained by scripts/ticket.mjs: ticket, status (draft -> planned -> in-progress -> shipped), agent, branch, worktree, pr.
Rules the check enforces:
- Every Acceptance criteria and Steps line is a checkbox. Tick it the moment it is done.
- A ticked acceptance criterion ends with "verified: <how it was checked and the result>".
- Never delete a checkbox. An item you will not do stays unticked and ends with "deferred: <reason>".
-->

## Summary

Install FluentOverlay's shared development process in Portfolio Website. Use one repo-specific plan, a CLI-managed Notion ticket, and one PR so future non-trivial work has a checked close-out gate. Preserve product code and existing local work.

## Acceptance criteria

- [x] Create isolated setup branch and ignore worktrees and environment files. verified: git branch confirms chore/dev-workflow; git check-ignore matches .worktrees/probe and .env.
- [x] Copy shared CLI, template, skills and workflows without replacing existing files. verified: shared CLI is byte-identical to the pinned source; all seven shared files are installed.
- [x] Configure the repository prefix, existing Task source, Project and source folders. verified: JSON assertions confirm PW, the selected Project and source-folder limits; live Notion ticket creation succeeded.
- [x] Configure workflows for the protected branches. verified: both workflow branch lists match main.
- [x] Keep the two repository-specific workflow skill copies identical. verified: both SKILL.md copies are byte-identical and use this repo name and plan prefix.
- [x] Append the authoritative development process while preserving existing instructions. verified: installed process text exactly matches the adapted source; pre-existing instructions remain above it.
- [x] Make Claude import AGENTS.md without creating GEMINI.md. verified: CLAUDE.md begins with @AGENTS.md; no GEMINI.md was created.
- [x] Align existing ticket guidance with the CLI and preserve historical records. verified: tracked instruction paths were inspected; no conflicting ticket lifecycle rules exist.
- [x] Ensure the no-plan label exists with the documented scope. verified: GitHub label lookup confirmed no-plan exists; no label was added to this non-trivial PR.
- [x] Create the Codex ticket, commit the plan and start the work. verified: create/start succeeded with --agent Codex; the initial plan commit exists and the plan records its ticket, branch and worktree.
- [x] Verify CLI syntax, installed contracts and rejection of the unfinished template. verified: node --check passed; installation assertions passed; unfinished template failed with missing-ticket and open-item diagnostics.
- [x] Prepare the completed PR description and preserve Aaron's merge authority. verified: the completed PR description is saved in workspace scratch; it names the plan, ticket, validation and no deferred work; no merge is requested or performed.

## Steps

- [x] Create isolated setup branch and ignore worktrees and environment files.
- [x] Copy shared CLI, template, skills and workflows without replacing existing files.
- [x] Configure the repository prefix, existing Task source, Project and source folders.
- [x] Configure workflows for the protected branches.
- [x] Keep the two repository-specific workflow skill copies identical.
- [x] Append the authoritative development process while preserving existing instructions.
- [x] Make Claude import AGENTS.md without creating GEMINI.md.
- [x] Align existing ticket guidance with the CLI and preserve historical records.
- [x] Ensure the no-plan label exists with the documented scope.
- [x] Create the Codex ticket, commit the plan and start the work.
- [x] Verify CLI syntax, installed contracts and rejection of the unfinished template.
- [x] Prepare the completed PR description and preserve Aaron's merge authority.

## Risks

Existing workflow or instruction contracts may conflict. Inspect before writing, preserve existing files, adapt the protected branches and source-folder limits, and verify against the original shared CLI. NOTION_TOKEN stays in the process environment and GitHub Actions secrets; never commit it.

## Out of scope

Product behavior changes, deployment, Notion schema changes, modification of existing unrelated records, and merging this PR. Shared source PR #27 remains open; do not merge it or change FluentOverlay performance work.

## Notes

- Aaron approved the shared setup guide: "Let's set up this process for the various repos that we're working in." Scope confirmation: "Please do it for the portfolio website Fluent Studio Automations. Fluent Studio Company" followed by the named repo list in chat.
- FluentOverlay source: origin/chore/ai-dev-process at 5f763ff2869eb630f800a0cc2dcfed64c8903bbf; PR #27 was observed open.
- Project: https://app.notion.com/p/1dc0b9c6786f80a084a6cda5d8ba0ff0. Ticket prefix: PW.
- Existing checkouts are preserved; this PR uses an isolated worktree.
- Setup bootstraps the CLI before creating its own ticket, as the setup guide specifies.
- Close-out check, ci-check, PR publication and ship run after the implementation checklist is complete; their results are recorded in Notes and the Progress log. No checklist item requires its own future check result.
- On 31 October 2026 Aaron replied "approved" to the specific request to copy NOTION_TOKEN into AaronPG095/my-minimalist-portfolio. The secret name was verified without displaying its value.
- Portfolio source code is spread across app/, components/, contexts/, data/, hooks/, lib/, and types/; the trivial-change guard covers all seven. Existing Career - My Profile Website Project is reused.


## Progress log

<!-- One line per session, added with: node scripts/ticket.mjs log <plan> --agent <client> --message "<done>; next: <step>; open: <questions>" -->
- 2026-10-31 14:56 UTC, Codex: Installed Portfolio process; approved Actions secret stored; template rejection, plan check and ci-check passed; PR #1 opened and linked via ship with no deferred items; next: Aaron reviews and merges; open: merge-triggered ticket completion is untested until merge
