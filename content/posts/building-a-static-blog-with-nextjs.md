---
title: "Building a Static Blog with Next.js"
date: "2026-01-06"
description: "How I built this brutalist-style static blog using Next.js, markdown, and GitHub Pages"
tags: ["nextjs", "react", "markdown", "webdev"]
---

# Building a Static Blog with Next.js

I recently decided to rebuild my personal blog with a focus on simplicity and performance. Here's how I built this brutalist-style static blog using modern tools.

## Why This Stack?

I chose Next.js for several reasons:
- **Static Site Generation**: Perfect for blogs - fast, secure, and SEO-friendly
- **App Router**: The modern way to build Next.js apps
- **Markdown Support**: Write posts in plain text with Git versioning
- **GitHub Pages**: Free hosting with custom domains

## The Architecture

The blog follows a simple structure:
- Posts are written in markdown with frontmatter
- Next.js generates static HTML at build time
- GitHub Actions handle testing and deployment
- Pure CSS for that brutalist aesthetic

## Key Features

### Markdown Processing
Using `remark` and related plugins:
- GitHub Flavored Markdown support
- Syntax highlighting with `shiki`
- Frontmatter parsing for metadata

### Test-Driven Development
Every component and utility has tests:
- Jest for unit tests
- React Testing Library for components
- Tests run on every push via GitHub Actions

### Brutalist Design
No frills, just content:
- Monospace fonts
- Black borders on white background
- No animations or transitions
- Maximum readability

## Performance Benefits

Static generation provides:
- Instant page loads
- No server costs
- Great Core Web Vitals
- Works without JavaScript

## Deployment Workflow

The entire deployment process is automated:
1. Push to master branch
2. GitHub Actions run tests
3. Build static files
4. Deploy to GitHub Pages

## Writing New Posts

Adding content is straightforward:
1. Create `.md` file in `content/posts/`
2. Add frontmatter with metadata
3. Write in markdown
4. Push to deploy

## Conclusion

This setup gives me a fast, reliable blog that's easy to maintain. The brutalist design keeps the focus on content while the modern toolchain makes development pleasant.

The code is open source - feel free to adapt it for your own blog!
