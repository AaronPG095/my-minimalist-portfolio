---
title: <Plan|Debug|Ask> - <Type>: <Title>, e.g. Plan - Feature: Smart Shortcut Suggestions
ticket:
status: draft
priority:
state:
due:
---
# <Title>

<!--
Copy to docs/plans/PW-Plan-<Topic>-<YYYY-MM>.plan.md. Follow "Development process" in AGENTS.md.
Title: <Plan|Debug|Ask> - <Type>: <Title>. Type is Feature, Bug, Refactor, Docs, Perf, Process or similar; the script adds the project prefix.
Optional, set before `create` (leave empty if unsure): priority (emergency, critical, high, medium, low), state (quick, easy, flow), due (YYYY-MM-DD, only an explicit real deadline).
Creation starts To Do with Task Lane = Development and a stable Dev Ticket Key, queries the key before creating, and leaves Focus Slot/Date blank. Preserve devTicketKey if renaming this plan; do not run concurrent creates for the same plan.
Frontmatter is maintained by scripts/ticket.mjs: ticket, devTicketKey, status (draft -> planned -> in-progress -> shipped), agent, branch, worktree, pr.
Rules the check enforces:
- Every Acceptance criteria and Steps line is a checkbox. Tick it the moment it is done.
- A ticked acceptance criterion ends with "verified: <how it was checked and the result>".
- Never delete a checkbox. An item you will not do stays unticked and ends with "deferred: <reason>".
-->

## Summary

<2-3 sentences: what changes and why.>

## Acceptance criteria

- [ ] <Checkable outcome>

## Steps

- [ ] <Step>

## Risks

<What could go wrong and how it is contained.>

## Out of scope

<What this plan deliberately does not do.>

## Notes

<Discoveries and decisions during implementation, including Aaron's plan approval.>

## Progress log

<!-- One line per session, added with: node scripts/ticket.mjs log <plan> --agent <client> --message "<done>; next: <step>; open: <questions>" -->
