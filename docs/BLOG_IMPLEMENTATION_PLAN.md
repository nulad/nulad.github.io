# Static Blog Implementation Plan
Next.js + GitHub Pages + Markdown

**Repository:** nulad.github.io
**Target:** Static blog with minimal/brutalist design
**Date:** 2026-01-05

---

## Overview

Build a static blogging site using Next.js App Router, deployed to GitHub Pages. Content managed via Markdown files in the repository. Existing project subdirectories (aurelia-salat-time, candidate-showcase, compression) will be preserved.

---

## Requirements Summary

### Core Features
- Static site generation with Next.js 15
- Markdown-based content with frontmatter
- Blog post listing with infinite scroll
- Individual post pages
- Tags/categories system
- Client-side search functionality
- Draft post support (hidden in production, visible in dev)
- Reading time estimates

### Design & UX
- Minimal/brutalist aesthetic (inspired by Dan Luu, Drew DeVault)
- System font stack (no web fonts)
- Dark mode toggle with localStorage persistence
- Responsive design (mobile-first)
- Syntax highlighting for code blocks
- Copy-to-clipboard buttons for code

### Technical
- JavaScript throughout
- Next.js App Router
- Static export (`output: 'export'`)
- GitHub Actions for CI/CD
- Preserve existing project directories

---

## Architecture

### File Structure
```
/
├── app/
│   ├── layout.jsx              # Root layout with dark mode
│   ├── page.jsx                # Home page (blog listing)
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.jsx        # Individual post pages
│   ├── tags/
│   │   ├── page.jsx            # All tags listing
│   │   └── [tag]/
│   │       └── page.jsx        # Posts by tag
│   └── globals.css             # Minimal global styles
├── components/
│   ├── Layout.jsx              # Main layout wrapper
│   ├── PostList.jsx            # Infinite scroll listing
│   ├── PostCard.jsx            # Individual post card
│   ├── MarkdownRenderer.jsx    # Markdown to HTML
│   ├── CodeBlock.jsx           # Code with copy button
│   ├── DarkModeToggle.jsx      # Theme switcher
│   └── SearchBar.jsx           # Search interface
├── lib/
│   ├── posts.js                # Post fetching/parsing
│   ├── search.js               # Search index generation
│   └── reading-time.js         # Calculate reading time
├── content/
│   └── posts/
│       ├── my-first-post.md
│       ├── draft-post.md       # draft: true in frontmatter
│       └── ...
├── public/
│   └── (static assets)
├── aurelia-salat-time/         # Preserved existing project
├── candidate-showcase/         # Preserved existing project
├── compression/                # Preserved existing project
├── scripts/
│   └── preserve-projects.js    # Copy existing dirs to out/
├── next.config.js
├── package.json
```

### Frontmatter Schema
```yaml
---
title: "Post Title"
date: "2026-01-05"
tags: ["nextjs", "blogging", "web"]
excerpt: "Brief description for cards and SEO"
draft: false  # Set to true to hide in production
---
```

### Content Flow
1. Markdown files in `/content/posts/`
2. Build time: Parse all .md files
3. Extract frontmatter + calculate reading time
4. Filter out drafts in production (keep in dev)
5. Generate static pages via `generateStaticParams`
6. Build search index (exclude drafts)
7. Export to `/out/` directory
8. Copy existing projects to `/out/`
9. Deploy to GitHub Pages

---

## Design System - "Readable Brutalism"

### Typography
- **Body:** Georgia, "Times New Roman", serif (16px, line-height 1.7)
- **Headings:** System sans-serif stack, bold
- **Code:** "Courier New", Courier, monospace
- **Max width:** 650px for optimal readability

### Colors
**Light Mode:**
- Background: #ffffff
- Text: #1a1a1a
- Links: #0066cc (blue)
- Code background: #f5f5f5

**Dark Mode:**
- Background: #1a1a1a
- Text: #e0e0e0
- Links: #4d9fff (lighter blue)
- Code background: #2d2d2d

### Spacing
- Generous vertical rhythm (2-3rem between sections)
- Consistent padding/margins in multiples of 8px
- Ample whitespace around content

### Principles
- No rounded corners
- No box shadows
- No gradients
- No animations (except dark mode transition)
- Horizontal rules as simple `<hr>`
- Minimal color palette
- Zero decoration

---

## Task Breakdown by Complexity

### 🟢 Simple Tasks (Junior Engineer) - 13 tasks

**Setup & Dependencies**
1. Install Node.js dependencies (next, react, react-dom)
2. Initialize Next.js project with create-next-app (JavaScript + App Router)
3. Install content processing dependencies (gray-matter, remark, rehype, shiki)
4. Install and configure FlexSearch library
5. Set up system font stack in CSS

**Components & Features**
6. Create basic layout component with dark mode support
7. Create reading time calculation utility
8. Create minimal search UI component
9. Build copy-to-clipboard button for code blocks
10. Add reading time display to post cards

**Testing & Examples**
11. Create example blog posts (published and draft)
12. Test draft filtering in dev vs production mode
13. Test dark mode toggle and persistence

---

### 🟡 Medium Tasks (Mid-level Engineer) - 25 tasks

**Configuration**
14. Configure next.config.js for static export with output: 'export'
15. Define frontmatter schema with draft support
16. Create markdown utility functions (parse, read, filter drafts)
17. Build post metadata extraction with JSDoc typedefs
18. Set up Shiki for syntax highlighting

**Core Features**
19. Build infinite scroll post listing component
20. Implement dynamic route for posts [slug]/page.jsx
21. Create markdown renderer with code highlighting
22. Build generateStaticParams for all published posts
23. Implement draft filtering logic (hide in production, show in dev)

**Design Implementation**
24. Create CSS for light/dark modes with minimal styling
25. Implement dark mode context and toggle component
26. Create dark mode persistence with localStorage

**Tags & Search**
27. Implement tag extraction logic from frontmatter
28. Create tag listing page with minimal design
29. Build tag filter pages at /tags/[tag]
30. Build search index generation (exclude drafts)

**Optimization**
31. Add basic SEO metadata to pages
32. Optimize images with next/image component

**Deployment**
33. Create GitHub Actions workflow file (.github/workflows/deploy.yml)
34. Configure build with NODE_ENV=production (to hide drafts)
35. Implement post-build script to copy projects to out/
36. Configure GitHub Pages deployment in workflow

**Testing**
37. Test infinite scroll, search, and code copy features
38. Verify existing projects remain accessible and unchanged

---

### 🔴 Complex Tasks (Senior Engineer) - 4 tasks

**Architecture & Design Decisions**

39. **Design flat content structure and establish conventions**
    - Determine file naming standards (kebab-case slugs)
    - Frontmatter validation strategy (runtime vs build-time)
    - Content organization for scalability
    - How to handle assets (images, files) per post
    - Decision: Co-locate assets or central /public folder?

40. **Design brutalist/readable design system**
    - Typography hierarchy without excess decoration
    - Color palette strategy (minimal but functional)
    - Spacing system (multiples of 8px for consistency)
    - Balance brutalism with accessibility/usability
    - Dark mode color scheme that maintains contrast ratios
    - Ensure WCAG AA compliance despite minimal design

41. **Design client-side search architecture**
    - Index generation strategy (full-text vs selective fields)
    - Balance index size vs search comprehensiveness
    - Performance considerations for 100+ posts
    - Incremental index updates vs full rebuild
    - Search ranking algorithm (relevance scoring)

42. **Design strategy to preserve existing project folders**
    - Integration point in build process (post-build hook)
    - Handle path conflicts if blog routes overlap
    - Ensure existing projects work independently (no Next.js interference)
    - Future-proof for adding new projects
    - Consider .nojekyll file for GitHub Pages
    - Base path handling (if needed)

---

## Implementation Sequence

### Phase 1: Foundation (Tasks 1-10)
- Set up Next.js project
- Install dependencies
- Configure for static export
- Design content structure
- Define schemas and types

### Phase 2: Core Features (Tasks 11-23)
- Markdown parsing and rendering
- Post listing and individual pages
- Draft filtering system
- Reading time calculation
- Static generation setup

### Phase 3: Design & UX (Tasks 24-32)
- Implement brutalist design system
- Dark mode functionality
- Syntax highlighting
- Code copy buttons
- Responsive layout

### Phase 4: Advanced Features (Tasks 33-38)
- Tags system
- Search functionality
- Infinite scroll
- SEO optimization

### Phase 5: Deployment (Tasks 39-42)
- GitHub Actions workflow
- Preserve existing projects
- Production build configuration
- Testing and verification

---

## Key Technical Decisions

### 1. Syntax Highlighting
**Choice:** Shiki (over Prism)
**Reasoning:**
- Better Next.js integration
- Runs at build time (zero client-side JS)
- VSCode themes out of the box
- More accurate syntax highlighting

### 2. Search Library
**Choice:** FlexSearch
**Reasoning:**
- Client-side, no backend needed
- Fast and lightweight
- Good balance of features vs size
- Works with static export

### 3. Styling Approach
**Choice:** CSS Modules (minimal approach)
**Reasoning:**
- No Tailwind bloat for minimal design
- Simple, straightforward CSS
- Scoped by default
- Easier to maintain minimal aesthetic

### 4. Draft Post Filtering
**Implementation:**
```javascript
// In lib/posts.js
export function getAllPosts(includeDrafts = false) {
  const posts = // ... parse all markdown files

  // Filter drafts in production
  if (!includeDrafts && process.env.NODE_ENV === 'production') {
    return posts.filter(post => !post.draft)
  }

  return posts
}
```

**Usage:**
- Development: Show all posts (including drafts with visual indicator)
- Production: Hide drafts completely
- Preview drafts: Use local dev server before deployment

### 5. Infinite Scroll
**Implementation:**
- Load initial 10-20 posts
- Use Intersection Observer API
- Load more when user scrolls near bottom
- Simple, no additional libraries needed

### 6. Preserving Existing Projects
**Implementation:**
```javascript
// scripts/preserve-projects.js
const fs = require('fs-extra')

const projectsToPreserve = [
  'aurelia-salat-time',
  'candidate-showcase',
  'compression'
]

projectsToPreserve.forEach(project => {
  fs.copySync(project, `out/${project}`)
})
```

**Integration:** Run after `next build && next export`

---

## GitHub Actions Workflow

```yaml
name: Deploy Blog to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js site
        run: npm run build
        env:
          NODE_ENV: production

      - name: Preserve existing projects
        run: node scripts/preserve-projects.js

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

---

## Testing Strategy

### Local Development
```bash
# Run dev server (shows drafts)
npm run dev

# Build and preview production (hides drafts)
npm run build
npm run start

# Or test static export
npm run build
npx serve out
```

### Testing Checklist
- [ ] Draft posts visible in dev, hidden in production
- [ ] Dark mode toggle works and persists
- [ ] Infinite scroll loads more posts
- [ ] Search finds posts correctly (excludes drafts)
- [ ] Tags filter posts properly
- [ ] Code copy buttons function
- [ ] Syntax highlighting displays correctly
- [ ] Reading time calculations accurate
- [ ] Existing projects accessible at original URLs
- [ ] Mobile responsive layout works
- [ ] SEO metadata present in `<head>`

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.0",
    "remark-html": "^16.0.0",
    "rehype-stringify": "^10.0.0",
    "shiki": "^1.0.0",
    "flexsearch": "^0.7.43"
  },
  "devDependencies": {
    "fs-extra": "^11.2.0"
  }
}
```

---

## Performance Targets

With basic optimization approach:
- **Lighthouse Score:** 90+ (performance, accessibility, SEO)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** < 100KB (main bundle)
- **Images:** Optimized via next/image, WebP format

No aggressive optimization needed initially. Can improve later if necessary.

---

## Future Enhancements (Out of Scope)

These can be added later if needed:
- RSS feed generation
- Sitemap.xml
- Analytics integration
- Newsletter signup
- Comments system (giscus/utterances)
- Table of contents for long posts
- Related posts suggestions
- Social sharing buttons
- Pagination (if infinite scroll becomes unwieldy)

---

## Success Criteria

The implementation is complete when:
1. ✅ Blog posts can be written in Markdown and deployed
2. ✅ Draft posts work correctly (visible in dev, hidden in prod)
3. ✅ Dark mode toggle functions and persists
4. ✅ Search finds posts accurately
5. ✅ Tags filter posts correctly
6. ✅ Code blocks have syntax highlighting and copy buttons
7. ✅ Design is minimal, fast, and readable
8. ✅ Existing projects remain accessible
9. ✅ GitHub Actions deploys automatically on push
10. ✅ Site loads quickly and works on mobile

---

## Risk Mitigation

### Risk: Breaking existing projects
**Mitigation:** Copy folders in post-build script, test each URL manually

### Risk: Large bundle size from markdown rendering
**Mitigation:** Use Shiki at build time, minimize client-side dependencies

### Risk: Search index too large
**Mitigation:** Index only title, excerpt, tags initially; can expand later

### Risk: Dark mode flash on page load
**Mitigation:** Use blocking script in `<head>` to set theme before render

---

## Timeline Estimate

**Note:** This plan provides task breakdown, not time estimates. Implementation can proceed at any pace.

**Suggested order:**
1. Senior: Architecture decisions (Tasks 39-42)
2. All levels: Foundation & setup (Tasks 1-10)
3. Mid-level: Core features (Tasks 11-23)
4. Mid-level: Design & UX (Tasks 24-32)
5. Mid-level: Advanced features (Tasks 33-38)
6. All levels: Testing and refinement

---

## Contact & Questions

For questions about this plan or implementation:
- Review task list in todo system
- Check Next.js documentation: https://nextjs.org/docs
- GitHub Pages docs: https://docs.github.com/en/pages

---

**Last Updated:** 2026-01-05
**Status:** Ready for implementation
