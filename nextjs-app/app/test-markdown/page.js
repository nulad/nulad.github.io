import MarkdownRenderer from '../../components/MarkdownRenderer.js';

export default function TestMarkdownPage() {
  const content = `# Markdown Renderer Test

This tests the **MarkdownRenderer** component.

\`\`\`javascript
const test = "Hello, World!";
console.log(test);
\`\`\`

- List item 1
- List item 2

Inline code: \`test()\`
`;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Markdown Renderer Test</h1>
      <div className="border rounded-lg p-4">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
