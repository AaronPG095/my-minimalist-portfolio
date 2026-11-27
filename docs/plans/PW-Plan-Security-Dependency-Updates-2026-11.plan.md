---
title: Plan - Chore: Security-Dependency-Updates
ticket: https://app.notion.com/p/PW-Plan-Chore-Security-Dependency-Updates-4250b9c6786f81c1a2b6fcf00b136c4c
status: planned
priority: high
state: 
due: 
appetite: S
version: 
impact: 
dependsOn: 
devTicketKey: PW:PW-Plan-Security-Dependency-Updates-2026-11
agent: Gemini
---
# Security-Dependency-Updates

## Summary

Update vulnerable npm dependencies (`next`, `sharp`, `postcss`, `nanoid`, `source-map-js`, and transitive packages) in `my-minimalist-portfolio` to resolve open Dependabot security alerts while preserving build and lint stability.

## Context

- Dependabot flagged 53 vulnerabilities (including critical/high issues in `next`, `sharp`, `postcss`, `nanoid`, `source-map-js`, `js-yaml`, `brace-expansion`, `minimatch`, `flatted`).
- `next@15.5.29` and `sharp@0.35.5` are the patched versions proposed by Dependabot.

## Open questions

None

## Acceptance criteria

- [ ] AC1: `package.json` and `package-lock.json` are updated to patched versions (`next@^15.5.29`, `sharp@^0.35.5`, and `npm audit fix` resolutions).
- [ ] AC2: `npm run build` and `npm run lint` pass with zero errors.

## Steps

- [ ] Run `npm audit fix` and update `next`, `eslint-config-next`, and `sharp` to patched versions (AC1)
- [ ] Verify `npm run build` and `npm run lint` succeed (AC2)

## Risks

- Upgrading `next` from 14.x to 15.5.x could surface breaking API or lint changes; verified by running `npm run build` and `npm run lint`.

## Out of scope

- Migrating to Next.js 16 (major breaking change).

## Notes

Requested by Aaron to close out open Dependabot alerts.

## Progress log

<!-- One line per session/review, added with `ticket.mjs log` or `ticket.mjs review` -->
