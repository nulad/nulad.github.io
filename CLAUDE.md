# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog and portfolio built with React Router v7 (framework mode) and Vite, deployed as a prerendered static site to GitHub Pages. The site reads Markdown files from `content/posts/` and renders them as blog posts with features like infinite scroll, reading time estimation, and a custom markdown renderer. The site uses Tailwind CSS v4 for styling with a brutalist aesthetic.

## Issue Tracking

This project uses **bd** (beads) for issue tracking:
- Run `bd ready` to find available work
- Run `bd show <id>` to view issue details
- See [AGENTS.md](AGENTS.md) for complete workflow guidance

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production (outputs to ./build directory)
npm run build

# Start production server
npm start

# Type checking
npm run typecheck
```

## Testing

- Tests are located in `__tests__/` directory, mirroring the project structure
- Uses Vitest with `@testing-library/react` for component testing
- Test files follow the pattern: `__tests__/<path>/<filename>.test.{js,jsx}`
- Component tests use `.jsx` extension (required by Vite for JSX parsing)
- The `spec/` directory is excluded from test runs (contains project documentation)
- Run a single test file: `npx vitest run __tests__/lib/posts.test.js`
- Run tests matching a pattern: `npx vitest run -t "should return posts"`

## Architecture

### Content Management

The blog uses a file-based content system:
- Blog posts are Markdown files in `content/posts/`
- Each post has YAML frontmatter with `title`, `date`, `description`, and optionally `tags`
- The filename (without `.md`) becomes the post slug (URL)
- Posts are read at runtime via `loader` functions using Node.js `fs` module ([app/lib/posts.ts](app/lib/posts.ts))
- README.md in the posts directory is automatically excluded from the post list

### Markdown Rendering

The project uses a **custom markdown renderer** ([app/lib/markdown.ts](app/lib/markdown.ts)), not remark/remark-html:
- Custom parser handles headings, lists, code blocks, tables, links, images, bold, italic, strikethrough
- Supports GitHub Flavored Markdown features (tables, task lists, autolinks)
- Supports nested lists with 2-space indentation
- Task lists render with disabled checkboxes
- The [MarkdownContent](app/components/MarkdownContent.tsx) component sanitizes HTML output using DOMPurify
- Sanitization happens client-side only (DOMPurify is lazy-loaded for browser environment)

### Server-Side Rendering

- React Router v7 framework mode with SSR enabled ([react-router.config.ts](react-router.config.ts))
- Routes defined explicitly in [app/routes.ts](app/routes.ts)
- Data loading via `loader` functions that run on the server
- `meta` exports replace Next.js `generateMetadata` for SEO
- 404 handling via `throw data("Not Found", { status: 404 })` in loaders
- Root layout in [app/root.tsx](app/root.tsx) with `<Meta>`, `<Links>`, `<Scripts>`, `<ScrollRestoration>`

### Infinite Scroll Implementation

The homepage uses a custom infinite scroll component ([app/components/InfiniteScroll.tsx](app/components/InfiniteScroll.tsx)):
- Uses IntersectionObserver API to detect when user reaches bottom of page
- 200px rootMargin triggers loading before user actually reaches end
- Client-side pagination loads 5 posts at a time
- [PostsList](app/components/PostsList.tsx) manages state and coordinates between posts data and InfiniteScroll component

### Static Site Generation

- React Router v7 with prerendering enabled ([react-router.config.ts](react-router.config.ts))
- All routes prerendered to static HTML at build time into `build/client/`
- The `prerender()` function reads `content/posts/` to generate dynamic post paths
- Output is a fully static site — no server required at runtime

### Deployment

- Automatic deployment via GitHub Actions on push to `master` branch
- Workflow runs tests → builds → deploys to GitHub Pages
- Build artifacts uploaded from `./build/client` directory
- Tests must pass before build/deploy proceeds

## File Structure

```
app/
  ├── root.tsx             # Root layout with Header, Meta, Links, Scripts
  ├── routes.ts            # Route definitions
  ├── app.css              # Tailwind v4 entry + brutalist design system
  ├── routes/
  │   ├── home.tsx         # Homepage with loader + infinite scroll
  │   ├── projects.tsx     # Static projects page
  │   └── post.tsx         # Dynamic post page with loader + meta
  ├── components/
  │   ├── Header.tsx       # Site header with navigation
  │   ├── PostCard.tsx     # Individual post preview card
  │   ├── PostsList.tsx    # Post list with client-side pagination
  │   ├── InfiniteScroll.tsx # Reusable infinite scroll using IntersectionObserver
  │   └── MarkdownContent.tsx # Markdown renderer with DOMPurify sanitization
  └── lib/
      ├── posts.ts         # Post data fetching (getAllPosts, getPostBySlug, getSortedPosts)
      ├── markdown.ts      # Custom markdown parser/renderer
      └── utils.ts         # Utilities (formatDate, calculateReadingTime)

content/posts/             # Markdown blog posts
public/                    # Static assets
__tests__/                 # Vitest tests mirroring project structure
test/setup.ts              # Vitest setup file
spec/                      # Project specifications (excluded from tests)
.beads/                    # Beads issue tracking data
```

## Key Conventions

- All posts must have frontmatter with at least: `title`, `date` (YYYY-MM-DD format), `description`
- Post dates should be valid ISO date strings
- The `slug` field is auto-generated from filename
- TypeScript used for all app code (`.tsx`/`.ts` in `app/`)
- No `'use client'` directives — React Router v7 handles the server/client boundary via loaders
- Reading time is calculated at 200 words per minute ([app/lib/utils.ts](app/lib/utils.ts))
- `Link` component imported from `react-router` (uses `to` prop, not `href`)

## Adding New Blog Posts

1. Create a new `.md` file in `content/posts/`
2. Add frontmatter:
   ```yaml
   ---
   title: Your Post Title
   date: YYYY-MM-DD
   description: Brief description
   tags: [optional, array]
   ---
   ```
3. Write content in Markdown below frontmatter
4. The post will automatically appear in the blog after build
5. Filename determines the URL slug (e.g., `my-post.md` → `/posts/my-post`)

## Important Implementation Notes

- The markdown renderer ([app/lib/markdown.ts](app/lib/markdown.ts)) is custom-built and should be modified carefully — it has specific parsing logic for various Markdown elements
- DOMPurify sanitization happens only client-side; during SSR the markdown library's escaping is relied upon
- The IntersectionObserver in [InfiniteScroll.tsx](app/components/InfiniteScroll.tsx) has a 200px rootMargin to improve UX by preloading content
- The [projects page](app/routes/projects.tsx) is static and links to archived projects at github.com/nulad/archive
- Styling uses Tailwind CSS v4 with a brutalist design approach (thick borders, monospace fonts, high contrast)
- Tailwind config is CSS-based in [app/app.css](app/app.css) — no `tailwind.config.js`
- Vite config in [vite.config.ts](vite.config.ts) uses `@tailwindcss/vite` plugin and `@react-router/dev/vite`
- Posts are read at build time during prerendering — `process.cwd()` resolves to the project root
