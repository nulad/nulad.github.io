---
title: "Test Markdown Features"
date: "2026-01-05"
excerpt: "A comprehensive test of various markdown features including tables, lists, and code blocks."
tags: ["markdown", "test", "features"]
---

# Test Markdown Features

This post tests various markdown features for the blog system.

## Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header

## Text Formatting

**Bold text** and *italic text* and ***bold italic***.

~~Strikethrough text~~.

`Inline code` with backticks.

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered List

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

## Links and Images

[Link to GitHub](https://github.com)

## Code Blocks

### JavaScript

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
```

### Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))
```

## Tables

| Name    | Age | Occupation     |
|---------|-----|----------------|
| Alice   | 30  | Developer      |
| Bob     | 25  | Designer       |
| Charlie | 35  | Project Manager |

## Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.

> **Nested blockquote**
>
> > Even deeper nesting
> > with multiple lines.

## Horizontal Rules

---

***

___

## HTML Elements

<div style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
  This is a custom div with inline styles.
</div>

<span style="color: red;">Red text</span>

## Escaping

\*Not italic\* and \`not code\`.

## Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task

---

This concludes the markdown features test!
