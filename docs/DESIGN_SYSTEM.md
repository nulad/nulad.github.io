# Design System: Brutalist & Readable

## Philosophy

A brutalist approach to web design emphasizes raw functionality, stark contrasts, and intentional visual hierarchy. This design system prioritizes readability, accessibility, and content clarity while maintaining a distinctive aesthetic character.

## Typography

### Font Stack
- **Primary**: System UI fonts for optimal performance and native feel
- **Monospace**: System monospace for code and technical content
- **Alternative**: Geist (Google Fonts) as a web fallback

### Type Scale
Uses CSS custom properties with a modular scale (1.250 ratio):

```css
:root {
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px - body text */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 2.8125rem; /* 45px */
}
```

### Font Weights
```css
:root {
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### Line Height
```css
:root {
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
}
```

## Color System

### Light Mode Colors
```css
:root {
  /* Core semantic colors */
  --color-background: #ffffff;
  --color-surface: #f8f8f8;
  --color-border: #d4d4d4;
  
  /* Text colors */
  --color-text-primary: #0a0a0a;
  --color-text-secondary: #404040;
  --color-text-tertiary: #737373;
  --color-text-inverse: #ffffff;
  
  /* Accent colors - brutalist high contrast */
  --color-accent: #ff0000;
  --color-accent-hover: #cc0000;
  
  /* Link colors */
  --color-link: #0066cc;
  --color-link-visited: #6600cc;
  --color-link-hover: #0052a3;
  
  /* Code colors */
  --color-code-background: #f0f0f0;
  --color-code-border: #d4d4d4;
  --color-code-text: #0a0a0a;
}
```

### Dark Mode Colors
```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Core semantic colors */
    --color-background: #0a0a0a;
    --color-surface: #1a1a1a;
    --color-border: #404040;
    
    /* Text colors */
    --color-text-primary: #ffffff;
    --color-text-secondary: #d4d4d4;
    --color-text-tertiary: #a3a3a3;
    --color-text-inverse: #0a0a0a;
    
    /* Accent colors - adjusted for dark mode */
    --color-accent: #ff3333;
    --color-accent-hover: #ff6666;
    
    /* Link colors */
    --color-link: #66b3ff;
    --color-link-visited: #b366ff;
    --color-link-hover: #80c1ff;
    
    /* Code colors */
    --color-code-background: #1a1a1a;
    --color-code-border: #404040;
    --color-code-text: #ffffff;
  }
}
```

## Spacing System

### Base Unit
Uses 0.25rem (4px) as the base unit:

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
  --space-32: 8rem;    /* 128px */
}
```

### Layout Tokens
```css
:root {
  /* Container max-widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Content spacing */
  --section-gap: var(--space-16);
  --content-padding: var(--space-6);
  --card-padding: var(--space-8);
  
  /* Component spacing */
  --heading-margin: var(--space-4);
  --paragraph-margin: var(--space-6);
  --list-margin: var(--space-4);
}
```

### Token Naming Approach

- **Spacing scale**: `--space-*` (unit: `0.25rem` / 4px)
- **Layout sizing**: `--container-*` for max-widths and `--*-padding` / `--*-gap` for layout spacing
- **Baseline components**: `--border-width-*`, `--radius-*`, and per-element tokens like `--code-block-padding`, `--hr-thickness`

## Component Guidelines

### Headings
- Use high contrast (primary text color)
- Generous spacing below headings
- No underlines,保持 brutalist simplicity
- Weight decreases with heading level

### Paragraphs
- Maximum width: 65-75 characters for readability
- Line height: 1.625 for comfortable reading
- Color: secondary text for body, primary for emphasis

### Links
- No text decoration by default
- Underline on hover for interaction feedback
- Distinct color that meets WCAG AA contrast (4.5:1)

Baseline rules:
- Use link tokens (`--color-link`, `--color-link-hover`, `--color-link-visited`)
- Underline appears on hover with `--link-underline-thickness`

### Code Blocks
- Monospace font with consistent spacing
- Subtle background to distinguish from content
- Border for clear boundaries
- Syntax highlighting with high contrast themes

Baseline rules:
- Inline `code` uses `--inline-code-padding-x` / `--inline-code-padding-y`
- Block `pre` uses `--code-block-padding` and `--border-width-2`

### Lists
- Clear indentation with consistent spacing
- Bullets/numbers in tertiary color
- Adequate line height for multi-line items

### Blockquotes

Baseline rules:
- Left border width uses `--blockquote-border-width`
- Vertical margins use `--blockquote-margin-y`
- Left padding uses `--blockquote-padding-left`

### Horizontal Rules

Baseline rules:
- Thickness uses `--hr-thickness`
- Vertical margins use `--hr-margin-y`

## Layout Principles

1. **Grid-based alignment**: Use CSS Grid for main layouts
2. **Asymmetric balance**: Brutalist design often uses intentional asymmetry
3. **White space**: Generous spacing creates visual breathing room
4. **Clear hierarchy**: Visual weight guides the eye through content
5. **Mobile-first**: Design for small screens first, scale up

## Implementation Notes

### CSS Custom Properties
All tokens use CSS custom properties for:
- Runtime theming (light/dark mode)
- Component-level overrides
- Easy maintenance and updates

### Utility Classes
Consider a minimal utility system for:
- Spacing (m-4, p-6, etc.)
- Typography (text-lg, font-semibold)
- Colors (text-primary, bg-surface)

### Accessibility
- All color combinations meet WCAG AA standards
- Focus indicators use 2px solid with high contrast
- Sufficient click targets (min 44px)
- Semantic HTML5 elements for structure

## Brutalist Design Elements

### Borders
- 2px solid borders for strong definition
- Sharp corners, no rounding
- Border color matches text hierarchy

### Shadows
- Minimal or no shadows for flat design
- If used, hard shadows with no blur
- Offset shadows for depth when needed

### Interactions
- Immediate visual feedback on hover/focus
- Transform effects (scale, translate) for micro-interactions
- Color transitions for smooth state changes
