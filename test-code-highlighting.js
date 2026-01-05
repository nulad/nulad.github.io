import { initMarkdownSystem } from './lib/posts.js';
import { markdownToHtmlSync } from './lib/renderer.js';

async function testCodeHighlighting() {
  try {
    console.log('🧪 Testing code highlighting with sample code...\n');
    
    // Initialize the markdown system
    await initMarkdownSystem();
    console.log('✅ Shiki initialized successfully\n');
    
    // Test with sample code blocks
    const testMarkdown = `# Code Highlighting Test

## JavaScript Example

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test the function
for (let i = 0; i < 10; i++) {
  console.log(\`fibonacci(\${i}) = \${fibonacci(i)}\`);
}
\`\`\`

## Python Example

\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# Test the function
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quicksort(numbers)
print(f"Sorted: {sorted_numbers}")
\`\`\`

## CSS Example

\`\`\`css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
\`\`\`

## Bash Example

\`\`\`bash
#!/bin/bash

# Install dependencies and run tests
echo "Installing dependencies..."
npm install

echo "Running tests..."
npm test

echo "Building project..."
npm run build
\`\`\`
`;
    
    console.log('📝 Processing markdown with code blocks...\n');
    const html = markdownToHtmlSync(testMarkdown);
    
    console.log('🎨 Generated HTML with syntax highlighting:');
    console.log('=' .repeat(50));
    console.log(html);
    console.log('=' .repeat(50));
    
    // Check for syntax highlighting indicators
    const hasShikiClass = html.includes('shiki');
    const hasInlineStyles = html.includes('style="');
    const hasCodeElements = html.includes('<pre') && html.includes('<code');
    
    console.log('\n🔍 Analysis:');
    console.log(`✅ Contains <pre> and <code> elements: ${hasCodeElements}`);
    console.log(`✅ Contains shiki classes: ${hasShikiClass}`);
    console.log(`✅ Contains inline styles: ${hasInlineStyles}`);
    
    if (hasShikiClass && hasInlineStyles) {
      console.log('\n🎉 Syntax highlighting is working correctly!');
    } else {
      console.log('\n⚠️  Syntax highlighting may not be working as expected.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testCodeHighlighting();
