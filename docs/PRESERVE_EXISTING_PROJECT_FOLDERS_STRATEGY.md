# Preserve Existing Project Folders Strategy

## Goal

Keep the existing standalone projects in this repository accessible at their current paths after deploying the Next.js static export to GitHub Pages.

Existing projects (current examples):
- `aurelia-salat-time/`
- `candidate-showcase/`
- `compression/`

## Constraints / Problem

- Next.js static export writes the deployable site to `out/`.
- GitHub Pages will serve only what is deployed (typically the contents of `out/`).
- The existing projects are *not* built/served by Next.js and must continue to function independently.
- We must avoid route/path conflicts between blog routes and existing project folder names.

## Recommended Approach (Primary)

### 1) Use a post-export copy step

After `next build` and static export completes, copy the project folders into the generated `out/` directory.

High-level flow:
1. `next build` (+ `next export` if not using `output: 'export'`)
2. Ensure `out/` exists
3. Copy each preserved project folder from repo root into `out/<folder>`
4. Add `.nojekyll` into `out/` (GitHub Pages requirement for directories starting with `_`)
5. Deploy `out/` via GitHub Pages workflow

Why this is preferred:
- Works regardless of the project’s internal build tooling (Aurelia, vanilla JS, etc.).
- Keeps projects fully isolated from Next.js runtime.
- Scales by adding new folder names to the copy list.

### 2) Treat preserved folders as “reserved paths”

To avoid conflicts, the blog should not create routes that overlap with preserved project folder names.

Policy:
- The list of preserved folder names is authoritative.
- Blog routes should never use these as top-level segments.

Implementation guidance:
- Keep blog routes under well-namespaced segments like `/posts`, `/tags`, `/search`, etc.
- If a conflict is desired in the future, the preserved project must be renamed or moved under a different top-level folder.

## Alternatives Considered

### A) Serve projects from `public/`

Not recommended for these projects:
- `public/` is for static assets and is intended to be *source* for Next.js builds.
- Copying complex sub-apps into `public/` is feasible but encourages mixing concerns and can confuse build ownership.
- It also makes it easier to accidentally reference/transform files with Next tooling later.

### B) Next.js configuration hook(s)

Not recommended as the main mechanism:
- Next.js doesn’t provide an “authoritative” first-class hook for copying arbitrary non-public directories during `output: 'export'` that is as clear/portable as a dedicated post-export script.
- A standalone Node script keeps the behavior explicit and testable.

## Implementation Plan (for follow-up task `n41.4`)

### Script

Create a Node script (suggested path):
- `scripts/preserve-projects.js`

Responsibilities:
- Define `OUT_DIR` (`out/`)
- Define preserved folders list (initially hardcoded, later could be data-driven)
- For each folder:
  - Validate source exists and is a directory
  - Copy to `out/<folder>`
- Ensure `.nojekyll` exists in `out/`

Notes:
- Use built-in Node `fs` with `fs.cp(..., { recursive: true })` (Node 20+) or `fs-extra`.

### npm scripts

Add an explicit export pipeline script (names can vary):
- `export`: run the static export
- `postexport`: copy preserved folders into `out/`

Example pipeline:
- `npm run export && npm run postexport`

### GitHub Actions integration

In the Pages workflow:
- Build/export
- Run the preservation script
- Upload `./out`

## Testing / Verification

### Local

1. Build/export the blog to `out/`.
2. Run the preservation step.
3. Serve `out/` locally (example):
   - `npx serve out`
4. Verify these URLs return the expected apps:
   - `/aurelia-salat-time/`
   - `/candidate-showcase/`
   - `/compression/`
5. Verify blog routes still function and no top-level path collisions exist.

### CI

In workflow logs, verify:
- Each preserved folder copy is logged.
- `out/<folder>/index.html` exists (or the expected entry file for that project).

## Risk Mitigation

- **Path conflicts**: treat preserved folder names as reserved, and test for collisions in review.
- **Accidental omission**: keep the preserved folder list in one place (script) and review when adding new projects.
- **GitHub Pages quirks**: always write `.nojekyll` to `out/`.
- **Base path changes**: if the site later uses a Pages subpath (e.g. `/repo-name/`), ensure preserved apps do not assume absolute-root links. Validate by serving from a subpath or adjusting their internal asset paths if needed.
