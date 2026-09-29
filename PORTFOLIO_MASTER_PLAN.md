# Portfolio update — working plan

Work in this repository. Preserve the existing visual style and existing content unless Aaron approves a specific change. Complete work in phases with a local commit after each. Do not deploy without a separate request.

## Completed phases

- [x] Update the hero and About copy in English and German, with the approved portrait and language-specific technical CV files.
- [x] Add the approved career events and future goals to the three-pathway vertical timeline, including later chronology, accessibility, and drag-cue refinements.
- [x] Add Fluent Studio and FluentOverlay before the existing five projects and add the approved product links and skill icons.
- [x] Add the monochrome Fluent Studio icon next to GitHub in the hero.
- [x] Correct the approved skill proficiency levels, ordering, `.NET` name, and 80/55/30 progress scale. Commit `2a6aa99`.
- [x] Add previous/next arrows to the project carousel. Commit `7c0102e`.
- [x] Add previous/next arrows to the skill-card carousel on tablet and phone, where the cards already scroll. Commit `91e2b7f`.
- [x] Add 75%, 100%, and 125% zoom controls to the timeline on smaller screens, retaining horizontal scrolling. This is a provisional interaction pending Aaron's review.

## Open work and approval gates

- [ ] **Aaron to review the timeline zoom in the local browser.** Decide whether the 75–125% range, step size, legibility, and placement are adequate or need adjustment.
- [ ] Review exact English and German wording for Skills, contact, and page metadata before editing any copy.
- [x] Verify both technical CV links, filenames, language switching, and rendered PDFs. Both one-page PDFs render correctly; the site opens the appropriate language file in a new tab.
- [x] Verify all seven project cards, bilingual modals, and links. The four language-specific Fluent Studio/FluentOverlay pages and every existing GitHub/demo destination loaded in the browser.
- [ ] Choose an APG tab icon from the prepared 16px and 32px previews; then generate and verify SVG, ICO, PNG, and manifest assets. Final asset replacement waits for Aaron's choice.
- [ ] Review whether the FluentOverlay card should still say "currently in development" / "in Entwicklung" now that its product page presents a released version. Keep the existing copy until Aaron approves exact replacement text.
- [ ] Finish timeline screen-reader, text-scaling, pointer-cursor, and unused-code review. Initial audit: the ordered event list exposes event, pathway, and year; markers and events can receive keyboard focus; the drag cursor is restricted to eligible canvas areas. The retired SVG renderer is gone, but its CSS selectors remain unused. The fixed-height canvas still needs a browser text-scaling check before any cleanup or layout change.
- [ ] Review the German screen-reader labels in Projects and section regions: some are still hard-coded in English. Propose exact accessible wording before changing them.
- [ ] Compare desktop, tablet, and phone views in both languages and themes with the earlier visual design. Correct unintended changes.
- [ ] Run TypeScript, ESLint, and a production build on the final local version; commit each completed change group.
