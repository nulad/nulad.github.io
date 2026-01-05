# Requirements Specification - nulad's Static Blog

## Project Overview
A Next.js static blog with markdown posts, brutalist/minimalist design, hosted on GitHub Pages.

## EARS Requirements Specification

### **Ubiquitous Requirements (always active)**

1. The system shall render blog posts from markdown files located in `content/posts/` directory.
2. The system shall generate a static Next.js site exportable to GitHub Pages.
3. The system shall display the site title as "nulad".
4. The system shall use a classic brutalist design aesthetic with monospace fonts, stark black/white colors, borders, and no shadows.
5. The system shall support light mode only (no dark mode).
6. The system shall parse GitHub Flavored Markdown syntax.
7. The system shall apply GitHub light theme for code syntax highlighting.
8. The system shall not include a comments system.

### **State-Driven Requirements**

9. **While** on the homepage, the system shall display blog posts in an infinite scroll list.
10. **While** viewing a blog post, the system shall display the post title, date, description, auto-calculated reading time, and full content.
11. **While** the site title is clicked, the system shall navigate to the homepage.

### **Event-Driven Requirements**

12. **When** a user scrolls to the bottom of the homepage, the system shall load additional blog posts.
13. **When** a markdown file is added to `content/posts/`, the system shall include it in the build output.
14. **When** the site is built, the system shall calculate reading time based on word count at 200-250 words per minute.

### **Unwanted Behavior Requirements**

15. **If** no posts exist in `content/posts/`, the system shall display a message indicating no posts are available.
16. **If** a markdown file is missing required frontmatter (title, date, description), the system shall skip that post or display an error during build.

### **Optional Features**

17. The system shall provide a Projects page that showcases projects with links to repositories.
18. The system shall provide a navigation link to the resume at `nulad.github.io/resume`.

### **Complex Requirements**

19. **When** a user visits `nulad.github.io/`, **where** the site is hosted on GitHub Pages, the system shall serve the static blog homepage.
20. **When** the repository is pushed to GitHub, the system shall trigger GitHub Actions to build and deploy the static site.

---

## Post Frontmatter Schema

Each markdown file in `content/posts/` must include the following frontmatter:

```yaml
---
title: string (required)
date: string (required, ISO 8601 format: YYYY-MM-DD)
description: string (required)
---
```

Reading time will be auto-calculated and does not need to be in frontmatter.

---

## Pages Structure

1. **Homepage** (`/`) - Infinite scroll list of all blog posts
2. **Post pages** (`/posts/[slug]`) - Individual post view
3. **Projects page** (`/projects`) - Showcase projects with links
4. **Resume link** - External link to `nulad.github.io/resume`

---

## Design Requirements

### Visual Style
- **Classic brutalist aesthetic**
- Monospace fonts (e.g., Courier New, Monaco, Consolas)
- Stark black text on white background
- Heavy borders (2-3px solid black)
- No shadows, gradients, or rounded corners
- Minimal whitespace, dense layouts
- No animations or transitions

### Navigation
- Minimal header with just site title "nulad"
- Site title links to homepage
- No hamburger menu, no complex navigation
- Footer may include links to Projects and Resume

### Code Blocks
- GitHub light theme syntax highlighting
- Monospace font consistent with overall design
- Clear visual distinction from body text

---

## Technical Requirements

### Stack
- Next.js 14+ with App Router
- Static export (`output: 'export'`)
- Markdown processing library (remark/unified ecosystem)
- Syntax highlighting (Shiki or Prism with GitHub theme)

### Build & Deployment
- GitHub Actions workflow for CI/CD
- Deploy to GitHub Pages on push to main branch
- Build output to `out/` directory

### Markdown Support
- GitHub Flavored Markdown (tables, strikethrough, task lists, autolinks)
- Code syntax highlighting
- Images embedded in markdown
- Auto-linking of URLs

---

## Migration Requirements

- Existing projects (`aurelia-salat-time`, `candidate-showcase`, `compression`) shall be moved to a new repository named `archive` or `projects`
- Current `nextjs-app/` directory shall be removed
- New Next.js app shall be created at repository root

---

## Out of Scope

- Comments system
- Dark mode
- Search functionality
- RSS feed (future consideration)
- Multi-author support
- Draft posts
- Post categories/tags
- Related posts
- Social media sharing buttons
