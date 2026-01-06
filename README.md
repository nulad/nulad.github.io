# nulad.github.io

Personal blog and portfolio built with Next.js, Tailwind CSS, and deployed on GitHub Pages.

## Features

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Markdown** support for blog posts
- **Responsive design**
- **Infinite scroll** for posts
- **Reading time** estimation
- **Syntax highlighting**
- **GitHub Pages** deployment

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/nulad/nulad.github.io.git
   cd nulad.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Blog Posts

1. Create a new markdown file in the `content/posts/` directory.
2. Use the following frontmatter format:
   ```yaml
   ---
   title: Your Post Title
   date: YYYY-MM-DD
   description: A brief description of the post
   tags: tag1, tag2, tag3
   ---
   ```
3. Write your post content in markdown below the frontmatter.
4. The filename will be used as the post slug (e.g., `my-post.md` becomes `/posts/my-post`).

### Example Post

```markdown
---
title: Hello World
date: 2024-01-01
description: My first blog post
tags: welcome, introduction
---

# Hello World

This is my first blog post on this site!
```

## Deployment

This site is configured to deploy automatically to GitHub Pages via GitHub Actions.

### Automatic Deployment

1. Push changes to the `master` branch
2. GitHub Actions will automatically build and deploy the site
3. The deployed site will be available at `https://nulad.github.io`

### Manual Deployment

If needed, you can manually deploy:

1. Build the site:
   ```bash
   npm run build
   ```

2. The build output will be in the `out` directory, which is configured for static export.

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Project Structure

```
nulad.github.io/
├── app/                 # Next.js app router pages
├── components/          # React components
├── content/            # Markdown content
│   └── posts/          # Blog posts
├── lib/                # Utility functions
├── public/             # Static assets
└── spec/               # Project specifications
```

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Testing**: Jest
- **Language**: JavaScript

## License

MIT License - see LICENSE file for details.
