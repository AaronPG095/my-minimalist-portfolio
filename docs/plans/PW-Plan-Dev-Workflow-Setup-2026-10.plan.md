---
title: Plan - Process: Set up the shared AI development process
ticket: https://app.notion.com/p/PW-Plan-Process-Set-up-the-shared-AI-development-process-40a0b9c6786f8138b928cb7a34cfda85
status: planned
agent: Codex
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

- [ ] Create isolated setup branch and ignore worktrees and environment files.
- [ ] Copy shared CLI, template, skills and workflows without replacing existing files.
- [ ] Configure the repository prefix, existing Task source, Project and source folders.
- [ ] Configure workflows for the protected branches.
- [ ] Keep the two repository-specific workflow skill copies identical.
- [ ] Append the authoritative development process while preserving existing instructions.
- [ ] Make Claude import AGENTS.md without creating GEMINI.md.
- [ ] Align existing ticket guidance with the CLI and preserve historical records.
- [ ] Ensure the no-plan label exists with the documented scope.
- [ ] Create the Codex ticket, commit the plan and start the work.
- [ ] Verify CLI syntax, installed contracts and rejection of the unfinished template.
- [ ] Prepare the completed PR description and preserve Aaron's merge authority.

## Steps

- [ ] Create isolated setup branch and ignore worktrees and environment files.
- [ ] Copy shared CLI, template, skills and workflows without replacing existing files.
- [ ] Configure the repository prefix, existing Task source, Project and source folders.
- [ ] Configure workflows for the protected branches.
- [ ] Keep the two repository-specific workflow skill copies identical.
- [ ] Append the authoritative development process while preserving existing instructions.
- [ ] Make Claude import AGENTS.md without creating GEMINI.md.
- [ ] Align existing ticket guidance with the CLI and preserve historical records.
- [ ] Ensure the no-plan label exists with the documented scope.
- [ ] Create the Codex ticket, commit the plan and start the work.
- [ ] Verify CLI syntax, installed contracts and rejection of the unfinished template.
- [ ] Prepare the completed PR description and preserve Aaron's merge authority.

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
