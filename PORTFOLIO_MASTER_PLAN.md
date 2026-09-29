# Portfolio update — working plan

Work in this repository. Preserve the existing visual style and existing content unless Aaron approves a specific change. Complete work in phases with a local commit after each. Aaron approved the final local preview and the remaining work was deployed on 29 September 2026.

The previously planned phases below are complete. New work is listed at the end without changing that record.

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
- [x] Replace FluentOverlay's outdated "currently in development" / "in Entwicklung" wording with Aaron's exact approved English and German descriptions. Both project modals were checked in the local browser.
- [x] Apply Aaron's approved desktop header adjustment: the height is now capped at 80–96px instead of `14vh` (about 170px in a 1215px-high viewport). Desktop body spacing and section scroll offsets use the same height; tablet remains 56px and phone 48px. English and German desktop navigation and section jumps were checked, with no document-level horizontal overflow at the tested desktop, tablet, and phone widths.
- [x] Reuse the selected open APG tab icon immediately to the left of “Aaron Paul Greyling” in both headers. It inherits the header text color for light and dark themes; desktop and phone placement were visually checked. The name and navigation behavior are unchanged.
- [x] Correct the German desktop header wrapping shown by Aaron at a narrow desktop/tablet width. Only 1201–1400px uses smaller name and navigation text and tighter gaps; the header remains one line near both ends of that range. Tablet and phone navigation are unchanged.
- [x] Finish timeline screen-reader, text-scaling, pointer-cursor, and unused-code review. The ordered event list exposes event, pathway, and year; markers and events can receive keyboard focus; the drag cursor is restricted to eligible canvas areas. Browser checks at 200% root text size found a clipped future label; the timeline's minimum canvas dimensions and label widths now scale with text size while retaining their original 16px-root dimensions. English and German labels fit without clipping or overlapping at the tested text size. The retired SVG renderer is gone and its CSS selectors remain unused; they were identified but retained, with no unapproved removal.
- [x] Apply Aaron's exact approved German screen-reader labels in the About, Skills, and Projects regions, DCI link, project cards, carousel, and modal. Check the German accessibility tree in the local browser; retain the existing English labels.
- [x] Check phone, tablet, narrow desktop, and wide desktop widths in both languages and themes. All 16 combinations retain seven project cards and have no document-level horizontal overflow; header heights remain 48px, 56px, and 80px at the tested widths. Compare CSS changes since the earlier published version: they are limited to the approved header height/icon/wrapping and timeline text-scaling adjustments. No unintended visual change was identified in the representative browser views; an original saved baseline image is unavailable.
- [x] Run TypeScript, ESLint, and a production build on the final local version. TypeScript and changed-file ESLint passed, and the production build completed successfully with its integrated lint and type checks. Keyboard checks covered project and skill arrows and timeline zoom; the German project modal and approved accessible labels were checked in the browser.
- [x] **Final Netlify deployment after the remaining phases.** Aaron approved the final local preview; verified commit `d824547` was pushed to `main` and published by Netlify. The live English and German pages show the approved changes. Both live CV URLs return PDF status 200 and match the local file sizes.

## Next phase — card consistency

- [x] Give each skill card the same minimum height within its carousel: approximately 930px on desktop, 640px on tablets, and 580px on phones. Give each project card the same minimum height within its carousel: approximately 624px on desktop/tablets and 544px on phones. Cards in a carousel grow together if German copy or enlarged text needs more room. Correct the skill-card/slot width mismatch at 400px and below so cards do not overlap. Preserve content, styling, and interactions. Do not deploy as part of this phase.

## Remaining approved layout and interaction phases

- [x] Hero spacing: give the summary 24px side spacing on phones. Make the Hero fill at least the visible viewport below the fixed header at every screen size, growing naturally for taller content, so About first appears after scrolling. Preserve its content and visual treatment. Commit separately.
- [x] Carousel response: approximately 380ms project arrow travel and 280ms skill arrow travel, with smooth easing. Repeated arrow presses immediately update the target during an ongoing movement. Preserve swipe, drag, snapping, dots, keyboard controls, and reduced-motion behavior. Commit separately. Verified repeated project-arrow clicks and phone skill-arrow clicks in a fresh local browser session.
- [x] Timeline starting zoom: 75% on phones up to 600px wide, 100% above that width. Preserve the 75–125% controls, horizontal scrolling, and a visitor's zoom choice after resizing. Commit separately. Verified 75% at 390px and an explicitly selected 100% remaining selected after resizing to tablet width.
- [x] Verify English and German in both themes at 320px and 390px phone, 900px tablet, 1250px narrow desktop, and 1600px wide desktop widths. Skill cards are equal at 580/640/930px across the respective breakpoints, and project cards are equal at 576px on phones (content raises the 544px minimum) and 624px on larger screens. At 400px and below, the skill card and carousel slot are both 220px wide with no overlap. The Hero/About boundary is at or below the first viewport. Repeated project arrows, skill arrows, project dots, keyboard activation, mouse dragging, and phone timeline zoom and resize persistence were checked. TypeScript, ESLint, and the production build passed. The local preview was restarted after the production build and is working.
- [ ] Review the current skill cards at 200% browser text scaling. Browser automation could not set that zoom reliably. The restrictive two-line skill-title clamp was removed, and title/card clearance was checked at 320px; a visual 200% text-scaling check remains open before treating enlarged-text verification as complete.

## Later discussion and pending decisions

- [x] Aaron selected the recommended minimal project-card alignment. Image and title positions, tag starting positions, and bottom actions now align across all seven cards while retaining existing content and styling. Verified in German at desktop and 390px phone widths. The full description remains in the modal. Options considered:
  - **A — Minimal alignment (recommended):** Keep the same card content and visual style. Reserve consistent image and title space, let tags use the flexible middle area, and align actions at the bottom. Descriptions remain in the modals.
  - **B — Visible summary:** Add an approved one- or two-sentence bilingual summary to each card between the title and tags, then align tags and actions. This increases card density and may require taller cards.
  - **C — Larger composition change:** Use a more structured image/text split with visible summaries, tags, and actions. This needs a separate visual review before any implementation.

## New interaction follow-up

- [ ] Repair mouse dragging in both card carousels. Reproduce and verify direction changes, moving beyond the carousel boundary, and pointer release outside the carousel. Preserve touch swipe, arrows, dots, keyboard controls, and card click behavior. Commit separately; do not deploy.
