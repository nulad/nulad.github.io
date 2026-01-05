import { initMarkdownSystem, getPostBySlugWithHtmlSync } from './lib/posts.js';

async function testShiki() {
  try {
    console.log('🧪 Testing Shiki syntax highlighting...\n');
    
    // Initialize the markdown system
    await initMarkdownSystem();
    console.log('✅ Shiki initialized successfully');
    
    // Test with existing content
    const testPost = getPostBySlugWithHtmlSync('hello-world');
    if (testPost) {
      console.log('✅ Found test post: hello-world.md');
      console.log('📝 Content preview:');
      console.log(testPost.content.substring(0, 200) + '...\n');
      
      console.log('🎨 HTML output preview:');
      console.log(testPost.html.substring(0, 500) + '...\n');
      
      // Check if HTML contains syntax highlighting elements
      if (testPost.html.includes('shiki') || testPost.html.includes('style="')) {
        console.log('✅ Syntax highlighting detected in HTML output');
      } else {
        console.log('⚠️  No syntax highlighting detected');
      }
    } else {
      console.log('ℹ️  No hello-world.md found, creating test content...');
      
      // Test with sample code
      const { markdownToHtmlSync } = await import('./lib/renderer.js');
      const testMarkdown = `# Test Code

Here's some JavaScript code:

\`\`\`javascript
function hello(name) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

// Test the function
const result = hello("World");
\`\`\`

And some Python:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")
    return name.upper()

result = greet("World")
\`\`\`
`;
      
      const html = markdownToHtmlSync(testMarkdown);
      console.log('🎨 Generated HTML:');
      console.log(html);
      
      if (html.includes('shiki') || html.includes('style="')) {
        console.log('✅ Syntax highlighting working correctly!');
      } else {
        console.log('❌ Syntax highlighting not working');
      }
    }
    
    console.log('\n🎉 Shiki test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testShiki();
