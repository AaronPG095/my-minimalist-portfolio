---
title: Plan - Chore: Opsec-Cleanup
ticket: https://app.notion.com/p/PW-Plan-Chore-Opsec-Cleanup-4240b9c6786f814e9423e34949970adf
status: in-progress
priority: high
state: 
due: 
appetite: S
version: 
impact: 
dependsOn: 
devTicketKey: PW:PW-Plan-Opsec-Cleanup-2026-11
agent: Gemini
branch: chore/opsec-cleanup
worktree: my-minimalist-portfolio
---
# Opsec-Cleanup

## Summary

Redact private Notion URLs from archived portfolio plans and remove internal planning files (`PORTFOLIO_MASTER_PLAN.md`, `.cursor/plans/update-portfolio-website-tech-stack-31af9123.plan.md`) from the public repository.

## Context

- `docs/plans/archive/2026-11/PW-Plan-*.plan.md` contained private `app.notion.com` URLs.
- `PORTFOLIO_MASTER_PLAN.md` and `.cursor/plans/update-portfolio-website-tech-stack-31af9123.plan.md` exposed internal planning notes.

## Open questions

None

## Acceptance criteria

- [x] AC1: Zero `app.notion.com` URLs remain in `docs/plans/archive/2026-11/`. verified: git grep app.notion.com returned 0 matches
- [x] AC2: `PORTFOLIO_MASTER_PLAN.md` and `.cursor/plans/update-portfolio-website-tech-stack-31af9123.plan.md` are removed and `npm run build` passes. verified: PORTFOLIO_MASTER_PLAN.md and .cursor/plans file removed; npm run build passed (exit 0)

## Steps

- [x] Redact Notion URLs in archived plans and remove internal planning files (AC1, AC2)
- [x] Run `npm run build` to verify zero regressions (AC2)

## Risks

- Removing planning markdown files could break a link if referenced in source; verified via `git grep` and `npm run build`.

## Out of scope

- Modifying `Aaron_Greyling_CV_Technical_EN.pdf` or `Aaron_Greyling_CV_Technical_DE.pdf`.

## Notes

Approved by Aaron as part of the full GitHub OPSEC & security cleanup.

## Progress log

<!-- One line per session/review, added with `ticket.mjs log` or `ticket.mjs review` -->
