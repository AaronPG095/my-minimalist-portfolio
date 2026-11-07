# Aaron Greyling portfolio

Personal developer portfolio for Aaron Greyling, built with Next.js, React, TypeScript and CSS Modules. It presents selected software projects, technical experience and an English/German CV.

**[View the website](https://aaronpaulgreyling.netlify.app/)** · **[Fluent Studio](https://www.fluent-studio.com/en)**

Netlify deploys the `main` branch.

## Run locally

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000`. Run `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` before publishing.

## Content

- `data/translations.json` holds the current English and German section copy and shared interface strings.
- `components/Profile/Profile.tsx` holds the portrait and language-matched CV links.
- `components/About/About.tsx`, `components/Skills/Skills.tsx`, and `components/Projects/Projects.tsx` render the original sections and retain their original styling.
- `data/career-content.ts` contains the profile summary and career-oriented content. Confirm how each entry is used before editing either content source.

The current portrait is `public/assets/aaron-greyling-portrait.jpg`. Keep descriptions grounded in confirmed work; distinguish a current project from a released product and planned study from completed education.

## CV downloads

The download links in `components/Profile/Profile.tsx` point to:

- `public/assets/Aaron_Greyling_CV_Technical_EN.pdf`
- `public/assets/Aaron_Greyling_CV_Technical_DE.pdf`

Editable CV sources are maintained separately from this public repository. Refresh the public PDFs whenever the corresponding CV content changes. The site uses the visitor's selected language to choose the PDF.

## Language and metadata

Language choice is persisted in local storage. The language provider updates the document language, title and description after hydration. The initial HTML and search metadata are English because this version uses one URL for both languages; separate localized routes would be needed for fully indexed German metadata. Canonical URL, Open Graph information, robots and sitemap are defined in `app/`.

## Deployment

Netlify deploys the repository's `main` branch. Review the site locally, commit the approved changes, then push to `main` through the existing GitHub/Netlify connection. No separate Codex checkout is needed for normal work on this project.
