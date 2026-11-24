---
title: Plan - Content & UI: Portfolio Profile Cleanup (2026-11)
ticket: https://app.notion.com/p/PW-Plan-Content-UI-Portfolio-Profile-Cleanup-2026-11-4220b9c6786f81948015fefb96aa4bb7
status: planned
agent: Gemini
---
# Portfolio Profile Cleanup (2026-11)

<!--
Copy to docs/plans/PW-Plan-<Topic>-<YYYY-MM>.plan.md. Follow "Development process" in AGENTS.md.
Frontmatter is maintained by scripts/ticket.mjs: ticket, status (draft -> planned -> in-progress -> shipped), agent, branch, worktree, pr.
Rules the check enforces:
- Every Acceptance criteria and Steps line is a checkbox. Tick it the moment it is done.
- A ticked acceptance criterion ends with "verified: <how it was checked and the result>".
- Never delete a checkbox. An item you will not do stays unticked and ends with "deferred: <reason>".
-->

## Summary

Replace legacy bootcamp projects (`Brainwave`, `Bohemian Kids Cafe`, `ASK Online Store`) with 2026 AI & systems work (`AI-Dev-Workflow`, `TokenHUD`, `FluentTimer`), replace skill percentage bars with interactive grouped skill chips, fix UI polish bugs and align bio/timeline facts to the canonical Master CV, and update the hosted EN and DE CV PDFs.

## Acceptance criteria

- [ ] Project carousel shows the 7 projects in exact order (`FluentOverlay` -> `AI-Dev-Workflow` -> `TokenHUD` -> `Fluent Studio` -> `FluentTimer` -> `Kollektiv Spinnen` -> `Modern Minimalist Portfolio`), with `Brainwave`, `Bohemian Kids Cafe`, and `ASK Online Store` removed, and all cards + modals working in EN and DE.
- [ ] Skill percentage bars (`30% / 55% / 80%`) are removed and replaced by grouped skill chips/badges with working hover/focus/click descriptions; `.NET 10`, `WPF`, `SQLite`, and `GitHub Actions` are present; `Antigravity` is not listed.
- [ ] DCI typo fixed (`Digital Career Institute`), tracking URL replaced with `https://digitalcareerinstitute.org/`, no `0 Years` counter flash on initial load, and bio/timeline dates aligned to canonical Master CV facts (10 years in kitchens `05/2016-09/2026`, 14-month full-time DCI program `03/2022-05/2023`).
- [ ] Project carousel edge fade gradient softened/narrowed so card text is not obscured, and timeline `"Developer Experience"` label renders without horizontal clipping on desktop initial load.
- [ ] Hosted EN and DE CV PDFs updated (`public/assets/Aaron_Greyling_CV_Technical_EN.pdf` and `public/assets/Aaron_Greyling_CV_Technical_DE.pdf`) and served with HTTP 200 via the `View CV` button.
- [ ] `npm run lint` passes with 0 errors and `npm run build` succeeds.
- [ ] Live browser check passes across desktop + mobile, EN + DE, light + dark mode.

## Steps

- [ ] Create plan doc, create Notion ticket, branch `feat/profile-cleanup-2026-11`, commit plan, and start ticket.
- [ ] Copy external assets (`tokenhud.png`, EN/DE CV PDFs) and create `ai-dev-workflow-project.svg` and `fluenttimer-project.svg` in `public/assets/`.
- [ ] Update `data/technology-icons.ts`, `components/Projects/Projects.tsx`, and `data/translations.json` for the 7 ordered projects.
- [ ] Replace `SkillProgress` bars with interactive grouped skill chips in `types/index.ts`, `components/Skills/Skills.tsx`, `components/Skills/Skills.module.css`, and `data/translations.json`.
- [ ] Fix DCI typo/URL, `0 Years` counter flash, bio/timeline dates, carousel edge fade, and timeline `"Developer Experience"` clipping in `About.tsx`, `About.module.css`, `Projects.module.css`, and `data/translations.json`.
- [ ] Run `npm run lint`, `npm run build`, and live browser verification across desktop + mobile, EN + DE, light + dark mode.
- [ ] Close out plan (`ticket.mjs check`), open PR, and run `ticket.mjs ship`.

## Risks

- `react-icons` v5.5.0 may lack a specific icon name if not checked during build; mitigated by verifying via `npm run build`.
- Timeline CSS adjustments could affect mobile zoom/scroll behavior; mitigated by live browser verification on both desktop (`1280x800`) and mobile (`390x844`).

## Out of scope

- Redesigning the overall portfolio layout or adding new sections.
- Adding `Antigravity` as a portfolio/CV skill.

## Notes

Approved by Aaron on 2026-11-24 via "Handoff: Portfolio Profile Cleanup (Priority 1)".

## Progress log

<!-- One line per session, added with: node scripts/ticket.mjs log <plan> --agent <client> --message "<done>; next: <step>; open: <questions>" -->
