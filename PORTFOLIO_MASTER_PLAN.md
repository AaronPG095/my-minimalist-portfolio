# Portfolio update — working plan

Work in this repository. Preserve the existing visual style and existing content unless Aaron approves a specific change. Complete work in phases with a local commit after each. Aaron requested an early deployment of the current approved version on 29 September 2026; deploy the remaining work after he reviews and approves the final local preview.

Next phase order: English CV → timeline zoom review → remaining copy and accessibility reviews → final verification → Netlify deployment. Keep every open item below in scope.

## Completed phases

- [x] Update the hero and About copy in English and German, with the approved portrait and language-specific technical CV files.
- [x] Add the approved career events and future goals to the three-pathway vertical timeline, including later chronology, accessibility, and drag-cue refinements.
- [x] Add Fluent Studio and FluentOverlay before the existing five projects and add the approved product links and skill icons.
- [x] Add the monochrome Fluent Studio icon next to GitHub in the hero.
- [x] Correct the approved skill proficiency levels, ordering, `.NET` name, and 80/55/30 progress scale. Commit `2a6aa99`.
- [x] Add previous/next arrows to the project carousel. Commit `7c0102e`.
- [x] Add previous/next arrows to the skill-card carousel on tablet and phone, where the cards already scroll. Commit `91e2b7f`.
- [x] Add 75%, 100%, and 125% zoom controls to the timeline on smaller screens, retaining horizontal scrolling. Aaron reviewed and approved keeping this range.
- [x] Publish the approved current version early at Aaron's request. Netlify published production commit `37f615b` on 29 September 2026; the live English and German CV PDFs match the local files.

## Open work and approval gates

- [x] **Aaron reviewed the timeline zoom in the local browser.** Keep the existing 75–125% range and controls.
- [ ] Review exact English and German wording for Skills, contact, and page metadata before editing any copy. The approved Skills heading and CSS/SPRINT descriptions and contact screen-reader labels are committed; page metadata and any further wording remain open.
- [x] **Fix the English CV linked from “View CV”.** Aaron approved the one-page English render with the portrait and matching finished styling. The website PDF and master PDF now match that approved render; the wording and German PDF are unchanged. The English and German site buttons point to their language-specific filenames, the German PDF opens from Chrome, and the English PDF was rendered and its embedded links checked locally. Chrome's PDF viewer could not be inspected through browser automation, so Aaron's visual check of the English website PDF remains part of the final preview review.
- [x] Verify all seven project cards, bilingual modals, and links. The four language-specific Fluent Studio/FluentOverlay pages and every existing GitHub/demo destination loaded in the browser.
- [x] Use Aaron's selected option C, the open APG monogram. Generate and verify its SVG, 16px/32px ICO entries, PNG sizes, manifest references, and local browser icon loading.
- [ ] Review whether the FluentOverlay card should still say "currently in development" / "in Entwicklung" now that its product page presents a released version. Keep the existing copy until Aaron approves exact replacement text.
- [ ] Finish timeline screen-reader, text-scaling, pointer-cursor, and unused-code review. Initial audit: the ordered event list exposes event, pathway, and year; markers and events can receive keyboard focus; the drag cursor is restricted to eligible canvas areas. The retired SVG renderer is gone, but its CSS selectors remain unused. The fixed-height canvas still needs a browser text-scaling check before any cleanup or layout change.
- [ ] Review the German screen-reader labels in Projects and section regions: some are still hard-coded in English. Propose exact accessible wording before changing them.
- [ ] Compare desktop, tablet, and phone views in both languages and themes with the earlier visual design. Correct unintended changes.
- [ ] Run TypeScript, ESLint, and a production build on the final local version; commit each completed change group.
- [ ] **Final Netlify deployment after the remaining phases.** After Aaron approves the final local preview, push any remaining verified commits to `main` through the existing GitHub connection, monitor Netlify, and check the live site and both CV links. Resolve any deployment failure and verify the resulting live version.
