---
title: <Short imperative title, e.g. Plan - Feature: Smart Shortcut Suggestions>
ticket:
status: draft
---
# <Title>

<!--
Copy to docs/plans/PW-Plan-<Topic>-<YYYY-MM>.plan.md. Follow "Development process" in AGENTS.md.
Frontmatter is maintained by scripts/ticket.mjs: ticket, status (draft -> planned -> in-progress -> shipped), agent, branch, worktree, pr.
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
