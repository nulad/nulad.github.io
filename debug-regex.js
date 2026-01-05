import { initShiki, processMarkdownCodeBlocks } from './lib/markdown.js';

async function debugRegex() {
  try {
    console.log('🔍 Debugging regex pattern...\n');
    
    await initShiki();
    
    const testContent = `# Test

\`\`\`javascript
console.log('hello');
\`\`\`

More text.`;
    
    console.log('Original content:');
    console.log(repr(testContent));
    console.log();
    
    // Test the regex
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const matches = [...testContent.matchAll(codeBlockRegex)];
    
    console.log(`Found ${matches.length} code blocks:`);
    matches.forEach((match, index) => {
      console.log(`Match ${index + 1}:`);
      console.log(`  Full match: ${repr(match[0])}`);
      console.log(`  Language: ${repr(match[1])}`);
      console.log(`  Code: ${repr(match[2])}`);
      console.log();
    });
    
    // Test processing
    console.log('Processing with processMarkdownCodeBlocks...');
    const processed = processMarkdownCodeBlocks(testContent);
    console.log('Processed content:');
    console.log(repr(processed));
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

function repr(str) {
  return JSON.stringify(str);
}

debugRegex();
