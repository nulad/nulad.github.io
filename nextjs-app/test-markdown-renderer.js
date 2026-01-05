import { markdownToHtml } from './lib/markdown.js';

const testMarkdown = `# Test Markdown

This is a test of the markdown renderer.

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

Inline code: \`const x = 42;\`

- Item 1
- Item 2
- Item 3

**Bold** and *italic* text.
`;

async function testMarkdownRenderer() {
  try {
    console.log('Testing markdown renderer...\n');
    
    // Test with light mode
    const lightHtml = await markdownToHtml(testMarkdown, { darkMode: false });
    console.log('Light mode HTML:');
    console.log(lightHtml);
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test with dark mode
    const darkHtml = await markdownToHtml(testMarkdown, { darkMode: true });
    console.log('Dark mode HTML:');
    console.log(darkHtml);
    
    console.log('\n✅ Markdown renderer test completed successfully!');
  } catch (error) {
    console.error('❌ Error testing markdown renderer:', error);
    process.exit(1);
  }
}

testMarkdownRenderer();
