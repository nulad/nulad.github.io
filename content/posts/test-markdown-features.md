---
title: "Testing Markdown Features"
date: "2024-01-15"
description: "A comprehensive test of markdown rendering capabilities"
tags: ["markdown", "test", "features"]
---

# Markdown Feature Test

This post demonstrates various markdown features to ensure proper rendering.

## Headings

Headings from H1 to H6 should render correctly with appropriate sizes.

### H3 Example
#### H4 Example
##### H5 Example
###### H6 Example

## Text Formatting

This is **bold text** and this is *italic text*. You can also use ~~strikethrough~~ and `inline code`.

## Lists

### Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Code Blocks

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

## Blockquotes

> This is a blockquote. It can contain multiple lines
> and should be styled distinctly from regular text.

## Links and Images

Here's a [link to example.com](https://example.com).

## Horizontal Rule

---

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Headings | ✓ | All levels |
| Lists | ✓ | Both types |
| Code | ✓ | Syntax highlighting |

## Conclusion

This post tests various markdown features to ensure the rendering pipeline works correctly.
