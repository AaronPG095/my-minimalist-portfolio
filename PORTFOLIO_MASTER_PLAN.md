# Portfolio update — working plan

Work in this repository. Preserve the existing visual style and existing content unless Aaron approves a specific change. Complete work in phases with a local commit after each. Aaron requested an early deployment of the current approved version on 29 September 2026; deploy the remaining work after he reviews and approves the final local preview.

Next phase order: remaining copy and accessibility reviews → final verification → Netlify deployment. Keep every open item below in scope.

## Completed phases

- [x] Update the hero and About copy in English and German, with the approved portrait and language-specific technical CV files.
- [x] Add the approved career events and future goals to the three-pathway vertical timeline, including later chronology, accessibility, and drag-cue refinements.
- [x] Add Fluent Studio and FluentOverlay before the existing five projects and add the approved product links and skill icons.
- [x] Give Fluent Studio its own English and German hero-based project banner, distinct from the FluentOverlay UI image. Keep the existing project-card layout and FluentOverlay image.
- [x] Add the monochrome Fluent Studio icon next to GitHub in the hero.
- [x] Correct the approved skill proficiency levels, ordering, `.NET` name, and 80/55/30 progress scale. Commit `2a6aa99`.
- [x] Add previous/next arrows to the project carousel. Commit `7c0102e`.
- [x] Add previous/next arrows to the skill-card carousel on tablet and phone, where the cards already scroll. Commit `91e2b7f`.
- [x] Add 75%, 100%, and 125% zoom controls to the timeline on smaller screens, retaining horizontal scrolling. Aaron reviewed and approved keeping this range.
- [x] Publish the approved current version early at Aaron's request. Netlify published production commit `37f615b` on 29 September 2026; the live English and German CV PDFs match the local files.
- [x] Run a post-banner local QA pass: the production build succeeded; desktop (2560×1215), tablet (900×900), and phone (390×844) views were checked, including English light mode and German dark mode on phone. Seven project images are present, no loaded images are broken, language-specific CV and Fluent Studio banner paths resolve in the page, and the tested viewports have no document-level horizontal overflow. The complete language/theme matrix and earlier-design comparison remain in final verification below.

## Open work and approval gates

- [x] **Aaron reviewed the timeline zoom in the local browser.** Keep the existing 75–125% range and controls.
- [x] Review exact English and German wording for Skills, contact, and page metadata before editing any copy. The approved Skills heading, CSS/SPRINT descriptions, contact screen-reader labels, and page metadata are committed. Further wording is tracked separately below.
- [x] **Fix the English CV linked from “View CV”.** Aaron approved the one-page English render with the portrait and matching finished styling. The website PDF and master PDF now match that approved render; the wording and German PDF are unchanged. The English and German site buttons point to their language-specific filenames, the German PDF opens from Chrome, and the English PDF was rendered and its embedded links checked locally. Aaron confirmed the final English website PDF visual check on 29 September 2026.
- [x] Verify all seven project cards, bilingual modals, and links. The four language-specific Fluent Studio/FluentOverlay pages and every existing GitHub/demo destination loaded in the browser.
- [x] Use Aaron's selected option C, the open APG monogram. Generate and verify its SVG, 16px/32px ICO entries, PNG sizes, manifest references, and local browser icon loading.
- [ ] Review whether the FluentOverlay card should still say "currently in development" / "in Entwicklung" now that its product page presents a released version. Keep the existing copy until Aaron approves exact replacement text.
- [x] Apply Aaron's approved desktop header adjustment: the height is now capped at 80–96px instead of `14vh` (about 170px in a 1215px-high viewport). Desktop body spacing and section scroll offsets use the same height; tablet remains 56px and phone 48px. English and German desktop navigation and section jumps were checked, with no document-level horizontal overflow at the tested desktop, tablet, and phone widths.
- [x] Reuse the selected open APG tab icon immediately to the left of “Aaron Paul Greyling” in both headers. It inherits the header text color for light and dark themes; desktop and phone placement were visually checked. The name and navigation behavior are unchanged.
- [x] Correct the German desktop header wrapping shown by Aaron at a narrow desktop/tablet width. Only 1201–1400px uses smaller name and navigation text and tighter gaps; the header remains one line near both ends of that range. Tablet and phone navigation are unchanged.
- [x] Finish timeline screen-reader, text-scaling, pointer-cursor, and unused-code review. The ordered event list exposes event, pathway, and year; markers and events can receive keyboard focus; the drag cursor is restricted to eligible canvas areas. Browser checks at 200% root text size found a clipped future label; the timeline's minimum canvas dimensions and label widths now scale with text size while retaining their original 16px-root dimensions. English and German labels fit without clipping or overlapping at the tested text size. The retired SVG renderer is gone and its CSS selectors remain unused; they were identified but retained, with no unapproved removal.
- [ ] Review the German screen-reader labels in Projects and section regions: some are still hard-coded in English. Propose exact accessible wording before changing them.
- [ ] Compare desktop, tablet, and phone views in both languages and themes with the earlier visual design. Correct unintended changes.
- [ ] Run TypeScript, ESLint, and a production build on the final local version; commit each completed change group.
- [ ] **Final Netlify deployment after the remaining phases.** After Aaron approves the final local preview, push any remaining verified commits to `main` through the existing GitHub connection, monitor Netlify, and check the live site and both CV links. Resolve any deployment failure and verify the resulting live version.
