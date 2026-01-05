import MarkdownRenderer from '../../components/MarkdownRenderer.js';

const sampleMarkdown = `# Markdown Renderer Demo

This is a demonstration of the markdown renderer with syntax highlighting.

## Features

- **Bold text** and *italic text*
- [Links](https://example.com)
- Lists and other markdown elements

### Code Blocks

Here's some JavaScript code:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

const result = greet('World');
console.log(result); // WORLD
\`\`\`

And here's some Python:

\`\`\`python
def fibonacci(n):
    """Generate Fibonacci sequence up to n."""
    a, b = 0, 1
    while a < n:
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num)
\`\`\`

### Inline Code

You can use \`inline code\` for technical terms like \`const\`, \`let\`, or \`var\`.

### Lists

1. First item
2. Second item
   - Nested item
   - Another nested item
3. Third item

### Blockquotes

> This is a blockquote.
> It can span multiple lines.

---

### Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown parsing | ✅ Complete | Using remark |
| Syntax highlighting | ✅ Complete | Using Shiki |
| Dark mode | ✅ Complete | Automatic detection |

### HTML Support

You can also use <em>HTML</em> tags in your markdown.

That's all for now! 🎉
`;

export default function MarkdownDemo() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            Markdown Renderer Demo
          </h1>
          <MarkdownRenderer 
            content={sampleMarkdown}
            className="prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-pre:bg-zinc-50 dark:prose-pre:bg-zinc-900 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:rounded prose-code:text-sm"
          />
        </div>
      </main>
    </div>
  );
}
