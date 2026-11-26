---
title: Plan - Feature: Categorized Projects & 4 New AI/Systems Repos
ticket: https://app.notion.com/p/PW-Plan-Feature-Categorized-Projects-4-New-AI-Systems-Repos-4240b9c6786f81bc9802cc0ade0278ac
status: planned
agent: Gemini
---
# Categorized Projects & 4 New AI/Systems Repos

<!--
Copy to docs/plans/PW-Plan-<Topic>-<YYYY-MM>.plan.md. Follow "Development process" in AGENTS.md.
Frontmatter is maintained by scripts/ticket.mjs: ticket, status (draft -> planned -> in-progress -> shipped), agent, branch, worktree, pr.
Rules the check enforces:
- Every Acceptance criteria and Steps line is a checkbox. Tick it the moment it is done.
- A ticked acceptance criterion ends with "verified: <how it was checked and the result>".
- Never delete a checkbox. An item you will not do stays unticked and ends with "deferred: <reason>".
-->

## Summary

Add four 2026 AI & systems repositories (`Context-Gatekeeper-MCP`, `Durable-Workflow-Engine`, `Local-LLM-Router-Proxy`, `mcp-audit`) and organize all 11 projects under a single `#projects` section with accessible category filter tabs (`Featured`, `AI & Systems`, `Windows Apps`, `Web`), a responsive multi-column grid on desktop, and a swipeable carousel on mobile.

## Acceptance criteria

- [ ] All 4 new public repos (`Context-Gatekeeper-MCP`, `Durable-Workflow-Engine`, `Local-LLM-Router-Proxy`, `mcp-audit`) are added with accurate GitHub links, tech tags, SVG preview visuals, and bilingual EN/DE copy.
- [ ] `#projects` displays 4 accessible category filter tabs (`Featured` default with 6 cards, `AI & Systems` with 5, `Windows Apps` with 3, `Web` with 3) with localized labels in EN and DE.
- [ ] Desktop (`> 900px`) renders a clean responsive multi-column grid (3 columns on `>= 1200px`, 2 columns on `901px-1199px`) without overlapping adjacent sections; mobile (`<= 900px`) renders the swipeable carousel resetting to slide 1 on tab switch.
- [ ] Project detail modals open, navigate prev/next within the active category, and close cleanly for the new projects in both EN and DE.
- [ ] `npm run lint` passes with 0 errors and `npm run build` succeeds.
- [ ] Live browser check passes across desktop (`1280x800`) + mobile (`390x844`), EN + DE, light + dark mode with 0 console errors and 0 horizontal overflow.

## Steps

- [ ] Create plan doc, Notion ticket, branch `feat/projects-categories-2026-11`, commit plan, and start ticket.
- [ ] Create 4 minimalist SVG project previews in `public/assets/`.
- [ ] Update `types/index.ts`, `data/technology-icons.ts`, and `data/translations.json` (EN + DE) for categories and the 4 new projects.
- [ ] Update `components/Projects/Projects.tsx` and `components/Projects/Projects.module.css` with category filter tabs, desktop grid, and mobile carousel.
- [ ] Run `npm run lint`, `npm run build`, and live browser verification across desktop + mobile, EN + DE, light + dark mode.
- [ ] Close out plan (`ticket.mjs check`), open PR, and run `ticket.mjs ship`.

## Risks

- Switching `#projects` from `height: 96vh` to `height: auto` and adding a 3-column grid could cause card height differences or overflow at tablet widths; mitigated by `align-items: stretch` and live browser verification at `1280x800` and `390x844`.
- `react-icons` v5.5.0 may lack an icon name if not checked during build; mitigated by `npm run build`.

## Out of scope

- Removing `Modern Minimalist Portfolio` from the `Web` category.
- Adding separate `#projects-*` sections on the landing page.

## Notes

Approved by Aaron on 2026-11-26: "Implement as per your recommendation."

## Progress log

<!-- One line per session, added with: node scripts/ticket.mjs log <plan> --agent <client> --message "<done>; next: <step>; open: <questions>" -->
