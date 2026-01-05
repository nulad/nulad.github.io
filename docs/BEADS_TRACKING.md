# Beads Issue Tracking - Blog Implementation

**Generated:** 2026-01-05
**Total Issues:** 48 (6 epics + 42 tasks)

---

## Epic Overview

| Epic ID | Name | Priority | Children | Status |
|---------|------|----------|----------|--------|
| nulad.github.io-243 | Foundation & Project Setup | P0 | 5 tasks | 0% |
| nulad.github.io-vew | Content System & Markdown Processing | P0 | 6 tasks | 0% |
| nulad.github.io-sly | Design System & Dark Mode | P1 | 6 tasks | 0% |
| nulad.github.io-k70 | Core Blog Features | P1 | 7 tasks | 0% |
| nulad.github.io-ocg | Advanced Features | P2 | 8 tasks | 0% |
| nulad.github.io-n41 | Deployment & CI/CD | P2 | 10 tasks | 0% |

---

## Complexity Breakdown

### 🟢 Simple Tasks (Junior Level) - 13 tasks
- Install Node.js dependencies (243.1)
- Install content processing dependencies (243.3)
- Install FlexSearch for client-side search (243.5)
- Set up system font stack (sly.2)
- Create basic layout component with dark mode (sly.6)
- Create reading time calculation utility (vew.5)
- Add reading time display to post cards (k70.2)
- Build copy-to-clipboard button for code blocks (k70.6)
- Create example blog posts (n41.6)
- Test draft filtering in dev vs production mode (n41.7)
- Test dark mode toggle and persistence (n41.8)
- Test infinite scroll, search, and code copy features (n41.9)
- Verify existing projects remain accessible (n41.10)

### 🟡 Medium Tasks (Mid-Level) - 25 tasks
- Initialize Next.js project with JavaScript and App Router (243.2)
- Configure next.config.js for static export (243.4)
- Define frontmatter schema with draft support (vew.2)
- Create markdown utility functions (vew.3)
- Build post metadata extraction with JSDoc typedefs (vew.4)
- Implement draft filtering logic (vew.6)
- Create CSS for light/dark modes with minimal styling (sly.3)
- Implement dark mode context and toggle component (sly.4)
- Create dark mode persistence with localStorage (sly.5)
- Build infinite scroll post listing component (k70.1)
- Implement dynamic route for posts (k70.3)
- Set up Shiki for syntax highlighting (k70.4)
- Create markdown renderer with code highlighting (k70.5)
- Build generateStaticParams for all published posts (k70.7)
- Implement tag extraction logic from frontmatter (ocg.1)
- Create tag listing page showing all tags (ocg.2)
- Build dynamic tag filter pages (ocg.3)
- Build search index generation at build time (ocg.5)
- Create minimal search UI component (ocg.6)
- Add basic SEO metadata to pages (ocg.7)
- Optimize images with next/image component (ocg.8)
- Create GitHub Actions workflow file (n41.1)
- Configure build with NODE_ENV=production (n41.2)
- Implement post-build script to copy projects to out/ (n41.4)
- Configure GitHub Pages deployment in workflow (n41.5)

### 🔴 Complex Tasks (Senior Level) - 4 tasks
- Design flat content structure and file conventions (vew.1) - **ARCHITECTURAL**
- Design brutalist/readable design system (sly.1) - **ARCHITECTURAL + DESIGN**
- Design client-side search architecture (ocg.4) - **ARCHITECTURAL**
- Design strategy to preserve existing project folders (n41.3) - **ARCHITECTURAL + CRITICAL**

---

## Parallelization Opportunities

### Phase 1: Initial Setup (Can Run in Parallel)
**No Blockers - Can Start Immediately:**
```
✓ Install Node.js dependencies (243.1)
✓ Install content processing dependencies (243.3)
✓ Install FlexSearch (243.5)
✓ Design content structure (vew.1) - ARCHITECTURAL
✓ Design brutalist design system (sly.1) - ARCHITECTURAL
✓ Design preservation strategy (n41.3) - ARCHITECTURAL
```

**Recommended Workflow:**
1. Senior engineer handles all 3 architectural tasks in parallel
2. Junior/Mid-level engineer handles all 3 installation tasks in parallel
3. Total: 6 tasks can run simultaneously

### Phase 2: Foundation Building
**After installations complete:**
```
✓ Initialize Next.js project (243.2) - depends on 243.1
✓ Configure static export (243.4) - depends on 243.2
```

**Parallel with Design System:**
After design decisions (sly.1) complete:
```
✓ Set up font stack (sly.2)
✓ Create CSS for light/dark modes (sly.3)
```

### Phase 3: Core Systems
**After schema defined (vew.2):**
```
Parallel track 1: Content utilities
  ✓ Create markdown utilities (vew.3)
  ✓ Build metadata extraction (vew.4)

Parallel track 2: Design implementation
  ✓ Implement dark mode context (sly.4)
  ✓ Create dark mode persistence (sly.5)
```

### Phase 4: Feature Development
**Multiple parallel tracks possible:**

**Track A: Blog Core**
- Build post listing (k70.1)
- Implement post routes (k70.3)
- Build generateStaticParams (k70.7)

**Track B: Syntax Highlighting**
- Set up Shiki (k70.4)
- Create markdown renderer (k70.5)
- Build copy button (k70.6)

**Track C: Tags System**
- Implement tag extraction (ocg.1)
- Create tag listing (ocg.2)
- Build tag filter pages (ocg.3)

**Track D: Search**
- Design search architecture (ocg.4)
- Build search index (ocg.5)
- Create search UI (ocg.6)

### Phase 5: Polish & Deployment
**Parallel optimization:**
```
✓ Add SEO metadata (ocg.7)
✓ Optimize images (ocg.8)
✓ Create example posts (n41.6)
```

**Deployment sequence:**
```
1. Create workflow file (n41.1)
2. Configure production build (n41.2)
3. Implement copy script (n41.4)
4. Configure Pages deployment (n41.5)
```

**Testing (after all features complete):**
```
✓ Test draft filtering (n41.7)
✓ Test dark mode (n41.8)
✓ Test interactive features (n41.9)
✓ Verify existing projects (n41.10)
```

---

## Critical Path Analysis

**Longest dependency chain (26 tasks):**
```
243.1 (Install deps)
  → 243.2 (Init Next.js)
    → 243.4 (Configure export)
      → vew.1 (Design content structure)
        → vew.2 (Define schema)
          → vew.3 (Markdown utilities)
            → vew.6 (Draft filtering)
              → k70.3 (Dynamic routes)
                → k70.7 (generateStaticParams)
                  → n41.1 (Workflow file)
                    → n41.2 (Production build)
                      → n41.5 (Pages deployment)
                        → n41.10 (Verify projects)
```

**Critical architectural decisions (must complete early):**
1. Design content structure (vew.1) - blocks 11 other tasks
2. Design brutalist design system (sly.1) - blocks 5 other tasks
3. Design preservation strategy (n41.3) - blocks 3 other tasks
4. Design search architecture (ocg.4) - blocks 2 other tasks

---

## Ready-to-Start Tasks (No Blockers)

**Can start immediately (10 tasks):**
1. **[P0]** Install Node.js dependencies (243.1) - 15min
2. **[P0]** Install content processing dependencies (243.3) - 10min
3. **[P0]** Install FlexSearch (243.5) - 10min
4. **[P0]** Design content structure (vew.1) - 45min ⚠️ ARCHITECTURAL
5. **[P0]** Design brutalist design system (sly.1) - 90min ⚠️ ARCHITECTURAL
6. **[P0]** Design preservation strategy (n41.3) - 60min ⚠️ ARCHITECTURAL

**Recommended Start Order:**
1. **Senior engineer:** Start all 3 architectural tasks
2. **Junior/Mid engineer:** Start all 3 installation tasks
3. **Once 243.1 completes:** Start 243.2 (Initialize Next.js)

---

## Team Allocation Strategy

### Solo Developer (Recommended Order)
1. **Week 1:** Architectural decisions (vew.1, sly.1, n41.3, ocg.4)
2. **Week 2:** Foundation & setup (all 243.* tasks)
3. **Week 3:** Content system + Design system (vew.* + sly.*)
4. **Week 4:** Core blog features (k70.*)
5. **Week 5:** Advanced features (ocg.*)
6. **Week 6:** Deployment & testing (n41.*)

### Multi-Developer Team
**Senior Developer:**
- All architectural tasks (vew.1, sly.1, ocg.4, n41.3)
- Complex implementations (vew.6, k70.5, ocg.5)
- Code reviews

**Mid-Level Developer:**
- Content system (vew.3, vew.4)
- Core blog features (k70.1, k70.3, k70.7)
- Tags & search (ocg.1, ocg.3, ocg.6)
- Deployment setup (n41.1, n41.2, n41.4, n41.5)

**Junior Developer:**
- All installations (243.1, 243.3, 243.5)
- Simple components (sly.2, sly.6, vew.5, k70.2, k70.6)
- Testing tasks (n41.6, n41.7, n41.8, n41.9, n41.10)
- Example content creation

---

## Dependency Visualization

### Epic Dependencies
```
Phase 1 (P0):
  Foundation & Project Setup (243)
    → affects ALL other epics

  Content System (vew)
    → affects Core Blog (k70)
    → affects Advanced Features (ocg)
    → affects Deployment (n41)

Phase 2 (P1):
  Design System (sly)
    → affects Core Blog (k70)
    → affects Advanced Features (ocg)

  Core Blog Features (k70)
    → affects Advanced Features (ocg)
    → affects Deployment (n41)

Phase 3 (P2):
  Advanced Features (ocg)
    → affects Deployment (n41)

  Deployment & CI/CD (n41)
    → final phase, no dependents
```

---

## Beads Commands Reference

### View Issues
```bash
# List all open issues
bd list

# Show ready-to-work tasks (no blockers)
bd ready

# Show blocked issues
bd blocked

# Show specific issue details
bd show <issue-id>

# Show epic status
bd epic status
```

### Work on Issues
```bash
# Update issue status
bd update <issue-id> --status in-progress
bd update <issue-id> --status closed

# Add comment/notes
bd comments <issue-id> add "Implementation notes..."

# View dependencies
bd show <issue-id>
```

### Track Progress
```bash
# View project statistics
bd stats

# View issues by label
bd list --labels complexity-complex
bd list --labels can-parallelize
bd list --labels architectural
```

---

## Labels Applied

**Complexity:**
- `complexity-simple` - 13 tasks (junior level)
- `complexity-medium` - 25 tasks (mid-level)
- `complexity-complex` - 4 tasks (senior level)

**Special Markers:**
- `architectural` - 4 tasks (design decisions)
- `critical` - 3 tasks (must not break)
- `can-parallelize` - 3 tasks (independent work)
- `design` - 1 task (UX/visual design)
- `testing` - 4 tasks (QA work)

**Phase Labels:**
- `phase-1` - Foundation (Epic 243, vew)
- `phase-2` - Content System
- `phase-3` - Design + Core Blog (Epic sly, k70)
- `phase-4` - Advanced Features (Epic ocg)
- `phase-5` - Deployment (Epic n41)

---

## Success Metrics

**Sprint 1 Target (Foundation):**
- Complete Epic 243 (5 tasks) ✓
- Complete vew.1, vew.2 (2 tasks) ✓
- Total: 7 tasks

**Sprint 2 Target (Core Systems):**
- Complete Epic vew (6 tasks) ✓
- Complete Epic sly (6 tasks) ✓
- Total: 12 tasks

**Sprint 3 Target (Blog Features):**
- Complete Epic k70 (7 tasks) ✓
- Start Epic ocg (tags portion) ✓
- Total: 10 tasks

**Sprint 4 Target (Advanced Features):**
- Complete Epic ocg (8 tasks) ✓
- Total: 8 tasks

**Sprint 5 Target (Deployment):**
- Complete Epic n41 (10 tasks) ✓
- Total: 10 tasks

**Grand Total:** 42 tasks + 6 epics = 48 issues

---

## Risk Mitigation

**High-Risk Tasks:**
1. **n41.3** - Preservation strategy: Test thoroughly before deployment
2. **vew.6** - Draft filtering: Critical for content workflow
3. **ocg.4** - Search architecture: Performance implications
4. **sly.1** - Design system: Affects entire UX

**Mitigation Strategy:**
- Complete high-risk tasks early
- Thorough testing before moving on
- Document all architectural decisions
- Create rollback plans for critical changes

---

## Next Steps

1. **Immediate:** Start architectural tasks (vew.1, sly.1, n41.3)
2. **Parallel:** Run installation tasks (243.1, 243.3, 243.5)
3. **Review:** Architectural decisions before implementation
4. **Execute:** Follow dependency chain for implementation
5. **Test:** Comprehensive testing before deployment

---

**Commands to get started:**
```bash
# View ready tasks
bd ready

# Start first task
bd update nulad.github.io-243.1 --status in-progress

# Track progress
bd epic status
```
