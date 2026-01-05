# Technical Implementation Plan - nulad's Static Blog

## Architecture Overview

### Development Methodology
- **Approach**: Test-Driven Development (TDD)
- **Testing Strategy**: Red-Green-Refactor cycle
  1. **Red** - Write failing tests first
  2. **Green** - Write minimal code to pass tests
  3. **Refactor** - Improve code while keeping tests green
- **Test Coverage**: Focus on critical paths and core functionality

### Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript (no TypeScript)
- **Testing**:
  - `jest` - test runner
  - `@testing-library/react` - component testing
  - `@testing-library/jest-dom` - DOM matchers
  - `@testing-library/user-event` - user interaction simulation
- **Styling**: CSS Modules or vanilla CSS (no Tailwind - doesn't fit brutalist aesthetic)
- **Markdown Processing**:
  - `gray-matter` - frontmatter parsing
  - `remark` - markdown to HTML conversion
  - `remark-gfm` - GitHub Flavored Markdown support
- **Syntax Highlighting**: `shiki` with GitHub light theme
- **Deployment**: GitHub Actions + GitHub Pages

### Project Structure
```
nulad.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment
├── __tests__/                   # Test files (TDD approach)
│   ├── lib/
│   │   ├── posts.test.js
│   │   ├── markdown.test.js
│   │   └── reading-time.test.js
│   ├── components/
│   │   ├── Header.test.js
│   │   ├── PostCard.test.js
│   │   ├── InfiniteScroll.test.js
│   │   └── MarkdownContent.test.js
│   └── app/
│       ├── page.test.js
│       └── posts/[slug]/page.test.js
├── app/
│   ├── layout.js                # Root layout with brutalist styling
│   ├── page.js                  # Homepage with infinite scroll
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.js          # Dynamic post pages
│   ├── projects/
│   │   └── page.js              # Projects showcase page
│   └── globals.css              # Global brutalist styles
├── components/
│   ├── Header.js                # Minimal header with site title
│   ├── PostCard.js              # Post preview in list
│   ├── InfiniteScroll.js        # Infinite scroll component
│   └── MarkdownContent.js       # Rendered markdown with code highlighting
├── lib/
│   ├── posts.js                 # Post fetching and parsing utilities
│   ├── markdown.js              # Markdown to HTML conversion
│   └── reading-time.js          # Reading time calculation
├── content/
│   └── posts/
│       ├── hello-world.md       # Example post
│       └── ...
├── public/
│   └── .nojekyll                # Disable Jekyll processing
├── jest.config.js               # Jest configuration
├── jest.setup.js                # Jest setup for testing-library
├── next.config.js               # Next.js config for static export
├── package.json
├── jsconfig.json                # JavaScript project config (optional)
└── REQUIREMENTS.md
```

---

## Implementation Phases

### Phase 1: Repository Cleanup & Setup
**Goal**: Clean repo, initialize Next.js, set up project structure with TDD tooling

#### Tasks:
1. Create new repo `nulad/archive` for old projects
2. Move `aurelia-salat-time/`, `candidate-showcase/`, `compression/` to archive repo
3. Remove `nextjs-app/` and `.next/` directories
4. Remove current `index.html`
5. Initialize Next.js 14 with App Router at repository root
6. Install dependencies:
   ```bash
   npm install gray-matter remark remark-gfm remark-html shiki
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
   ```
7. Configure Jest for Next.js testing
8. Create project structure (directories and initial files including `__tests__/`)

#### Deliverables:
- Clean repository with only Next.js app
- Archive repo created with old projects
- All dependencies installed (including testing libraries)
- Jest configured and working
- Folder structure created with test directories

---

### Phase 2: Core Markdown Processing (TDD)
**Goal**: Build utilities to parse and render markdown posts using test-first approach

#### TDD Workflow for this phase:
For each utility module, follow the Red-Green-Refactor cycle:
1. Write tests first (Red)
2. Implement minimal code to pass (Green)
3. Refactor for quality (Refactor)

#### Tasks:
1. **TDD: `lib/reading-time.js`** (start with simplest utility):
   - Write tests in `__tests__/lib/reading-time.test.js`:
     - Test word count calculation
     - Test 225 words per minute assumption
     - Test formatting (e.g., "5 min read", "< 1 min read")
     - Test edge cases (empty string, very short text)
   - Implement `lib/reading-time.js` to pass tests
   - Refactor for clarity

2. **TDD: `lib/posts.js`**:
   - Create sample posts in `content/posts/` for testing:
     - `hello-world.md` - Welcome post
     - `test-markdown-features.md` - Test GFM features, code blocks
   - Write tests in `__tests__/lib/posts.test.js`:
     - Test `getAllPosts()` returns all markdown files
     - Test `getPostBySlug(slug)` fetches correct post
     - Test `getSortedPosts()` sorts by date (newest first)
     - Test frontmatter parsing (title, date, description)
     - Test error handling (missing files, invalid frontmatter)
   - Implement `lib/posts.js` to pass tests
   - Refactor for consistency

3. **TDD: `lib/markdown.js`**:
   - Write tests in `__tests__/lib/markdown.test.js`:
     - Test basic markdown conversion (headings, paragraphs, lists)
     - Test GFM features (tables, strikethrough, task lists)
     - Test code block conversion with syntax highlighting
     - Test HTML sanitization
     - Test edge cases (empty input, malformed markdown)
   - Implement `lib/markdown.js` with remark pipeline
   - Configure Shiki with GitHub light theme
   - Refactor for performance

#### Deliverables:
- Test suites for all utilities (written first)
- Working markdown parser with frontmatter support
- Reading time calculation
- Syntax highlighting with GitHub light theme
- Sample posts for testing
- All tests passing

---

### Phase 3: Brutalist Design System
**Goal**: Implement classic brutalist visual design

#### Tasks:
1. **Create `app/globals.css`**:
   - CSS reset
   - Monospace font stack: `'Courier New', Courier, monospace`
   - Black (#000000) on white (#FFFFFF)
   - Heavy borders (2-3px solid black)
   - No shadows, transitions, or animations
   - Dense layouts with minimal padding
   - Link styles: underline, no color change

2. **Typography scale**:
   - Headings: Bold, larger sizes, heavy top/bottom borders
   - Body: 16px monospace, tight line-height (1.4)
   - Code blocks: Same monospace, 14px, black border, white background

3. **Layout patterns**:
   - Full-width content with max-width constraint (800px)
   - Grid-based layouts with visible borders
   - No rounded corners anywhere

#### Deliverables:
- Global CSS with brutalist aesthetic
- Consistent typography and spacing
- Design system documented in comments

---

### Phase 4: Components (TDD)
**Goal**: Build reusable React components using test-first approach

#### Tasks:
1. **TDD: `components/Header.js`**:
   - Write tests in `__tests__/components/Header.test.js`:
     - Test renders site title "nulad"
     - Test title links to homepage "/"
     - Test appropriate styling classes applied
   - Implement Header component
   - Apply brutalist styling

2. **TDD: `components/PostCard.js`**:
   - Write tests in `__tests__/components/PostCard.test.js`:
     - Test displays post title, date, description, reading time
     - Test link points to correct post slug
     - Test renders with required props
     - Test missing optional props handled gracefully
   - Implement PostCard component
   - Apply brutalist styling with hover state

3. **TDD: `components/MarkdownContent.js`**:
   - Write tests in `__tests__/components/MarkdownContent.test.js`:
     - Test renders HTML content correctly
     - Test applies styling classes to markdown elements
     - Test handles code blocks with syntax highlighting
     - Test sanitizes potentially dangerous HTML
   - Implement MarkdownContent component
   - Apply markdown-specific styling

4. **TDD: `components/InfiniteScroll.js`**:
   - Write tests in `__tests__/components/InfiniteScroll.test.js`:
     - Test renders initial items
     - Test calls onLoadMore when scrolling near bottom (mock Intersection Observer)
     - Test shows loading indicator when loading
     - Test handles end of posts (no more loading)
   - Implement InfiniteScroll with Intersection Observer
   - Add loading indicator styling

#### Deliverables:
- Test suites for all components (written first)
- Functional, styled components
- Infinite scroll working
- Markdown rendering with proper styling
- All component tests passing

---

### Phase 5: Pages (TDD)
**Goal**: Build all application pages with integration tests

#### Tasks:
1. **Create `app/layout.js`** (minimal testing needed):
   - Root layout with metadata
   - Include Header component
   - Load global CSS
   - Set HTML lang="en"
   - Meta tags for SEO

2. **TDD: `app/page.js`** (Homepage):
   - Write tests in `__tests__/app/page.test.js`:
     - Test fetches and displays posts
     - Test shows first 10 posts initially
     - Test infinite scroll loads more posts
     - Test shows "No posts yet" when empty
     - Test posts sorted by date (newest first)
   - Implement homepage with infinite scroll
   - Use PostCard component for display

3. **TDD: `app/posts/[slug]/page.js`**:
   - Write tests in `__tests__/app/posts/[slug]/page.test.js`:
     - Test fetches correct post by slug
     - Test displays post metadata (title, date, description, reading time)
     - Test renders full markdown content
     - Test generateStaticParams returns all post slugs
     - Test handles invalid slug (404)
   - Implement dynamic post page
   - Use MarkdownContent component

4. **Create `app/projects/page.js`**:
   - Static page listing projects
   - Links to project repos/demos
   - Same brutalist styling
   - Include external link to resume
   - (Light testing - mainly ensure renders correctly)

#### Deliverables:
- Integration tests for homepage and post pages
- Working homepage with infinite scroll
- Individual post pages rendering correctly
- Projects page with links
- All pages following brutalist design
- All integration tests passing

---

### Phase 6: Static Export Configuration & Build Validation
**Goal**: Configure Next.js for static site generation and validate build output

#### Tasks:
1. **Configure `next.config.js`**:
   ```js
   module.exports = {
     output: 'export',
     images: {
       unoptimized: true, // Required for static export
     },
   }
   ```

2. **Add `.nojekyll` file** to `public/`:
   - Prevents GitHub Pages from processing with Jekyll
   - Ensures files starting with `_` are served

3. **Test static export**:
   ```bash
   npm run build
   ```
   - Verify `out/` directory contains all static files
   - Test locally with `npx serve out`
   - Ensure all routes work
   - Check that markdown renders correctly
   - Verify syntax highlighting works

4. **Run full test suite before build**:
   ```bash
   npm test
   ```
   - Ensure all unit tests pass
   - Ensure all component tests pass
   - Ensure all integration tests pass
   - Fix any failing tests before proceeding

#### Deliverables:
- Next.js configured for static export
- Successful build to `out/` directory
- All pages accessible in static build
- All tests passing
- Local testing confirms everything works

---

### Phase 7: GitHub Actions Deployment with CI
**Goal**: Automate testing and deployment to GitHub Pages

#### Tasks:
1. **Create `.github/workflows/deploy.yml`** (with test step):
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
         - run: npm ci
         - run: npm test

     build:
       needs: test
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./out

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/deploy-pages@v4
           id: deployment
   ```

2. **Configure GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: GitHub Actions
   - Wait for first deployment

3. **Test deployment**:
   - Push to main branch
   - Monitor Actions tab for workflow
   - Verify tests run and pass before build
   - Verify site loads at `nulad.github.io`
   - Test all pages and functionality

#### Deliverables:
- GitHub Actions workflow configured with test step
- Tests run on every push (CI)
- Deployment blocked if tests fail
- Successful deployment to GitHub Pages
- Site accessible at nulad.github.io
- Automatic deployments on push

---

### Phase 8: Content & Polish
**Goal**: Add real content and final touches

#### Tasks:
1. **Create initial blog posts**:
   - Write/migrate actual blog posts to `content/posts/`
   - Ensure all have proper frontmatter
   - Test reading time calculations

2. **Projects page content**:
   - List real projects with descriptions
   - Add links to GitHub repos
   - Link to resume

3. **Testing checklist**:
   - [ ] Homepage loads with posts
   - [ ] Infinite scroll works smoothly
   - [ ] Individual posts render markdown correctly
   - [ ] Code blocks have syntax highlighting
   - [ ] Links work (internal and external)
   - [ ] Projects page displays correctly
   - [ ] Resume link works
   - [ ] Site title links to homepage
   - [ ] No console errors
   - [ ] Mobile responsive (brutalist but functional)
   - [ ] Fast load times
   - [ ] SEO meta tags present

4. **Documentation**:
   - Update README with project info
   - Document how to add new posts
   - Document deployment process

#### Deliverables:
- Real blog content published
- All features tested and working
- Documentation complete
- Site live and functional

---

## Technical Decisions & Rationale

### Why TDD (Test-Driven Development)?
- Ensures code correctness from the start
- Tests serve as living documentation
- Reduces bugs and regressions
- Makes refactoring safer
- Forces thinking about API design before implementation
- Provides confidence in static export build

### Why Jest and React Testing Library?
- Jest is the standard test runner for Next.js
- React Testing Library promotes testing user behavior over implementation details
- Excellent documentation and community support
- Works seamlessly with Next.js App Router

### Why App Router over Pages Router?
- Modern Next.js standard
- Better static generation support
- Cleaner file-based routing
- Server Components by default

### Why Shiki over Prism?
- More accurate syntax highlighting
- Uses VS Code's grammar definitions
- Works well with both JS and TS
- GitHub theme built-in

### Why CSS Modules/Vanilla CSS over Tailwind?
- Brutalist design doesn't need utility classes
- More control over raw styling
- Smaller bundle size
- Better fits minimal aesthetic

### Why remark over other parsers?
- Extensive plugin ecosystem
- GFM support via plugin
- Well-maintained
- Standard in React ecosystem

---

## Risks & Mitigations

### Risk: GitHub Pages caching issues
**Mitigation**: Use `.nojekyll` file, set proper cache headers, version assets if needed

### Risk: Infinite scroll performance with many posts
**Mitigation**: Virtualization library (react-window) if >100 posts, lazy loading images

### Risk: Markdown rendering XSS vulnerabilities
**Mitigation**: Sanitize HTML output, use `dangerouslySetInnerHTML` carefully, validate frontmatter

### Risk: Build failures on GitHub Actions
**Mitigation**: Test builds locally first, pin dependency versions, add error logging

---

## Success Criteria

- [ ] All tests pass (unit, component, integration)
- [ ] Test coverage meets defined thresholds
- [ ] Site deploys automatically to `nulad.github.io`
- [ ] GitHub Actions runs tests before deployment
- [ ] All markdown posts render correctly with syntax highlighting
- [ ] Infinite scroll works without performance issues
- [ ] Design is clearly brutalist/minimalist
- [ ] Reading time displays accurately
- [ ] All links work (projects, resume)
- [ ] Site loads in <2 seconds
- [ ] No runtime errors in console
- [ ] Mobile-friendly (responsive)
- [ ] Old projects successfully archived

---

## Maintenance Plan

### Adding new posts:
1. Create `.md` file in `content/posts/`
2. Add frontmatter (title, date, description)
3. Write content in GFM
4. Push to main branch
5. GitHub Actions automatically deploys

### Updating design:
1. Modify `app/globals.css`
2. Update component styles
3. Test locally
4. Push to deploy

### Adding new pages:
1. Create page in `app/` directory
2. Follow existing brutalist patterns
3. Add links in header/footer as needed
4. Deploy via push

---

## Timeline Estimate
(Note: For reference only, actual implementation can proceed at any pace)

- Phase 1: 1-2 hours
- Phase 2: 2-3 hours
- Phase 3: 1-2 hours
- Phase 4: 2-3 hours
- Phase 5: 2-3 hours
- Phase 6: 1 hour
- Phase 7: 1-2 hours
- Phase 8: 1-2 hours

**Total**: ~12-18 hours of development work
