# Parth Shekhawat — portfolio

A responsive React/Vite portfolio with a Three.js skills cube, project summaries, internship experience, and a direct DB resume download.

## Run locally

Use Node.js 22.12+ or a supported newer release.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
npm run lint
```

The production output is `dist/`. Deploy that directory to a static hosting provider. This task does not publish the site.

## Content and maintenance

- `src/components/Hero.jsx`: introduction and highlights.
- `src/components/Projects.jsx`: projects and their source/contact links.
- `src/data/repositories.js`: descriptions of the additional GitHub repositories.
- `src/data/cubeFaces.js`: six biographical cube faces and their section links.
- `src/components/Experience.jsx`: internship history, newest first.
- `src/components/Skills.jsx`, `Education.jsx`, and `Certifications.jsx`: background.
- `src/App.jsx`: navigation, resume downloads, contact details, and footer.
- `public/resumes/`: the original user-provided PDFs. The header and experience links directly download the DB resume; there is no resume-selection section.
- `src/index.css`: design tokens, layout, and responsive styles.
- `index.html`: search and social metadata. Add a canonical URL and absolute social preview image when the production domain is known.

Content was reconciled against the supplied AI Engineer, DB, and SDE resumes and the public repositories at https://github.com/gitzboy1 (checked October 13, 2026). All seven eligible public repositories are linked: GymSetu, Eyesonic, amex-shield, Dropship-agent, Colossus, Tour-Explore, and portfolio_parth. Helsef and amex-shield-documentation are intentionally excluded. The original EYSONIC wearable prototype remains separate from the newer EYSONIC AI team project. Project illustrations are diagrams, not product screenshots. Repository content is a checked-in snapshot; no GitHub API credentials or runtime requests are required.

## Cube behavior

The actual Three.js cube is loaded separately from the main content. It sits centrally in the page background and becomes interactive in the full-width Explore me section between the introduction and projects. Drag horizontally on touch devices; drag in either direction with a mouse. Use arrow keys while the cube has focus. The front-facing side updates a readable biography panel, with a link to the relevant section. Topic buttons turn the cube directly to projects, experience, education, contact, about, or skills. The cube rotates automatically and pauses only while being dragged. Releasing it resumes rotation. Topic selection remains available; there is no rotation toolbar.

The background cube keeps rotating outside the exploration section as well. Animation stops in hidden tabs and for reduced-motion preferences. Device pixel ratio is capped at 1.5. No remote 3D environment assets are required. A CSS cube fallback appears when WebGL is unavailable or the renderer fails; topic buttons still expose every biography panel.

The 3D chunk remains larger than Vite's default 500 kB warning threshold because it includes Three.js; it is isolated from the main content bundle. Google Fonts is optional: local font fallbacks keep the layout usable when that request is unavailable.

## Browser smoke checks

`scripts/smoke-test.mjs` uses Playwright with installed Microsoft Edge by default. Install Playwright in your development environment or set `PLAYWRIGHT_MODULE` to an available package path. Set `BROWSER_CHANNEL` to `chrome` to use Chrome, and optionally set `TEST_URL` to test a production preview.

```sh
node scripts/smoke-test.mjs
```

Start the development server first. Checks cover responsive widths from 320 to 1440 px, navigation, cube controls, reduced motion, WebGL fallback, valid PDF downloads, clipboard behavior, and runtime errors. Screenshots and the JSON report are written to ignored `test-results/`.
