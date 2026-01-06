# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Next.js 14 (App Router) that generates a static site deployed to GitHub Pages. The site reads Markdown files from `content/posts/` and renders them as blog posts with features like infinite scroll, reading time estimation, and a custom markdown renderer.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Lint code
npm run lint

# Build for production (outputs to ./out directory)
npm run build

# Preview production build
npm start
```

## Testing

- Tests are located in `__tests__/` directory, mirroring the project structure
- Uses Jest with `@testing-library/react` for component testing
- Test files follow the pattern: `__tests__/<path>/<filename>.test.js`
- The `spec/` directory is excluded from test runs (contains project documentation)
- Run a single test file: `npm test -- __tests__/lib/posts.test.js`
- Run tests matching a pattern: `npm test -- --testNamePattern="should return posts"`

## Architecture

### Content Management

The blog uses a file-based content system:
- Blog posts are Markdown files in `content/posts/`
- Each post has YAML frontmatter with `title`, `date`, `description`, and optionally `tags`
- The filename (without `.md`) becomes the post slug (URL)
- Posts are read at build time using Node.js `fs` module ([lib/posts.js](lib/posts.js))
- README.md in the posts directory is automatically excluded from the post list

### Markdown Rendering

The project uses a **custom markdown renderer** ([lib/markdown.js](lib/markdown.js)), not remark/remark-html:
- Custom parser handles headings, lists, code blocks, tables, links, images, bold, italic, strikethrough
- Supports GitHub Flavored Markdown features (tables, task lists, autolinks)
- Supports nested lists with 2-space indentation
- Task lists render with disabled checkboxes
- The [MarkdownContent](components/MarkdownContent.js) component sanitizes HTML output using DOMPurify
- Sanitization happens client-side only (DOMPurify is lazy-loaded for browser environment)

### Static Site Generation

- Next.js configured with `output: 'export'` for static site generation ([next.config.js](next.config.js))
- Uses App Router with `generateStaticParams()` to pre-render all post pages
- Dynamic route: `app/posts/[slug]/page.js` handles individual post pages
- Images are set to `unoptimized: true` for GitHub Pages compatibility
- Trailing slashes enabled for better static hosting compatibility

### Infinite Scroll Implementation

The homepage uses a custom infinite scroll component ([components/InfiniteScroll.js](components/InfiniteScroll.js)):
- Uses IntersectionObserver API to detect when user reaches bottom of page
- 200px rootMargin triggers loading before user actually reaches end
- Client-side pagination loads 5 posts at a time
- [PostsList](components/PostsList.js) manages state and coordinates between posts data and InfiniteScroll component

### Deployment

- Automatic deployment via GitHub Actions on push to `master` branch
- Workflow runs tests → builds → deploys to GitHub Pages
- Build artifacts uploaded from `./out` directory
- Tests must pass before build/deploy proceeds

## File Structure

```
app/
  ├── layout.js          # Root layout (minimal, imports globals.css)
  ├── page.js            # Homepage with infinite scroll post list
  └── posts/[slug]/
      └── page.js        # Dynamic post page with generateStaticParams

components/
  ├── InfiniteScroll.js  # Reusable infinite scroll using IntersectionObserver
  ├── PostsList.js       # Post list with client-side pagination
  ├── PostCard.js        # Individual post preview card
  ├── MarkdownContent.js # Markdown renderer with DOMPurify sanitization
  └── Header.js          # Site header component

lib/
  ├── posts.js           # Post data fetching (getAllPosts, getPostBySlug, getSortedPosts)
  ├── markdown.js        # Custom markdown parser/renderer
  └── utils.js           # Utilities (formatDate, calculateReadingTime)

content/posts/          # Markdown blog posts
__tests__/              # Jest tests mirroring project structure
spec/                   # Project specifications (excluded from tests)
```

## Key Conventions

- All posts must have frontmatter with at least: `title`, `date` (YYYY-MM-DD format), `description`
- Post dates should be valid ISO date strings
- The `slug` field is auto-generated from filename
- Components use `'use client'` directive only when needed (InfiniteScroll, PostsList, MarkdownContent)
- Server components are used by default for better performance
- Reading time is calculated at 200 words per minute ([lib/utils.js:13](lib/utils.js#L13))

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

- The markdown renderer ([lib/markdown.js](lib/markdown.js)) is custom-built and should be modified carefully - it has specific parsing logic for various Markdown elements
- DOMPurify sanitization happens only client-side; during SSR the markdown library's escaping is relied upon
- The IntersectionObserver in [InfiniteScroll.js](components/InfiniteScroll.js) has a 200px rootMargin to improve UX by preloading content
- GitHub Pages deployment requires the `trailingSlash: true` and `images.unoptimized: true` settings in next.config.js
